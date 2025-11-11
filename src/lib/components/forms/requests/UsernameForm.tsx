"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

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
import { useLoading } from "@/lib/contexts/LoadingContext";
import { useSession } from "@/lib/contexts/SessionContext";
import { UpdateUsernameFormSchema } from "@/lib/types/zodSchemas";
import { EmailSubject } from "@/lib/utils/enums";

type Username = {
  oldUsername: string;
  username: string;
};

export default function UsernameForm() {
  const { session } = useSession();
  const { setLoading } = useLoading();
  const router = useRouter();
  const limit = useSearchParams().get("limit");
  const form = useForm<z.infer<typeof UpdateUsernameFormSchema>>({
    resolver: zodResolver(UpdateUsernameFormSchema),
    mode: "onChange",
    defaultValues: {
      oldUsername: "",
      username: ""
    }
  });
  const handleSubmit = async (objValue: Username) => {
    if (form.formState.isValid && limit) {
      setLoading(true);
      const res = await userPatch(
        session,
        { ...objValue, request: EmailSubject.UpdateUsername, limit },
        "/user/account/update-username"
      );
      if (res.session) {
        localStorage.setItem(`${process.env.NEXT_PUBLIC_SESSION}`, res.session);
        router.replace("/settings/account");
        toast.success("Username updated successfully.", {
          position: "bottom-right",
          duration: 2000
        });
        window.location.reload();
        setLoading(false);
      } else {
        form.setError("username", {
          type: "custom",
          message: res.error
        });
        toast.error(res.error, { position: "bottom-right", duration: 2000 });
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    form.setValue("oldUsername", `${session?.username}`);
  }, [form, session]);

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
          name="oldUsername"
          render={({ fieldState }) => (
            <FormItem
              className={`${fieldState.error ? "mb-2" : "mb-4"} flex flex-col`}
            >
              <FormLabel className="mb-2 text-neutral-500">
                Current username
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  defaultValue={session?.username}
                  className="hover:ring-0"
                  disabled
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
          name="username"
          render={({ field, fieldState }) => (
            <FormItem
              className={`${fieldState.error ? "mb-2" : "mb-4"} flex flex-col`}
            >
              <div className="mb-2 flex items-center justify-between">
                <FormLabel>New username</FormLabel>
                <FormIndicator
                  fieldError={fieldState.error}
                  value={field.value}
                  formType="update-username"
                />
              </div>
              <FormControl>
                <Input
                  placeholder="username"
                  type="text"
                  className={`${
                    fieldState.error
                      ? "mb-1 border border-red-500 focus:border-none focus-visible:ring-red-500"
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
        <button
          type="submit"
          className={`${form.formState.isSubmitting ? "cursor-progress" : "cursor-pointer"} btn-solid-p disabled:tooltip my-6 w-[318px]`}
          data-tooltip-text={form.formState.errors.username?.message}
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Update username
        </button>
      </form>
    </FormProvider>
  );
}
