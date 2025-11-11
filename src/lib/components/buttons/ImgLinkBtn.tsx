import { Link2 } from "lucide-react";
import React, { useRef } from "react";
import { useSlate } from "slate-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/lib/components/ui/dialog";
import { Input } from "@/lib/components/ui/input";
import { Label } from "@/lib/components/ui/label";
import { setImageElement } from "@/lib/utils/helper";

export default function ImgLinkBtn() {
  const editor = useSlate();
  const linkRef = useRef<HTMLInputElement>(null);
  const captionRef = useRef<HTMLInputElement>(null);
  const altRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog>
      <DialogTrigger className="flex size-[200px] flex-col items-center justify-center rounded border hover:border-primary-foreground hover:text-primary-foreground">
        <label className="order-2">Insert Image Link</label>
        <input type="file" name="image" className="hidden" />
        <Link2 className="h-auto w-20" />
      </DialogTrigger>
      <DialogContent className="bg-base-background">
        <DialogHeader>
          <DialogTitle>Add image link</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="imgLink" className="text-left">
              Link
            </Label>
            <Input
              ref={linkRef}
              id="imgLink"
              placeholder="Image link"
              className="col-span-5"
            />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="imgCaption" className="text-left">
              Caption
            </Label>
            <Input
              ref={captionRef}
              id="imgCaption"
              placeholder="Image caption"
              className="col-span-5"
            />
          </div>
          <div className="grid grid-cols-6 items-center gap-4">
            <Label htmlFor="imgAlt" className="text-left">
              Name
            </Label>
            <Input
              ref={altRef}
              id="imgAlt"
              placeholder="Image alt name"
              className="col-span-5"
            />
          </div>
        </div>
        <DialogFooter>
          <button
            className="btn-solid-p"
            onClick={() => {
              const link = linkRef.current?.value || "";
              const caption = captionRef.current?.value || "";
              const alt = altRef.current?.value || "";
              setImageElement(editor, link, caption, alt);
            }}
          >
            Add image
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
