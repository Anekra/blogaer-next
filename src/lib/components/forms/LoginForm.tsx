"use client";

import checkTwoFA from "@/lib/actions/server/auth/checkTwoFA";
import login from "@/lib/actions/server/auth/login";
import FormIndicator from "@/lib/components/forms/FormIndicator";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/lib/components/ui/form";
import { Input } from "@/lib/components/ui/input";
import { useLoading } from "@/lib/contexts/LoadingContext";
import type { EncoreErrDto } from "@/lib/types/dto/CommonDto";
import { LoginFormSchema } from "@/lib/types/zodSchemas";
import { ErrorMsg, TempInfo, TempKey } from "@/lib/utils/enums";
import { verifyPasskeyLogin } from "@/lib/utils/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import type * as z from "zod";

type FormValues = {
	emailOrUsername: string;
	password: string;
};

export default function LoginForm() {
	const { setLoading } = useLoading();
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const redirectUrl = useSearchParams().get("request_url");
	const form = useForm<z.infer<typeof LoginFormSchema>>({
		resolver: zodResolver(LoginFormSchema),
		mode: "onChange",
		defaultValues: {
			emailOrUsername: "",
			password: ""
		}
	});
	const handleLogin = async (values: FormValues) => {
		setLoading(true);
		const isTwoFAResOk = await checkTwoFA(values.emailOrUsername);

		let res: boolean | EncoreErrDto;
		if (!isTwoFAResOk) {
			res = await login(values);
		} else {
			res = await verifyPasskeyLogin(values.emailOrUsername);
		}

		if (!res) {
			toast.error(ErrorMsg.FetchFailedError, {
				position: "bottom-right",
				duration: 1500
			});
		} else if (typeof res !== "boolean" && res) {
			if (!res?.code) {
				form.setError(
					res.message === "Unauthorized" ? "password" : "emailOrUsername",
					{
						type: "custom",
						message: res.message
					}
				);
			} else {
				toast.error(res.message, {
					position: "bottom-right",
					duration: 1500
				});
			}
		} else {
			sessionStorage.setItem(
				TempKey.ToastMsg,
				JSON.stringify({
					type: TempKey.LoginSuccessToastMsg,
					msg: TempInfo.LoginSuccess
				})
			);
			router.replace(redirectUrl || "/home");
		}
		setLoading(false);
	};

	return (
		<FormProvider {...form}>
			<form
				method="POST"
				className="flex flex-col gap-4"
				onSubmit={form.handleSubmit(async (values) => handleLogin(values))}
				noValidate
			>
				<FormField
					control={form.control}
					name="emailOrUsername"
					render={({ field, fieldState }) => (
						<FormItem className="flex flex-col">
							<div className="mb-2 flex items-center justify-between">
								<FormLabel>Email or username</FormLabel>
								<FormIndicator
									fieldError={fieldState.error}
									value={field.value}
									formType="login"
								/>
							</div>
							<FormControl>
								<Input
									placeholder="Enter your email or username"
									type="text"
									className={`${
										fieldState.error
											? "border border-red-500 hover:mb-0.5 focus:border-none focus-visible:mb-1 enabled:focus-visible:ring-red-500"
											: "focus-visible:ring-ring"
									}`}
									{...field}
								/>
							</FormControl>
							<FormMessage className="w-fit rounded bg-background/60 p-1">
								{fieldState.error?.message}
							</FormMessage>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field, fieldState }) => (
						<FormItem className="flex flex-col">
							<div className="mb-2 flex items-center justify-between">
								<FormLabel>Password</FormLabel>
								<FormIndicator
									fieldError={fieldState.error}
									value={field.value}
									formType="login"
								/>
							</div>
							<FormControl>
								<div className="relative flex items-center">
									<Input
										placeholder="Enter new password"
										type={showPassword ? "text" : "password"}
										className={`${
											fieldState.error
												? "border border-red-500 hover:mb-0.5 focus:border-none focus-visible:mb-1 enabled:focus-visible:ring-red-500"
												: "focus-visible:ring-ring"
										}`}
										{...field}
									/>
									<button
										type="button"
										className="absolute right-2 text-muted-foreground outline-none hover:text-foreground"
										onMouseUp={() => setShowPassword(!showPassword)}
									>
										{showPassword ? <EyeIcon /> : <EyeOffIcon />}
									</button>
								</div>
							</FormControl>
							<FormMessage className="w-fit rounded bg-background/60 p-1">
								{fieldState.error?.message}
							</FormMessage>
						</FormItem>
					)}
				/>
				<button type="submit" className="btn-solid-p mt-6">
					Login
				</button>
			</form>
		</FormProvider>
	);
}
