import { RedirectParam } from "@/lib/utils/enums";
import { newUrl } from "@/lib/utils/helper";
import { type NextRequest, NextResponse } from "next/server";

export async function requestForm(
	req: NextRequest,
	authorizedData: string[]
) {
	const currentPath = req.nextUrl.pathname;
	const [clientId, csrf] = authorizedData;
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
		const userAgent = req.headers.get("user-agent");
		const checkUsernameRes = await fetch(
			`${process.env.NEXT_PUBLIC_API_ROUTE}/auth/check-username`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"User-Agent": `${userAgent}`,
					"X-Authorization": `Bearer ${clientId}`,
					"X-Semi-CSRF": csrf,
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
