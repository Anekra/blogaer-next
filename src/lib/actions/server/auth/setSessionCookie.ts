"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { Auth } from "@/lib/types";

export default async function setSessionCookie(
  userData: Auth,
  shouldSetCSRF: boolean = false
) {
  if (!userData) return;
  const cookie = await cookies();
  const isSecure = process.env.NODE_ENV === "production";

  if (shouldSetCSRF) {
    const csrfOptions: object = {
      httpOnly: false,
      secure: isSecure,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60
    };
    cookie.set(`${process.env.CSRF}`, userData.csrf, csrfOptions);
  }

  const sessionSecret = `${process.env.SESSION_SECRET}`;
  const encryptedSession = jwt.sign(userData, sessionSecret);
  const sessionOptions: object = {
    httpOnly: true,
    sameSite: "strict",
    secure: isSecure,
    maxAge: 1 * 10 * 60
  };
  cookie.set(`${process.env.SESSION}`, encryptedSession, sessionOptions);
}
