import React from "react";

import NavBar from "@/lib/components/nav/header/NavBar";
import SettingsSB from "@/lib/components/nav/sidebar/SettingsSB";
import { NavBarProvider } from "@/lib/contexts/NavBarContext";

export default async function UserSettingsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <NavBarProvider>
      <NavBar />
      <div className="flex w-full max-w-screen-2xl">
        <SettingsSB />
        {children}
      </div>
    </NavBarProvider>
  );
}
