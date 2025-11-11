"use server";

import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken";
import { Session } from "@/lib/types";

export default async function logout() {
  const cookie = await cookies();
  const sessionCookie = `${process.env.SESSION}`;
  const encryptedSession = cookie.get(`${process.env.SESSION}`)?.value;
  if (!encryptedSession) {
    cookie.delete(sessionCookie);
    return;
  }
  const session = jwt.verify(
    encryptedSession,
    `${process.env.SESSION_SECRET}`
  ) as Session;
  if (!session) {
    cookie.delete(sessionCookie);
    return;
  }
  const url = `${process.env.API_ROUTE}/auth/logout`;
  const userAgent = (await headers()).get("user-agent");
  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": `${userAgent}`,
      Origin: "http://localhost:3000"
    }
  });
}
