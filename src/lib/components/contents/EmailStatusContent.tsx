"use client";

import EmailVerifiedForm from "@/lib/components/forms/requests/EmailVerifiedForm";
import { Toaster } from "@/lib/components/ui/sonner";
import { useSession } from "@/lib/contexts/SessionContext";
import { TempKey } from "@/lib/utils/enums";
import { newUrl } from "@/lib/utils/helper";
import { Loader2Icon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function EmailStatusContent() {
	const router = useRouter();
	const { session } = useSession();
	const params = useSearchParams();
	const verified = params.get("verified");
	const message = params.get("message");
	const currentPath = usePathname();
	const isVerified = verified === "true";
	const isEmailStatusPage = currentPath.startsWith("/auth/email/status/");
	const isEmailVerified = isVerified && isEmailStatusPage;

	useEffect(() => {
		if (typeof window !== "undefined" && isEmailVerified) {
			if (!session?.isVerified) {
				fetch("/api/auth/refresh", { method: "POST" })
					.then(() => window.location.reload())
					.catch(() => undefined);
			} else {
				const toastMsg = localStorage.getItem(TempKey.ToastMsg);
				if (toastMsg) {
					localStorage.removeItem(TempKey.ToastMsg);
					const toastData = JSON.parse(toastMsg);
					toast.success(toastData.msg, {
						position: "bottom-right",
						duration: 2000
					});
				}
				window.history.replaceState(null, "", currentPath);
			}
		}
	}, [isEmailVerified, session, currentPath]);

	if (session && !currentPath.includes(session.username)) {
		const searchParams = [
			{ param: "redirect", value: "Invalid logged in user." }
		];
		const url = newUrl("/", searchParams);
		router.replace(url.href);
	}

	if (verified === "false") return <p>{message}</p>;

	return session?.isVerified ? (
		<React.Fragment>
			<Image
				src="https://i.imgur.com/oQdldOj.png"
				alt="Email verification"
				loading="eager"
				width={240}
				height={120}
				className="h-auto w-auto self-center"
			/>
			<h1 className="font-bold text-lg">Your email has been verified!</h1>
			<p>
				Now before you continue to use this website please set a display name
				for your account since the you might want to change the default display
				name set by the system.
			</p>
			<EmailVerifiedForm />
			<p className="text-muted-foreground text-sm">
				*If the field is left blank the display name will be set by the system
				by default, you can always change it later in your account settings.
			</p>
			<Toaster closeButton richColors />
		</React.Fragment>
	) : (
		<Loader2Icon className="animate-spin self-center" size={70} />
	);
}
