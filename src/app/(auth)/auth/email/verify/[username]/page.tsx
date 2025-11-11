import HomeBtn from "@/lib/components/buttons/HomeBtn";
import ResendEmailDialog from "@/lib/components/dialogs/ResendEmailDialog";
import LogoIcon from "@/lib/components/icons/LogoIcon";
import { DialogTrigger } from "@/lib/components/ui/dialog";
import Image from "next/image";
import React from "react";

export default function EmailVerifyPage() {
  return (
    <main className="radial-background relative flex min-h-screen items-center justify-center py-6">
      <HomeBtn className="absolute top-0 left-0 m-6" />
      <div className="bg-background/20 absolute z-0 flex size-[250px] items-center justify-center rounded-full blur-sm">
        <LogoIcon className="text-primary-foreground h-[150px] w-[180px] brightness-75" />
      </div>
      <div className="glass-form z-[1] flex w-[500px] flex-col gap-3 p-6">
        <div className="h-[250px] w-[300px] self-center">
          <Image
            src="https://i.imgur.com/SYnWsMR.png"
            alt="Email verification"
            width={400}
            height={200}
          />
        </div>
        <div className="bg-background/40 flex w-full flex-col gap-4 rounded p-4">
          <h1 className="text-center text-2xl font-bold">Check your email</h1>
          <p>
            A verification email has been sent to your email address. Please
            check your inbox and follow the instructions to complete your
            registration process.
          </p>
        </div>
        <div className="flex gap-1 mt-4">
          <p className="text-muted-foreground">Didn't receive the email?</p>
          <ResendEmailDialog contents={["Resend Verification Email", "", "Resend"]}>
            <DialogTrigger className="text-primary-foreground underline">
              Resend it here.
            </DialogTrigger>
          </ResendEmailDialog>
        </div>
      </div>
    </main>
  );
}
