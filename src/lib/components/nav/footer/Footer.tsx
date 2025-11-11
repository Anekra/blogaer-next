import { Link } from "next-view-transitions";

export default function Footer() {
  return (
    <footer className="z-[8] flex w-screen items-center justify-between gap-2 bg-background p-4 shadow-[0_-1.5px_1px_0_rgb(0_0_0/0.3)]">
      <div className="flex gap-2 text-xs xs:text-sm sm:text-base lg:gap-6">
        <p>© Blogaer</p>
        <Link href="/terms" className="text-secondary-foreground underline">
          Terms
        </Link>
        <Link href="/privacy" className="text-secondary-foreground underline">
          Privacy
        </Link>
      </div>
    </footer>
  );
}
