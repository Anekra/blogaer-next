import { Dispatch, FormEvent, ReactNode, SetStateAction } from "react";

import { Dialog } from "@/lib/components/ui/dialog";

import ConfirmDialogContent from "./dialog-contents/ConfirmDialogContent";
import EmailStatusDialogContent from "./dialog-contents/EmailStatusDialogContent";

export default function EmailStatusDialog({
  children: trigger,
  contents,
  confirmState: [confirmed, setConfirmed],
  info,
  handleOnSubmit
}: {
  children: ReactNode;
  contents: string[];
  confirmState: [boolean, Dispatch<SetStateAction<boolean>>];
  info: string;
  handleOnSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  return (
    <Dialog
      onOpenChange={(opened) => {
        if (!opened) setConfirmed(opened);
      }}
    >
      {trigger}
      {confirmed ? (
        <EmailStatusDialogContent info={info} />
      ) : (
        <ConfirmDialogContent
          contents={contents}
          handleOnSubmit={handleOnSubmit}
        />
      )}
    </Dialog>
  );
}
