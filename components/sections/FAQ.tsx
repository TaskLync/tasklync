"use client";

/**
 * MOBILE PERFORMANCE PASS
 *
 * [F1] Label, title → CSS @keyframes faqFadeUp. Zero JS per frame.
 *
 * [F2] Subtitle + tab switcher wrapper: motion.div → CSS faqFadeUp.
 *
 * [F3] FAQ list box: motion.div → CSS faqFadeUp.
 *
 * [F4] Bottom CTA: motion.div → CSS faqFadeUp.
 *
 * [F5] EASE_EXPO_OUT import removed — was pulled from framer lib only to
 *      feed into the FAQRow height transition string. Inlined as a plain
 *      cubic-bezier literal. No framer-motion import anywhere.
 *
 * [F6] Hydration fix — prefers-reduced-motion moved to useEffect (same
 *      pattern as WaitlistCTA v2). typeof window in render body causes
 *      server→client tree mismatch.
 *
 * [F7] FAQRow height animation: already CSS-only (scrollHeight → height via
 *      inline transition). No change needed — just kept clean.
 *
 * Desktop: visually identical.
 */

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// ─── Types & content ──────────────────────────────────────────────────────────

interface FAQItem {
  q: string;
  a: string;
}

const homeownerFAQs: FAQItem[] = [
  {
    q: "How quickly can I get a professional to my home?",
    a: "Most requests are matched within minutes. Based on availability in your area, a professional can arrive the same day or at a scheduled time that suits you.",
  },
  {
    q: "How do I know the professionals are trustworthy?",
    a: "Every professional completes a strict verification process that includes identity checks, background screening, license validation where required, and skills review before joining the platform.",
  },
  {
    q: "What happens if something goes wrong with the job?",
    a: "All bookings are covered by the TaskLync Guarantee. If something is not completed as expected, you can raise a dispute within 24 hours. Our team reviews and resolves it fairly with payment protection in place.",
  },
  {
    q: "Which cities is TaskLync available in?",
    a: "TaskLync is launching city by city. Join the waitlist to get notified when it becomes available in your area.",
  },
];

const professionalFAQs: FAQItem[] = [
  {
    q: "How much does it cost to join as a professional?",
    a: "Joining TaskLync is free. There are no upfront fees or subscriptions. We only charge a small commission on completed jobs.",
  },
  {
    q: "What does the verification process involve?",
    a: "We verify your identity, relevant licenses, and skills depending on your service category. Some categories may include additional checks before approval.",
  },
  {
    q: "How does TaskLync help me grow my income?",
    a: "You receive consistent local job requests without spending on advertising. Higher-rated professionals get better visibility and more booking opportunities.",
  },
  {
    q: "What if a customer raises a dispute?",
    a: "All disputes are reviewed using job records and communication history. We ensure fair outcomes based on evidence and protect professionals from misuse.",
  },
];

// [F5] Inlined — was only imported to feed this string
const EXPO_OUT = "0.16,1,0.3,1";

// ─── FAQRow ───────────────────────────────────────────────────────────────────

