import { RenderElementProps, useSlate } from "slate-react";

import { getElement } from "@/lib/utils/helper";

export default function PostDivider({
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
      } flex h-20 items-center`}
      contentEditable={false}
    >
      <hr className="h-2 w-full !border-transparent bg-gradient-to-r from-background via-foreground to-background" />
      <span className="hidden">{children}</span>
    </div>
  );
}
