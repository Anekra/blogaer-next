import { Link } from "next-view-transitions";

import BackBtn from "@/lib/components/buttons/BackBtn";
import GoogleLoginBtn from "@/lib/components/buttons/GoogleLoginBtn";
import RegisterForm from "@/lib/components/forms/RegisterForm";
import LogoIcon from "@/lib/components/icons/LogoIcon";
import GithubLoginBtn from "@/lib/components/buttons/GithubLoginBtn";

export default function RegisterPage() {
  return (
    <main className="radial-background relative flex min-h-screen items-center justify-center py-6">
      <BackBtn className="absolute top-0 left-0 m-6" />
      <div className="bg-background/20 absolute z-0 flex size-[250px] items-center justify-center rounded-full blur-sm">
        <LogoIcon className="text-primary-foreground h-[150px] w-[180px] brightness-75" />
      </div>
      <div className="glass-form z-[1] flex w-[400px] flex-col gap-3 px-10 py-6">
        <div className="w-full">
          <h1 className="text-center text-2xl font-bold">WELCOME</h1>
        </div>
        <RegisterForm />
        <div className="flex flex-col gap-4">
          <div className="mt-2 flex items-center">
            <hr className="from-foreground h-1 w-full border-none bg-gradient-to-l" />
            <p className="w-fit shrink-0 px-2 text-center text-sm">
              Or login with
            </p>
            <hr className="from-foreground h-1 w-full border-none bg-gradient-to-r" />
          </div>
          <div className="flex justify-center gap-6 p-4">
            <GoogleLoginBtn />
            <GithubLoginBtn />
          </div>
          <div className="flex justify-center gap-1">
            <p>Already have an account?</p>
            <Link href="/login" className="link-p">
              Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
