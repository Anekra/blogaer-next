import Image from "next/image";
import { RenderElementProps, useSlate } from "slate-react";

import { Input } from "@/lib/components/ui/input";
import { getElement, setImageCaption } from "@/lib/utils/helper";

export default function PostImage({
  props: { attributes, element, children },
  viewOnly
}: {
  props: RenderElementProps;
  viewOnly?: boolean;
}) {
  const editor = useSlate();
  const currentElement = getElement(editor);
  const isSelected = element === currentElement;

  return (
    <figure
      {...attributes}
      className={`${
        isSelected && !viewOnly
          ? "rounded border border-dashed border-primary-foreground"
          : ""
      } flex w-full select-none flex-col items-center justify-center gap-2 p-2`}
      contentEditable={false}
    >
      <Image
        src={element.imageLink}
        className="w-full max-w-[650px]"
        alt={element.imageAlt}
        width={400}
        height={300}
        unoptimized
      />
      {!viewOnly ? (
        <Input
          type="text"
          value={element.imageCaption}
          placeholder="Add caption (optional)"
          maxLength={27}
          className="mt-2 w-[240px]"
          onChange={(e) => setImageCaption(editor, e.target.value)}
          onKeyDown={(e) => {
            e.preventDefault();
            if (e.key.match("Enter")) e.currentTarget.blur();
          }}
        />
      ) : (
        <p className="text-accent-foreground">{element.imageCaption}</p>
      )}
      <span className="hidden">{children}</span>
    </figure>
  );
}
