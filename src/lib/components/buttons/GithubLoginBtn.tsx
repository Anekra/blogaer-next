"use client";
import GithubIcon from "@/lib/components/icons/GithubIcon";
import { useLoading } from "@/lib/contexts/LoadingContext";
import { newUrl } from "@/lib/utils/helper";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function GithubLoginBtn() {
	const { isLoading, setLoading } = useLoading();
	const router = useRouter();
	const redirectUrl = useSearchParams().get("request_url");
	const handleGithubLogin = async () => {
		const state = crypto.randomUUID();
		localStorage.setItem("CSRFToken", state);
		const searchParams = redirectUrl
			? [
					{ param: "state", value: state },
					{ param: "request_url", value: redirectUrl },
				]
			: [{ param: "state", value: state }];
		const url = newUrl("/api/auth/callback/github", searchParams);
		setLoading(true);
		const res = await fetch(url);
		const resJson = await res.json();
		const params = new URLSearchParams(resJson.url);
		const paramState = params.get("state");
		const localState = localStorage.getItem("CSRFToken");

		if (res.status === 302 && paramState === localState) {
			router.replace(resJson.url);
		} else {
			setLoading(false);
			toast.error("Request denied, CSRF detected!", {
				position: "bottom-right",
				duration: 2000,
			});
		}
	};

	return (
		<button
			onMouseUp={handleGithubLogin}
			className="text-4xl text-primary-foreground hover:brightness-125"
			type="button"
			disabled={isLoading}
		>
			<GithubIcon />
		</button>
	);
}
