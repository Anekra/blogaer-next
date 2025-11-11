import { UploadCloud } from "lucide-react";
import React, { useRef } from "react";
import { useSlate } from "slate-react";

import useImageUpload from "@/lib/hooks/useImageUpload";

export default function ImgUploadBtn() {
  const editor = useSlate();
  const inputImgRef = useRef<HTMLInputElement>(null);

  return (
    <button
      className="relative flex size-[200px] flex-col items-center justify-center rounded border hover:border-primary-foreground hover:text-primary-foreground"
      onClick={(e) => {
        e.preventDefault();
        inputImgRef.current?.click();
      }}
    >
      <input
        ref={inputImgRef}
        type="file"
        name="image"
        accept="image/png, image/gif, image/jpeg"
        className="hidden"
        onChange={useImageUpload(editor)}
      />
      <UploadCloud className="h-auto w-20" />
      <label>Upload Image</label>
      <p className="absolute inset-x-0 bottom-0 text-sm text-yellow-500/50">
        &quot;requires subscription&quot;
      </p>
    </button>
  );
}
