import { langs } from "@uiw/codemirror-extensions-langs";
import ReactCodeMirror from "@uiw/react-codemirror";
import { ReactEditor, RenderElementProps, useSlate } from "slate-react";

import { getElement, removeElement, setCodeElement } from "@/lib/utils/helper";

export default function PostCodeEditor({
  attributes,
  element,
  children
}: RenderElementProps) {
  const editor = useSlate();
  const path = ReactEditor.findPath(editor, element);
  const currentElement = getElement(editor);
  const isFocus = element === currentElement;

  return (
    <code {...attributes} contentEditable={false}>
      <ReactCodeMirror
        data-slate-editor
        value={element.code}
        height="200px"
        theme={"dark"}
        extensions={[langs.javascript()]}
        basicSetup={{
          foldGutter: false,
          dropCursor: true,
          allowMultipleSelections: false,
          indentOnInput: false
        }}
        onChange={(val) => setCodeElement(editor, val)}
        onFocus={() => {
          if (!path) return;
          editor.select(path);
        }}
        onKeyDown={(e) => {
          e.preventDefault();
          if (e.key.match("Backspace")) {
            if (!editor.selection) return;
            const previousPoint = editor.before(editor.selection);
            if (!previousPoint) return;
            removeElement(editor);
            editor.select(previousPoint);
            ReactEditor.focus(editor);
          }
        }}
        autoFocus={isFocus}
      />
      <span className="hidden">{children}</span>
    </code>
  );
}
