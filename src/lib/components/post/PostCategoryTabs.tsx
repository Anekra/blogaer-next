"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState } from "react";

import { CATEGORIES } from "@/lib/utils/constants";

export default function PostCategoryTabs() {
  const [scrollValue, setScrollValue] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollEl = scrollRef.current;
  const maxScroll = (scrollEl?.scrollWidth || 0) - (scrollEl?.clientWidth || 0);

  return (
    <div className="relative h-16">
      <div
        className={`absolute inset-y-1 left-0 z-[1] w-auto bg-gradient-to-r from-background via-background/60 to-transparent pe-20${
          scrollValue === 0 ? " hidden" : " flex"
        }`}
      >
        <button
          onClick={() => {
            if (scrollEl) {
              scrollEl.scrollLeft -= 100;
            }
          }}
        >
          <ChevronLeft />
        </button>
      </div>
      <div
        ref={scrollRef}
        className="absolute inset-0 flex flex-nowrap gap-2 overflow-x-hidden scroll-smooth pt-3 hover:overflow-x-auto"
        onScroll={() => setScrollValue(scrollEl?.scrollLeft || 0)}
      >
        {CATEGORIES.filter((_, i) => i < 15).map((e, i) => {
          return (
            <button key={i} className="btn-s-translucent-b">
              {e}
            </button>
          );
        })}
      </div>
      <div
        className={`absolute inset-y-1 right-0 z-[1] w-auto items-center bg-gradient-to-l from-background via-background/60 to-transparent ps-20${
          maxScroll === scrollValue ? " hidden" : " flex"
        }`}
      >
        <button
          onClick={() => {
            if (scrollEl) {
              scrollEl.scrollLeft += 100;
            }
          }}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
