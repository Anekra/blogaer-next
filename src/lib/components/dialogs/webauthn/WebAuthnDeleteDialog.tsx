import { TrashIcon } from "lucide-react";

import WebAuthnDeleteForm from "@/lib/components/forms/settings/two-fa/webauthn/WebAuthnDeleteForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@/lib/components/ui/dialog";

export default function WebAuthnDeleteDialog({
  setIsPasskey
}: {
  setIsPasskey: (value: boolean) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger className="btn-outline-destructive-rounder p-2">
        <span className="relative flex items-center justify-center">
          <TrashIcon className="p-px" />
          <p className="absolute mr-px mt-px text-xs">x</p>
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete Passkey</DialogTitle>
        <DialogDescription>
          Are you sure want to delete this passkey from this device? this action
          cannot be undone!
        </DialogDescription>
        <WebAuthnDeleteForm setIsPasskey={setIsPasskey} />
      </DialogContent>
    </Dialog>
  );
}
