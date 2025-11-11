import { cn } from "@/lib/utils/shadcn";

export default function LogoIcon({
  className = "h-[50px] w-[80px] text-primary-foreground",
  isAtTheTop
}: {
  className?: string;
  isAtTheTop?: boolean;
}) {
  return (
    <svg
      width="182"
      height="110"
      viewBox="0 0 182 110"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        `${
          isAtTheTop
            ? "hover:fill-[url(#gradient-p-convex)] active:fill-[rgb(163_95_57)] dark:active:fill-[rgb(238,184,153)]"
            : "hover:fill-[url(#gradient-base-convex)] active:fill-[oklch(var(--accent))]"
        } fill-current hover:[filter:url(#filter-convex)] active:[filter:url(#filter-inset)]`,
        className
      )}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0C27 4 29 102 0 109.5H181.5L162 56C177.5 34 177 0 136.5 0H0ZM31 13C79 6 83 42 35 44.5C35.364 32.5777 34.2774 24.5315 31 13ZM35 56C104 56 79 103.5 31 100.5C35.0304 84.1211 36.1534 74.4783 35 56ZM67.5 46.5C85.8672 40.7265 94 24.5 85.5 13H103L116 48.5H74C71.6877 47.4382 70.3568 47.0406 67.5 46.5ZM130 46.5L118 13C118 13 152.317 9.5 155.853 25C160.758 46.5 130 46.5 130 46.5ZM148.5 98L134.5 59H148L161.5 97L148.5 98ZM96 69C95.2555 64.8486 94.2031 62.6514 91 59H120L123.5 69H126.5L130.5 80H127.5L134.5 98H85.5C92.7117 92.4461 95.0814 88.5303 96 80H127.5L123.5 69H96Z"
      />
      <defs>
        <linearGradient
          id="gradient-base-convex"
          gradientTransform="rotate(45)"
        >
          <stop offset="20%" className="logo-base-stop-top" />
          <stop offset="90%" className="logo-base-stop-mid" />
          <stop offset="100%" className="logo-base-stop-bot" />
        </linearGradient>
        <linearGradient id="gradient-p-convex" gradientTransform="rotate(45)">
          <stop offset="20%" className="logo-p-stop-top" />
          <stop offset="90%" className="logo-p-stop-mid" />
          <stop offset="100%" className="logo-p-stop-bot" />
        </linearGradient>
        <filter id="filter-convex" colorInterpolationFilters="sRGB">
          <feDropShadow
            dx="-2"
            dy="-1"
            stdDeviation="1"
            className="logo-base-flood-top"
          />
          <feDropShadow
            dx="2"
            dy="0"
            stdDeviation="1"
            className="logo-base-flood-bot"
          />
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="1"
            className="logo-base-flood-bot"
          />
        </filter>
        <filter id="filter-inset" fill="oklch(var(--background)/0.5)">
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="" dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-3" k3="3" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_246_218"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="0" dy="-0.4" />
          <feGaussianBlur stdDeviation="0.4" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-3" k3="3" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"
          />
          <feBlend mode="normal" in2="effect1_innerShadow_246_218" />
        </filter>
      </defs>
    </svg>
  );
}
