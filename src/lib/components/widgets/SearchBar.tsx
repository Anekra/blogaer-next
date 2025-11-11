import { useRef, useState } from "react";

import SearchIcon from "@/lib/components/icons/SearchIcon";
import { Input } from "@/lib/components/ui/input";

export default function SearchBar() {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <div className="flex grow justify-center md:px-5 lg:px-16">
      <div
        id="search-bar"
        className="relative flex w-full max-w-[600px] items-center justify-end rounded-lg bg-primary-foreground p-1 hover:brightness-125"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget))
            setIsSearchFocused(false);
        }}
      >
        <Input
          ref={searchRef}
          type="search"
          placeholder="Search"
          className={`${
            isSearchFocused ? "mr-10 flex bg-background" : "w-9 bg-transparent"
          } h-fit w-full rounded-lg border-none py-[6px] outline-none transition-all duration-300 focus-visible:ring-0 md:mr-10 md:flex md:bg-background`}
          onBlur={() => searchRef.current?.blur()}
        />
        <button
          className={`${
            isSearchFocused
              ? "bg-transparent active:text-foreground"
              : "bg-primary-foreground"
          } absolute box-content rounded-lg p-[6px] text-2xl text-primary`}
          onClick={() => {
            if (!isSearchFocused) {
              searchRef.current?.focus();
              setIsSearchFocused(true);
            }
          }}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}
