"use client";

import { useEffect, useState } from "react";
import { useConsentStore } from "@/lib/cookies/store";

export default function CookieBanner() {
  const { hasResponded, acceptAll, rejectAll, openModal } = useConsentStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (hasResponded) return;
    const timer = setTimeout(() => setVisible(true), 5000);
    return () => clearTimeout(timer);
  }, [hasResponded]);

  if (hasResponded || !visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 md:px-5 md:pb-5"
    >
      <div
        className="w-full overflow-hidden rounded-[24px]"
        style={{
          background: "#FAFAF6",
          border: "1px solid rgba(13,31,28,0.08)",
          boxShadow: "0 0 0 1px rgba(13,31,28,0.07), 0 8px 40px rgba(13,31,28,0.12)",
        }}
      >
        <div className="flex flex-col gap-5 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-6">

          {/* LEFT */}
          <div className="max-w-2xl">
            <p className="font-['Fredoka'] mb-1.5 text-[1rem] font-semibold tracking-[-0.02em] text-[#0D1F1C] md:text-[1.05rem]">
              Privacy preferences
            </p>

            <p className="font-['Poppins'] text-[13px] leading-[1.72] text-[rgba(13,31,28,0.52)] md:text-[13.5px]">
              TaskLync uses essential cookies to keep the platform secure, reliable, and functioning
              properly. With your permission, we may also use analytics cookies to understand product
              usage and improve the experience over time.
            </p>

            <button
              onClick={openModal}
              className="font-['Poppins'] cursor-pointer mt-2.5 inline-flex items-center text-[13px] font-medium text-[#1F6F5F] underline underline-offset-4 bg-transparent border-none p-0 hover:opacity-70"
            >
              Manage cookie preferences
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center shrink-0">
            <button
              onClick={rejectAll}
              className="font-['Poppins'] cursor-pointer rounded-full border px-5 py-2.5 text-[13px] font-semibold text-[#0D1F1C] bg-transparent hover:bg-black/[0.04]"
              style={{ borderColor: "rgba(13,31,28,0.15)" }}
            >
              Essential only
            </button>

            <button
              onClick={acceptAll}
              className="font-['Poppins'] cursor-pointer rounded-full px-5 py-2.5 text-[13px] font-semibold text-white border-none hover:opacity-90"
              style={{
                background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                boxShadow: "0 0 20px rgba(47,160,132,0.2)",
              }}
            >
              Accept all cookies
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}