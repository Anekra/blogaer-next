import { usePathname } from "next/navigation";
import React from "react";
import { toast } from "sonner";

import deleteClientFetch from "@/lib/actions/client/deleteClientFetch";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle
} from "@/lib/components/ui/dialog";
import { useCurrentPosts } from "@/lib/contexts/PostsContext";

export default function DeletePostDialogContent({
  postIndex
}: {
  postIndex: number;
}) {
  const { currentPosts, setCurrentPosts } = useCurrentPosts();
  const selectedPost = currentPosts[postIndex];
  const id = selectedPost.id;
  const currentPath = usePathname();
  const isDraft = currentPath.startsWith("/blog/post/draft");

  return (
    <DialogContent className="flex w-fit flex-col gap-8 px-12 py-10">
      <DialogTitle>Delete Post</DialogTitle>
      <DialogDescription>
        Are you sure you want to delete this post? <br /> (This action cannot be
        undone)
      </DialogDescription>
      <div className="flex justify-center gap-8">
        <DialogClose className="btn-outline-base outline-none">
          Cancel
        </DialogClose>
        <DialogClose
          onClick={async () => {
            await deleteClientFetch(isDraft ? "/draft/" : "/post/", id);
            toast.info("Deleting post", {
              position: "bottom-right",
              duration: 1500,
              onDismiss() {
                setCurrentPosts((posts) =>
                  posts.filter((_, i) => i !== postIndex)
                );
              }
            });
          }}
          className="btn-solid-destructive"
        >
          Delete
        </DialogClose>
      </div>
    </DialogContent>
  );
}
