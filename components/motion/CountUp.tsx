// components/motion/CountUp.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Animated number counter that fires when it enters the viewport.
// Decoupled from layout — purely presentational + motion concern.
//
// Usage:
//   <CountUp target={94} suffix="%" />
//   <CountUp target={60} suffix="s" duration={1200} />

"use client";

import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface CountUpProps {
  target: number;
  /** Text appended after the number, e.g. "%" or "s" */
  suffix?: string;
  /** Text prepended before the number, e.g. "$" */
  prefix?: string;
  /** Total animation duration in ms. Default: 1600 */
  duration?: number;
  /** IntersectionObserver threshold. Default: 0.2 */
  threshold?: number;
}

export function CountUp({
  target,
  suffix,
  prefix,
  duration = 1600,
  threshold = 0.2,
}: CountUpProps) {
  const [val, setVal] = useState(0);
  const { ref, inView } = useIntersectionObserver({ threshold });

  useEffect(() => {
    if (!inView) return;

    let current = 0;
    const step = target / (duration / 16);

    const t = setInterval(() => {
      current += step;
      if (current >= target) {
        setVal(target);
        clearInterval(t);
      } else {
        setVal(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(t);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}