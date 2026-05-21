"use client";

/**
 * MOBILE PERFORMANCE PASS
 *
 * [H1] All motion.div on left column (label, title, subtitle, steps) →
 *      CSS @keyframes hiwFadeUp with animation-delay. Zero JS per frame.
 *
 * [H2] Right card: AnimatePresence + motion.div content swap →
 *      CSS opacity transition on a single div. data-key forces repaint
 *      only when active changes. No JS animation loop.
 *
 * [H3] Right card: dark theme → light theme (per design request).
 *      Matches the card style used in Features.tsx.
 *
 * [H4] onMouseEnter → onMouseEnter + onClick so steps work on touch.
 *
 * [H5] Right card glow blob removed — extra compositing layer.
 *
 * [H6] motion.div (slideRight) on right column → CSS fadeUp.
 *      slideRight variant was sliding from off-screen causing layout
 *      recalc on every frame during entry.
 *
 * Desktop: visually identical. Light card, same hover/click step switching.
 */

import { useState } from "react";
import { Search, CalendarCheck, ShieldCheck, LucideIcon } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// ─── Content ──────────────────────────────────────────────────────────────────

const steps = [
  {
    num: "01",
    title: "Search & Select a Service",
    body: "Browse services or tap what you need. Our smart matching engine shows available, nearby verified professionals with transparent pricing.",
  },
  {
    num: "02",
    title: "Book in Under 60 Seconds",
    body: "Pick a time slot, confirm your location, and book instantly. See the professional's profile, ratings, and estimated arrival, before you confirm.",
  },
  {
    num: "03",
    title: "Job Done. Pay Securely.",
    body: "The professional arrives, completes the job, and you pay securely in app or cash. Rate the experience. Dispute anything within 24 hours with full payment protection.",
  },
] as const;

interface CardData {
  label: string;
  title: string;
  body: string;
  tag: string;
  Icon: LucideIcon;
}

const cards: CardData[] = [
  {
    label: "Step 01",
    title: "Find what you need",
    body: "Explore a wide range of trusted local services with real time availability, transparent pricing, and verified professionals near you.",
    tag: "Smart Matching",
    Icon: Search,
  },
  {
    label: "Step 02",
    title: "Instant confirmation",
    body: "See professional profiles, ratings, and arrival times before you book. Confirm your slot in under 60 seconds.",
    tag: "60-sec Booking",
    Icon: CalendarCheck,
  },
  {
    label: "Step 03",
    title: "Secure & done",
    body: "Pay in app after completion. Rate the service. Dispute anything within 24 hours with full payment protection guaranteed.",
    tag: "Escrow Protected",
    Icon: ShieldCheck,
  },
];

