import checkTwoFA from "@/lib/actions/server/auth/checkTwoFA";
import AuthAppVerifyDialog from "@/lib/components/dialogs/auth-app/AuthAppVerifyDialog";
import SavedAccountDropdown from "@/lib/components/dropdowns/SavedAccountDropdown";
import type { SavedAccountsDto } from "@/lib/types/dto/CommonDto";
import { ErrorMsg } from "@/lib/utils/enums";
import { verifyPasskeyLogin } from "@/lib/utils/helper";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SavedAccountCard({
	index,
	account: { username, email, img },
	savedAccounts,
	setSavedAccounts
}: {
	index: number;
	account: SavedAccountsDto;
	savedAccounts: SavedAccountsDto[];
	setSavedAccounts: React.Dispatch<
		React.SetStateAction<SavedAccountsDto[] | null>
	>;
}) {
	const [opened, setOpened] = useState(false);
	const router = useRouter();
	const redirectUrl = useSearchParams().get("request_url");
	const handleOnClick = async () => {
		const resCheck = await checkTwoFA(username);
		if (resCheck?.data?.method === "app") {
			setOpened(true);
		} else {
			const resLogin = await verifyPasskeyLogin(username);
			const isResLoginBoolean = typeof resLogin === "boolean";
			if (isResLoginBoolean && resLogin) {
				router.replace(redirectUrl || "/home");
			} else {
				const errMsg =
					!isResLoginBoolean && "error" in resLogin
						? resLogin?.error
						: ErrorMsg.FetchFailedError;
				if (errMsg === ErrorMsg.CanceledByUser) {
					toast(errMsg, {
						position: "bottom-right",
						duration: 2000
					});
				} else {
					toast.error(errMsg, {
						position: "bottom-right",
						duration: 2000
					});
				}
			}
		}
	};

	return (
		<div className="neu-base-md relative flex items-center justify-center gap-2 rounded-xl bg-background/80 px-3 py-2">
			<button
				type="button"
				className="absolute z-2 size-full"
				onClick={handleOnClick}
			/>
			{img ? (
				<div className="relative size-11 overflow-hidden rounded-full border-[3.5px] border-primary-foreground">
					<Image
						src={img}
						alt="Profile"
						sizes="(max-width: 40px) 40px"
						className="object-cover"
						fill
					/>
				</div>
			) : (
				<span className="relative flex size-11 items-end justify-center overflow-hidden rounded-3xl text-primary-foreground shadow-[inset_0_0_0_3.5px_oklch(var(--primary-foreground))]">
					<UserIcon className="-bottom-px absolute h-10 w-auto fill-current" />
				</span>
			)}
			<div className="flex grow items-center justify-between gap-6">
				<div className="flex flex-col">
					<p className="font-bold text-lg">{username || "null"}</p>
					<p className="text-sm">{email || "null"}</p>
				</div>
				<SavedAccountDropdown
					index={index}
					username={username}
					savedAccounts={savedAccounts}
					setSavedAccounts={setSavedAccounts}
				/>
			</div>
			<AuthAppVerifyDialog
				username={username}
				openState={[opened, setOpened]}
			/>
		</div>
	);
}
