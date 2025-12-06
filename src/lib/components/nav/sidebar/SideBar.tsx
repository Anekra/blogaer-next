"use client";
import PostsIcon from "@/lib/components/icons/PostsIcon";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "@/lib/components/ui/accordion";
import { useNavBar } from "@/lib/contexts/NavBarContext";
import { useSession } from "@/lib/contexts/SessionContext";
import { useSideBar } from "@/lib/contexts/SideBarContext";
import {
	BarChart3,
	HomeIcon,
	IdCardIcon,
	LayoutDashboardIcon,
	Maximize2Icon,
	Minimize2Icon,
	UserIcon
} from "lucide-react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";

export default function SideBar() {
	const currentPath = usePathname();
	const { session } = useSession();
	const { isNavBarCollapsed } = useNavBar();
	const username = session?.username;
	const { isCollapsed, toggleSideBar } = useSideBar();

	return (
		<aside
			className={`${isNavBarCollapsed ? "md:top-4" : "md:top-24"} hidden h-full flex-col items-center gap-2 bg-background px-3 pb-16 md:sticky md:flex`}
		>
			<button
				type="button"
				className={`${isCollapsed ? "self-center" : "self-start"} rounded-full p-2 text-2xl hover:bg-linear-to-t hover:from-background hover:to-foreground/10 active:brightness-150`}
				onClick={() => toggleSideBar()}
			>
				{isCollapsed ? <Maximize2Icon /> : <Minimize2Icon />}
			</button>
			<nav
				className={`${isCollapsed ? "w-16" : "w-40"} flex flex-col gap-1 transition-[width] duration-300`}
			>
				<div className="flex flex-col *:justify-center">
					<Link
						href="/home"
						className={`${currentPath === "/home" ? "bg-foreground/25 font-bold" : "font-normal"} ${isCollapsed ? "flex-col items-center" : "gap-4"} flex rounded p-2`}
					>
						<HomeIcon />
						<p className={`${isCollapsed ? "text-[10px]" : "text-base"} grow`}>
							Home
						</p>
					</Link>
					<Link
						href="/dashboard"
						className={`${currentPath === "/dashboard" ? "bg-foreground/25 font-bold" : "font-normal"} ${isCollapsed ? "flex-col items-center" : "gap-4"} flex rounded p-2`}
					>
						<LayoutDashboardIcon />
						<p className={`${isCollapsed ? "text-[10px]" : "text-base"} grow`}>
							Dashboard
						</p>
					</Link>
					<Link
						href={`/${username}`.toLowerCase()}
						className={`${currentPath === `/${username}` ? "bg-foreground/25 font-bold" : "font-normal"} ${isCollapsed ? "flex-col items-center" : "gap-4"} flex rounded p-2`}
					>
						<IdCardIcon />
						<p className={`${isCollapsed ? "text-[10px]" : "text-base"} grow`}>
							Profile
						</p>
					</Link>
				</div>
				<hr className="border-foreground/30" />
				<div className="flex flex-col">
					{!isCollapsed && (
						<span className="p-2 font-bold text-muted-foreground text-sm">
							Blog
						</span>
					)}
					<Accordion type="single" collapsible>
						<AccordionItem value="item-1">
							<AccordionTrigger
								className={`${currentPath.includes("/post") ? "bg-foreground/25 font-bold" : "font-normal"} ${isCollapsed ? "justify-center" : "p-2"} rounded`}
							>
								<div
									className={`${isCollapsed ? "flex-col items-center py-2 ps-2" : "gap-4"} flex`}
								>
									<span className="text-2xl">
										<PostsIcon />
									</span>
									<p className={`${isCollapsed ? "text-[10px]" : "grow"}`}>
										Posts
									</p>
								</div>
							</AccordionTrigger>
							<AccordionContent
								className={`${isCollapsed ? "ps-1" : "ps-4 pe-2"} flex flex-col`}
							>
								<Link
									href="/blog/post/published"
									className={`${currentPath === "/blog/post/published" ? "border-foreground font-bold text-foreground" : "border-foreground/20 text-foreground/50"} 
                  ${isCollapsed ? "p-2 ps-1 text-[10px]" : "p-2 ps-6 text-base"} rounded-r-sm border-l-2 hover:border-foreground hover:bg-foreground/10 hover:text-foreground`}
								>
									Published
								</Link>
								<Link
									href="/blog/post/draft"
									className={`${currentPath === "/blog/post/draft" ? "border-foreground font-bold text-foreground" : "border-foreground/20 text-foreground/50"} ${isCollapsed ? "p-2 ps-1 text-[10px]" : "p-2 ps-6 text-base"} rounded-r-sm border-l-2 hover:border-foreground hover:bg-foreground/10 hover:text-foreground`}
								>
									Drafts
								</Link>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Link
						href="/statistic"
						className={`${currentPath === "/statistic" ? "bg-foreground/25 font-bold" : ""} 
            ${isCollapsed ? "flex-col items-center" : "gap-4"} flex justify-center rounded p-2`}
					>
						<BarChart3 />
						<p className={`${isCollapsed ? "text-[10px]" : "text-base"} grow`}>
							Stats
						</p>
					</Link>
				</div>
				<hr className="border-foreground/30" />
				<div className="flex flex-col">
					{!isCollapsed && (
						<span className="p-2 font-bold text-muted-foreground text-sm">
							Settings
						</span>
					)}
					<Link
						href="/settings/account"
						className={`${
							currentPath === "/settings/account"
								? "bg-foreground/25 font-bold"
								: ""
						} ${isCollapsed ? "flex-col items-center" : "gap-4"} flex justify-center rounded p-2`}
					>
						<UserIcon />
						<p className={`${isCollapsed ? "text-[10px]" : "text-base"} grow`}>
							Account
						</p>
					</Link>
				</div>
			</nav>
		</aside>
	);
}
