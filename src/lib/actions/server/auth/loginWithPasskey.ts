"use server";
import { headers } from "next/headers";

import setSessionCookie from "@/lib/actions/server/auth/setSessionCookie";
import { AuthDto } from "@/lib/types/dto/CommonDto";

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

    const resJson: AuthDto = await response.json();

    if (!response.ok) return resJson;

    await setSessionCookie(resJson);

    return true;
  } catch (error) {
    console.error("loginWithPasskey.ts ERROR >>>", error);
    return false;
  }
}
