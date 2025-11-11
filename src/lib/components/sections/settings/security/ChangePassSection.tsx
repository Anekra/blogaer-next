import { FormEvent, useEffect, useState } from "react";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import EmailStatusDialog from "@/lib/components/dialogs/EmailStatusDialog";
import { DialogTrigger } from "@/lib/components/ui/dialog";
import CountdownTimer from "@/lib/components/widgets/CountdownTimer";
import { CommonDto, UserRequestDto } from "@/lib/types/dto/CommonDto";
import { EmailInfo, EmailSubject } from "@/lib/utils/enums";

export default function ChangePassSection({
  isPassword,
  userRequest
}: {
  isPassword?: boolean;
  userRequest?: UserRequestDto;
}) {
  const [info, setInfo] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const contents = [
    isPassword ? "Request Reset Password" : "Request Add Password",
    `An email containing a link to ${isPassword ? "reset your password" : "add a new password"} will sent your current email address. Are you sure you want to make this request?`,
    "Request"
  ];
  const [timeLimit, setTimeLimit] = useState(userRequest?.limit);
  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setConfirmed(true);
    const emailSubject = isPassword
      ? EmailSubject.ResetPassword
      : EmailSubject.AddPassword;
    const resJson: CommonDto = await getClientFetch(
      `/email/user/${emailSubject}`
    );
    if (resJson.data) setTimeLimit(resJson.data.limit);
    resJson.error ? setInfo(resJson.error) : setInfo(EmailInfo.Success);
  };

  useEffect(() => {
    if (userRequest?.limit) setTimeLimit(userRequest.limit);
  }, [userRequest]);

  return (
    <section className="col-span-12 flex min-w-[380px] flex-col gap-2 rounded-lg ql:col-span-6">
      <h2 className="text-lg font-bold">
        {isPassword ? "Change Password" : "Add New Password"}
      </h2>
      <div className="glass-container flex flex-1 p-6">
        <div className="neu-base flex flex-col gap-6 rounded p-4">
          <p>
            {userRequest
              ? "Email already been sent. Please check your email complete your password request process before the remaining time below ends."
              : `
          An email will be sent to your registered email address. This email
          will contain a link to
          ${
            isPassword
              ? " update your existing password."
              : " create a new password."
          }
          `}
          </p>
          <div className="flex h-full items-center justify-center">
            {timeLimit ? (
              <CountdownTimer timeLimit={timeLimit}>
                <EmailStatusDialog
                  contents={contents}
                  confirmState={[confirmed, setConfirmed]}
                  info={info}
                  handleOnSubmit={handleOnSubmit}
                >
                  <DialogTrigger className="btn-solid-p-rounder">
                    Request again
                  </DialogTrigger>
                </EmailStatusDialog>
              </CountdownTimer>
            ) : (
              <EmailStatusDialog
                contents={contents}
                confirmState={[confirmed, setConfirmed]}
                info={info}
                handleOnSubmit={handleOnSubmit}
              >
                <DialogTrigger className="btn-solid-p-rounder p-6">
                  {isPassword
                    ? "Request change password"
                    : "Request new password"}
                </DialogTrigger>
              </EmailStatusDialog>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
