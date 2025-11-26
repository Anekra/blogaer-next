"use server";
import setSessionCookie from "@/lib/actions/server/auth/setSessionCookie";
import type { AuthDto, EncoreErrDto } from "@/lib/types/dto/CommonDto";
import { headers } from "next/headers";

export default async function loginWithPasskey(
	emailOrUsername: string,
	optionId: string
) {
	try {
		const url = `${process.env.API_ROUTE}/auth/two-fa/webauthn/login`;
		const userAgent = (await headers()).get("user-agent");
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"User-Agent": `${userAgent}`,
				Origin: "http://localhost:3000"
			},
			body: JSON.stringify({ emailOrUsername, optionId })
		});

		const resJson = await response.json();
		if (!response.ok) return resJson as EncoreErrDto;

		const authData = resJson as AuthDto;
		await setSessionCookie(authData.data, true);

		return true;
	} catch (error) {
		console.error("loginWithPasskey.ts ERROR >>>", error);
		return false;
	}
}
