"use client";
import React from "react";
import useSWRImmutable from "swr/immutable";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import ChangePassSection from "@/lib/components/sections/settings/security/ChangePassSection";
import OauthSection from "@/lib/components/sections/settings/security/OauthSection";
import TwoFASection from "@/lib/components/sections/settings/security/TwoFASection";
import { GetSecuritySectionDto } from "@/lib/types/dto/ResDto";

export default function SecurityGroup() {
  const { data: res } = useSWRImmutable<GetSecuritySectionDto>(
    "/user/security",
    getClientFetch
  );

  return (
    <main className="grid w-full max-w-screen-2xl grid-cols-12 gap-8 px-6 py-4 lg:px-8">
      <TwoFASection data={res?.data?.userTwoFA} />
      <ChangePassSection
        isPassword={res?.data?.userPassword}
        userRequest={res?.data?.userRequest}
      />
      <OauthSection data={res?.data?.userOauth} />
    </main>
  );
}
