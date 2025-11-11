"use server";

import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";

import { Session } from "@/lib/types";
import { redirect } from "next/navigation";
import setSessionCookie from "./auth/setSessionCookie";

export default async function userPatch(
  objValue: { [key: string]: string },
  path: string = "/user/account"
) {
  try {
    const cookie = await cookies();
    const encryptedSession = cookie.get(`${process.env.SESSION}`)?.value;
    if (!encryptedSession) return redirect("/login?redirect=Login required!");

    const session = jwt.verify(
      encryptedSession,
      `${process.env.SESSION_SECRET}`
    ) as Session;
    if (!session) return redirect("/login?redirect=Login required!");

    const userAgent = (await headers()).get("user-agent");
    const res = await fetch(`${process.env.API_ROUTE}${path}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `${userAgent}`,
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

    const patchedData = { ...session, ...objValue };
    await setSessionCookie(patchedData, false);

    return { message: "User data updated successfully." };
  } catch (_) {
    return { error: "Something went wrong please try again later!" };
  }
}
