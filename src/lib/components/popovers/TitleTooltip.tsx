import { useEffect, useRef } from 'react';

export default function TitleTooltip({
  text,
  isVisible,
  parentEl
}: {
  text: string;
  isVisible: boolean;
  parentEl: HTMLDivElement | null;
}) {
  const tooltipDivRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    const tooltipDivEl = tooltipDivRef.current;
    if (!tooltipDivEl) return;

    if (!isVisible) {
      tooltipDivEl.removeAttribute('style');
      return;
    }

    tooltipDivEl.style.zIndex = '8';
    tooltipDivEl.style.opacity = '1';
  }, [isVisible, parentEl]);

  return (
    <div>
      <div
        ref={tooltipDivRef}
        className={`fixed bottom-6 left-6 z-0 mr-3 flex h-auto w-[182px] items-center justify-center self-end rounded bg-base-background px-3 py-2 opacity-0`}
      >
        <p className="text-sm">{text}</p>
      </div>
      <span
        className="absolute z-0 border-8 border-solid border-[oklch(var(--base-background))_transparent_transparent_transparent] opacity-0 brightness-200"
      />
    </div>
  );
}
