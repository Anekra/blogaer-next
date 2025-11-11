import { FormEvent } from "react";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/lib/components/ui/dialog";

export default function ConfirmDialogContent({
  contents: [title, description, submitText],
  handleOnSubmit
}: {
  contents: string[];
  handleOnSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <form
        className="mt-6 flex justify-between gap-4 *:basis-full"
        onSubmit={handleOnSubmit}
      >
        <DialogClose type="button" className="btn-outline-base-rounder">Cancel</DialogClose>
        <button type="submit" className="btn-solid-p-rounder">
          {submitText}
        </button>
      </form>
    </DialogContent>
  );
}
