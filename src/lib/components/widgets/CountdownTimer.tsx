import { ReactNode, useEffect, useState } from "react";

import { Loader2Icon } from "lucide-react";

export default function CountdownTimer({
  children: dialog,
  timeLimit
}: {
  children: ReactNode;
  timeLimit: number;
}) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = Date.now();
      let remainingTime = timeLimit - now;
      if (remainingTime <= 0) {
        remainingTime = 0;
        clearInterval(countdown);
      }
      setTimer(remainingTime);
    }, 1000);
  }, [timeLimit, setTimer]);

  const displayTimer = (time: number) => {
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    return (
      <div className="flex flex-col gap-4">
        {timer === timeLimit && timer > 0 ? (
          <Loader2Icon className="animate-spin text-4xl" />
        ) : (
          <div className="neu-base relative flex items-center justify-center gap-4 rounded-2xl p-4 font-bold">
            {timer <= 0 && (
              <div className="bg-secondary/90 absolute flex size-full items-center justify-center rounded-2xl py-4 text-center text-3xl">
                <p>Time Expired</p>
              </div>
            )}
            {days > 0 && (
              <div className="flex flex-col items-center gap-4">
                <div className="neu-base-inset flex size-24 flex-col flex-wrap items-center justify-center gap-2 rounded-2xl p-2">
                  <p className="text-secondary-foreground text-5xl">{days}</p>
                </div>
                <p>Days</p>
              </div>
            )}
            {hours > 0 && (
              <div className="flex flex-col items-center gap-4">
                <div className="neu-base-inset flex size-24 flex-col flex-wrap items-center justify-center gap-2 rounded-2xl p-2">
                  <p className="text-secondary-foreground text-5xl">{hours}</p>
                </div>
                <p>Hours</p>
              </div>
            )}
            <div className="flex flex-col items-center gap-4">
              <div className="neu-base-inset flex size-24 flex-col flex-wrap items-center justify-center gap-2 rounded-2xl p-2">
                <p className="text-secondary-foreground text-5xl">{minutes}</p>
              </div>
              <p>Min</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="neu-base-inset flex size-24 flex-col flex-wrap items-center justify-center gap-2 rounded-2xl p-2">
                <p className="text-secondary-foreground text-5xl">{seconds}</p>
              </div>
              <p>Sec</p>
            </div>
          </div>
        )}
        {timer <= 0 && dialog}
      </div>
    );
  };

  return displayTimer(timer);
}
