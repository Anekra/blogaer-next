"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { Loader2Icon } from "lucide-react";

const LoadingContext = createContext({
  isLoading: false,
  setLoading: (_: boolean) => {},
  showIcon: true,
  setShowIcon: (_: boolean) => {}
});

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setLoading] = useState(false);
  const [showIcon, setShowIcon] = useState(true);

  return (
    <LoadingContext.Provider
      value={{ isLoading, setLoading, showIcon, setShowIcon }}
    >
      {isLoading && (
        <div
          className={`${showIcon ? "bg-black/25 backdrop-blur-[2px]" : "bg-none"} absolute z-10 flex size-full cursor-progress items-center justify-center`}
        >
          {showIcon && <Loader2Icon className="animate-spin" size={90}/>}
        </div>
      )}
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => useContext(LoadingContext);
