import React from "react";

export default function Loading() {
  return (
    <main className="flex w-full justify-center px-6 py-8">
      <div className="grid w-full auto-rows-fr grid-cols-1 gap-4 ms:grid-cols-2 ql:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div
            key={i}
            className="flex h-[320px] w-[400px] flex-col rounded-md bg-accent"
          >
            <div className="animate-pulse">
              <div className="relative flex items-center justify-center p-3">
                <div className="h-5 w-40 justify-self-center rounded-sm bg-accent-foreground/50" />
                <div className="absolute right-0 me-[10px] h-6 w-4 justify-self-end rounded-sm bg-accent-foreground/50" />
              </div>
              <div className="h-[200px] w-[400px] bg-accent-foreground/50" />
              <div className="flex justify-between p-2">
                <div className="flex gap-2">
                  <div className="size-9 rounded-full bg-accent-foreground/50" />
                  <div className="flex flex-col justify-center gap-1">
                    <div className="h-3 w-20 rounded-sm bg-accent-foreground/50" />
                    <div className="h-3 w-20 rounded-sm bg-accent-foreground/50" />
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center gap-1">
                  <div className="h-3 w-20 rounded-sm bg-accent-foreground/50" />
                  <div className="h-3 w-56 rounded-sm bg-accent-foreground/50" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 px-2 pb-3 pt-2">
                <div className="h-[10px] w-20 rounded-sm bg-accent-foreground/50" />
                <div className="h-[10px] w-32 rounded-sm bg-accent-foreground/50" />
                <div className="h-[10px] w-24 rounded-sm bg-accent-foreground/50" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
