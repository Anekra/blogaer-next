import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/lib/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot
} from "@/lib/components/ui/input-otp";
import { Loader2Icon } from "lucide-react";

const FormSchema = z.object({
  token: z.string().min(6, {
    message: "Your token must be 6 characters."
  })
});

export default function AuthAppInputForm({
  isLoading,
  isResOk,
  verifyToken
}: {
  isLoading: boolean;
  isResOk: boolean | null;
  verifyToken: (token: string) => Promise<void>;
}) {
  const [reset, setReset] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { token: "" }
  });
  const handleSubmit = (values: z.infer<typeof FormSchema>) => {
    if (!isResOk) setReset(false);
    verifyToken(values.token);
  };
  const handleTokenChange = (value: string) => {
    if (!/^\d+$/.test(value) && value) return;
    form.setValue("token", value);
    if (!isResOk && value.length < 6) setReset(true);
    if (isResOk === null && value.length === 6) verifyToken(value);
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            {!isResOk && (
              <React.Fragment>
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="token">
                        Enter the token in your authenticator app here
                      </FormLabel>
                      <FormControl>
                        <InputOTP
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          {...field}
                          id="token"
                          className="group"
                          onChange={handleTokenChange}
                        >
                          <InputOTPGroup className="border-border rounded-lg border p-2">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                    </FormItem>
                  )}
                />
                {isResOk === false && (
                  <div className="flex flex-col">
                    {!reset && (
                      <p className="text-destructive-foreground self-end">
                        Incorrect token!
                      </p>
                    )}
                    <button type="submit" className="btn-solid-p mt-4">
                      Verify
                    </button>
                  </div>
                )}
              </React.Fragment>
            )}
          </form>
        </Form>
      )}
    </React.Fragment>
  );
}
