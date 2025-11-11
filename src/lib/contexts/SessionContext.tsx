"use client";

import { useSearchParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { toast } from "sonner";
import useSWR from "swr";
import logout from "@/lib/actions/server/auth/logout";
import { Session } from "@/lib/types";

const SessionContext = createContext({
  session: null as Session,
  setSession: (_: Session) => {}
});

export function SessionProvider({
  children,
  session
}: {
  children: ReactNode;
  session: Session;
}) {
  const [currentSession, setCurrentSession] = useState<Session>(null);
  const redirectMessage = useSearchParams().get("redirect");
  const sessionName = `${process.env.NEXT_PUBLIC_SESSION}`;
  const { data } = useSWR(
    !session ? "/api/auth/refresh" : null,
    async (url) => {
      if (!session || !session.exp) return null;
      if (session.exp > Date.now() / 1000) return session;
      try {
        const refreshRes = await fetch(url, { method: "POST" });
        if (!refreshRes.ok) {
          if (refreshRes.status === 503) return session;
          await logout();

          return null;
        }

        return session;
      } catch (error) {
        return session;
      }
    }
  );

  useEffect(() => {
    if (!data) setCurrentSession(null);
    else setCurrentSession(data);

    if (session) {
      localStorage.removeItem("CSRFToken");
      setCurrentSession(session);
      toast.success("Login successful.", {
        position: "bottom-right",
        duration: 2000
      });
    }

    if (redirectMessage) {
      toast(redirectMessage, {
        position: "bottom-right",
        duration: 2000
      });
    }
  }, [sessionName, data, session, redirectMessage]);

  return (
    <SessionContext.Provider
      value={{ session: currentSession, setSession: setCurrentSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSession = () => useContext(SessionContext);
