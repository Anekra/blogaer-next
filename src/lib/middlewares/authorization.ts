import type { Session } from "@/lib/types";
import { authRoutes, protectedRoutes } from "@/lib/utils/constants";
import { newUrl } from "@/lib/utils/helper";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { type NextRequest, NextResponse } from "next/server";

export async function authorization(req: NextRequest, path: string) {
	const isProtected = protectedRoutes.some((route) => path.startsWith(route));
	const isAuthRoute = authRoutes.some((route) => path.startsWith(route));

	const encryptedSession = req.cookies.get(`${process.env.SESSION}`)?.value;
	const csrf = req.cookies.get(`${process.env.CSRF}`)?.value;

	if (isProtected) {
		const requestUrl = req.nextUrl.searchParams.get("request_url") ?? path;
		const searchParams = [
			{ param: "redirect", value: "Session expired! Login required." },
			{ param: "request_url", value: requestUrl }
		];
		const url = newUrl("/login", searchParams);
		if (!encryptedSession || !csrf) {
			return NextResponse.redirect(url, 307);
		}
		const decodedSession = jwt.verify(
			encryptedSession,
			`${process.env.SESSION_SECRET}`,
			{ ignoreExpiration: true }
		) as Session & JwtPayload;
		if (!decodedSession) return NextResponse.redirect(url, 307);

		return [decodedSession.clientId, csrf];
	}
	if (isAuthRoute && encryptedSession && csrf) {
		const searchParams = [{ param: "redirect", value: "Already logged in." }];
		const url = newUrl("/home", searchParams);

		return NextResponse.redirect(url, 307);
	}

	return NextResponse.next();
}
