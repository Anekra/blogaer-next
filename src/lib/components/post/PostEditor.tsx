"use client";
import isHotkey from "is-hotkey";
import { usePathname } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Descendant, createEditor } from "slate";
import { withHistory } from "slate-history";
import { Editable, ReactEditor, Slate, withReact } from "slate-react";

import patchClientFetch from "@/lib/actions/client/patchClientFetch";
import postClientWithResFetch from "@/lib/actions/client/postClientWithResFetch";
import PostLinkEditor from "@/lib/components/post/PostLinkEditor";
import PostWysiwyg from "@/lib/components/post/PostWysiwyg";
import { useContent } from "@/lib/contexts/ContentContext";
import useEditorConfig from "@/lib/hooks/useEditorConfig";
import useSelection from "@/lib/hooks/useSelection";
import { DraftDto } from "@/lib/types/dto/DraftDto";
import { PostDto } from "@/lib/types/dto/PostDto";
import { PostWithResIdDto } from "@/lib/types/dto/ResDto";
import { CustomElement } from "@/lib/types/slate";
import { INITIAL_VALUE, VOIDS } from "@/lib/utils/constants";
import { HotKey } from "@/lib/utils/enums";
import {
  collapseSelection,
  getElementType,
  serializeContent,
  toggleStyle
} from "@/lib/utils/helper";

export default function PostEditor({
  post,
  children
}: {
  post?: PostDto | DraftDto;
  children?: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const currentPath = usePathname();
  const { content, setContent, setIsDoneEditing, setTags } = useContent();
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const { renderElement, renderLeaf } = useEditorConfig(editor);
  const [selection, setSelection] = useSelection(editor);
  const [showLinkEditor, setShowLinkEditor] = useState(false);
  const [currentId, setCurrentId] = useState<string | undefined>("");
  const elementType = getElementType(editor);
  const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleShowLinkEditor = (visible: boolean) => {
    setShowLinkEditor(visible);

    if (!visible) collapseSelection(editor);
  };
  const onChangeHandler = useCallback(
    async (value: Descendant[]) => {
      if (currentPath !== "/blog/post/create") {
        setContent(value as CustomElement[]);
        setSelection(editor.selection);
        const isASTChange = editor.operations.some(
          (op) => op.type !== "set_selection"
        );
        if (isASTChange) {
          const content = JSON.stringify(value);
          localStorage.setItem("content", content);
        }
      }
    },
    [editor, setContent, setSelection, currentPath]
  );
  const onValueChangeHandler = useCallback(
    async (value: Descendant[]) => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
      setIsDoneEditing(false);

      debounceTimeoutRef.current = setTimeout(async () => {
        const title = `${value[0]?.children[0]?.text.trim().replaceAll(" ", "-") || ""}`;
        console.log(`Debounced: Saving new draft with title: "${title}"`);
        if (currentPath === "/blog/post/create") {
          try {
            const resJson = await postClientWithResFetch<PostWithResIdDto>(
              "/draft",
              {
                title,
                text: serializeContent(value),
                content: value
              }
            );
            history.replaceState(
              null,
              "",
              `/blog/post/edit/draft/${resJson.data?.id}`
            );
            setCurrentId(resJson.data?.id);
            setIsDoneEditing(true);
            debounceTimeoutRef.current = null;
          } catch (error) {
            setIsDoneEditing(true);
            console.error("Failed to create draft:", error);
          }
        }
        if (
          currentId &&
          currentPath.startsWith(`/blog/post/edit/draft/${currentId}`)
        ) {
          try {
            await patchClientFetch(
              {
                id: currentId,
                title,
                text: serializeContent(value),
                content: value
              },
              `/draft/${currentId}`
            );
            console.log("patching draft");
            setIsDoneEditing(true);
            debounceTimeoutRef.current = null;
          } catch (_) {
            setIsDoneEditing(true);
            debounceTimeoutRef.current = null;
          }
        }
      }, 5000);
    },
    [currentPath, setIsDoneEditing, currentId]
  );

  useEffect(() => {
    if (
      typeof localStorage !== "undefined" &&
      localStorage.getItem("content") != null
    ) {
      setContent(post?.content || INITIAL_VALUE);
    }
    if (post?.id) setCurrentId(post.id);
    if (post && "tags" in post) setTags(post.tags);
    setIsMounted(true);

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [setContent, post, setTags]);

  if (isMounted) {
    return (
      <Slate
        editor={editor}
        initialValue={content}
        onChange={onChangeHandler}
        onValueChange={onValueChangeHandler}
      >
        <section className="flex w-2/12 flex-col gap-2" id="wysiwyg-toolbar">
          <PostWysiwyg
            isLinkEditorOpen={showLinkEditor}
            handleShowLinkEditor={handleShowLinkEditor}
          />
        </section>
        <article
          className={`${children != null ? "xl:w-8/12" : "w-10/12"} rounded px-4`}
          id="story-form"
        >
          <PostLinkEditor
            handleShowLinkEditor={handleShowLinkEditor}
            isVisible={showLinkEditor}
          />
          <Editable
            className="flex flex-col gap-6 outline-none"
            renderElement={(props) => renderElement(props, editor)}
            renderLeaf={renderLeaf}
            onFocus={() => setSelection(selection)}
            onKeyDown={(e) => {
              Object.keys(HotKey).forEach((key) => {
                if (isHotkey(key, e)) {
                  e.preventDefault();
                  const style = HotKey[key as keyof typeof HotKey];
                  toggleStyle(editor, style);
                }
              });
              if (VOIDS.includes(`${elementType}`)) {
                if (e.key.match("Backspace")) {
                  e.preventDefault();
                  if (!editor.selection) return;
                  const previousPoint = editor.before(editor.selection);
                  if (!previousPoint) return;
                  editor.delete();
                  editor.select(previousPoint);
                  ReactEditor.focus(editor);
                }
              }
            }}
          />
        </article>
        {children != null &&
          currentPath.startsWith("/blog/post/edit/published/") && (
            <section className="xl:w-2/12">{children}</section>
          )}
      </Slate>
    );
  }
}
