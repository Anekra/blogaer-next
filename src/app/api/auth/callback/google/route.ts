import { NextRequest, NextResponse } from "next/server";

import setSessionCookie from "@/lib/actions/server/auth/setSessionCookie";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");
  const redirectUrl = searchParams.get("request_url");

  const code = searchParams.get("code");
  if (!code && state) {
    const searchParams = [
      {
        param: "scope",
        value:
          "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
      },
      { param: "client_id", value: `${process.env.GOOGLE_OAUTH2_ID}` },
      {
        param: "redirect_uri",
        value: "http://localhost:3000/api/auth/callback/google"
      },
      { param: "access_type", value: "offline" },
      { param: "response_type", value: "code" },
      { param: "state", value: state }
    ];
    const googleUrl = new URL("https://accounts.google.com/o/oauth2/auth");
    searchParams.forEach(({ param, value }) => {
      googleUrl.searchParams.set(param, value);
    });

    const googleRedirectRes = NextResponse.json(
      { status: "Redirect", url: googleUrl },
      { status: 302 }
    );
    if (redirectUrl) {
      googleRedirectRes.cookies.set("redirectUrl", `${redirectUrl}`, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 1 * 3 * 60
      });
    }

    return googleRedirectRes;
  }

  const errUrl = new URL("/login", request.nextUrl);
  const errRedirect = NextResponse.redirect(errUrl, 308);
  if (!state) {
    return errRedirect;
  }

  try {
    const userAgent = request.headers.get("user-agent");
    const res = await fetch(`${process.env.API_ROUTE}/auth/google`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Oauth2 ${code}`,
        "Content-Type": "application/json",
        "User-Agent": `${userAgent}`,
        Origin: "http://localhost:3000"
      }
    });
    const resJson = await res.json();

    console.log("res.status >>", res.status);

    const redirectCookie = request.cookies.get("redirectUrl")?.value;
    if (!res.ok) {
      if (redirectCookie) errRedirect.cookies.delete("redirectUrl");
      const searchParams = [
        { param: "redirect", value: "Oauth login failed." },
        { param: "error", value: resJson.error }
      ];
      searchParams.forEach(({ param, value }) => {
        errUrl.searchParams.set(param, value);
      });

      return errRedirect;
    }

    const url = new URL(redirectCookie || "/home", request.nextUrl);
    const nextRes = NextResponse.redirect(url, 308);
    nextRes.cookies.delete("redirectUrl");

    await setSessionCookie(resJson);

    return nextRes;
  } catch (error) {
    const searchParams = [
      { param: "redirect", value: "Oauth login failed." },
      {
        param: "error",
        value: error instanceof Error ? error.message : "Internal server error."
      }
    ];

    errUrl.pathname = "/login";
    searchParams.forEach(({ param, value }) => {
      errUrl.searchParams.set(param, value);
    });

    return errRedirect;
  }
}
