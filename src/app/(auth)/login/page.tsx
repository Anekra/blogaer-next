import BackBtn from "@/lib/components/buttons/BackBtn";
import SavedAccountCardsHolder from "@/lib/components/cards/holders/SavedAccountCardsHolder";
import LogoIcon from "@/lib/components/icons/LogoIcon";
import { Link } from "next-view-transitions";

export default async function LoginPage() {
	return (
		<main className="radial-background relative flex min-h-screen items-center justify-center py-6">
			<BackBtn className="absolute top-0 left-0 m-6" />
			<div className="absolute z-0 flex size-[250px] items-center justify-center rounded-full bg-background/20 blur-sm">
				<LogoIcon className="h-[150px] w-[180px] text-primary-foreground brightness-75" />
			</div>
			<div className="glass-form z-1 flex w-[400px] flex-col gap-3 px-10 py-6">
				<div className="w-full py-2">
					<h1 className="text-center font-bold text-2xl">WELCOME BACK</h1>
				</div>
				<SavedAccountCardsHolder />
				<div className="flex justify-center gap-1 px-4">
					<p>Need an account? </p>
					<Link href="/register" className="link-p">
						Register
					</Link>
				</div>
			</div>
		</main>
	);
}
