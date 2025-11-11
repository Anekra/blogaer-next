import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { Input } from "../ui/input";

export default function ResendEmailDialog({
  children: trigger,
  contents: [title, description, submitText]
}: {
  children: ReactNode;
  contents: string[];
}) {
  return (
    <Dialog>
      {trigger}
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form action="#" className="flex flex-col gap-4">
          <div>
            <label htmlFor="email">Email address</label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <button type="submit" className="btn-solid-p-rounder">
            {submitText}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
