// components/waitlist/SuccessState.tsx
"use client";

import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

interface SuccessStateProps {
  onClose: () => void;
}

export function SuccessState({ onClose }: SuccessStateProps) {
  const [visible, setVisible] = useState(false);

  // Mount first, then flip visible so CSS transition fires — same pattern as WaitlistModal
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div
      className="flex flex-col items-center text-center py-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.97) translateY(6px)",
        transition: "opacity 0.28s cubic-bezier(0.16,1,0.3,1), transform 0.28s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
        style={{
          background: "rgba(47,160,132,0.12)",
          border: "1.5px solid rgba(47,160,132,0.25)",
        }}
      >
        <CheckCircle2 size={30} strokeWidth={1.75} color="#2FA084" />
      </div>

      <h3
        className="mb-2"
        style={{
          fontFamily: "var(--font-clash)",
          fontSize: "1.65rem",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          color: "#0D1F1C",
        }}
      >
        You&apos;re on the list!
      </h3>

      <p
        className="max-w-70 leading-relaxed"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          color: "rgba(13,31,28,0.52)",
        }}
      >
        We&apos;ll reach out as soon as TaskLync launches in your area. Stay tuned.
      </p>

      <button
        onClick={onClose}
        className="mt-7 rounded-full px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85 active:opacity-75"
        style={{
          fontFamily: "var(--font-body)",
          background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
          boxShadow: "0 0 22px rgba(47,160,132,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        Done
      </button>
    </div>
  );
}

export default SuccessState;