import React from "react";
import { RenderElementProps, RenderLeafProps } from "slate-react";

import PostCodeEditor from "@/lib/components/post/PostCodeEditor";
import PostDivider from "@/lib/components/post/PostDivider";
import PostHeading from "@/lib/components/post/PostHeading";
import PostImage from "@/lib/components/post/PostImage";
import PostLink from "@/lib/components/post/PostLink";
import PostQuote from "@/lib/components/post/PostQuote";
import PostTittle from "@/lib/components/post/PostTittle";
import { SlateEditor } from "@/lib/types";
import { VOIDS } from "@/lib/utils/constants";
import { WysiwygStyle, WysiwygType } from "@/lib/utils/enums";

export default function useViewConfig(editor: SlateEditor) {
  const { isVoid } = editor;
  editor.isVoid = (element) => {
    return VOIDS.includes(element.type) || isVoid(element);
  };
  editor.isInline = (element) => element.type === WysiwygStyle.Link;

  return { renderElement, renderLeaf };
}

function renderElement(
  props: RenderElementProps,
  editor: SlateEditor,
  tags?: string[]
) {
  const { children, element, attributes } = props;
  const text = element.children[0].text;

  if (editor.children[0] === element) {
    return <PostTittle props={props} text={text} tags={tags} viewOnly />;
  }

  switch (element.type) {
    case WysiwygType.Heading:
      return <PostHeading props={props} text={text} viewOnly />;
    case WysiwygType.Code:
      return <PostCodeEditor {...props} />;
    case WysiwygType.Quote:
      return <PostQuote props={props} text={text} />;
    case WysiwygType.List:
      return <li {...attributes}>{children}</li>;
    case WysiwygType.ListBullets:
      return (
        <ul {...attributes} className="list-disc px-[18px]">
          {children}
        </ul>
      );
    case WysiwygType.ListNumbers:
      return (
        <ol {...attributes} className="list-decimal px-[18px]">
          {children}
        </ol>
      );
    case WysiwygType.ImagePicker:
      return <React.Fragment />;
    case WysiwygType.Image:
      return <PostImage props={props} viewOnly />;
    case WysiwygType.Divider:
      return <PostDivider {...props} />;
    case WysiwygStyle.Link:
      return <PostLink props={props} />;
    default:
      return (
        <p {...attributes} className={`md:text-lg ${element.align}`}>
          {children}
        </p>
      );
  }
}

function renderLeaf({ children, leaf, attributes }: RenderLeafProps) {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.strikethrough) {
    children = <s>{children}</s>;
  }

  return <span {...attributes}>{children}</span>;
}
