import { useCallback, useState } from "react";
import { BaseSelection } from "slate";

import { SlateEditor } from "@/lib/types";

export default function useSelection(
  editor: SlateEditor
): [BaseSelection, (newSelection: BaseSelection) => void] {
  const [selection, setSelection] = useState(editor.selection);
  const setSelections = useCallback(
    (newSelection: BaseSelection) => {
      setSelection(newSelection);
    },
    [setSelection]
  );

  return [selection, setSelections];
}
