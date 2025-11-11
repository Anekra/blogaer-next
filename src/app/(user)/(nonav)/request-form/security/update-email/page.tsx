import React from "react";

import EmailForm from "@/lib/components/forms/requests/EmailForm";

export default function ChangeEmailPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center justify-self-center bg-primary bg-[url('https://i.imgur.com/x5V8Wfe.png')]">
      <div className="glass-form flex w-[518px] flex-col gap-3 p-6">
        <div className="w-full py-2">
          <h1 className="text-center text-2xl font-bold">Change Email</h1>
        </div>
        <EmailForm />
      </div>
    </main>
  );
}
