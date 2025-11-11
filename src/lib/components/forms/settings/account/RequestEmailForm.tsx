import { Dispatch, FormEvent, SetStateAction, useState } from "react";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import EmailStatusDialog from "@/lib/components/dialogs/EmailStatusDialog";
import { DialogTrigger } from "@/lib/components/ui/dialog";
import { Input } from "@/lib/components/ui/input";
import { useSession } from "@/lib/contexts/SessionContext";
import { CommonDto, EmailUsernameRequestDto } from "@/lib/types/dto/CommonDto";
import { EmailInfo, EmailSubject } from "@/lib/utils/enums";

export default function RequestEmailForm({
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
      `/email/user/${EmailSubject.UpdateEmail}`
    );
    if (resJson.error) {
      setInfo(resJson.error);
    } else {
      setInfo(EmailInfo.Success);
      setReq({
        emailRequest: true,
        usernameRequest: req?.usernameRequest || false
      });
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <Input
        type="text"
        name="email"
        id="user-email"
        className={`${!req.emailRequest ? "group-hover:ring-2" : "group-hover:ring-0"} peer border-transparent bg-transparent ring-offset-0 transition-[width] duration-300 disabled:cursor-default disabled:text-foreground group-hover:hidden group-hover:bg-base-background/60 group-hover:ring-neutral-300 sm:group-hover:block md:group-hover:hidden lg:group-hover:block`}
        defaultValue={session?.email || ""}
        disabled
      />
      {!req.emailRequest && (
        <EmailStatusDialog
          contents={[
            "Request Email",
            "An email containing a link to change your email will be sent to your current email address. Are you sure you want to make this request?",
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
