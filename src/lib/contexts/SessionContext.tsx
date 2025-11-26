"use client";

import logout from "@/lib/actions/server/auth/logout";
import type { Session } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState
} from "react";
import { toast } from "sonner";
import useSWR from "swr";
import { TempValue } from "../utils/enums";

const SessionContext = createContext({
	session: null as Session,
	setSession: (_: Session) => {}
});

export function SessionProvider({
	children,
	session
}: {
	children: ReactNode;
	session: Session | null | string;
}) {
	const [currentSession, setCurrentSession] = useState<Session>(null);
	const redirectMessage = useSearchParams().get("redirect");
	const isSessionExpired = typeof session === "string";
	const { data } = useSWR(
		isSessionExpired ? "/api/auth/refresh" : null,
		async (url) => {
			try {
				const refreshRes = await fetch(url, { method: "POST" });
				if (!refreshRes.ok) {
					if (refreshRes.status === 503) return currentSession;

					await logout();

					return null;
				}

				return currentSession;
			} catch (_) {
				return currentSession;
			}
		}
	);

	useEffect(() => {
		if (!data) setCurrentSession(null);
		else setCurrentSession(data);

		if (session && typeof session !== "string") {
			setCurrentSession(session);
			
			if (typeof window !== "undefined") {
				sessionStorage.removeItem(TempValue.CSRFTkn);
				const toastMsg = sessionStorage.getItem(TempValue.ToastMsg);
				if (toastMsg) {
					sessionStorage.removeItem(TempValue.ToastMsg);
				}

				toast.success(toastMsg, {
					position: "bottom-right",
					duration: 2000
				});
			}
		}

		if (redirectMessage) {
			toast(redirectMessage, {
				position: "bottom-right",
				duration: 2000
			});
		}
	}, [data, session, redirectMessage]);

	return (
		<SessionContext.Provider
			value={{ session: currentSession, setSession: setCurrentSession }}
		>
			{children}
		</SessionContext.Provider>
	);
}

export const useSession = () => useContext(SessionContext);
