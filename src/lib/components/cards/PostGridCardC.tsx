"use client";
import { useSession } from "@/lib/contexts/SessionContext";
import type { DraftWithNoUserDto } from "@/lib/types/dto/DraftDto";
import type { PostWithNoUserDto } from "@/lib/types/dto/PostDto";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EditPostDropdown from "../dropdowns/EditPostDropdown";
import Logo2Icon from "../icons/Logo2Icon";

export default function PostGridCardC({
	postData: { post, postIndex }
}: {
	postData: { post: PostWithNoUserDto | DraftWithNoUserDto; postIndex: number };
}) {
	const { session } = useSession();
	const username = session?.username;
	const title = post.title;
	const thumbnail = post.content
		.filter((content) => content.type === "image")
		.at(0);
	const currentPath = usePathname();
	const slug = `${title.replaceAll(" ", "-").toLowerCase()}-${post.id}`;
	const isDraft = currentPath.startsWith("/blog/post/draft");
	const reads = "reads" in post ? post.reads : "";
	const url = isDraft
		? `/blog/post/edit/draft/${post.id}`
		: `/blog/${username?.toLowerCase()}/${slug}`;
	const date = new Date(post.createdAt).toDateString();

	return (
		<div className="neu-base group relative flex max-h-[300px] max-w-[480px] ms:max-w-[470px] ql:max-w-[460px] flex-col justify-between overflow-hidden rounded-md">
			<div className="neu-base flex h-[78%] flex-col overflow-hidden rounded-md transition-[height_background-color] group-hover:h-full group-hover:bg-background/60">
				{thumbnail ? (
					<div className="relative size-full grow">
						<Image
							src={thumbnail.imageLink}
							alt={thumbnail.imageAlt}
							fill
							className="object-cover"
							unoptimized
						/>
					</div>
				) : (
					<div className="flex size-full grow items-center justify-center overflow-hidden rounded-md bg-primary/20">
						<Logo2Icon />
					</div>
				)}
			</div>
			<div className="absolute bottom-0 flex h-[66px] w-full flex-wrap items-center p-2 transition-[height_background-color] group-hover:h-full group-hover:bg-background/60 group-hover:px-4 group-hover:text-center">
				<Link href={url}>
					<h4 className="truncate-1 absolute bottom-6 left-2 rounded box-decoration-clone font-bold ml:text-[22px] text-[18px] group-hover:static group-hover:inline group-hover:bg-background group-hover:px-2 group-hover:text-3xl">
						{title}
					</h4>
				</Link>
				<p className="absolute bottom-2 left-2 text-foreground/80 text-xs">
					{isDraft ? date : `${reads} reads | ${date}`}
				</p>
			</div>
			<div className="absolute right-2 bottom-6">
				<EditPostDropdown
					postData={{
						editUrl: isDraft ? url : `/blog/post/edit/published/${slug}`,
						postIndex
					}}
				/>
			</div>
		</div>
	);
}
