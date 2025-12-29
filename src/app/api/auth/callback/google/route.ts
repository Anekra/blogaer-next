import setSessionCookie from "@/lib/actions/server/auth/setSessionCookie";
import type { AuthDto } from "@/lib/types/dto/CommonDto";
import { getErrorStatus } from "@/lib/utils/helper";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const code = searchParams.get("code");
	const stateFromGoogle = searchParams.get("state");
	const cookies = request.cookies;
	const redirectCookie = cookies.get("redirect_url")?.value;
	const stateFromCookie = cookies.get("csrf_state")?.value;

	const errUrl = new URL("/login", request.url);
	const errRes = NextResponse.redirect(errUrl);
	if (stateFromCookie) errRes.cookies.delete("csrf_state");
	if (redirectCookie) errRes.cookies.delete("redirect_url");

	if (!stateFromGoogle || stateFromGoogle !== stateFromCookie) {
		errUrl.searchParams.set("error", "CSRF detected! Unauthorized request.");
		return errRes;
	}

	if (!code) {
		errUrl.searchParams.set("error", "Invalid oauth code!");
		return errRes;
	}

	try {
		const headers = request.headers;
		const userAgent = headers.get("user-agent") || "";
		const xff = headers.get("x-forwarded-for") || "";
		const res = await fetch(`${process.env.API_ROUTE}/auth/google`, {
			method: "GET",
			headers: {
				"x-Oauth-Code": `Oauth2 ${code}`,
				"Content-Type": "application/json",
				"User-Agent": userAgent,
				"X-Forwarded-For": xff,
				Origin: "http://localhost:3000"
			}
		});

		const resJson = await res.json();

		if (!res.ok) {
			errUrl.searchParams.set("error", getErrorStatus(resJson.code));
			return errRes;
		}

		const oauthData = resJson as AuthDto;
		await setSessionCookie(oauthData.data, true);

		const targetUrl = new URL(redirectCookie || "/home", request.url);
		const response = NextResponse.redirect(targetUrl);
		if (stateFromCookie) response.cookies.delete("csrf_state");
		if (redirectCookie) response.cookies.delete("redirect_url");

		return response;
	} catch (_) {
		errUrl.searchParams.set("error", "Internal Server Error");
		if (stateFromCookie) errRes.cookies.delete("csrf_state");
		if (redirectCookie) errRes.cookies.delete("redirect_url");

		return errRes;
	}
}
