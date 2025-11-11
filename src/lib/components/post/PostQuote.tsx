import { RenderElementProps } from "slate-react";

export default function PostQuote({
  props: { children, element, attributes },
  text
}: {
  props: RenderElementProps;
  text: string;
}) {
  return (
    <blockquote
      {...attributes}
      className="flex items-center gap-4 rounded-md bg-foreground/10 p-4 font-serif"
    >
      <span
        className="h-[50px] rotate-180 select-none self-start text-8xl font-bold leading-[0]"
        contentEditable={false}
      >
        &bdquo;
      </span>
      <span
        className={`${!text ? "ph relative" : ""} ${
          element.align
        } w-full text-xl outline-none`}
      >
        {children}
      </span>
      <span
        className="h-[50px] select-none self-end text-8xl font-bold leading-[0]"
        contentEditable={false}
      >
        &bdquo;
      </span>
    </blockquote>
  );
}
