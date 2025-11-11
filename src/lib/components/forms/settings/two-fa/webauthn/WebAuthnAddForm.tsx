import { KeyRoundIcon } from "lucide-react";
import { FormEvent } from "react";

import { registerPasskey } from "@/lib/utils/helper";

export default function WebAuthnAddForm({
  setIsPasskey
}: {
  setIsPasskey: (value: boolean) => void;
}) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resOk = await registerPasskey();
    if (resOk) setIsPasskey(true);
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-2"
    >
      <span className="flex gap-2">
        <KeyRoundIcon />
        <label>Passkey</label>
      </span>
      <button type="submit" className="btn-solid-base-rounder">
        Add
      </button>
    </form>
  );
}
