"use client";
import logout from "@/lib/actions/server/auth/logout";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger
} from "@/lib/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from "@/lib/components/ui/dropdown-menu";
import ThemeSwitch from "@/lib/components/widgets/ThemeSwitch";
import { useSession } from "@/lib/contexts/SessionContext";
import { TempInfo, TempKey } from "@/lib/utils/enums";
import { ChevronDown, LogOutIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Link } from "next-view-transitions";

export default function ProfileDropdown() {
	const { session, setSession } = useSession();
	const { setTheme, resolvedTheme } = useTheme();
	const router = useRouter();
	const handleLogout = async () => {
		setSession(null);
		localStorage.setItem(
			TempKey.ToastMsg,
			JSON.stringify({
				type: TempKey.LogoutSuccessToastMsg,
				msg: TempInfo.LogoutSuccess
			})
		);
		await logout();
		router.replace("/");
	};

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger className="flex items-center outline-none [&[data-state=open]>:last-child]:rotate-180">
					{session?.img ? (
						<div className="relative size-10 overflow-hidden rounded-full border-[3.5px] border-primary-foreground">
							<Image
								src={session.img}
								alt="Profile"
								sizes="(max-width: 34px) 34px"
								className="object-cover"
								fill
							/>
						</div>
					) : (
						<span className="relative flex size-[34px] items-end justify-center overflow-hidden rounded-3xl text-primary-foreground shadow-[inset_0_0_0_3.5px_oklch(var(--primary-foreground))]">
							<UserIcon className="-bottom-px absolute h-[30px] w-auto fill-current" />
						</span>
					)}
					<ChevronDown className="size-4 shrink-0 text-primary-foreground transition-transform duration-200" />
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="w-[200px] bg-neutral-500 p-0"
				>
					<DropdownMenuLabel className="truncate-1 wrap-break-word rounded-sm opacity-50">
						<b>{session?.name || session?.username}</b>
					</DropdownMenuLabel>
					<DropdownMenuGroup className="hover:& &>*:h-9 bg-background >*:text-base-background hover:&>*:bg-foreground!">
						<DropdownMenuItem>
							<Link href="/home" className="w-full">
								Home
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/settings/account" className="w-full">
								Settings
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							className="relative flex w-full cursor-pointer items-center justify-between [&>*:nth-child(2)]:absolute [&>*:nth-child(2)]:right-1 [&>*:nth-child(2)]:h-5 [&>*:nth-child(2)]:hover:bg-background"
							onClick={(e) => {
								e.stopPropagation();
								setTheme(resolvedTheme === "light" ? "dark" : "light");
							}}
						>
							<span>Theme</span>
							<ThemeSwitch
								width="w-11"
								padding="p-0"
								transform="translate-x-[120%]"
								setTheme={setTheme}
								resolvedTheme={resolvedTheme}
							/>
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator className="m-0" />
					<DropdownMenuGroup className="bg-background">
						<DropdownMenuItem className="w-full p-0 outline-none hover:bg-foreground hover:text-base-background">
							<DialogTrigger className="flex h-9 w-full items-center justify-between rounded px-2 transition-none">
								Log out
								<LogOutIcon className="text-xl" />
							</DialogTrigger>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<DialogContent>
				<DialogTitle>Confirm logout</DialogTitle>
				<DialogDescription>You sure want to logout?</DialogDescription>
				<form
					action={handleLogout}
					className="mt-6 flex justify-between gap-4 *:basis-full"
				>
					<DialogClose type="button" className="btn-outline-base-rounder">
						CANCEL
					</DialogClose>
					<DialogClose
						onClick={(e) => e.stopPropagation()}
						className="btn-solid-p-rounder"
						type="submit"
					>
						LOGOUT
					</DialogClose>
				</form>
			</DialogContent>
		</Dialog>
	);
}
