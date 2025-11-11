"use client";
import { UserIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import useSWRImmutable from "swr/immutable";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import GithubIcon from "@/lib/components/icons/GithubIcon";
import InstagramIcon from "@/lib/components/icons/InstagramIcon";
import LikeIt from "@/lib/components/icons/thoughts/LikeIt";
import ThoughtsIcon from "@/lib/components/icons/thoughts/ThoughtsIcon";
import TotalReadsIcon from "@/lib/components/icons/TotalReadsIcon";
import XIcon from "@/lib/components/icons/XIcon";
import useViewConfig from "@/lib/hooks/useViewConfig";
import { GetPostByIdDto } from "@/lib/types/dto/ResDto";
import { CustomElement } from "@/lib/types/slate";
import { WysiwygType } from "@/lib/utils/enums";
import { getSlugFromPath } from "@/lib/utils/helper";

export default function PostView() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const { renderElement, renderLeaf } = useViewConfig(editor);
  const slug = getSlugFromPath(usePathname());
  const slugs = slug.split("-");
  const id = slugs[slugs.length - 1];
  const url = `/post/public/${id}`;
  const { data: res, error } = useSWRImmutable<GetPostByIdDto>(
    url,
    getClientFetch
  );

  if (!res) return <p className="dots-loading">loading</p>;
  if (error) return <p>Error</p>;
  if (!res.data) return <p>Post not found!</p>;

  const post = res.data;
  const content = post.content;
  const username = post.username;

  return (
    <div className="flex w-full max-w-screen-2xl justify-between gap-16 px-6 pt-8 pb-6">
      <aside className="max-w-[200px] text-sm">
        <div
          className="neu-base group/card relative mt-2 flex size-[180px] flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl transition-[height] hover:h-[340px]"
          style={{ viewTransitionName: `profile-${slug}` }}
        >
          <a
            href={`/${username.toLowerCase()}`}
            className="group/image group-hover/card:card-image absolute flex size-full items-center justify-center overflow-hidden rounded-3xl brightness-50 transition-[width_height] group-hover/card:top-6 group-hover/card:size-[100px] group-hover/card:rounded-full group-hover/card:brightness-100"
          >
            {post?.userImg ? (
              <div className="relative size-[160px] overflow-hidden">
                <Image
                  src={post.userImg}
                  alt="Profile"
                  className="object-cover"
                  fill
                />
              </div>
            ) : (
              <span className="text-primary-foreground relative flex size-[160px] items-end justify-center overflow-hidden rounded-full shadow-[inset_0_0_0_8px_oklch(var(--primary-foreground))]">
                <UserIcon className="absolute -bottom-3 size-full fill-current" />
              </span>
            )}
          </a>
          <div className="absolute z-[1] flex w-full flex-col items-center gap-2 group-hover/card:mt-4">
            <a
              href={`/${username.toLowerCase()}`}
              className="group/text text-background group-hover/card:text-foreground dark:text-foreground"
            >
              <p className="group-hover/text:text-primary-foreground text-xl font-bold group-hover/text:brightness-125">
                {username}
              </p>
            </a>
            <div className="[&>*]:card-socials [&>*:active]:text-base-background hidden flex-wrap justify-center gap-2 p-2 text-2xl group-hover/card:flex [&>*]:rounded-full [&>*]:p-2">
              <button>
                <GithubIcon />
              </button>
              <button>
                <XIcon />
              </button>
              <button>
                <InstagramIcon />
              </button>
            </div>
          </div>
          <div className="[&>*]:card-stats absolute bottom-0 hidden w-full justify-center group-hover/card:flex [&>*]:flex [&>*]:[&>*]:size-6 [&>*]:flex-1 [&>*]:items-center [&>*]:justify-evenly [&>*]:p-2">
            <span>
              <ThoughtsIcon />
              12
            </span>
            <span className="card-stats border-x">
              <TotalReadsIcon />6
            </span>
            <span>
              <LikeIt />6
            </span>
          </div>
        </div>
      </aside>
      <main className="w-full pe-4">
        <div className="mb-6 flex items-center justify-between gap-4 text-neutral-600 dark:text-neutral-400">
          <div className="flex gap-4 [&>*]:flex [&>*]:items-center [&>*]:gap-1">
            <span>Reads 0</span>
            <span>Comments 0</span>
          </div>
          <p>Latest updated: 3 July 2024 ○ 7 minutes reads</p>
        </div>
        <article>
          <Slate editor={editor} initialValue={content}>
            <Editable
              readOnly
              renderElement={(props) =>
                renderElement(props, editor, post?.tags)
              }
              renderLeaf={renderLeaf}
              className="flex w-full max-w-[65vw] flex-col gap-6 self-center"
            />
          </Slate>
        </article>
      </main>
      <aside className="flex max-w-[200px] min-w-[200px] pt-8 text-sm">
        <ul>
          {content
            .filter((n) => n.type === WysiwygType.Heading)
            .map((n, i) => (
              <li
                key={i}
                className="border-primary-foreground border-l-4 px-4 py-1"
              >
                {(n as CustomElement).children[0].text}
              </li>
            ))}
        </ul>
      </aside>
    </div>
  );
}
