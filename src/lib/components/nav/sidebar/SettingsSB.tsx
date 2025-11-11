"use client";
import {
  LayoutDashboardIcon,
  LockKeyholeIcon,
  PaletteIcon,
  UserIcon,
  WalletCardsIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useNavBar } from "@/lib/contexts/NavBarContext";

export default function SettingsSB() {
  const currentPath = usePathname();
  const { isNavBarCollapsed } = useNavBar();

  return (
    <aside className="relative">
      <nav
        className={`sticky mx-2 flex flex-col gap-4 lg:w-[150px]${isNavBarCollapsed ? " top-4" : " top-[82px]"}`}
      >
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-xl font-bold text-accent-foreground">Settings</h1>
          <div className="flex h-fit w-full flex-col text-sm lg:text-base [&>*]:rounded [&>*]:px-2 hover:[&>*]:bg-foreground/5">
            <Link
              href="/settings/account"
              className={`flex w-full flex-col items-center py-2 lg:items-start${
                currentPath === "/settings/account"
                  ? " pointer-events-none bg-foreground/25 font-bold"
                  : " text-muted-foreground hover:text-base-foreground"
              }`}
            >
              <span className="static text-[26px] leading-8 lg:hidden [&>*]:fill-none [&>*]:stroke-current">
                <UserIcon />
              </span>
              Account
            </Link>
            <Link
              href="/settings/security"
              className={`flex w-full flex-col items-center py-2 lg:items-start${
                currentPath === "/settings/security"
                  ? " pointer-events-none bg-foreground/25 font-bold"
                  : " text-muted-foreground hover:text-base-foreground"
              }`}
            >
              <span className="static text-xl lg:hidden">
                <LockKeyholeIcon />
              </span>
              Security
            </Link>
            <Link
              href="/settings/preferences"
              className={`flex w-full flex-col items-center py-2 lg:items-start${
                currentPath === "/settings/preferences"
                  ? " pointer-events-none bg-foreground/25 font-bold"
                  : " text-muted-foreground hover:text-base-foreground"
              }`}
            >
              <span className="static text-xl lg:hidden">
                <PaletteIcon />
              </span>
              Preferences
            </Link>
            <Link
              href="/settings/subscription"
              className={`flex w-full flex-col items-center py-2 lg:items-start${
                currentPath === "/settings/subscription"
                  ? " pointer-events-none bg-foreground/25 font-bold"
                  : " text-muted-foreground hover:text-base-foreground"
              }`}
            >
              <span className="static text-xl lg:hidden">
                <WalletCardsIcon />
              </span>
              Subscription
            </Link>
          </div>
        </div>
        <hr />
        <div>
          <Link
            href="/dashboard"
            className={`flex w-full flex-col items-center rounded p-2 text-sm hover:bg-foreground/5 lg:items-start lg:text-base${
              currentPath === "/settings/subscription"
                ? " pointer-events-none bg-foreground/25 font-bold"
                : " text-muted-foreground hover:text-base-foreground"
            }`}
          >
            <span className="static text-xl lg:hidden">
              <LayoutDashboardIcon />
            </span>
            <p className="flex gap-3">
              <span className="hidden lg:block">↩</span> Dashboard
            </p>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
