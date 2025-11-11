import { RenderElementProps, RenderLeafProps } from "slate-react";

import PostCodeEditor from "@/lib/components/post/PostCodeEditor";
import PostDivider from "@/lib/components/post/PostDivider";
import PostHeading from "@/lib/components/post/PostHeading";
import PostImage from "@/lib/components/post/PostImage";
import PostImagePicker from "@/lib/components/post/PostImagePicker";
import PostLink from "@/lib/components/post/PostLink";
import PostQuote from "@/lib/components/post/PostQuote";
import PostTittle from "@/lib/components/post/PostTittle";
import { SlateEditor } from "@/lib/types";
import { VOIDS } from "@/lib/utils/constants";
import { WysiwygStyle, WysiwygType } from "@/lib/utils/enums";
import { getElement } from "@/lib/utils/helper";

export default function useEditorConfig(editor: SlateEditor) {
  editor.isVoid = (element) => VOIDS.includes(element.type);
  editor.isInline = (element) => element.type === WysiwygStyle.Link;

  return { renderElement, renderLeaf };
}

function renderElement(props: RenderElementProps, editor: SlateEditor) {
  const { attributes, element, children } = props;
  const text = element.children[0].text;
  const isFocus = element === getElement(editor);

  if (editor.children[0] === element) {
    return <PostTittle props={props} text={text} />;
  }

  switch (element.type) {
    case WysiwygType.Heading:
      return <PostHeading props={props} text={text} />;
    case WysiwygType.Code:
      return <PostCodeEditor {...props} />;
    case WysiwygType.Quote:
      return <PostQuote props={props} text={text} />;
    case WysiwygType.List:
      return (
        <li
          {...attributes}
          className={`${isFocus && !text ? "ph relative" : ""}`}
        >
          {children}
        </li>
      );
    case WysiwygType.ListBullets:
      return (
        <ul {...attributes} className="flex list-disc flex-col gap-2 px-[18px]">
          {children}
        </ul>
      );
    case WysiwygType.ListNumbers:
      return (
        <ol
          {...attributes}
          className="flex list-decimal flex-col gap-2 px-[18px]"
        >
          {children}
        </ol>
      );
    case WysiwygType.ImagePicker:
      return <PostImagePicker {...props} />;
    case WysiwygType.Image:
      return <PostImage props={props} />;
    case WysiwygType.Divider:
      return <PostDivider {...props} />;
    case WysiwygStyle.Link:
      return <PostLink props={props} />;
    default:
      return (
        <p
          {...attributes}
          className={`md:text-lg ${element.align} ${
            isFocus && !text ? "ph relative" : ""
          } `}
        >
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
