"use client";
import { PenIcon, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";

import DescriptionForm from "@/lib/components/forms/settings/account/DescriptionForm";
import NameForm from "@/lib/components/forms/settings/account/NameForm";
import ProfileBannerForm from "@/lib/components/forms/settings/account/ProfileBannerForm";
import ProfileImgForm from "@/lib/components/forms/settings/account/ProfileImgForm";
import RequestEmailForm from "@/lib/components/forms/settings/account/RequestEmailForm";
import RequestUsernameForm from "@/lib/components/forms/settings/account/RequestUsernameForm";
import { EmailUsernameRequestDto } from "@/lib/types/dto/CommonDto";

const defaultRequests = {
  emailRequest: false,
  usernameRequest: false
};

export default function AccountSection({
  data
}: {
  data?: EmailUsernameRequestDto;
}) {
  const [requests, setRequests] = useState(defaultRequests);

  useEffect(() => {
    if (data) setRequests(data);
  }, [data]);
  return (
    <section className="flex grow flex-col gap-2 rounded-lg">
      <h2 className="text-lg font-bold">Account</h2>
      <div className="glass-container grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
        <div className="neu-base group flex flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold leading-8 text-accent-foreground">
            <span className="flex justify-center overflow-hidden rounded-3xl">
              <UserIcon className="bottom-px stroke-[2.5]" />
            </span>
            <label htmlFor="user-profile-img">Profile Picture</label>
          </div>
          <ProfileImgForm />
        </div>
        <div className="neu-base group flex flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="text-2xl">🖼</span>
            <label htmlFor="user-banner">Profile Banner</label>
          </div>
          <ProfileBannerForm />
        </div>
        <div className="neu-base group flex flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="text-2xl">🖂</span>
            <label htmlFor="user-email">Email</label>
            {requests?.emailRequest && (
              <p className="grow text-end text-sm text-yellow-500">
                request is pending...
              </p>
            )}
          </div>
          <RequestEmailForm requests={[requests, setRequests]} />
        </div>
        <div className="neu-base group flex shrink grow basis-0 flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="text-2xl font-semibold">@</span>
            <label htmlFor="user-username">Username</label>
            {requests?.usernameRequest && (
              <p className="grow text-end text-sm text-yellow-500">
                request is pending...
              </p>
            )}
          </div>
          <RequestUsernameForm requests={[requests, setRequests]} />
        </div>
        <div className="neu-base group flex shrink grow basis-0 flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="py-1">
              <PenIcon />
            </span>
            <label htmlFor="user-display-name">Display Name</label>
          </div>
          <NameForm />
        </div>
        <div className="neu-base group flex shrink grow basis-0 flex-col gap-1 rounded-md p-4 hover:bg-foreground/10">
          <div className="flex items-center gap-2 font-bold text-accent-foreground">
            <span className="text-2xl font-semibold">🗒</span>
            <label htmlFor="user-description">Short Description</label>
          </div>
          <DescriptionForm />
        </div>
      </div>
    </section>
  );
}
