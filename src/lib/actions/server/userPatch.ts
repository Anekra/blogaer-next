"use server";

import type { Session } from "@/lib/types";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import setSessionCookie from "./auth/setSessionCookie";

export default async function userPatch(
	objValue: { [key: string]: string },
	path: string = "/user/account"
) {
	try {
		const cookie = await cookies();
		const encryptedSession = cookie.get(`${process.env.SESSION}`)?.value;
		const csrf = cookie.get(`${process.env.CSRF}`)?.value;
		if (!encryptedSession || !csrf)
			return redirect("/login?redirect=Login required!");

		const session = jwt.verify(
			encryptedSession,
			`${process.env.SESSION_SECRET}`
		) as Session & JwtPayload;
		if (!session) return redirect("/login?redirect=Login required!");

		const userAgent = (await headers()).get("user-agent");
		const res = await fetch(`${process.env.API_ROUTE}${path}`, {
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${session.clientId}`,
				"User-Agent": `${userAgent}`,
				"X-CSRF": `${csrf}`,
				Origin: "http://localhost:3000"
			},
			body: JSON.stringify(objValue)
		});

		if (!res.ok) {
			const resJson = await res.json();

			return {
				statusCode: res.status,
				error: resJson.error
			};
		}

		const patchedData = { ...session, ...objValue, csrf };
		await setSessionCookie(patchedData, false);

		return { message: "User data updated successfully." };
	} catch (_) {
		return { error: "Something went wrong please try again later!" };
	}
}
