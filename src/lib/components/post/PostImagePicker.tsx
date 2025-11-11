import React from "react";
import { RenderElementProps, useSlate } from "slate-react";

import ImgLinkBtn from "@/lib/components/buttons/ImgLinkBtn";
import ImgUploadBtn from "@/lib/components/buttons/ImgUploadBtn";
import { getElement } from "@/lib/utils/helper";

export default function PostImagePicker({
  attributes,
  element,
  children
}: RenderElementProps) {
  const editor = useSlate();
  const currentElement = getElement(editor);
  const isSelected = element === currentElement;

  return (
    <div
      {...attributes}
      className={`${
        isSelected
          ? "rounded border border-dashed border-primary-foreground"
          : ""
      } flex h-[300px] w-full select-none items-center justify-center gap-16 p-2`}
      contentEditable={false}
    >
      <ImgLinkBtn />
      <ImgUploadBtn />
      <span className="hidden">{children}</span>
    </div>
  );
}
