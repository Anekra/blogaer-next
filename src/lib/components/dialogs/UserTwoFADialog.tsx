import { KeyRoundIcon, SmartphoneIcon } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/lib/components/ui/dialog";
import { registerPasskey } from "@/lib/utils/helper";

export default function UserTwoFADialog({
  setIsPasskey
}: {
  setIsPasskey: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const handleAddPasskey = async () => {
    const resOk = await registerPasskey();
    if (resOk) setIsPasskey(true);
    setOpen(false);
  };
  const handleAddAuthApp = () => {};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="btn-solid-base-rounder hidden shrink-0 group-hover:block">
        Add new method
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add 2 Factor Auth Method</DialogTitle>
          <DialogDescription>
            Choose a method to enable 2 factor authentication.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <button
            className="btn-outline-p flex flex-col items-center gap-2"
            onClick={handleAddPasskey}
          >
            <KeyRoundIcon size={100} />
            Passkey
          </button>
          <button
            className="btn-outline-s flex flex-col items-center gap-2"
            onClick={handleAddAuthApp}
          >
            <SmartphoneIcon size={100} />
            Authenticator app
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
