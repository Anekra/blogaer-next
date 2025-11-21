"use client";
import getClientFetch from "@/lib/actions/client/getClientFetch";
import postClientFetch from "@/lib/actions/client/postClientFetch";
import userPatch from "@/lib/actions/server/userPatch";
import FormIndicator from "@/lib/components/forms/FormIndicator";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/lib/components/ui/form";
import { Input } from "@/lib/components/ui/input";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from "@/lib/components/ui/input-otp";
import { useLoading } from "@/lib/contexts/LoadingContext";
import { useSession } from "@/lib/contexts/SessionContext";
import type { GetOtpTimeDto } from "@/lib/types/dto/ResDto";
import { UpdateEmailFormSchema } from "@/lib/types/zodSchemas";
import { VALIDATION } from "@/lib/utils/constants";
import { EmailSubject } from "@/lib/utils/enums";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRImmutable from "swr/immutable";
import type * as z from "zod";

type Email = {
	oldEmail: string;
	email: string;
	otp: string;
};

export default function EmailForm() {
	const { session } = useSession();
	const { isLoading, setLoading, setShowIcon, showIcon } = useLoading();
	const limit = useSearchParams().get("limit");
	const [timer, setTimer] = useState(0);
	const [otpTime, setOtpTime] = useState(0);
	const router = useRouter();
	const form = useForm<z.infer<typeof UpdateEmailFormSchema>>({
		resolver: zodResolver(UpdateEmailFormSchema),
		mode: "onChange",
		defaultValues: {
			oldEmail: "",
			email: "",
			otp: ""
		}
	});

	const { data: res } = useSWRImmutable<GetOtpTimeDto>(
		`/email/user/update-email/otp-time?request=${EmailSubject.UpdateEmail}&limit=${limit}`,
		getClientFetch
	);

	const handleOnMouseUp = async () => {
		const email = form.getValues().email;
		if (email) {
			setLoading(true);
			setShowIcon(false);
			const time = Date.now() + 5 * 60 * 1000;
			setOtpTime(time);
			const resOk = await postClientFetch("/email/user/update-email-otp", {
				email,
				request: EmailSubject.UpdateEmail,
				limit
			});

			if (resOk) {
				toast.info(`Email verification code was sent to ${email}.`, {
					position: "top-center",
					duration: 2000
				});
				setLoading(false);
			} else {
				toast.error(`Sending email failed please try again later!`, {
					position: "top-center",
					duration: 2000
				});
				setLoading(false);
			}
		}
	};
	const handleSubmit = async (objValue: Email) => {
		if (form.formState.isValid && limit) {
			setLoading(true);
			setShowIcon(true);
			const res = await userPatch(
				{ ...objValue, request: EmailSubject.UpdateEmail, limit },
				"/user/account/update-email"
			);
			if (res.message) {
				router.replace("/settings/account");
				toast.success("Email updated successfully.", {
					position: "bottom-right",
					duration: 2000
				});
				setLoading(false);
			} else {
				form.setError("email", {
					type: "custom",
					message: res.error
				});
				toast.error(res.error, { position: "bottom-right", duration: 2000 });
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		form.setValue("oldEmail", `${session?.email}`);
		if (res?.data?.time) setOtpTime(Number(res.data.time));
		if (form.formState.isSubmitting) setLoading(true);
		if (otpTime > 0) {
			const countdown = setInterval(() => {
				const now = Date.now();
				let remainingTime = Number(otpTime) - now;
				if (remainingTime <= 0) {
					remainingTime = 0;
					clearInterval(countdown);
				}
				setTimer(remainingTime);
			}, 1000);
		}
	}, [form, session, res, setLoading, otpTime]);

	const displayTimer = (time: number) => {
		const seconds = Math.floor((time / 1000) % 60);
		const minutes = Math.floor((time / (1000 * 60)) % 60);

		return (
			<div className="flex flex-col items-center text-yellow-500">
				<p className="text-sm">Request again in:</p>
				<p className="text-xl">
					{minutes < 10 ? `0${minutes}` : minutes}:
					{seconds < 10 ? `0${seconds}` : seconds}
				</p>
			</div>
		);
	};

	return (
		<FormProvider {...form}>
			<form
				method="POST"
				className="relative flex flex-col"
				onSubmit={form.handleSubmit(async (values) => handleSubmit(values))}
				noValidate
			>
				<FormField
					control={form.control}
					name="oldEmail"
					render={({ field, fieldState }) => (
						<FormItem
							className={`${fieldState.error ? "mb-2" : "mb-4"} flex w-[318px] flex-col`}
						>
							<FormLabel className="mb-2 text-muted-foreground">
								Current email
							</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder={session?.email}
									className=""
									disabled
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="email"
					render={({ field, fieldState }) => (
						<FormItem
							className={`${fieldState.error ? "mb-2" : "mb-4"} flex flex-col`}
						>
							<div className="mb-2 flex w-[318px] items-center justify-between">
								<FormLabel>New email</FormLabel>
								<FormIndicator
									fieldError={fieldState.error}
									value={field.value}
									formType="update-email"
								/>
							</div>
							<FormControl>
								<div>
									<Input
										type="text"
										placeholder="Enter your new email"
										className={`${
											fieldState.error
												? "mb-1 border-red-500 enabled:focus-visible:ring-red-500"
												: "focus-visible:ring-ring"
										} w-[318px]`}
										{...field}
									/>
									<div className="absolute top-0 right-0 flex w-[136px] flex-col items-center gap-3.5">
										<div className="flex">
											<p>*</p>
											<p className="ps-1 pt-1 text-justify text-sm">
												Click the &quot;Get code&quot; button below to get a
												verification code. The code will be sent to your new
												email address, so make sure your new email address is
												correct.
											</p>
										</div>
										{!isLoading &&
											(form.formState.isSubmitSuccessful ? (
												<p className="text-green-500">Success</p>
											) : timer === 0 ? (
												<button
													type="button"
													className="btn-outline-base disabled:tooltip text-nowrap disabled:cursor-not-allowed"
													data-tooltip-text="New email is invalid!"
													disabled={
														form.getFieldState("email").invalid ||
														!form.getValues().email
													}
													onMouseUp={handleOnMouseUp}
												>
													Get Code
												</button>
											) : (
												displayTimer(timer)
											))}
										{isLoading && !showIcon && (
											<Loader2Icon className="animate-spin" />
										)}
									</div>
								</div>
							</FormControl>
							<FormMessage className="w-fit rounded bg-background/60 p-1">
								{fieldState.error?.message}
							</FormMessage>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="otp"
					render={({ field, fieldState }) => (
						<FormItem className="w-[318px]">
							<FormLabel htmlFor="otp">
								Confirm email verification code
							</FormLabel>
							<FormControl>
								<InputOTP
									type="text"
									inputMode="numeric"
									maxLength={6}
									{...field}
								>
									<InputOTPGroup className="rounded-lg border border-foreground bg-background p-2 *:size-10 *:text-4xl">
										<InputOTPSlot index={0} caretClassName="h-8" />
										<InputOTPSlot index={1} caretClassName="h-8" />
										<InputOTPSlot index={2} caretClassName="h-8" />
										<InputOTPSlot index={3} caretClassName="h-8" />
										<InputOTPSlot index={4} caretClassName="h-8" />
										<InputOTPSlot index={5} caretClassName="h-8" />
									</InputOTPGroup>
								</InputOTP>
							</FormControl>
							<FormMessage className="w-fit rounded bg-background/60 p-1">
								{fieldState.error?.message}
							</FormMessage>
						</FormItem>
					)}
				/>
				<button
					type="submit"
					className={`${form.formState.isSubmitting ? "cursor-progress" : "cursor-pointer"} btn-solid-p disabled:tooltip my-6 w-[318px]`}
					data-tooltip-text={
						form.getValues().email === ""
							? VALIDATION.EMAIL_EMPTY
							: form.getValues().otp === ""
								? VALIDATION.OTP_EMPTY
								: form.formState.errors.email?.message ||
									form.formState.errors.otp?.message
					}
					disabled={!form.formState.isValid || form.formState.isSubmitting}
				>
					Update email
				</button>
			</form>
		</FormProvider>
	);
}
