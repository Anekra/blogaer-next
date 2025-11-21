import setSessionCookie from "@/lib/actions/server/auth/setSessionCookie";
import type { Session } from "@/lib/types";
import type { EncoreErrDto } from "@/lib/types/dto/CommonDto";
import type { RefreshTokenDto } from "@/lib/types/dto/ResDto";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
	try {
		const redirectRes = NextResponse.json(
			{ error: "Session token expired!" },
			{ status: 419 }
		);
		const cookie = await cookies();
		const sessionCookie = `${process.env.SESSION}`;
		const encryptedSession = cookie.get(sessionCookie)?.value;
		if (!encryptedSession) return redirectRes;

		const decodedSession = jwt.verify(
			encryptedSession,
			`${process.env.SESSION_SECRET}`
		) as Session;
		if (!decodedSession) return redirectRes;

		const csrf = cookie.get(`${process.env.CSRF}`)?.value;
		if (!csrf)
			return NextResponse.json(
				{ error: "Session token expired!" },
				{ status: 419 }
			);

		const url = `${process.env.API_ROUTE}/auth/refresh`;
		const refreshResponse = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-Authorization": decodedSession.clientId,
				"X-CSRF": csrf,
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
			exp: authJson.data.exp
		};
		await setSessionCookie(refreshedSession);

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
