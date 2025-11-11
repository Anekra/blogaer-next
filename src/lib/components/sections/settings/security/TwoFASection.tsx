"use client";
import { KeyRoundIcon, ShieldAlertIcon } from "lucide-react";
import { useEffect, useState } from "react";

import AuthAppAddDialog from "@/lib/components/dialogs/auth-app/AuthAppAddDialog";
import AuthAppDeleteDialog from "@/lib/components/dialogs/auth-app/AuthAppDeleteDialog";
import UserTwoFADialog from "@/lib/components/dialogs/UserTwoFADialog";
import WebAuthnDeleteDialog from "@/lib/components/dialogs/webauthn/WebAuthnDeleteDialog";
import TwoFAMethodsSelect from "@/lib/components/dropdowns/selects/TwoFAMethodsSelect";
import WebAuthnAddForm from "@/lib/components/forms/settings/two-fa/webauthn/WebAuthnAddForm";
import OnOffSwitch from "@/lib/components/widgets/OnOffSwitch";
import { TwoFADto } from "@/lib/types/dto/CommonDto";

export default function TwoFASection({ data }: { data?: TwoFADto }) {
  const [currentData, setCurrentData] = useState(data);
  const handleDataChange = (updatedData: Partial<TwoFADto>) => {
    setCurrentData((prevData) => ({ ...prevData, ...updatedData }));
  };
  const setIsPasskey = (value: boolean) => {
    handleDataChange({ isPasskey: value });
  };
  const setIsAuthApp = (value: boolean) => {
    handleDataChange({ isAuthApp: value });
  };
  const handleTwoFAMethodChange = (value: string) => {
    handleDataChange({ twoFAMethod: value });
  };

  useEffect(() => {
    setCurrentData(data);
  }, [data]);

  return (
    <section className="col-span-12 flex min-w-[420px] flex-col gap-2 rounded-lg ql:col-span-6">
      <h2 className="text-lg font-bold">Two Factor Authentications</h2>
      <div className="glass-container flex flex-col items-center gap-6 p-6 [&>*]:w-full [&>*]:max-w-[538px]">
        <div className="neu-base flex flex-col rounded">
          <h3 className="rounded-t-sm bg-base-foreground/10 px-4 py-2 text-center font-semibold">
            Overview
          </h3>
          <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center justify-between gap-2">
              <p>2 FA status</p>
              {currentData?.isPasskey || currentData?.isAuthApp ? (
                <OnOffSwitch on={currentData.isTwoFAEnabled} />
              ) : (
                <div className="group cursor-default">
                  <span className="flex gap-2 py-2 text-muted-foreground group-hover:hidden">
                    No methods have been added
                    <ShieldAlertIcon />
                  </span>
                  <UserTwoFADialog setIsPasskey={setIsPasskey} />
                </div>
              )}
            </div>
            {currentData?.isPasskey && currentData?.isAuthApp && (
              <div className="flex items-center justify-between gap-2">
                <p>Preferred 2 FA method</p>
                <TwoFAMethodsSelect
                  twoFAMethod={currentData.twoFAMethod}
                  handleOptionChange={handleTwoFAMethodChange}
                />
              </div>
            )}
          </div>
        </div>
        <div className="neu-base flex flex-col rounded">
          <h3 className="rounded-t-sm bg-base-foreground/10 px-4 py-2 text-center font-semibold">
            Methods
          </h3>
          <div className="flex flex-col gap-4 p-4">
            {currentData?.isPasskey ? (
              <div className="flex items-center justify-between gap-2">
                <span className="flex gap-2">
                  <KeyRoundIcon />
                  <label>Passkey</label>
                </span>
                <WebAuthnDeleteDialog setIsPasskey={setIsPasskey} />
              </div>
            ) : (
              <WebAuthnAddForm setIsPasskey={setIsPasskey} />
            )}
            {currentData?.isAuthApp ? (
              <AuthAppDeleteDialog setIsAuthApp={setIsAuthApp} />
            ) : (
              <AuthAppAddDialog />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
