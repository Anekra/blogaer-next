import setSessionCookie from "@/lib/actions/server/auth/setSessionCookie";
import type { Session } from "@/lib/types";
import type { EncoreErrDto } from "@/lib/types/dto/CommonDto";
import type { RefreshTokenDto } from "@/lib/types/dto/ResDto";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
	try {
		const redirectRes = NextResponse.json(
			{ error: "Session token expired!" },
			{ status: 419 }
		);
		const cookie = await cookies();
		const encryptedSession = cookie.get(`${process.env.SESSION}`)?.value;
		if (!encryptedSession) return redirectRes;

		const decodedSession = jwt.verify(
			encryptedSession,
			`${process.env.SESSION_SECRET}`,
			{ ignoreExpiration: true }
		) as Session & JwtPayload;
		if (!decodedSession) return redirectRes;

		const csrf = cookie.get(`${process.env.CSRF}`)?.value;
		if (!csrf)
			return NextResponse.json(
				{ error: "Session token expired!" },
				{ status: 419 }
			);
		const url = `${process.env.API_ROUTE}/auth/refresh`;
		const header = await headers();
		const userAgent = header.get("user-agent");
		const xForwardedFor = header.get("x-forwarded-for");
		const refreshResponse = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"User-Agent": `${userAgent}`,
				"X-Authorization": `Bearer ${decodedSession.clientId}`,
				"X-Semi-CSRF": csrf,
				"X-Forwarded-For": `${xForwardedFor}`,
				Origin: "http://localhost:3000"
			}
		});
		const refreshJson = await refreshResponse.json();
		if (!refreshResponse.ok) return refreshJson as EncoreErrDto;
		const authJson = refreshJson as RefreshTokenDto;
		const refreshedSession = {
			...decodedSession,
			clientId: authJson.data.clientId,
			csrf: authJson.data.csrf,
			isVerified: authJson.data.isVerified,
			exp: authJson.data.exp
		};
		await setSessionCookie(refreshedSession, true);

		const response = NextResponse.json(
			{ message: "Refresh successful." },
			{ status: 200 }
		);

		return response;
	} catch (error) {
		console.error("POST /auth/refresh/route", error);

		return NextResponse.json(
			{ error: "Server currently down!" },
			{ status: 503 }
		);
	}
}
