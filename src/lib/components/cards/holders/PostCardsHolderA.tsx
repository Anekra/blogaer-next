"use client";
import { usePathname } from "next/navigation";
import React from "react";
import useSWRImmutable from "swr/immutable";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import PostGridCardA from "@/lib/components/cards/PostGridCardA";
import PostGridCardB from "@/lib/components/cards/PostGridCardB";
import { GetPostsByPageDto } from "@/lib/types/dto/ResDto";
import {
  displayError,
  getErrorStatus,
  isEncoreErrorCode
} from "@/lib/utils/helper";

export default function PostCardsHolderA() {
  const currentPath = usePathname();
  const url = "/post/public?number=1&size=10";
  const {
    data: res,
    error,
    isLoading
  } = useSWRImmutable<GetPostsByPageDto>(url, getClientFetch, {
    loadingTimeout: 5000,
    shouldRetryOnError: false
  });

  if (isLoading) return <p>loading...</p>;
  if (error || !res) return <p>{displayError(error, res)}</p>;
  if (res.data?.totalPosts === 0) return <p>No data found!</p>;
  if (isEncoreErrorCode(res.code)) return <p>{res.message}</p>;

  return (
    <main
      className={`${
        currentPath === "/"
          ? "ml:grid-cols-2 xl:grid-cols-3"
          : "ms:grid-cols-2 ql:grid-cols-3"
      } grid w-full auto-rows-fr grid-cols-1 justify-center gap-4 py-8`}
    >
      {res.data?.posts.map((post, i) => {
        return currentPath === "/" ? (
          <PostGridCardA key={i} post={post} />
        ) : (
          <PostGridCardB key={i} post={post} />
        );
      })}
    </main>
  );
}
