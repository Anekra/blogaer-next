import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle
} from "@/lib/components/ui/dialog";
import { TempInfo } from "@/lib/utils/enums";
import {
	AlignRightIcon,
	MailCheckIcon,
	MailIcon,
	MailXIcon
} from "lucide-react";

export default function EmailStatusDialogContent({ info }: { info: string }) {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Email Status</DialogTitle>
				{!info ? (
					<div className="flex animate-slide-ltr justify-center">
						<div className="flex flex-col justify-center">
							<AlignRightIcon size={50} />
						</div>
						<MailIcon size={100} />
					</div>
				) : info === TempInfo.EmailSent ? (
					<div className="flex justify-center">
						<MailCheckIcon size={100} className="text-green-600" />
					</div>
				) : (
					<div className="flex justify-center">
						<MailXIcon size={100} className="text-red-600" />
					</div>
				)}
				<DialogDescription className={`${info ? "text-base" : "dots-loading"}`}>
					{info || "sending email"}
				</DialogDescription>
			</DialogHeader>
			<DialogClose className="btn-solid-base-rounder justify-self-center px-6">
				Close
			</DialogClose>
		</DialogContent>
	);
}
