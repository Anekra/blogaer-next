import EmailStatusContent from "@/lib/components/contents/EmailStatusContent";

export default function EmailStatusPage() {
	return (
		<main className="flex min-h-screen items-center justify-center py-6">
			<div className="glass-form flex size-[500px] flex-col justify-center gap-5 px-10 py-6">
				<EmailStatusContent />
			</div>
		</main>
	);
}
