"use client";
import { ArrowBigLeftDashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

import { cn } from "@/lib/utils/shadcn";

export default function BackBtn({
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
      <ArrowBigLeftDashIcon className="h-12 w-auto fill-current stroke-2 p-2" />
    </button>
  );
}
