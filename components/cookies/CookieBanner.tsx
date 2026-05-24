"use client";

import { useEffect, useState } from "react";
import { useConsentStore } from "@/lib/cookies/store";

export default function CookieBanner() {
  const { hasResponded, acceptAll, rejectAll, openModal } =
    useConsentStore();

  const [visible, setVisible] = useState(false);

  // Show banner after 15 seconds
  useEffect(() => {
    if (hasResponded) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, [hasResponded]);

  if (hasResponded || !visible) return null;

  return (
    <>
      <style>{`
        @keyframes cookieSlideUp {
          from {
            opacity: 0;
            transform: translateY(28px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Cookie consent"
        className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 md:px-5 md:pb-5"
        style={{
          animation:
            "cookieSlideUp 0.55s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        <div
          className="w-full overflow-hidden rounded-[30px] border"
          style={{
            background:
              "linear-gradient(180deg,#0D1F1C 0%,#132925 100%)",
            borderColor: "rgba(255,255,255,0.08)",
            boxShadow:
              "0 20px 60px rgba(13,31,28,0.28)",
          }}
        >

          <div className="flex flex-col gap-5 px-5 py-5 md:flex-row md:items-end md:justify-between md:px-8 md:py-7">

            {/* LEFT */}
            <div className="max-w-2xl">
              <p
                className="mb-2 text-[1rem] font-semibold tracking-[-0.02em] text-white md:text-[1.05rem]"
                style={{
                  fontFamily: "var(--font-clash)",
                }}
              >
                Privacy preferences
              </p>

              <p
                className="text-[13px] leading-[1.75] text-[rgba(255,255,255,0.68)] md:text-[14px]"
                style={{
                  fontFamily: "var(--font-body)",
                }}
              >
                TaskLync uses essential cookies to keep the platform
                secure, reliable, and functioning properly. With your
                permission, we may also use analytics cookies to
                understand product usage and improve the experience
                over time.
              </p>

              <button
                onClick={openModal}
                className="cursor-pointer mt-3 inline-flex items-center text-[13px] font-medium text-[#6FCF97] underline underline-offset-4 transition-opacity hover:opacity-70"
                style={{
                  fontFamily: "var(--font-body)",
                }}
              >
                Manage cookie preferences
              </button>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

              <button
                onClick={rejectAll}
                className=" cursor-pointer rounded-full border px-5 py-3 text-[13px] font-semibold text-white transition-colors hover:bg-[rgba(255,255,255,0.06)]"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.04)",
                  fontFamily: "var(--font-body)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Essential only
              </button>

              <button
                onClick={acceptAll}
                className="cursor-pointer rounded-full px-5 py-3 text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-px hover:opacity-95"
                style={{
                  background:
                    "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                  boxShadow:
                    "0 10px 24px rgba(47,160,132,0.22)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Accept all cookies
              </button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}