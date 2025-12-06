"use server";

import type { AuthDto, EncoreErrDto } from "@/lib/types/dto/CommonDto";
import type { LoginFormSchema } from "@/lib/types/zodSchemas";
import { headers } from "next/headers";
import type { z } from "zod";
import setSessionCookie from "./setSessionCookie";

export default async function login(values: z.infer<typeof LoginFormSchema>) {
	try {
		const header = await headers();;
		const userAgent = header.get("user-agent");
		const xForwardedFor = header.get("x-forwarded-for");
		const response = await fetch(`${process.env.API_ROUTE}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"User-Agent": `${userAgent}`,
				"X-Forwarded-For": `${xForwardedFor}`,
				Origin: "http://localhost:3000"
			},
			body: JSON.stringify(values)
		});

		const resJson = await response.json();
		if (!response.ok) return resJson as EncoreErrDto;

		const authData = resJson as AuthDto;
		await setSessionCookie(authData.data, true);

		return true;
	} catch (error) {
		console.error("login.ts >>>", error);
		return false;
	}
}
