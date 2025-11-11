import { FormEvent } from "react";
import { toast } from "sonner";

import deleteClientFetch from "@/lib/actions/client/deleteClientFetch";
import { DialogClose } from "@/lib/components/ui/dialog";

export default function WebAuthnDeleteForm({
  setIsPasskey
}: {
  setIsPasskey: (value: boolean) => void;
}) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await deleteClientFetch("/user/security/two-fa/passkey");
    setIsPasskey(false);
    toast.success("Passkey deleted.", {
      position: "bottom-right",
      duration: 1500
    });
  };

  return (
    <form method="post" onSubmit={handleSubmit} className="mt-6 flex gap-6">
      <DialogClose className="btn-outline-base flex-1">Cancel</DialogClose>
      <DialogClose className="btn-solid-destructive flex-1" type="submit">
        Delete
      </DialogClose>
    </form>
  );
}
