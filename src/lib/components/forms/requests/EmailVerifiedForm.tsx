"use client";

import userPatch from "@/lib/actions/server/userPatch";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { EmailSubject, TempInfo, TempValue } from "@/lib/utils/enums";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useRef } from "react";
import { toast } from "sonner";

export default function EmailVerifiedForm() {
	const router = useRouter();
	const nameRef = useRef<HTMLInputElement>(null);
	const params = useSearchParams();
	const request = params.get("request");
	const verified = params.get("verified");
	const message = params.get("message");

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const name = nameRef.current?.value || "";
		const response = await userPatch({ name });
		if (response.message) {
			sessionStorage.setItem(TempValue.ToastMsg, TempInfo.LoginSuccess);
			router.replace("/home");
		} else {
			toast.error(response.error, {
				position: "bottom-right",
				duration: 1500
			});
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			sessionStorage.setItem(TempValue.ToastMsg, TempInfo.VerifyEmailSuccess);
			if (verified === "true") {
				toast.success(TempInfo.VerifyEmailSuccess, {
					position: "bottom-right",
					duration: 1500
				});
				sessionStorage.removeItem(TempValue.ToastMsg);
			}
		}
	}, [verified]);

	if (request !== EmailSubject.VerifyEmail) {
		router.replace("/");
	}

	if (!verified) {
		return <p>{message}</p>;
	}

	return (
		<form method="post" className="flex flex-col gap-6" onSubmit={handleSubmit}>
			<div>
				<Label className="mb-2 flex items-center justify-between text-sm">
					Display Name
				</Label>
				<Input
					ref={nameRef}
					type="text"
					name="name"
					placeholder="Your display name"
				/>
			</div>
			<button type="submit" className="btn-solid-p">
				Finish Account
			</button>
		</form>
	);
}
