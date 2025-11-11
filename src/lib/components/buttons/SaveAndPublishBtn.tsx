import { toast } from "sonner";

import patchClientFetch from "@/lib/actions/client/patchClientFetch";
import { useContent } from "@/lib/contexts/ContentContext";
import { serializeContent } from "@/lib/utils/helper";

export default function SaveAndPublishBtn({ slug }: { slug: string }) {
  const { content, tags } = useContent();
  const title = `${content[0].children[0].text}`;
  const text = serializeContent(content);
  const slugs = slug.split("-");
  const id = slugs[slugs.length - 1];
  const handleOnClick = async () => {
    if (!title.includes(id)) {
      const response = await patchClientFetch(
        { id, title, text, content, tags },
        `/post`
      );
      if (response.message) {
        toast.success(response.message, {
          position: "bottom-right",
          duration: 2000
        });
      }
    }
  };
  return (
    <button className="btn-solid-p" onClick={handleOnClick}>
      Save & Publish
    </button>
  );
}
