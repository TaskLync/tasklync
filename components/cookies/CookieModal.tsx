"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useConsentStore } from "@/lib/cookies/store";

interface CategoryConfig {
  id: "analytics" | "marketing" | "functional";
  label: string;
  description: string;
  cookies: string;
  retention: string;
  required: false;
}

const CATEGORIES: CategoryConfig[] = [
  {
    id: "analytics",
    label: "Analytics",
    description:
      "Help us understand how visitors interact with TaskLync. All data is aggregated and anonymised.",
    cookies: "_ga, _gid, _ga_XXXXXX",
    retention: "Up to 2 years",
    required: false,
  },
  {
    id: "marketing",
    label: "Marketing",
    description:
      "Allow us to measure the effectiveness of our advertising campaigns and show relevant ads on other platforms. Data is shared with ad partners.",
    cookies: "_fbp, _gcl_au",
    retention: "Up to 90 days",
    required: false,
  },
  {
    id: "functional",
    label: "Functional",
    description:
      "Remember your preferences (language, theme) so you don't have to re-select them on every visit.",
    cookies: "tl_lang, tl_theme",
    retention: "1 year",
    required: false,
  },
];

export default function CookieModal() {
  const { isModalOpen, consent, savePreferences, closeModal, acceptAll, rejectAll } =
    useConsentStore();

  const [prefs, setPrefs] = useState({
    analytics: consent.analytics,
    marketing: consent.marketing,
    functional: consent.functional,
  });

  useEffect(() => {
    if (isModalOpen) {
      setPrefs({
        analytics: consent.analytics,
        marketing: consent.marketing,
        functional: consent.functional,
      });
    }
  }, [isModalOpen, consent]);

  if (!isModalOpen) return null;

  const toggle = (id: CategoryConfig["id"]) =>
    setPrefs((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Cookie preferences"
    >
      {/* Backdrop — same as WaitlistModal, no blur */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(13,31,28,0.5)" }}
        onClick={closeModal}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg rounded-[28px] overflow-hidden"
        style={{
          background: "#FAFAF6",
          boxShadow: "0 0 0 1px rgba(13,31,28,0.07), 0 8px 40px rgba(13,31,28,0.14), 0 2px 8px rgba(13,31,28,0.06)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: "rgba(13,31,28,0.07)" }}
        >
          <h2 className="font-['Fredoka'] text-[18px] font-bold text-[#0D1F1C]">
            Cookie Preferences
          </h2>
          <button
            onClick={closeModal}
            className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full border-none hover:bg-black/[0.06] text-[rgba(13,31,28,0.4)]"
            style={{ background: "rgba(13,31,28,0.06)" }}
            aria-label="Close"
          >
            <X size={15} strokeWidth={2.2} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto px-6 py-4">

          {/* Essential — always on */}
          <div
            className="mb-4 rounded-2xl border p-4"
            style={{
              borderColor: "rgba(13,31,28,0.08)",
              background: "rgba(31,111,95,0.03)",
            }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-['Poppins'] text-[13.5px] font-semibold text-[#0D1F1C]">
                Essential
              </span>
              <span className="font-['Poppins'] rounded-full bg-[rgba(31,111,95,0.1)] px-3 py-0.5 text-[10.5px] font-semibold text-[#1F6F5F]">
                Always on
              </span>
            </div>
            <p className="font-['Poppins'] text-[12px] leading-[1.6] text-[rgba(13,31,28,0.5)]">
              Required for the site to function. Cannot be disabled. Includes session tokens and this consent record.
            </p>
            <p className="font-['Poppins'] mt-1.5 text-[11px] text-[rgba(13,31,28,0.32)]">
              Cookies: tasklync_session, tasklync_consent · Retention: 1 year
            </p>
          </div>

          {/* Configurable categories */}
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="mb-3 rounded-2xl border p-4"
              style={{
                borderColor: prefs[cat.id] ? "rgba(31,111,95,0.2)" : "rgba(13,31,28,0.08)",
                background: prefs[cat.id] ? "rgba(31,111,95,0.03)" : "transparent",
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-['Poppins'] text-[13.5px] font-semibold text-[#0D1F1C]">
                  {cat.label}
                </span>

                {/* Toggle */}
                <button
                  role="switch"
                  aria-checked={prefs[cat.id]}
                  aria-label={`Toggle ${cat.label} cookies`}
                  onClick={() => toggle(cat.id)}
                  className="cursor-pointer relative flex h-6 w-11 shrink-0 items-center rounded-full border-none"
                  style={{
                    background: prefs[cat.id]
                      ? "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)"
                      : "rgba(13,31,28,0.12)",
                  }}
                >
                  <span
                    className="absolute h-4 w-4 rounded-full bg-white shadow"
                    style={{ transform: prefs[cat.id] ? "translateX(24px)" : "translateX(4px)" }}
                  />
                </button>
              </div>

              <p className="font-['Poppins'] text-[12px] leading-[1.6] text-[rgba(13,31,28,0.5)] mb-1.5">
                {cat.description}
              </p>
              <p className="font-['Poppins'] text-[11px] text-[rgba(13,31,28,0.32)]">
                Cookies: {cat.cookies} · Retention: {cat.retention}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="flex flex-wrap gap-2 border-t px-6 py-4"
          style={{ borderColor: "rgba(13,31,28,0.07)" }}
        >
          <button
            onClick={rejectAll}
            className="font-['Poppins'] cursor-pointer flex-1 rounded-full border py-2.5 text-[13px] font-semibold text-[#1F6F5F] bg-transparent hover:bg-[rgba(31,111,95,0.06)]"
            style={{ borderColor: "rgba(31,111,95,0.25)" }}
          >
            Reject all
          </button>
          <button
            onClick={() => savePreferences(prefs)}
            className="bg-[#1F6F5F] font-['Poppins'] cursor-pointer flex-1 rounded-full py-2.5 text-[13px] font-semibold text-white border-none hover:opacity-90"
            style={{
              boxShadow: "0 4px 16px rgba(47,160,132,0.25)",
            }}
          >
            Save preferences
          </button>
          <button
            onClick={acceptAll}
            className="bg-[#1F6F5F] font-['Poppins'] cursor-pointer w-full rounded-full py-2.5 text-[13px] font-semibold text-white border-none hover:opacity-90"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}