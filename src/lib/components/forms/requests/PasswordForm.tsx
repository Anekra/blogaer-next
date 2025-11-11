"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import addOrResetPassword from "@/lib/actions/server/security/addOrResetPassword";
import FormIndicator from "@/lib/components/forms/FormIndicator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/lib/components/ui/form";
import { Input } from "@/lib/components/ui/input";
import { PasswordFormSchema } from "@/lib/types/zodSchemas";
import { EmailSubject } from "@/lib/utils/enums";

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function PasswordForm({ subject }: { subject: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const searchParams = useSearchParams();
  const limit = Number(searchParams.get("limit"));
  const isAddPassword = subject === EmailSubject.AddPassword;
  const form = useForm<z.infer<typeof PasswordFormSchema>>({
    resolver: zodResolver(PasswordFormSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: ""
    }
  });
  const handleSubmit = async (values: FormValues) => {
    const res = await addOrResetPassword(values.password, subject, limit);
    if (res) {
      toast.success("Description updated successfully.", {
        position: "bottom-right",
        duration: 1500
      });
    } else {
      toast.error("Server error, please try again later.", {
        position: "bottom-right",
        duration: 1500
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        method="POST"
        className="flex flex-col"
        onSubmit={form.handleSubmit(async (values) => handleSubmit(values))}
        noValidate
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem
              className={`${fieldState.error ? "mb-2" : "mb-4"} flex flex-col`}
            >
              <div className="mb-2 flex items-center justify-between">
                <FormLabel>
                  {isAddPassword ? "New Password" : "Password"}
                </FormLabel>
                <FormIndicator
                  fieldError={fieldState.error}
                  value={field.value}
                  formType="add-or-reset-password"
                />
              </div>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    placeholder="Enter your password"
                    type={`${isVisible ? "text" : "password"}`}
                    className={`${
                      fieldState.error
                        ? "mb-1 border border-red-500 focus:border-none focus-visible:ring-red-500"
                        : "focus-visible:ring-ring"
                    }`}
                    {...field}
                  />
                  {isVisible ? (
                    <button
                      className="absolute right-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsVisible(!isVisible);
                      }}
                    >
                      <EyeIcon />
                    </button>
                  ) : (
                    <button
                      className="absolute right-2"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsVisible(!isVisible);
                      }}
                    >
                      <EyeOffIcon />
                    </button>
                  )}
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
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <FormLabel>Confirm Password</FormLabel>
                <FormIndicator
                  fieldError={fieldState.error}
                  value={field.value}
                  formType="add-or-reset-password"
                />
              </div>
              <FormControl>
                <div className="relative flex items-center">
                  <Input
                    placeholder="Confirm new password"
                    type={`${isVisible2 ? "text" : "password"}`}
                    className={`${
                      fieldState.error
                        ? "mb-1 border border-red-500 focus:border-none focus-visible:ring-red-500"
                        : "focus-visible:ring-ring"
                    }`}
                    {...field}
                  />
                  {isVisible2 ? (
                    <button
                      className="absolute right-2"
                      onClick={() => setIsVisible2(!isVisible2)}
                    >
                      <EyeIcon />
                    </button>
                  ) : (
                    <button
                      className="absolute right-2"
                      onClick={() => setIsVisible2(!isVisible2)}
                    >
                      <EyeOffIcon />
                    </button>
                  )}
                </div>
              </FormControl>
              <FormMessage className="w-fit rounded bg-background/60 p-1">
                {fieldState.error?.message}
              </FormMessage>
            </FormItem>
          )}
        />
        <button type="submit" className="btn-solid-p my-6">
          {isAddPassword ? "Add Password" : "Reset Password"}
        </button>
      </form>
    </FormProvider>
  );
}
