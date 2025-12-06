"use client";

import userPatch from "@/lib/actions/server/userPatch";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { TempInfo, TempKey } from "@/lib/utils/enums";
import { useRouter } from "next/navigation";
import { type FormEvent, useRef } from "react";
import { toast } from "sonner";

export default function EmailVerifiedForm() {
	const router = useRouter();
	const nameRef = useRef<HTMLInputElement>(null);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const name = nameRef.current?.value || "";
		const response = await userPatch({ name });
		if (response.message) {
			sessionStorage.setItem(
				TempKey.ToastMsg,
				JSON.stringify({
					type: TempKey.LoginSuccessToastMsg,
					msg: TempInfo.LoginSuccess
				})
			);
			router.replace("/home");
		} else {
			toast.error(response.error, {
				position: "bottom-right",
				duration: 1500
			});
		}
	};

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
