// hooks/useIntersectionObserver.ts
// ─────────────────────────────────────────────────────────────────────────────
// Reusable IntersectionObserver hook.
// Fires once when the element enters the viewport, then disconnects.
// Drop-in replacement for any ad-hoc observer pattern across the app.
//
// Usage:
//   const { ref, inView } = useIntersectionObserver({ threshold: 0.2 });

"use client";
import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  /** 0–1 ratio of element visibility that triggers inView. Default: 0.2 */
  threshold?: number;
  /** If true, keeps observing after first intersection (don't disconnect). Default: false */
  persistent?: boolean;
}

export function useIntersectionObserver({
  threshold = 0.2,
  persistent = false,
}: UseIntersectionObserverOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!persistent) obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, persistent]);

  return { ref, inView };
}