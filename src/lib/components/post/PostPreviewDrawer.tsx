import Link from "next/link";
import { useRouter } from "next/navigation";
import { createEditor } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { toast } from "sonner";

import postClientWithResFetch from "@/lib/actions/client/postClientWithResFetch";
import FullPreviewDialog from "@/lib/components/dialogs/FullPreviewDialog";
import PreviewIcon from "@/lib/components/icons/PreviewIcon";
import TagsIcon from "@/lib/components/icons/TagsIcon";
import PostTags from "@/lib/components/post/PostTags";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/lib/components/ui/drawer";
import { useContent } from "@/lib/contexts/ContentContext";
import { useLoading } from "@/lib/contexts/LoadingContext";
import { useSession } from "@/lib/contexts/SessionContext";
import useViewConfig from "@/lib/hooks/useViewConfig";
import { PostWithResIdDto } from "@/lib/types/dto/ResDto";
import { getTotalWords, serializeContent } from "@/lib/utils/helper";

export default function PostPreviewDrawer() {
  const editor = withReact(createEditor());
  const router = useRouter();
  const { renderElement, renderLeaf } = useViewConfig(editor);
  const { session } = useSession();
  const { content } = useContent();
  const { setLoading } = useLoading();
  const { tags } = useContent();
  const words = getTotalWords(content);
  const publishPost = async () => {
    const username = session?.username;
    if (!username) return;
    setLoading(true);
    const title = `${content[0].children[0].text}`;
    const resJson = await postClientWithResFetch<PostWithResIdDto>("/post", {
      title,
      text: serializeContent(content),
      content,
      tags
    });
    if (resJson.data?.id) {
      router.push(
        `/blog/${username.toLowerCase()}/${title
          .replace(/\s+/g, "-")
          .toLowerCase()}-${resJson.data?.id}`
      );
      toast.info("Adding post", {
        position: "bottom-right",
        duration: 2000
      });
      setLoading(false);
    } else {
      toast.error("Server error, please try again later", {
        position: "bottom-right",
        duration: 1500
      });
      setLoading(false);
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="btn-solid-p">Preview</button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="*:text-center">
          <DrawerTitle>Post Preview</DrawerTitle>
          <DrawerDescription>
            Review and add tags to your post
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex max-h-[75vh] min-h-[50vh] flex-col justify-center gap-6 overflow-y-auto px-12 pt-2 pb-12 md:flex-row">
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <PreviewIcon />
              <p>Preview</p>
            </div>
            <div className="flex max-h-[60vh] flex-col gap-4 overflow-y-auto">
              <div className="flex flex-col gap-2 overflow-y-auto rounded border">
                <Slate editor={editor} initialValue={content.slice(0, 3)}>
                  <Editable
                    readOnly
                    placeholder="Type something..."
                    renderElement={(props) => renderElement(props, editor)}
                    renderLeaf={renderLeaf}
                    className="pointer-events-none flex flex-col gap-2 p-1"
                  />
                </Slate>
                {content.length > 3 && (
                  <span className="text-foreground/50">
                    And
                    {content.length - 3 === 1
                      ? ` ${content.length - 3} element more`
                      : ` ${content.length - 3} elements more`}
                  </span>
                )}
              </div>
              <p className="text-sm">{`A total of ${words} words`}</p>
            </div>
            <hr />
            <div className="flex gap-2">
              <FullPreviewDialog
                content={content}
                renderElement={(props) => renderElement(props, editor)}
                renderLeaf={renderLeaf}
              />
              <Link
                href="/blog/post/preview"
                target="_blank"
                className="border-foreground/40 text-primary-foreground border-s-2 ps-2"
              >
                Open in new tab
              </Link>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <TagsIcon />
              <p>Tags</p>
            </div>
            <PostTags />
            <hr />
            <button
              className="bg-primary-foreground text-primary flex w-fit gap-2 rounded-xl px-4 py-2 font-bold"
              onClick={publishPost}
            >
              Publish
            </button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
