import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Link } from "next-view-transitions";
import React from "react";

import SaveAndPublishBtn from "@/lib/components/buttons/SaveAndPublishBtn";
import ViewPostBtn from "@/lib/components/buttons/ViewPostBtn";
import ProfileDropdown from "@/lib/components/dropdowns/ProfileDropdown";
import PostPreviewDrawer from "@/lib/components/post/PostPreviewDrawer";
import AutoSaveSwitch from "@/lib/components/widgets/AutoSaveSwitch";
import SearchBar from "@/lib/components/widgets/SearchBar";
import ThemeSwitch from "@/lib/components/widgets/ThemeSwitch";
import { useSession } from "@/lib/contexts/SessionContext";
import { getSlugFromPath } from "@/lib/utils/helper";

export default function NavItems({ isAtTheTop }: { isAtTheTop: boolean }) {
  const currentPath = usePathname();
  const slug = getSlugFromPath(currentPath);
  const { session } = useSession();
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <nav className="flex items-center justify-between gap-6 md:grow">
      {(currentPath.startsWith("/blog/post/edit/draft/") ||
        currentPath === "/blog/post/create") && <AutoSaveSwitch />}
      <div className="hidden items-center justify-end justify-self-end md:flex md:grow md:gap-4">
        {(currentPath === "/home" || currentPath === "/blog/explore") && (
          <SearchBar />
        )}
        {session && (
          <div className="flex items-center gap-4">
            {(currentPath.startsWith("/blog/post/edit/draft/") ||
              currentPath === "/blog/post/create") && (
              <React.Fragment>
                <PostPreviewDrawer />
              </React.Fragment>
            )}
            {(currentPath === "/home" ||
              currentPath === `/blog/post/published`) && (
              <Link href="/blog/post/create">
                <button className="btn-solid-p">
                  <span>Create Post</span>
                </button>
              </Link>
            )}
            {currentPath === `/blog/post/edit/published/${slug}` && (
              <React.Fragment>
                <ViewPostBtn session={session} slug={slug} />
                <SaveAndPublishBtn slug={slug} />
              </React.Fragment>
            )}
            <ProfileDropdown />
          </div>
        )}
        {session === null && (
          <div className="flex items-center gap-4">
            <div className="flex h-8 w-16 items-center justify-between">
              <ThemeSwitch
                width="w-16"
                padding="p-1"
                transform="translate-x-[130%]"
                setTheme={setTheme}
                resolvedTheme={resolvedTheme}
              />
            </div>
            <Link href="/login">
              <button
                className={`${
                  isAtTheTop && currentPath === "/"
                    ? "btn-outline-root"
                    : "btn-outline-p"
                }`}
              >
                <span>LOGIN</span>
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
