"use client";

import { getGoogleOauthCode as getGoogleOauthUrl } from "@/lib/actions/server/oauth/get-google-oauth-url";
import GoogleIcon from "@/lib/components/icons/GoogleIcon";
import { useLoading } from "@/lib/contexts/LoadingContext";
import { useSearchParams } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function GoogleLoginBtn() {
	const { isLoading, setLoading } = useLoading();
	const currentSearchParams = useSearchParams();
	const [errorParam, setErrorParam] = useState<string | null>(null);
	const redirectUrl = currentSearchParams.get("request_url");
	const handleGoogleLogin = async (e: React.MouseEvent) => {
		e.preventDefault();

		if (isLoading) return;
		setLoading(true);

		try {
			const state = crypto.randomUUID();
			const authUrlString = await getGoogleOauthUrl(state, redirectUrl);

			if (authUrlString) window.location.href = authUrlString;
		} catch (_) {
			setLoading(false);
			toast.error("Failed to initialize Google login");
		}
	};

	useEffect(() => {
		const searchParams = new URLSearchParams(currentSearchParams.toString());
		setErrorParam(searchParams.get("error"));
		if (errorParam) {
			toast.error(errorParam, {
				position: "bottom-right",
				duration: 2000
			});
			searchParams.delete("error");
			const searchParamsString = searchParams.toString();
			const currentPath = window.location.pathname;
			window.history.replaceState(
			null,
			"",
			searchParamsString ? `${currentPath}?${searchParamsString}` : currentPath
		);
		}
	}, [currentSearchParams, errorParam]);

	return (
		<button
			className="text-4xl text-primary-foreground hover:brightness-125"
			type="button"
			onClick={handleGoogleLogin}
			disabled={isLoading}
		>
			<GoogleIcon />
		</button>
	);
}
