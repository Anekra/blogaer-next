"use client";
import useSWRImmutable from "swr/immutable";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import AccountSection from "@/lib/components/sections/settings/account/AccountSection";
import SocialsSection from "@/lib/components/sections/settings/account/SocialsSection";
import { GetAccountSectionDto } from "@/lib/types/dto/ResDto";

export default function AccountGroup() {
  const { data: res } = useSWRImmutable<GetAccountSectionDto>(
    "/user/account",
    getClientFetch
  );

  return (
    <main
      className={`flex w-full max-w-screen-xl flex-col gap-8 px-6 py-4 lg:px-8`}
    >
      <AccountSection data={res?.data?.userRequests} />
      <SocialsSection data={res?.data?.socials} />
    </main>
  );
}
