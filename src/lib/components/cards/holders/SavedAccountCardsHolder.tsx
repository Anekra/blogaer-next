"use client";
import React, { useEffect, useState } from "react";
import useSWRImmutable from "swr/immutable";

import getClientFetch from "@/lib/actions/client/getClientFetch";
import GithubLoginBtn from "@/lib/components/buttons/GithubLoginBtn";
import GoogleLoginBtn from "@/lib/components/buttons/GoogleLoginBtn";
import SavedAccountCard from "@/lib/components/cards/SavedAccountCard";
import LoginForm from "@/lib/components/forms/LoginForm";
import { SavedAccountsDto } from "@/lib/types/dto/CommonDto";
import { GetSavedAccounts } from "@/lib/types/dto/ResDto";

export default function SavedAccountCardsHolder() {
  const [isSavedAccounts, setIsSavedAccounts] = useState(true);
  const [currentData, setCurrentData] = useState<SavedAccountsDto[] | null>(
    null
  );
  const handleOnClick = () => setIsSavedAccounts(false);
  const { data: res } = useSWRImmutable<GetSavedAccounts>(
    `/saved-accounts/`,
    getClientFetch
  );

  useEffect(() => {
    if (res?.data) setCurrentData(res.data);
  }, [setCurrentData, res]);

  return (
    <React.Fragment>
      {currentData && currentData?.length > 0 && isSavedAccounts ? (
        currentData.map((account, i) => (
          <SavedAccountCard
            index={i}
            account={account}
            savedAccounts={currentData}
            setSavedAccounts={setCurrentData}
            key={i}
          />
        ))
      ) : (
        <LoginForm />
      )}
      <div className="flex flex-col gap-4">
        <div className="mt-2 flex items-center">
          <hr className="from-foreground h-1 w-full border-none bg-gradient-to-l" />
          <p className="w-fit shrink-0 px-2 text-center text-sm">
            {currentData && currentData?.length > 0 && isSavedAccounts
              ? "Or"
              : "Or login with"}
          </p>
          <hr className="from-foreground h-1 w-full border-none bg-gradient-to-r" />
        </div>
        <div className="flex justify-center gap-6 p-4">
          {currentData && currentData?.length > 0 && isSavedAccounts ? (
            <button
              className="btn-outline-p bg-background/50"
              onClick={handleOnClick}
            >
              Login with different account
            </button>
          ) : (
            <React.Fragment>
              <GoogleLoginBtn />
              <GithubLoginBtn />
            </React.Fragment>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
