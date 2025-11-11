"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { Session } from "@/lib/types";

export default async function addOrResetPassword(
  password: string,
  subject: string,
  limit: number
) {
  try {
    const cookie = await cookies();
    const url = `${process.env.API_ROUTE}/user/security/add-or-reset-password`;
    const encryptedSession = cookie.get(`${process.env.SESSION}`)?.value;
    if (!encryptedSession) return redirect("/login?redirect=Login required!");

    const session = jwt.verify(
      encryptedSession,
      `${process.env.SESSION_SECRET}`
    ) as Session;
    if (!session) return redirect("/login?redirect=Login required!");

    const userAgent = (await headers()).get("user-agent");
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `${userAgent}`,
        Origin: "http://localhost:3000"
      },
      body: JSON.stringify({ password, subject, limit })
    });
    if (!response.ok) return false;

    return true;
  } catch (_) {
    return false;
  }
}
