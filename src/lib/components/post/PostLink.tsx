import Link from "next/link";
import { RenderElementProps } from "slate-react";

export default function PostLink({
  props: { attributes, children, element },
  viewOnly
}: {
  props: RenderElementProps;
  viewOnly?: boolean;
}) {
  return (
    <Link
      {...attributes}
      href={element.url}
      className="text-cyan-600 underline"
      onClick={(e) => {
        e.preventDefault();
        if (e.ctrlKey) window.open(element.url, "_blank");
      }}
      contentEditable={!viewOnly}
    >
      {children}
    </Link>
  );
}
