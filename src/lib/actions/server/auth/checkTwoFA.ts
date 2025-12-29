"use server";

import type { Session } from "@/lib/types";
import type { CommonDto } from "@/lib/types/dto/CommonDto";
import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function checkTwoFA(
	emailOrUsername: string
): Promise<CommonDto | null> {
	try {
		const cookie = await cookies();
		const encryptedSession = cookie.get(`${process.env.SESSION}`)?.value;
		if (!encryptedSession) return redirect("/login?redirect=Login required!");

		const session = jwt.verify(
			encryptedSession,
			`${process.env.SESSION_SECRET}`
		) as Session;
		if (!session) return redirect("/login?redirect=Login required!");

		const url = `${process.env.API_ROUTE}/auth/check-two-fa/${emailOrUsername}`;
		const userAgent = (await headers()).get("user-agent");
		const res = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"User-Agent": `${userAgent}`,
				Origin: "http://localhost:3000"
			}
		});

		const resJson: CommonDto = await res.json();
		if (!res.ok) throw new Error(resJson.error);

		return resJson;
	} catch (error) {
		console.error("check-two-fa >>", error);

		return null;
	}
}