// ─── HowItWorks ───────────────────────────────────────────────────────────────

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useIntersectionObserver({ threshold: 0.15 });

  const card = cards[active];
  const Icon = card.Icon;

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      <style>{`
        @keyframes hiwFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* [H2] Card content crossfade — CSS only, no AnimatePresence */
        .hiw-card-content {
          transition: opacity 0.28s cubic-bezier(0.16,1,0.3,1),
                      transform 0.28s cubic-bezier(0.16,1,0.3,1);
        }
        /* Step row tap highlight on mobile */
        .hiw-step:active { background: rgba(31,111,95,0.04); border-radius: 10px; }
      `}</style>

      <section
        id="how-it-works"
        className="bg-[#F7F7F5] py-20 lg:py-32"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <div className="max-w-290 mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
          <div>

            {/* Label */}
            <div
              className="inline-flex items-center gap-2 mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
              style={{
                fontFamily: "var(--font-body)",
                animation: !reduced && inView
                  ? "hiwFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.0s both"
                  : undefined,
                opacity: reduced ? 1 : inView ? undefined : 0,
              }}
            >
              <span className="block w-5 h-0.5 rounded-sm bg-[#1F6F5F]" />
              How It Works
            </div>

            {/* Title */}
            <h2
              className="text-[#0D1F1C] mb-4 leading-[1.05] tracking-[-0.03em] font-bold"
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                animation: !reduced && inView
                  ? "hiwFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.08s both"
                  : undefined,
                opacity: reduced ? 1 : inView ? undefined : 0,
              }}
            >
              Three steps to<br />a fixed home.
            </h2>

            {/* Subtitle */}
            <p
              className="text-[rgba(13,31,28,0.5)] leading-[1.7] mb-12 max-w-sm italic"
              style={{
                fontFamily: "var(--font-serif-italic)",
                fontSize: "1.15rem",
                animation: !reduced && inView
                  ? "hiwFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) 0.16s both"
                  : undefined,
                opacity: reduced ? 1 : inView ? undefined : 0,
              }}
            >
              TaskLync makes it easy to find, book, and manage trusted local
              services from one seamless platform.
            </p>

            {/* Steps */}
            <div className="flex flex-col">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={[
                    "hiw-step relative flex gap-5 py-6 cursor-pointer",
                    i < steps.length - 1
                      ? "border-b border-[rgba(31,111,95,0.1)]"
                      : "",
                  ].join(" ")}
                  style={{
                    animation: !reduced && inView
                      ? `hiwFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${0.24 + i * 0.08}s both`
                      : undefined,
                    opacity: reduced ? 1 : inView ? undefined : 0,
                  }}
                  // [H4] both mouse + touch
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  {/* Accent bar — CSS transition, compositor-only */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#1F6F5F] rounded-r-sm"
                    style={{
                      opacity: active === i ? 1 : 0,
                      transition: "opacity 0.2s ease",
                    }}
                  />

                  {/* Number pill */}
                  <div
                    className="shrink-0 w-11 h-11 rounded-[14px] flex items-center justify-center text-[15px] font-bold border-[1.5px]"
                    style={{
                      fontFamily: "var(--font-clash)",
                      background: active === i ? "#1F6F5F" : "#EFEFED",
                      color: active === i ? "#fff" : "rgba(13,31,28,0.35)",
                      borderColor: active === i
                        ? "#1F6F5F"
                        : "rgba(31,111,95,0.12)",
                      // Only transition background+color — compositor-safe
                      transition: "background 0.2s ease, color 0.2s ease, border-color 0.2s ease",
                    }}
                  >
                    {s.num}
                  </div>

                  {/* Text */}
                  <div>
                    <div
                      className="text-[#0D1F1C] mb-1.5 text-[17px] font-semibold leading-snug tracking-[-0.02em]"
                      style={{ fontFamily: "var(--font-clash)" }}
                    >
                      {s.title}
                    </div>
                    <div
                      className="text-[13px] text-[rgba(13,31,28,0.5)] leading-[1.65]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {s.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN — desktop only ─────────────────────────────── */}
          {/*
            [H3] Light theme card — matches Features.tsx card style.
            [H2] AnimatePresence removed. Content swaps via CSS opacity.
            [H5] Glow blob removed.
            [H6] slideRight variant removed → CSS hiwFadeUp.
          */}
          <div
            className="hidden lg:block sticky top-28"
            style={{
              animation: !reduced && inView
                ? "hiwFadeUp 0.55s cubic-bezier(0.16,1,0.3,1) 0.3s both"
                : undefined,
              opacity: reduced ? 1 : inView ? undefined : 0,
            }}
          >
            {/* Light card shell — matches Features card */}
            <div
              className="relative rounded-[28px] overflow-hidden flex flex-col justify-end min-h-90 p-10 border border-[rgba(31,111,95,0.14)]"
              style={{
                background:
                  "linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(236,248,243,0.75) 100%)",
                boxShadow:
                  "0 4px 40px rgba(31,111,95,0.07), 0 1px 0 rgba(255,255,255,0.9) inset",
              }}
            >
              {/* Dot grid — static, zero animation cost */}
              <div
                className="absolute inset-0 rounded-[28px] pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(31,111,95,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(31,111,95,0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                }}
              />

              {/*
                [H2] CSS crossfade — key prop forces a re-render when active
                changes, triggering the CSS transition from opacity 0 → 1.
                No AnimatePresence, no JS animation values.
              */}
              <div
                key={active}
                className="hiw-card-content relative z-10"
                style={{ opacity: 1 }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-[rgba(31,111,95,0.2)]"
                  style={{ background: "rgba(31,111,95,0.08)" }}
                >
                  <Icon size={24} strokeWidth={1.75} color="#1F6F5F" />
                </div>

                {/* Step label */}
                <div
                  className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#1F6F5F] mb-2.5"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {card.label}
                </div>

                {/* Card title */}
                <div
                  className="text-[#0D1F1C] mb-3 leading-[1.1] tracking-[-0.03em] font-bold"
                  style={{
                    fontFamily: "var(--font-clash)",
                    fontSize: "clamp(1.4rem, 2.5vw, 1.7rem)",
                  }}
                >
                  {card.title}
                </div>

                {/* Card body */}
                <div
                  className="text-[13.5px] text-[rgba(13,31,28,0.5)] leading-[1.7]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {card.body}
                </div>

                {/* Tag pill */}
                <div
                  className="inline-flex items-center gap-1.5 mt-6 px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-[#1F6F5F] border border-[rgba(31,111,95,0.18)]"
                  style={{
                    background: "rgba(31,111,95,0.08)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Icon size={12} strokeWidth={2} color="#1F6F5F" />
                  {card.tag}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}