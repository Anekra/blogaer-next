"use server";

import { z } from "zod";

import { RegisterFormSchema } from "@/lib/types/zodSchemas";
import { headers } from "next/headers";
import { AuthDto, EncoreErrDto } from "@/lib/types/dto/CommonDto";
import setSessionCookie from "./setSessionCookie";

export default async function register(
  values: z.infer<typeof RegisterFormSchema>
) {
  try {
    const url: string = `${process.env.API_ROUTE}/auth/register`;
    const userAgent = (await headers()).get("user-agent");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `${userAgent}`,
        Origin: "http://localhost:3000"
      },
      body: JSON.stringify(values)
    });

    const resJson = await response.json();
    if (!response.ok) return resJson as EncoreErrDto;

    const authData = resJson as AuthDto;
    await setSessionCookie(authData.data);

    return true;
  } catch (error) {
    console.error("register.ts >>>", error);
    return false;
  }
}
