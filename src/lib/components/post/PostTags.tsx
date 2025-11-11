import { usePathname } from "next/navigation";
import React, { useState } from "react";

import InputTags from "@/lib/components/widgets/InputTags";
import { useContent } from "@/lib/contexts/ContentContext";

export default function PostTags() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const currentPath = usePathname();
  const isEditPublished = currentPath.startsWith("/blog/post/edit/published/");
  const { tags, setTags } = useContent();
  const [tagsLength, setTagsLength] = useState(tags.length);
  const clearTags = () => {
    setTags([]);
    setTagsLength(0);
  };
  const deleteTag = (i: number) => {
    setTags(tags.filter((_, index) => index !== i));
    setTagsLength((prevLength) => prevLength - 1);
  };

  return (
    <div
      className={`${
        isEditPublished
          ? `absolute right-1 flex max-w-[440px] xl:sticky xl:translate-x-0 ${
              isCollapsed ? "translate-x-full" : "translate-x-0"
            }`
          : ""
      }`}
    >
      <div className="flex h-full">
        {isEditPublished && (
          <button
            className={`${
              isCollapsed ? "-translate-x-full" : "translate-x-[2px]"
            } vertical-text peer pointer-events-auto h-fit rounded-l-md border-2 bg-custom-bg1 py-2 font-bold after:absolute after:right-[-2px] after:top-0 after:h-full after:w-[3px] after:bg-custom-bg1 after:content-[''] hover:border-base-foreground xl:hidden`}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            Tags
          </button>
        )}
        <div
          className={`${
            isEditPublished
              ? isCollapsed
                ? "border-2 peer-hover:border-base-foreground"
                : "border-2 bg-custom-bg1 peer-hover:border-base-foreground xl:bg-background"
              : "border-none"
          } flex w-full flex-col gap-2 rounded-r-md rounded-bl-md p-2 xl:rounded-md xl:border-none xl:bg-background xl:p-0`}
        >
          <h1 className="text-center text-lg font-bold">Edit Tags</h1>
          <p>
            Press enter or select the dropdown item to add a tag.
            <br />*
            <span className="text-sm text-muted-foreground">
              You can also add multiple tags by inputting a comma after each tag
              to add multiple tags.
            </span>
          </p>
          <div className={`relative flex flex-col gap-2 rounded p-2`}>
            {tags.length < 10 && (
              <InputTags
                tagsState={[tags, setTags]}
                tagsLengthState={[tagsLength, setTagsLength]}
              />
            )}
            <ul className="flex flex-wrap justify-end gap-2">
              {tags.map((tag, i) => (
                <li
                  key={i}
                  className="flex w-fit items-center justify-center gap-2 rounded bg-base-background px-2 py-1 text-primary-foreground"
                >
                  {tag}
                  <button
                    className="rounded-3xl text-foreground/50 hover:text-red-500"
                    onClick={() => deleteTag(i)}
                  >
                    🗙
                  </button>
                </li>
              ))}
            </ul>
            <button
              className={`${tags.length === 0 ? "hidden" : "block"} static right-0 self-end px-2 text-sm text-foreground/50 enabled:hover:text-red-700`}
              disabled={tags.length === 0}
              onClick={clearTags}
            >
              Clear all
            </button>
          </div>
          <span className="text-end">{10 - tagsLength} tags remaining</span>
        </div>
      </div>
    </div>
  );
}
