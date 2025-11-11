"use client";
import { usePathname } from "next/navigation";
import useSWRImmutable from "swr/immutable";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import PostEditor from "@/lib/components/post/PostEditor";
import PostTags from "@/lib/components/post/PostTags";
import { GetPostByIdDto } from "@/lib/types/dto/ResDto";
import { getSlugFromPath } from "@/lib/utils/helper";

export default function PostEditorHolder() {
  const currentPath = usePathname();
  const slug = getSlugFromPath(currentPath);
  const slugs = slug.split("-");
  const id = slugs[slugs.length - 1];
  const url = `/post/public/${id}`;
  const { data: res, error } = useSWRImmutable<GetPostByIdDto>(
    url,
    getClientFetch
  );

  if (!res) return <p className="dots-loading">loading</p>;
  if (error) return <p>error</p>;

  return (
    <PostEditor post={res.data}>
      <PostTags />
    </PostEditor>
  );
}
