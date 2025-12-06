"use client";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/lib/components/ui/dialog";
import { Input } from "@/lib/components/ui/input";
import { useSession } from "@/lib/contexts/SessionContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function VerifyEmailContent() {
	const { session } = useSession();
	const [isVerified, setIsVerified] = useState(false);

	useEffect(() => {
		if (session?.isVerified) setIsVerified(true);
	}, [session]);

	return !isVerified ? (
		<React.Fragment>
			<div className="h-[250px] w-[300px] self-center">
				<Image
					src="https://i.imgur.com/SYnWsMR.png"
					alt="Email verification"
					width={400}
					height={200}
				/>
			</div>
			<div className="flex w-full flex-col gap-4 rounded bg-background/40 p-4">
				<h1 className="text-center font-bold text-2xl">Check your email</h1>
				<p>
					A verification email has been sent to your email address. Please check
					your inbox and follow the instructions to complete your registration
					process.
				</p>
			</div>
			<div className="mt-4 flex gap-1">
				<p className="text-muted-foreground">Didn't receive the email?</p>
				<Dialog>
					<DialogTrigger className="text-primary-foreground underline">
						Resend it here.
					</DialogTrigger>
					<DialogContent className="w-[400px]">
						<DialogHeader>
							<DialogTitle>Resend Verification Email</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<form action="#" className="flex flex-col gap-4">
							<div>
								<label htmlFor="email">Email address</label>
								<Input id="email" type="email" placeholder="Enter your email" />
							</div>
							<button type="submit" className="btn-solid-p-rounder">
								Resend
							</button>
						</form>
					</DialogContent>
				</Dialog>
			</div>
		</React.Fragment>
	) : (
		<React.Fragment>
			<Image
				src="https://i.imgur.com/oQdldOj.png"
				alt="Email verification"
				loading="eager"
				width={240}
				height={120}
				className="h-auto w-auto self-center"
			/>
			<p className="self-center text-3xl">Your Email has been verified.</p>
		</React.Fragment>
	);
}
