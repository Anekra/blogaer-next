"use server";

import { cookies } from "next/headers";

export async function getGoogleOauthCode(
	state: string,
	requestUrl: string | null
) {
	const googleUrl = new URL("https://accounts.google.com/o/oauth2/auth");

	const params = {
		scope:
			"https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
		client_id: `${process.env.GOOGLE_OAUTH2_ID}`,
		redirect_uri: "http://localhost:3000/api/auth/callback/google",
		access_type: "offline",
		response_type: "code",
		state: state
	};

	Object.entries(params).forEach(([key, value]) => {
		googleUrl.searchParams.set(key, value);
	});

	const cookie = await cookies();
	cookie.set("csrf_state", state, {
		httpOnly: true,
		secure: true,
		sameSite: "lax",
		maxAge: 300
	});

	if (requestUrl) {
		cookie.set("redirect_url", requestUrl, {
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === "production",
			maxAge: 180
		});
	}

	return googleUrl.toString();
}
