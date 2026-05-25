"use client";

interface LogoMarkProps {
  size?: number;
}

export function LogoMark({ size = 42 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 overflow-visible"
    >
      <defs>
        <linearGradient id="tasklync-green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#22C55E" />
        </linearGradient>
      </defs>

      {/* T top */}
      <rect
        x="6"
        y="10"
        width="34"
        height="6"
        rx="3"
        fill="url(#tasklync-green)"
      />

      {/* T stem */}
      <rect
        x="20"
        y="10"
        width="6"
        height="50"
        rx="3"
        fill="url(#tasklync-green)"
      />

      {/* L stem */}
      <rect
        x="34"
        y="24"
        width="6"
        height="36"
        rx="3"
        fill="url(#tasklync-green)"
        opacity="0.78"
      />

      {/* L bottom */}
      <rect
        x="34"
        y="54"
        width="26"
        height="6"
        rx="3"
        fill="url(#tasklync-green)"
        opacity="0.78"
      />

      {/* Glow */}
      <circle
        cx="36"
        cy="36"
        r="24"
        fill="url(#tasklync-green)"
        opacity="0.06"
      />
    </svg>
  );
}