import { RenderElementProps } from "slate-react";

export default function PostHeading({
  props,
  text,
  viewOnly
}: {
  props: RenderElementProps;
  text: string;
  viewOnly?: boolean;
}) {
  const { children, element, attributes } = props;
  return (
    <h2
      {...attributes}
      className={`mt-3 font-bold ${element.headingSize} ${element.align}${
        !text && !viewOnly ? " ph relative" : ""
      }`}
    >
      {children}
    </h2>
  );
}