function FAQRow({ item, isOpen, onToggle }: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // [F7] CSS-only height animation — already SSR-safe, no changes needed
  useEffect(() => {
    if (answerRef.current) {
      setHeight(isOpen ? answerRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-[rgba(31,111,95,0.1)] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-5 text-left"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <span
          className="text-[15px] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-200"
          style={{
            fontFamily: "var(--font-clash)",
            color: isOpen ? "#1F6F5F" : "#0D1F1C",
          }}
        >
          {item.q}
        </span>

        <span
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: isOpen ? "#1F6F5F" : "rgba(31,111,95,0.08)",
            border: `1px solid ${isOpen ? "#1F6F5F" : "rgba(31,111,95,0.15)"}`,
            // Only transition background+border — compositor-safe
            transition: "background 0.2s ease, border-color 0.2s ease",
          }}
        >
          {isOpen
            ? <Minus size={14} strokeWidth={2.5} color="#fff" />
            : <Plus  size={14} strokeWidth={2.5} color="#1F6F5F" />
          }
        </span>
      </button>

      {/* [F7] Height animation — CSS transition on height, no JS loop */}
      <div
        style={{
          height,
          overflow: "hidden",
          transition: `height 0.35s cubic-bezier(${EXPO_OUT})`,
        }}
      >
        <div ref={answerRef} className="pb-5 pr-14">
          <p
            className="text-[14px] leading-[1.75] text-[rgba(13,31,28,0.55)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export default function FAQ() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const [tab, setTab]           = useState<"homeowner" | "professional">("homeowner");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // [F6] Hydration fix — read matchMedia only after mount
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const faqs = tab === "homeowner" ? homeownerFAQs : professionalFAQs;

  const handleTabChange = (t: "homeowner" | "professional") => {
    setTab(t);
    setOpenIndex(0);
  };

  // Helper: animation style gated on inView + reduced
  const anim = (delay: number): React.CSSProperties =>
    !reduced && inView
      ? { animation: `faqFadeUp 0.5s cubic-bezier(${EXPO_OUT}) ${delay}s both` }
      : { opacity: reduced ? 1 : inView ? undefined : 0 };

  return (
    <>
      <style>{`
        @keyframes faqFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        id="faq"
        className="relative bg-[#F7F7F2] py-12 lg:py-18 overflow-hidden"
      >
        {/* Dot texture — static */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(13,31,28,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="relative z-10 mx-auto max-w-275 px-6 sm:px-10 lg:px-16"
        >

          {/* ── Header ──────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-14">

            <div>
              {/* [F1] Label */}
              <div
                className="inline-flex items-center gap-2 mb-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1F6F5F]"
                style={{ fontFamily: "var(--font-body)", ...anim(0) }}
              >
                FAQ
              </div>

              {/* [F1] Title */}
              <h2
                className="leading-[1.05] tracking-[-0.03em] text-[#0D1F1C] font-bold"
                style={{
                  fontFamily: "var(--font-clash)",
                  fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                  ...anim(0.1),
                }}
              >
                Everything you<br />
                <span
                  style={{
                    backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 60%,#6FCF97 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  need to know.
                </span>
              </h2>
            </div>

            {/* [F2] Subtitle + tab switcher */}
            <div style={anim(0.2)}>
              <p
                className="leading-[1.72] mb-8 italic text-[rgba(13,31,28,0.48)]"
                style={{
                  fontFamily: "var(--font-serif-italic)",
                  fontSize: "1.15rem",
                }}
              >
                Got questions? We&apos;ve got straight answers. If you don&apos;t find what
                you&apos;re looking for, our team is one message away.
              </p>

              {/* Tab switcher */}
              <div
                className="inline-flex p-1 rounded-full"
                style={{
                  background: "rgba(31,111,95,0.08)",
                  border: "1px solid rgba(31,111,95,0.12)",
                }}
              >
                {(["homeowner", "professional"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTabChange(t)}
                    className="px-5 py-2 rounded-full text-[13px] font-semibold cursor-pointer border-none"
                    style={{
                      fontFamily: "var(--font-body)",
                      background: tab === t
                        ? "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)"
                        : "transparent",
                      color: tab === t ? "#fff" : "rgba(13,31,28,0.5)",
                      boxShadow: tab === t ? "0 2px 12px rgba(47,160,132,0.25)" : "none",
                      // Only transition color+shadow — compositor-safe
                      transition: "color 0.2s ease, box-shadow 0.2s ease",
                    }}
                  >
                    {t === "homeowner" ? "For Homeowners" : "For Professionals"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* [F3] FAQ list box */}
          <div
            className="rounded-3xl overflow-hidden border border-[rgba(31,111,95,0.1)]"
            style={{
              background: "#fff",
              boxShadow: "0 4px 32px rgba(13,31,28,0.06)",
              ...anim(0.3),
            }}
          >
            <div className="px-8 py-2">
              {faqs.map((item, i) => (
                <FAQRow
                  key={`${tab}-${i}`}
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </div>

          {/* [F4] Bottom CTA */}
          <div
            className="mt-10 text-center"
            style={anim(0.5)}
          >
            <p
              className="text-[14px] mb-3 text-[rgba(13,31,28,0.4)]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Still have questions?
            </p>

            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13.5px] font-semibold border cursor-pointer transition-colors duration-200 hover:bg-[rgba(31,111,95,0.06)] hover:border-[#1F6F5F]"
              style={{
                fontFamily: "var(--font-body)",
                background: "transparent",
                borderColor: "rgba(31,111,95,0.25)",
                color: "#1F6F5F",
              }}
            >
              Contact our team →
            </button>
          </div>

        </div>
      </section>
    </>
  );
}