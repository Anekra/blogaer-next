import { TrashIcon, SmartphoneIcon } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import deleteClientFetch from "@/lib/actions/client/deleteClientFetch";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/lib/components/ui/dialog";

export default function AuthAppDeleteDialog({
  setIsAuthApp
}: {
  setIsAuthApp: (value: boolean) => void;
}) {
  const [dialogOpened, setDialogOpened] = useState(false);
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resOk = await deleteClientFetch("/user/security/two-fa/auth-app");
    if (resOk) {
      setDialogOpened(false);
      setIsAuthApp(false);
      toast.success("Authenticator app deleted.", {
        position: "bottom-right",
        duration: 1500
      });
    }
  };

  return (
    <Dialog open={dialogOpened} onOpenChange={setDialogOpened}>
      <div className="flex justify-between gap-4">
        <span className="flex gap-2">
          <SmartphoneIcon />
          <label>Authenticator app</label>
        </span>
        <DialogTrigger className="btn-outline-destructive-rounder p-2">
          <span className="relative flex items-center justify-center">
            <TrashIcon className="p-px" />
            <p className="absolute mr-px mt-px text-xs">x</p>
          </span>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogTitle>Delete Authenticator App</DialogTitle>
        <DialogDescription>
          Are you sure want delete this authenticator app? this action cannot be
          undone!
        </DialogDescription>
        <form
          method="post"
          className="mt-6 flex gap-6"
          onSubmit={handleOnSubmit}
        >
          <DialogClose className="btn-outline-base flex-1">Cancel</DialogClose>
          <button className="btn-solid-destructive flex-1" type="submit">
            Delete
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
