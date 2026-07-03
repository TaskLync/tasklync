// components/waitlist/SuccessState.tsx
"use client";

import { CheckCircle2 } from "lucide-react";

interface SuccessStateProps {
  onClose: () => void;
}

export function SuccessState({ onClose }: SuccessStateProps) {
  return (
    <div className="flex flex-col items-center text-center py-6">

      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
        style={{
          background: "rgba(47,160,132,0.1)",
          border: "1.5px solid rgba(47,160,132,0.22)",
        }}
      >
        <CheckCircle2 size={30} strokeWidth={1.75} color="#2FA084" />
      </div>

      <h3 className="font-['Fredoka'] text-[1.65rem] font-bold tracking-[-0.025em] text-[#0D1F1C] mb-2">
        You&apos;re on the list!
      </h3>

      <p className="font-['Poppins'] text-[14px] leading-relaxed text-[rgba(13,31,28,0.52)] max-w-[280px]">
        We&apos;ll reach out as soon as TaskLync launches in your area. Stay tuned.
      </p>

      <button
        onClick={onClose}
        className="font-['Poppins'] mt-7 rounded-full px-8 py-3 text-sm font-semibold text-white cursor-pointer border-none transition-opacity duration-200 hover:opacity-85 active:opacity-75"
        style={{
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