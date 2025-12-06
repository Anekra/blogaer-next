"use server";

import type { Session } from "@/lib/types";
import jwt from "jsonwebtoken";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

async function deleteAllCookies(cookie: ReadonlyRequestCookies) {
	const allCookies = cookie.getAll();
	allCookies.forEach((item) => {
		cookie.delete(item.name);
	});
}

export default async function logout() {
	const cookie = await cookies();
	const encryptedSession = cookie.get(`${process.env.SESSION}`)?.value;
	const csrf = cookie.get(`${process.env.CSRF}`)?.value;
	if (!encryptedSession || !csrf) {
		await deleteAllCookies(cookie);
		return redirect("/login");
	}

	const decodedSession = jwt.verify(
		encryptedSession,
		`${process.env.SESSION_SECRET}`,
		{ ignoreExpiration: true }
	) as Session;

	if (!decodedSession) {
		await deleteAllCookies(cookie);
		return redirect("/login");
	}

	const url = `${process.env.API_ROUTE}/auth/logout`;
	const header = await headers();
	const userAgent = header.get("user-agent");

	try {
		await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"User-Agent": `${userAgent}`,
				"X-Authorization": `Bearer ${decodedSession.clientId}`,
				"X-Semi-CSRF": csrf,
				Origin: "http://localhost:3000"
			}
		});
	} catch (err) {
		console.error("LOGOUT logout >>", err);
	} finally {
		await deleteAllCookies(cookie);
		redirect("/");
	}
}
