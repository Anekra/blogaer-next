"use client";
import { HouseIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils/shadcn";

export default function HomeBtn({
  className
}: {
  className?: string | undefined;
}) {
  const router = useRouter();
  return (
    <button
      className={cn(
        "rounded-full hover:bg-foreground hover:text-background",
        className
      )}
      onClick={() => router.back()}
    >
      <HouseIcon className="h-14 w-auto stroke-2 p-2" />
    </button>
  );
}
