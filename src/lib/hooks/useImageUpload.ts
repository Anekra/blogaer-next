import React, { useCallback } from "react";
import { Transforms } from "slate";

import { SlateEditor } from "@/lib/types";
import { WysiwygType } from "@/lib/utils/enums";
import { convertFileToBase64 } from "@/lib/utils/helper";

export default function useImageUpload(editor: SlateEditor) {
  return useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { selection } = editor;
      if (!selection) return;

      const files = e.target.files;
      if (files?.length === 0) return;
      if (!files) return;
      const file = files[0];
      const base64 = await convertFileToBase64(file);

      const img = new Image();
      img.src = base64;
      if (!img) return;
      img.onload = () => {
        Transforms.setNodes(editor, {
          type: WysiwygType.Image,
          children: [{ text: "" }],
          imageName: "",
          imageCaption: "",
          imageBase64: base64
        });
      };
    },
    [editor]
  );
}
