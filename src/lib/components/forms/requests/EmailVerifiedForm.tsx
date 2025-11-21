"use client";

import { Input } from "@/lib/components/ui/input";
import Form from "next/form";
import { Label } from "../../ui/label";

export default function EmailVerifiedForm() {
	return (
		<Form action="" className="flex flex-col gap-6">
			<div>
				<Label className="mb-2 flex items-center justify-between text-sm">
					Display Name
				</Label>
				<Input placeholder="Your display name" />
			</div>
			<button type="submit" className="btn-solid-p">
				Finish Account
			</button>
		</Form>
	);
}
