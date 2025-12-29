"use client";

import logout from "@/lib/actions/server/auth/logout";
import type { Session } from "@/lib/types";
import { manageToast } from "@/lib/utils/helper";
import { usePathname, useSearchParams } from "next/navigation";
import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState
} from "react";
import useSWR from "swr";
import { TempInfo, TempKey } from "../utils/enums";

const SessionContext = createContext({
	session: null as Session,
	setSession: (_: Session) => {}
});

export function SessionProvider({
	children,
	session,
	isExpired
}: {
	children: ReactNode;
	session: Session;
	isExpired: boolean;
}) {
	const [currentSession, setCurrentSession] = useState<Session>(session);
	const currentSearchParams = useSearchParams();
	const currentPath = usePathname();
	const { data: sessionData } = useSWR(
		isExpired ? "/api/auth/refresh" : null,
		async (url) => {
			try {
				const refreshRes = await fetch(url, { method: "POST" });
				if (!refreshRes.ok) {
					if (refreshRes.status === 503) return currentSession;
					localStorage.setItem(
						TempKey.ToastMsg,
						JSON.stringify({
							type: TempKey.SessionExpiredToastMsg,
							msg: TempInfo.SessionExpired
						})
					);
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
		if (session) {
			setCurrentSession(session);
		} else {
			if (!sessionData) setCurrentSession(null);
			else setCurrentSession(sessionData);
		}

		if (typeof window !== "undefined") {
			manageToast(
				sessionStorage,
				localStorage,
				window.history,
				currentSearchParams,
				currentPath
			);
			if (!session) localStorage.removeItem(TempKey.Sidebar);
		}
	}, [sessionData, session, currentSearchParams, currentPath]);

	return (
		<SessionContext.Provider
			value={{ session: currentSession, setSession: setCurrentSession }}
		>
			{children}
		</SessionContext.Provider>
	);
}

export const useSession = () => useContext(SessionContext);
