import { authRoutes, protectedRoutes } from "@/lib/utils/constants";
import { newUrl } from "@/lib/utils/helper";
import jwt from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";
import type { Session } from "../types";

export async function authorization(req: NextRequest, path: string) {
	const isProtected = protectedRoutes.some((route) => path.startsWith(route));
	const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

	const searchParams = [
		{ param: "redirect", value: "Login required." },
		{ param: "request_url", value: `${req.nextUrl.pathname}` }
	];
	const url = newUrl("/login", searchParams);

	const encryptedSession = req.cookies.get(`${process.env.SESSION}`)?.value;

	let session: Session = null;
	if (encryptedSession) {
		try {
			session = jwt.verify(
				encryptedSession,
				`${process.env.SESSION_SECRET}`
			) as Session;
		} catch (_) {
			session = null;
		}
	}

	if (isProtected) {
		if (!session) {
			return NextResponse.redirect(url, 301);
		} else {
			const modifiedHeaders = new Headers(req.headers);
			modifiedHeaders.set("x-auth-client-id", session.clientId);

			return NextResponse.next({
				request: {
					headers: modifiedHeaders
				}
			});
		}
	}
	if (isAuthRoute && session) {
		const searchParams = [{ param: "redirect", value: "Already logged in." }];
		const url = newUrl("/home", searchParams);
		return NextResponse.redirect(url, 301);
	}

	return;
}
