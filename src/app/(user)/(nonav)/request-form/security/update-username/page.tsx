import UsernameForm from "@/lib/components/forms/requests/UsernameForm";

export default function ChangeUsernamePage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center justify-self-center bg-primary bg-[url('https://i.imgur.com/x5V8Wfe.png')]">
      <div className="glass-form flex w-[400px] flex-col gap-3 px-10 py-6">
        <div className="w-full py-2">
          <h1 className="text-center text-2xl font-bold">Change Username</h1>
        </div>
        <UsernameForm />
      </div>
    </main>
  );
}
