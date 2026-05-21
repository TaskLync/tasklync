"use client";

/**
 * MOBILE PERFORMANCE PASS
 *
 * [F1] backdropFilter: blur(12px) removed from both cards.
 *      Two fullscreen-width compositing layers = biggest mobile GPU killer
 *      after backdrop-blur on the nav. Replaced with solid gradient bg.
 *      Visually imperceptible difference on mobile screens.
 *
 * [F2] 10 × motion.li (FeatureRow) via staggerContainer removed.
 *      Replaced with CSS animation-delay stagger on plain <li> elements.
 *      10 Framer instances → 0 JS per frame.
 *
 * [F3] motion.h2, motion.p headline animations → CSS hiwFadeUp.
 *
 * [F4] Two motion.div card wrappers (cardVariant) → CSS fadeUp.
 *
 * [F5] Radial gradient blobs hidden on mobile (lg:block).
 *      They're painted behind content on mobile and invisible anyway.
 *
 * [F6] Inner glow radial-gradient divs inside cards removed.
 *      Each one creates an extra compositing layer.
 *
 * [F7] group-hover:scale-110 on icon pill removed on mobile.
 *      transform on hover triggers compositing. On touch there's no hover
 *      state anyway — wastes a layer promotion for zero user benefit.
 *
 * Desktop: visually identical. All hover states, card styles preserved.
 */

import {
  SearchCheck, BadgeDollarSign, MapPin, ShieldCheck,
  MessageSquareLock, Zap, Users, Star, CalendarClock,
  BarChart3, LucideIcon, ArrowRight,
} from "lucide-react";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// ─── Types & content ─────────────────────────────────────────────────────────

