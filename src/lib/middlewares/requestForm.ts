import { RedirectParam } from "@/lib/utils/enums";
import { newUrl } from "@/lib/utils/helper";
import { type NextRequest, NextResponse } from "next/server";

export async function requestForm(req: NextRequest) {
	const clientId = req.headers.get("x-auth-client-id");
	if (!clientId) {
		const searchParams = [
			{ param: "redirect", value: "Login required." },
			{ param: "request_url", value: `${req.nextUrl.pathname}` }
		];
		const url = newUrl("/login", searchParams);
		return NextResponse.redirect(url, 301);
	}

	const currentPath = req.nextUrl.pathname;
	const path = currentPath.includes("update")
		? "/settings/account"
		: "/settings/security";
	const timeLimit = Number(req.nextUrl.searchParams.get("limit"));
	const now = Date.now();
	const isExpired = now > timeLimit;
	if (isExpired) {
		const searchParams = [
			{ param: "redirect", value: RedirectParam.RequestExpired }
		];
		const url = newUrl(path, searchParams);
		return NextResponse.redirect(url, 301);
	}

	const urlUsername = req.nextUrl.searchParams.get("username");
	try {
		const checkUsernameRes = await fetch(
			`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/check-username`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-Authorization": clientId,
					Origin: "http://localhost:3000"
				}
			}
		);
		const resJson = await checkUsernameRes.json();
		if (urlUsername !== resJson.data.username) {
			const searchParams = [
				{ param: "redirect", value: "Logged in user doesn't match!" }
			];
			const url = newUrl("/security", searchParams);
			return NextResponse.redirect(url, 301);
		}
	} catch (_) {
		const searchParams = [
			{ param: "redirect", value: "Internal server error." }
		];
		const url = newUrl("/security", searchParams);
		return NextResponse.redirect(url, 301);
	}
}
