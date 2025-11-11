import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { NodeEntry, Editor, Node, Range } from "slate";
import { useSlate } from "slate-react";

import { CustomElement } from "@/lib/types/slate";
import { WysiwygStyle } from "@/lib/utils/enums";
import { isUrl, toggleLink } from "@/lib/utils/helper";

export default function PostLinkEditor({
  isVisible,
  handleShowLinkEditor
}: {
  isVisible: boolean;
  handleShowLinkEditor: (visible: boolean) => void;
}) {
  const linkDivRef = useRef<HTMLDivElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);
  const linkSpanRef = useRef<HTMLSpanElement>(null);
  const editor = useSlate();
  const [linkNode]: NodeEntry<CustomElement> | [] =
    Editor.above(editor, {
      at: editor.selection || [],
      match: (n: Node) => (n as CustomElement).type === WysiwygStyle.Link
    }) || [];
  const [link, setLink] = useState<string>(linkNode?.url);
  const [showLinkTooltip, setShowLinkTooltip] = useState(false);
  const onInputLinkChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setLink((e.target as HTMLInputElement)?.value),
    [setLink]
  );
  const onApply = () => {
    toggleLink(editor, link);
    handleShowLinkEditor(false);
  };

  useEffect(() => {
    const linkDivEl = linkDivRef.current;
    const linkInputEl = linkInputRef.current;
    const linkSpanEl = linkSpanRef.current;
    const { selection } = editor;

    if (!linkDivEl || !linkSpanEl) return;

    if (!selection || !isVisible) {
      linkDivEl.removeAttribute("style");
      linkSpanEl.removeAttribute("style");
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();

    if (rect) {
      const linkParentElBoundaries =
        linkDivEl.parentElement?.parentElement?.getBoundingClientRect();
      const linkDivElLeft =
        rect.left + window.scrollX - linkDivEl.offsetWidth / 2 + rect.width / 2;
      const linkDivElTop =
        rect.top + window.scrollY - linkDivEl.offsetHeight - 6;
      if (!linkParentElBoundaries) return;

      linkDivEl.style.zIndex = "3";
      linkDivEl.style.opacity = "1";
      linkDivEl.style.top = `${linkDivElTop}px`;
      linkDivEl.style.left = `${linkDivElLeft}px`;

      linkSpanEl.style.zIndex = "3";
      linkSpanEl.style.opacity = "1";
      linkSpanEl.style.top = `${rect.top - 6}px`;
      linkSpanEl.style.left = `${rect.left - 8}px`;

      if (linkDivElLeft < linkParentElBoundaries.left) {
        linkDivEl.style.left = `${linkParentElBoundaries.left + 8}px`;
      }
      if (
        linkDivElLeft >
        linkParentElBoundaries.right - linkDivEl.offsetWidth
      ) {
        linkDivEl.style.left = `${
          linkParentElBoundaries.right - linkDivEl.offsetWidth - 8
        }px`;
      }

      if (!Range.isCollapsed(selection))
        linkSpanEl.style.left = `${rect.left - 8 + rect.width / 2}px`;

      linkInputEl?.focus();
    }
  }, [editor, isVisible]);

  return (
    <div>
      <div
        ref={linkDivRef}
        className="absolute z-0 mb-5 rounded bg-accent text-sm opacity-0 brightness-200"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setLink("");
            handleShowLinkEditor(false);
          }
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isUrl(link)) onApply();
          }}
          className="flex items-center gap-3 rounded p-1"
        >
          <input
            ref={linkInputRef}
            value={link || ""}
            name="url"
            type="text"
            className="rounded bg-base-background p-2 outline-none placeholder:text-foreground/20"
            placeholder="Enter link url"
            onChange={onInputLinkChanged}
          />
          <div className="flex items-center gap-1">
            {link !== "" && (
              <button
                type="reset"
                className="flex size-4 items-center justify-center rounded border-y-2 border-r-2 border-foreground brightness-50 before:absolute before:mr-2 before:box-border before:h-[14px] before:w-4 before:rotate-45 before:rounded before:border-l-2 before:border-foreground after:absolute after:mr-2 after:box-border after:h-[14px] after:w-4 after:-rotate-45 after:rounded after:border-l-2 after:border-foreground hover:brightness-100"
                onClick={() => setLink("")}
              >
                <span className="mb-[2px]">✘</span>
              </button>
            )}
            <button
              type="submit"
              className={`flex size-6 items-center justify-center rounded-3xl text-2xl${
                isUrl(link)
                  ? "text-green-500 hover:bg-green-500 hover:text-background hover:brightness-100"
                  : "text-muted"
              }`}
              onMouseEnter={() => {
                if (!isUrl(link)) {
                  setShowLinkTooltip(true);
                }
              }}
              onMouseLeave={() => setShowLinkTooltip(false)}
            >
              ✔
            </button>
          </div>
          <div
            className={`${
              showLinkTooltip ? "flex" : "hidden"
            } absolute bottom-[110%] mr-3 rounded-t bg-base-background px-3 py-2 font-semibold text-red-950 after:absolute after:left-0 after:top-full after:mr-3 after:border-8 after:border-solid after:border-[oklch(var(--base-background))_transparent_transparent_transparent] dark:text-red-500`}
          >
            <p className="whitespace-nowrap">not a valid link!</p>
          </div>
        </form>
      </div>
      <span
        ref={linkSpanRef}
        className="absolute z-0 border-8 border-solid border-[oklch(var(--accent))_transparent_transparent_transparent] opacity-0 brightness-200"
      />
    </div>
  );
}
