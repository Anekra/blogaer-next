import Logo2Icon from "@/lib/components/icons/Logo2Icon";
import type { PostDto } from "@/lib/types/dto/PostDto";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { Link } from "next-view-transitions";

export default function PostGridCardA({ post }: { post: PostDto }) {
	const username = post.username;
	const title = post.title.split(" b")[0];
	const thumbnail = post.content
		.filter((content) => content.type === "image")
		.at(0);
	const date = new Date(post.createdAt).toDateString();
	const slug = `${post.title.replaceAll(" ", "-").toLowerCase()}-${post.id}`;
	const url = `/blog/${username.toLowerCase()}/${slug}`;

	return (
		<Link
			href={url}
			className="neu-p group relative flex max-h-[200px] flex-col rounded-lg"
			style={{ viewTransitionName: `${slug}` }}
		>
			<div className="neu-p z-1 flex h-40 w-3/4 flex-col gap-3 rounded-lg bg-card p-3 transition-[width_background-color_box-shadow] group-hover:w-full group-hover:bg-background/60 group-hover:shadow-none">
				<div className="absolute top-0 left-0 flex size-11 items-center justify-center overflow-hidden rounded-tl-lg rounded-br-lg">
					{post?.userImg ? (
						<div className="relative size-10 overflow-hidden">
							<Image
								src={post.userImg}
								alt="Profile"
								className="object-cover"
								fill
							/>
						</div>
					) : (
						<span className="relative flex size-[34px] items-end justify-center overflow-hidden rounded-tl-lg rounded-br-lg bg-card-foreground text-primary-foreground">
							<UserIcon className="h-[30px] w-auto fill-card stroke-card" />
						</span>
					)}
				</div>
				<div className="flex grow flex-col gap-4">
					<p className="line-clamp-1 ps-12">{username}</p>
					<p className="line-clamp-2 font-bold text-xl">{title}</p>
				</div>
				<p className="text-foreground/40 text-xs">{date}</p>
			</div>
			<div className="absolute top-0 right-0 h-full max-h-40 w-[27%] overflow-hidden rounded-lg transition-[width] group-hover:w-full">
				{thumbnail ? (
					<Image
						src={thumbnail.imageLink}
						alt={thumbnail.imageAlt}
						fill
						className="object-cover"
						unoptimized
					/>
				) : (
					<div className="flex size-full items-center justify-center bg-accent/40">
						<Logo2Icon />
					</div>
				)}
			</div>
		</Link>
	);
}
