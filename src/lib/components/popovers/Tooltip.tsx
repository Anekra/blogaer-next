import { useEffect, useRef } from 'react';

export default function Tooltip({
  text,
  isVisible,
  parentEl
}: {
  text: string;
  isVisible: boolean;
  parentEl: HTMLDivElement | null;
}) {
  const tooltipDivRef = useRef<HTMLDivElement>(null);
  const tooltipSpanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tooltipDivEl = tooltipDivRef.current;
    if (!tooltipDivEl) return;

    if (!isVisible) {
      tooltipDivEl.removeAttribute('style');
      return;
    }

    const rect = parentEl?.getBoundingClientRect();
    if (rect) {
      const parentBoundingRect =
        tooltipDivEl.parentElement?.parentElement?.getBoundingClientRect();
      if (!parentBoundingRect) return;
      const tooltipDivElLeft =
        rect.left +
        window.scrollX -
        tooltipDivEl.offsetWidth / 2 +
        rect.width / 2;

      tooltipDivEl.style.zIndex = '8';
      tooltipDivEl.style.opacity = '1';
      tooltipDivEl.style.bottom = `${tooltipDivEl.offsetHeight}px`;
      tooltipDivEl.style.left = `${tooltipDivElLeft}px`;
    }
  }, [isVisible, parentEl]);

  return (
    <div>
      <div
        ref={tooltipDivRef}
        className={`absolute left-full z-0 mr-3 flex h-auto w-[182px] items-center justify-center self-end rounded bg-base-background px-3 py-2 opacity-0`}
      >
        <p className="text-sm">{text}</p>
      </div>
      <span
        ref={tooltipSpanRef}
        className="absolute z-0 border-8 border-solid border-[oklch(var(--base-background))_transparent_transparent_transparent] opacity-0 brightness-200"
      />
    </div>
  );
}
