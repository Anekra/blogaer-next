import PasswordForm from "@/lib/components/forms/requests/PasswordForm";
import { EmailSubject } from "@/lib/utils/enums";

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center justify-self-center bg-primary bg-[url('https://i.imgur.com/x5V8Wfe.png')]">
      <div className="glass-form flex w-[400px] flex-col gap-3 px-10 py-6">
        <div className="w-full py-2">
          <h1 className="text-center text-2xl font-bold">Reset Password</h1>
        </div>
        <PasswordForm subject={EmailSubject.ResetPassword} />
      </div>
    </main>
  );
}
