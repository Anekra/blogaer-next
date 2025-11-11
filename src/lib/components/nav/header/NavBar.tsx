"use client";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";

import LogoIcon from "@/lib/components/icons/LogoIcon";
import NavItems from "@/lib/components/nav/header/NavItems";
import { useNavBar } from "@/lib/contexts/NavBarContext";

export default function NavBar() {
  const [isScrollingDown, setIsScrollingDown] = useState<boolean | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [scrollCount, setScrollCount] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const { setNavBarCollapsed } = useNavBar();
  const currentPath = usePathname().toLowerCase();
  const isRootPath = currentPath === "/";
  const isHeaderFixed = currentPath.startsWith("/blog/post");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true);
      if (!isHeaderFixed) {
        window.onscroll = () => {
          const currentY = window.scrollY;
          if (scrollCount < 2) setScrollCount(scrollCount + 1);
          if (scrollCount > 1) {
            if (prevY > currentY) {
              setIsScrollingDown(false);
              setNavBarCollapsed(false);
            } else if (prevY < currentY) {
              setIsScrollingDown(true);
              setNavBarCollapsed(true);
            }
          }
          setPrevY(currentY);
        };
      }
    }
  }, [prevY, isHeaderFixed, setNavBarCollapsed, scrollCount]);

  if (isMounted) {
    return (
      <header
        className={`${
          isRootPath
            ? "fixed"
            : isScrollingDown && !isHeaderFixed
              ? "fixed"
              : "sticky"
        } ${isScrollingDown && !isHeaderFixed && scrollCount > 1 ? "-translate-y-full" : "translate-y-0"} ${
          window.scrollY === 0 && isRootPath
            ? "bg-transparent"
            : "bg-background shadow-[0_1.5px_1px_0_rgb(0_0_0/0.3)]"
        } top-0 z-[8] flex h-[66px] w-screen items-center justify-between gap-6 px-6 py-2 transition-transform duration-500`}
      >
        <div className="flex gap-4">
          <button className="flex items-center rounded text-3xl active:bg-secondary md:hidden">
            <MenuIcon />
          </button>
          <Link href="/">
            <LogoIcon isAtTheTop={prevY === 0 && isRootPath} />
          </Link>
        </div>
        <NavItems isAtTheTop={prevY === 0 && isRootPath} />
      </header>
    );
  }
}
