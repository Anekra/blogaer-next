import { useState, FormEvent, Dispatch, SetStateAction } from "react";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import EmailStatusDialog from "@/lib/components/dialogs/EmailStatusDialog";
import { DialogTrigger } from "@/lib/components/ui/dialog";
import { Input } from "@/lib/components/ui/input";
import { useSession } from "@/lib/contexts/SessionContext";
import { CommonDto, EmailUsernameRequestDto } from "@/lib/types/dto/CommonDto";
import { EmailSubject, EmailInfo } from "@/lib/utils/enums";

export default function RequestUsernameForm({
  requests: [req, setReq]
}: {
  requests: [
    EmailUsernameRequestDto,
    Dispatch<SetStateAction<EmailUsernameRequestDto>>
  ];
}) {
  const { session } = useSession();
  const [confirmed, setConfirmed] = useState(false);
  const [info, setInfo] = useState("");
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setConfirmed(true);
    const resJson: CommonDto = await getClientFetch(
      `/email/user/${EmailSubject.UpdateUsername}`
    );
    if (resJson.error) {
      setInfo(resJson.error);
    } else {
      setInfo(EmailInfo.Success);
      setReq({
        emailRequest: req?.emailRequest || false,
        usernameRequest: true
      });
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <Input
        type="text"
        name="username"
        id="user-username"
        className={`${!req.emailRequest ? "group-hover:ring-2" : "group-hover:ring-0"} peer border-transparent bg-transparent ring-offset-0 transition-[width] duration-300 disabled:cursor-default disabled:text-foreground group-hover:hidden group-hover:bg-base-background/60 group-hover:ring-neutral-300 sm:group-hover:block md:group-hover:hidden lg:group-hover:block`}
        defaultValue={session?.username || ""}
        disabled
      />
      {!req.usernameRequest && (
        <EmailStatusDialog
          contents={[
            "Request Username",
            "An email containing a link to change your username will be sent to your current email address. Are you sure you want to make this request?",
            "Request"
          ]}
          confirmState={[confirmed, setConfirmed]}
          info={info}
          handleOnSubmit={handleOnSubmit}
        >
          <DialogTrigger className="btn-outline-base hidden text-nowrap group-hover:flex">
            Request change
          </DialogTrigger>
        </EmailStatusDialog>
      )}
    </div>
  );
}
