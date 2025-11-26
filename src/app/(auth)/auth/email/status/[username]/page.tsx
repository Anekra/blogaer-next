import EmailVerifiedForm from "@/lib/components/forms/requests/EmailVerifiedForm";
import Image from "next/image";

export default function EmailStatusPage() {
	return (
		<main className="flex min-h-screen items-center justify-center py-6">
			<div className="glass-form flex w-[500px] flex-col justify-center gap-5 px-10 py-6">
				<Image
					src="https://i.imgur.com/oQdldOj.png"
					alt="Email verification"
					loading="eager"
					width={240}
					height={120}
					className="h-auto w-auto self-center"
				/>
				<h1 className="font-bold text-lg">Your email has been verified!</h1>
				<p>
					Now before you continue to use this website please set a display name
					for your account since the you might want to change the default
					display name set by the system.
				</p>
				<EmailVerifiedForm />
				<p className="text-muted-foreground text-sm">
					*If the field is left blank the display name will be set by the system
					by default, you can always change it later in your account settings.
				</p>
			</div>
		</main>
	);
}
