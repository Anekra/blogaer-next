import { ChevronDown, LinkIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { useFocused, useSlate } from "slate-react";

import AddImgIcon from "@/lib/components/icons/AddImgIcon";
import TitleTooltip from "@/lib/components/popovers/TitleTooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from "@/lib/components/ui/dropdown-menu";
import { VOIDS } from "@/lib/utils/constants";
import {
  HeadingSize,
  WysiwygAlign,
  WysiwygStyle,
  WysiwygType
} from "@/lib/utils/enums";
import {
  addCodeEditor,
  addDivider,
  addImageHolder,
  addParagraph,
  getElementAlignment,
  getElementHeadingSize,
  getElementType,
  getHeadingSizeKey,
  isFirstElement as isFirstElementSelected,
  isLinkSelected,
  isStyleActive,
  toggleAlign,
  toggleLink,
  toggleStyle,
  toggleType
} from "@/lib/utils/helper";

export default function PostWysiwyg({
  isLinkEditorOpen,
  handleShowLinkEditor
}: {
  isLinkEditorOpen: boolean;
  handleShowLinkEditor: (visible: boolean) => void;
}) {
  const editor = useSlate();
  const elementType = getElementType(editor);
  const elementAlignment = getElementAlignment(editor);
  const elementHeadingSize = getElementHeadingSize(editor);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wysiwygRef = useRef<HTMLDivElement>(null);
  const isFocused = useFocused();
  const isNoneSelected = !editor.selection;
  const isFirstEl = isFirstElementSelected(editor);
  const isVoidEl = elementType ? VOIDS.includes(elementType) : false;
  const isHeadingEl = elementType === WysiwygType.Heading;
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const handleTooltipVisibility = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const isHover = e.type === "mouseenter" && isFirstEl;
    setIsTooltipVisible(isHover === true);
  };
  const tooltipText =
    "Cannot change the first element styles! Except for its alignment.";

  return (
    <div
      ref={wysiwygRef}
      className="sticky top-24 flex flex-col items-center gap-3"
    >
      <div>
        <button
          className="flex w-full items-center justify-center gap-2 rounded border border-accent px-2 font-bold hover:border-foreground active:bg-foreground/50"
          onMouseDown={(e) => {
            e.preventDefault();
            addParagraph(editor);
          }}
        >
          <span className="text-2xl">+</span>
          Paragraph
        </button>
      </div>
      <hr className="w-32" />
      <div className="grid grid-cols-3 items-center justify-center gap-1 [&>*]:relative [&>*]:size-10 [&>*]:text-3xl">
        <button
          data-tooltip-text={tooltipText}
          data-tooltip-justify="start"
          className={`group relative flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50${
            elementType === WysiwygType.Code ? "bg-foreground/25" : ""
          }${isNoneSelected ? "" : "disabled:tooltip-wysiwyg"}`}
          onMouseDown={(e) => {
            e.preventDefault();
            addCodeEditor(editor);
          }}
          disabled={isNoneSelected || isFirstEl}
        >
          <span className="text-xl font-semibold">&lt;/&gt;</span>
          <span className="absolute right-px top-[22px] rounded-3xl bg-background px-px py-[3px] text-xl font-semibold leading-[8px] group-hover:group-enabled:bg-accent-foreground">
            +
          </span>
        </button>
        <button
          data-tooltip-text={tooltipText}
          data-tooltip-justify="center"
          className={`flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50${
            elementType === WysiwygType.Image ? "bg-foreground/25" : ""
          }${isNoneSelected ? "" : "disabled:tooltip-wysiwyg"}`}
          onMouseDown={(e) => {
            e.preventDefault();
            addImageHolder(editor);
          }}
          disabled={isNoneSelected || isFirstEl}
        >
          <AddImgIcon />
        </button>
        <button
          data-tooltip-text={tooltipText}
          data-tooltip-justify="end"
          className={`group flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50${
            elementType === WysiwygType.Divider ? "bg-foreground/25" : ""
          }${isNoneSelected ? "" : "disabled:tooltip-wysiwyg"}`}
          onMouseDown={(e) => {
            e.preventDefault();
            addDivider(editor);
          }}
          disabled={isNoneSelected || isFirstEl}
        >
          <span className="font-bold">⎯</span>
          <span className="absolute right-px top-[22px] rounded-3xl bg-background px-px py-[3px] text-xl font-semibold leading-[8px] group-hover:group-enabled:bg-accent-foreground">
            +
          </span>
        </button>
      </div>
      <hr className="w-32" />
      <div className="grid grid-cols-3 items-center justify-center gap-1 [&>*:first-child]:font-serif [&>*:nth-child(2)]:font-serif [&>*]:relative [&>*]:size-10 [&>*]:text-3xl">
        <DropdownMenu onOpenChange={(open) => setDropdownOpen(open)}>
          <div
            onMouseEnter={handleTooltipVisibility}
            onMouseLeave={handleTooltipVisibility}
          >
            <DropdownMenuTrigger
              className={`${
                elementType === WysiwygType.Heading ? "bg-foreground/25" : ""
              } flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
              disabled={isNoneSelected || isFirstEl}
            >
              <strong className="text-xl">
                {elementType === WysiwygType.Heading && !isFirstEl
                  ? getHeadingSizeKey(elementHeadingSize as HeadingSize)
                  : "H"}
              </strong>
              {(!isNoneSelected || !isFirstEl) && (
                <span
                  className={`${
                    dropdownOpen ? "rotate-180" : ""
                  } text-[10px] transition-transform duration-300`}
                >
                  <ChevronDown width={10} />
                </span>
              )}
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent
            className="rounded bg-black"
            align="start"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DropdownMenuRadioGroup
              value={elementHeadingSize}
              onValueChange={(value) => {
                toggleType(editor, WysiwygType.Heading, value);
              }}
            >
              <DropdownMenuRadioItem value={HeadingSize.H1}>
                H1 (Large)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={HeadingSize.H2}>
                H2 (Medium)
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value={HeadingSize.H3}>
                H3 (Small)
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              elementType === WysiwygType.Paragraph ? "bg-foreground/25" : ""
            } ${
              isTooltipVisible ? "relative" : ""
            } flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleType(editor, WysiwygType.Paragraph);
            }}
            disabled={isNoneSelected || isFirstEl}
          >
            P
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              elementType === WysiwygType.Quote ? "bg-foreground/25" : ""
            } flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleType(editor, WysiwygType.Quote);
            }}
            disabled={isNoneSelected || isFirstEl}
          >
            ❝❞
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              elementType === WysiwygType.ListBullets ? "bg-foreground/25" : ""
            } flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleType(editor, WysiwygType.ListBullets);
            }}
            disabled={isNoneSelected || isFirstEl}
          >
            <ul className="flex flex-col text-[8px] leading-[0px] [&>*]:h-2">
              <li>● ━━━</li>
              <li>● ━━━</li>
              <li>● ━━━</li>
            </ul>
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              elementType === WysiwygType.ListNumbers ? "bg-foreground/25" : ""
            } flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleType(editor, WysiwygType.ListNumbers);
            }}
            disabled={isNoneSelected || isFirstEl}
          >
            <ul className="flex flex-col text-[8px] leading-[0px] [&>*]:h-2">
              <li>1 ━━━</li>
              <li>2 ━━━</li>
              <li>3 ━━━</li>
            </ul>
          </button>
        </div>
      </div>
      <hr className="w-32" />
      <div className="grid grid-cols-3 items-center justify-center gap-1 [&>*]:relative [&>*]:size-10 [&>*]:font-serif [&>*]:text-3xl">
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50${
              isStyleActive(editor, WysiwygStyle.Bold) ? "bg-foreground/25" : ""
            }${isHeadingEl ? "bg-foreground/25" : ""}`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleStyle(editor, WysiwygStyle.Bold);
            }}
            disabled={isNoneSelected || isFirstEl || isVoidEl || isHeadingEl}
          >
            <strong>B</strong>
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              isStyleActive(editor, WysiwygStyle.Italic)
                ? "bg-foreground/25"
                : ""
            } flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleStyle(editor, WysiwygStyle.Italic);
            }}
            disabled={isNoneSelected || isFirstEl || isVoidEl}
          >
            <em>I</em>
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              isStyleActive(editor, WysiwygStyle.Underline)
                ? "bg-foreground/25"
                : ""
            } flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleStyle(editor, WysiwygStyle.Underline);
            }}
            disabled={isNoneSelected || isFirstEl || isVoidEl}
          >
            <u>U</u>
          </button>
        </div>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              isStyleActive(editor, WysiwygStyle.Strike)
                ? "bg-foreground/25"
                : ""
            } flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleStyle(editor, WysiwygStyle.Strike);
            }}
            disabled={isNoneSelected || isFirstEl || isVoidEl}
          >
            <s>S</s>
          </button>
        </div>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Left ? "bg-foreground/25" : ""
          } flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Left);
          }}
          disabled={isNoneSelected || isVoidEl}
        >
          <ul className="flex flex-col text-left text-[10px] font-black leading-[8px] [&>*]:h-[6px]">
            <li>━━━━</li>
            <li>━━</li>
            <li>━━━━</li>
            <li>━━</li>
          </ul>
        </button>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Center ? "bg-foreground/25" : ""
          } flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Center);
          }}
          disabled={isNoneSelected || isVoidEl}
        >
          <ul className="flex flex-col text-center text-[10px] font-black leading-[8px] [&>*]:h-[6px]">
            <li>━━━━</li>
            <li> ━━ </li>
            <li>━━━━</li>
            <li> ━━ </li>
          </ul>
        </button>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Right ? "bg-foreground/25" : ""
          } flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Right);
          }}
          disabled={isNoneSelected || isVoidEl}
        >
          <ul className="flex flex-col text-right text-[10px] font-black leading-[8px] [&>*]:h-[6px]">
            <li>━━━━</li>
            <li> ━━</li>
            <li>━━━━</li>
            <li> ━━</li>
          </ul>
        </button>
        <button
          className={`${
            elementAlignment === WysiwygAlign.Justify ? "bg-foreground/25" : ""
          } flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
          onMouseDown={(e) => {
            e.preventDefault();
            toggleAlign(editor, WysiwygAlign.Justify);
          }}
          disabled={isNoneSelected || isVoidEl}
        >
          <ul className="flex flex-col text-center text-[10px] font-black leading-[8px] [&>*]:h-[6px]">
            <li>━━━━</li>
            <li>━━━━</li>
            <li>━━━━</li>
            <li>━━━━</li>
          </ul>
        </button>
        <div
          onMouseEnter={handleTooltipVisibility}
          onMouseLeave={handleTooltipVisibility}
        >
          <button
            className={`${
              elementType === WysiwygStyle.Link ? "bg-foreground/25" : ""
            } flex size-full items-center justify-center rounded outline-none enabled:hover:bg-accent-foreground disabled:text-foreground/50`}
            onMouseDown={(e) => {
              e.preventDefault();
              if (isLinkSelected(editor)) toggleLink(editor);
              else handleShowLinkEditor(true);
            }}
            disabled={
              isNoneSelected || isVoidEl || isLinkEditorOpen || !isFocused
            }
          >
            <LinkIcon className="stroke-2" />
          </button>
        </div>
      </div>
      <TitleTooltip
        text="Cannot change the first element styles! Except for its alignment."
        isVisible={isTooltipVisible}
        parentEl={wysiwygRef.current}
      />
    </div>
  );
}
