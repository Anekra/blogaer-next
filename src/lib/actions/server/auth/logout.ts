"use server";

import type { Session } from "@/lib/types";
import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";

export default async function logout() {
	const cookie = await cookies();
	const sessionCookie = `${process.env.SESSION}`;
	const encryptedSession = cookie.get(`${process.env.SESSION}`)?.value;
	if (!encryptedSession) {
		cookie.delete(sessionCookie);
		return;
	}
	const decodedSession = jwt.verify(
		encryptedSession,
		`${process.env.SESSION_SECRET}`,
		{ ignoreExpiration: true }
	) as Session;
	if (!decodedSession) {
		cookie.delete(sessionCookie);
		return;
	}
	const url = `${process.env.API_ROUTE}/auth/logout`;
	const header = await headers();
	const userAgent = header.get("user-agent");
	const xForwardedFor = header.get("x-forwarded-for");
	const csrf = cookie.get(`${process.env.CSRF}`)?.value;
	if (!csrf) {
		cookie.delete(sessionCookie);
		return;
	}
	await fetch(url, {
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
}