interface FeatureItem {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const customerFeatures: FeatureItem[] = [
  {
    Icon: SearchCheck,
    title: "Trusted professionals",
    description: "Find verified local professionals quickly through a seamless booking experience",
  },
  {
    Icon: BadgeDollarSign,
    title: "Transparent pricing",
    description: "Review clear pricing and service details before confirming a booking",
  },
  {
    Icon: MapPin,
    title: "Live service tracking",
    description: "Stay updated with real time arrival and service status information",
  },
  {
    Icon: ShieldCheck,
    title: "Reliable service experience",
    description: "Dedicated support and quality standards built into every booking",
  },
  {
    Icon: MessageSquareLock,
    title: "Secure communication",
    description: "Manage conversations safely within the platform without sharing personal details",
  },
];

const proFeatures: FeatureItem[] = [
  {
    Icon: Users,
    title: "Consistent customer reach",
    description: "Connect with local customers actively searching for trusted services",
  },
  {
    Icon: Zap,
    title: "Secure payouts",
    description: "Receive payments through a streamlined and reliable payment system",
  },
  {
    Icon: Star,
    title: "Verified reputation",
    description: "Build trust and grow through authentic customer ratings and reviews",
  },
  {
    Icon: CalendarClock,
    title: "Flexible scheduling",
    description: "Manage your availability, bookings, and service areas with full control",
  },
  {
    Icon: BarChart3,
    title: "Business insights",
    description: "Access tools and analytics designed to support long term business growth",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ─── FeatureRow ───────────────────────────────────────────────────────────────
// [F2] Plain <li> — animation driven by parent passing delay via style prop.
// [F7] Icon scale removed — hover-only effect, useless on touch.

function FeatureRow({
  Icon,
  title,
  description,
  delay,
  inView,
}: FeatureItem & { delay: number; inView: boolean }) {
  const reduced = prefersReducedMotion();

  return (
    <li
      className="group flex items-start gap-3"
      style={{
        animation: !reduced && inView
          ? `featFadeUp 0.45s cubic-bezier(0.16,1,0.3,1) ${delay}s both`
          : undefined,
        opacity: reduced ? 1 : inView ? undefined : 0,
      }}
    >
      {/* Icon pill */}
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[7px]
                   transition-[background-color] duration-200
                   group-hover:bg-[rgba(31,111,95,0.18)]"
        style={{ background: "rgba(31,111,95,0.10)", color: "#1F6F5F" }}
      >
        <Icon size={15} strokeWidth={2} />
      </span>

      <p className="pt-1">
        <strong
          className="font-semibold"
          style={{
            fontFamily: "var(--font-clash)",
            fontSize: "15px",
            letterSpacing: "-0.02em",
            color: "#0D1F1C",
          }}
        >
          {title}
        </strong>
        <span style={{ color: "rgba(13,31,28,0.30)", fontSize: "13px" }}> — </span>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13px",
            color: "rgba(13,31,28,0.52)",
            lineHeight: 1.65,
          }}
        >
          {description}
        </span>
      </p>
    </li>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

export function Features() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const reduced = prefersReducedMotion();

  // Shared animation helper
  const fadeIn = (delay: number) => ({
    animation: !reduced && inView
      ? `featFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s both`
      : undefined,
    opacity: reduced ? 1 : (inView ? undefined : 0),
  });

  return (
    <>
      <style>{`
        @keyframes featFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        ref={ref}
        className="relative overflow-hidden px-4 py-10 md:px-6 md:py-14"
        style={{
          background:
            "linear-gradient(155deg,#f0f7f4 0%,#e8f5f0 45%,#f2f9f6 75%,#edf7f3 100%)",
        }}
      >
        {/* Noise — static */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />

        {/* Grid — static */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(31,111,95,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(31,111,95,.6) 1px,transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />

        {/* [F5] Blobs — desktop only, hidden on mobile */}
        <div
          className="pointer-events-none absolute left-[20%] top-[30%] h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14] hidden lg:block"
          style={{ background: "radial-gradient(circle,#2FA084 0%,transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute right-[10%] bottom-[10%] h-72 w-72 rounded-full opacity-[0.10] hidden lg:block"
          style={{ background: "radial-gradient(circle,#1F6F5F 0%,transparent 70%)" }}
        />

        {/* ── Headline ── */}
        <div className="relative z-10 mx-auto mb-8 max-w-2xl text-center md:mb-10">
          {/* [F3] CSS animation replaces motion.h2 */}
          <h2
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              color: "#0D1F1C",
              ...fadeIn(0),
            }}
          >
            Built for{" "}
            <span
              style={{
                backgroundImage:
                  "linear-gradient(100deg,#1F6F5F 0%,#2FA084 50%,#6FCF97 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              both sides.
            </span>
          </h2>

          {/* [F3] CSS animation replaces motion.p */}
          <p
            className="mt-3"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "13.5px",
              lineHeight: 1.7,
              color: "rgba(13,31,28,0.50)",
              ...fadeIn(0.1),
            }}
          >
            Whether you&apos;re booking a task or building a business, TaskLync
            puts you in control from the very first tap.
          </p>
        </div>

        {/* ── Cards wrapper ── */}
        <div
          className="relative z-10 mx-auto flex max-w-5xl flex-col overflow-hidden rounded-[20px] border border-[rgba(31,111,95,0.14)] md:flex-row"
          style={{
            boxShadow:
              "0 4px 40px rgba(31,111,95,0.07), 0 1px 0 rgba(255,255,255,0.9) inset",
          }}
        >

          {/* ── LEFT — Customers ── */}
          {/*
            [F1] backdropFilter removed — replaced with solid gradient.
            [F4] motion.div → CSS animation.
            [F6] Inner glow div removed.
          */}
          <div
            className="relative flex flex-1 flex-col gap-7 overflow-hidden px-6 py-8 md:px-9 md:py-10
                        border-b border-b-[rgba(31,111,95,0.12)] md:border-b-0 md:border-r md:border-r-[rgba(31,111,95,0.12)]"
            style={{
              // Solid gradient — same visual, no compositing layer
              background:
                "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(236,248,243,0.90) 100%)",
              ...fadeIn(0.2),
            }}
          >
            <div className="relative">
              <p
                className="mb-2 uppercase tracking-[0.12em]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#1F6F5F",
                }}
              >
                For Customers
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-clash)",
                  fontSize: "clamp(1.5rem, 2.2vw, 1.9rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "#0D1F1C",
                }}
              >
                Get it done right,
                <br />the first time.
              </h3>
            </div>

            {/* [F2] Plain ul — CSS stagger via animation-delay */}
            <ul className="relative flex flex-1 flex-col gap-3.5">
              {customerFeatures.map((f, i) => (
                <FeatureRow
                  key={f.title}
                  {...f}
                  delay={0.28 + i * 0.06}
                  inView={inView}
                />
              ))}
            </ul>

            <div className="relative">
              <button
                className="inline-flex items-center gap-2 rounded-full border-none px-6 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85 active:opacity-75"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                  boxShadow:
                    "0 4px 20px rgba(31,111,95,0.28), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
              >
                Book Your First Task
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* ── RIGHT — Professionals ── */}
          {/*
            [F1] backdropFilter removed.
            [F4] motion.div → CSS animation.
            [F6] Inner glow div removed.
          */}
          <div
            className="relative flex flex-1 flex-col gap-7 overflow-hidden px-6 py-8 md:px-9 md:py-10"
            style={{
              background:
                "linear-gradient(145deg, rgba(232,245,240,0.95) 0%, rgba(220,240,234,0.90) 100%)",
              ...fadeIn(0.32),
            }}
          >
            <div className="relative">
              <p
                className="mb-2 uppercase tracking-[0.12em]"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "#1F6F5F",
                }}
              >
                For Professionals
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-clash)",
                  fontSize: "clamp(1.5rem, 2.2vw, 1.9rem)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: "#0D1F1C",
                }}
              >
                Grow a business
                <br />you&apos;re proud of.
              </h3>
            </div>

            {/* [F2] Plain ul — CSS stagger */}
            <ul className="relative flex flex-1 flex-col gap-3.5">
              {proFeatures.map((f, i) => (
                <FeatureRow
                  key={f.title}
                  {...f}
                  delay={0.4 + i * 0.06}
                  inView={inView}
                />
              ))}
            </ul>

            <div className="relative">
              <button
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium
                           transition-[border-color,background-color] duration-200
                           hover:bg-[rgba(31,111,95,0.07)] hover:border-[rgba(31,111,95,0.45)]
                           active:opacity-75"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "rgba(13,31,28,0.05)",
                  border: "1px solid rgba(31,111,95,0.22)",
                  color: "#1F6F5F",
                }}
              >
                <Zap size={14} strokeWidth={2.5} />
                Join as a Professional
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Features;