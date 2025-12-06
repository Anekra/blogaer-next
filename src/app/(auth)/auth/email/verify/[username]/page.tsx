import HomeBtn from "@/lib/components/buttons/HomeBtn";
import VerifyEmailContent from "@/lib/components/contents/VerifyEmailContent";
import LogoIcon from "@/lib/components/icons/LogoIcon";

export default function VerifyEmailPage() {
	return (
		<main className="radial-background relative flex min-h-screen items-center justify-center py-6">
			<HomeBtn className="absolute top-0 left-0 m-6" />
			<div className="absolute z-0 flex size-[250px] items-center justify-center rounded-full bg-background/20 blur-sm">
				<LogoIcon className="h-[150px] w-[180px] text-primary-foreground brightness-75" />
			</div>
			<div className="glass-form z-1 flex w-[500px] flex-col gap-3 p-6">
				<VerifyEmailContent />
			</div>
		</main>
	);
}
