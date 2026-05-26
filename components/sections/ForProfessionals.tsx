"use client";

import { ArrowRight, CheckCircle2, Zap, Star, CalendarClock, BarChart3, Users, BadgeDollarSign } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useWaitlist } from "../waitlist/WaitlistContext";
import { useRouter } from "next/navigation";

// ─── Content ──────────────────────────────────────────────────────────────────

const trustBadges = ["No joining fees", "Fast and secure payouts", "Flexible scheduling"];

const benefitCards = [
  {
    icon: Users,
    title: "Steady Demand",
    body: "Get matched with customers actively booking services in your area.",
    accent: "rgba(47,160,132,0.12)",
    border: "rgba(47,160,132,0.18)",
  },
  {
    icon: Zap,
    title: "Fast Payouts",
    body: "Receive secure payouts with fast payment processing.",
    accent: "rgba(111,207,151,0.10)",
    border: "rgba(111,207,151,0.20)",
  },
  {
    icon: CalendarClock,
    title: "You Set the Hours",
    body: "Work when you want, where you want. Full control over your schedule.",
    accent: "rgba(31,111,95,0.08)",
    border: "rgba(31,111,95,0.15)",
  },
  {
    icon: Star,
    title: "Build Reputation",
    body: "Verified reviews help increase visibility and future bookings.",
    accent: "rgba(47,160,132,0.12)",
    border: "rgba(47,160,132,0.18)",
  },
  {
    icon: BarChart3,
    title: "Growth Insights",
    body: "Track earnings, repeat clients, and peak demand times in one dashboard.",
    accent: "rgba(111,207,151,0.10)",
    border: "rgba(111,207,151,0.20)",
  },
  {
    icon: BadgeDollarSign,
    title: "Zero Hidden Fees",
    body: "Transparent and clear pricing with no hidden charges.",
    accent: "rgba(31,111,95,0.08)",
    border: "rgba(31,111,95,0.15)",
  },
] as const;

const stats = [
  { value: "4.9★", label: "Average pro rating" },
  { value: "24h",  label: "First payout speed"  },
  { value: "0%",   label: "Commission on tips"  },
  { value: "2min", label: "Profile setup time"  },
] as const;

// ─── ForProfessionals ─────────────────────────────────────────────────────────

export function ForProfessionals() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.05 });
  const { openModal } = useWaitlist();
  const router = useRouter();

  // [FP7] Check reduced-motion once, outside render — same pattern as HowItWorks
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Helper: returns animation style only when in view and motion is allowed
  const anim = (delay: number) =>
    !reduced && inView
      ? { animation: `fpFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s both` }
      : { opacity: reduced ? 1 : inView ? undefined : 0 };

  return (
    <>
      <style>{`
        @keyframes fpFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* [FP5] Icon scale — CSS only, no JS animation values */
        .fp-card:hover .fp-icon { transform: scale(1.1); }
        .fp-icon { transition: transform 0.2s ease; }
        /* Stats bar border-right on md+ */
        @media (min-width: 768px) {
          .fp-stat:not(:last-child) { border-right: 1px solid rgba(13,31,28,0.06); }
        }
      `}</style>

      <section
        className="relative overflow-hidden py-16 lg:py-24"
        style={{ background: "#F7F7F2" }}
      >
        {/* Noise — static, zero animation cost */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "160px 160px",
          }}
        />

        {/* Dot grid — static */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: "radial-gradient(rgba(13,31,28,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ghost text — static, no animation */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-[-2%] top-[-4%] z-0"
          style={{
            fontFamily: "var(--font-clash)",
            fontSize: "clamp(120px, 20vw, 280px)",
            fontWeight: 700,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(31,111,95,0.07)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          PRO
        </div>

        {/* ── Main grid ── */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >

          {/* ── LEFT — Copy ── */}
          <div>

            {/* [FP1] Eyebrow — CSS fpFadeUp */}
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={anim(0)}
            >
              
              <span
                className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#1F6F5F]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                For Professionals
              </span>
            </div>

            {/* [FP1] Headline */}
            <h2
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: "#0D1F1C",
                ...anim(0.08),
              }}
            >
              Your skills.<br />
              <span
                style={{
                  backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 60%,#6FCF97 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Your schedule.
              </span>
              <br />Your income.
            </h2>

            {/* [FP1] Subtitle */}
            <p
              className="mt-5 max-w-105 italic leading-[1.72]"
              style={{
                fontFamily: "var(--font-serif-italic)",
                fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                color: "rgba(13,31,28,0.5)",
                ...anim(0.18),
              }}
            >
              Join a growing network of trusted professionals using TaskLync to
              manage bookings, reach more customers, and grow with confidence.
            </p>

            {/* [FP1] CTAs */}
            <div
              className="flex flex-wrap gap-3 mt-8"
              style={anim(0.28)}
            >
              <button
                onClick={openModal}
                className="cursor-pointer inline-flex items-center gap-2 rounded-full border-none px-7 py-3.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                  boxShadow: "0 0 28px rgba(47,160,132,0.22), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                Apply to Join <ArrowRight size={14} strokeWidth={2} />
              </button>

              <button
                onClick={() => router.push("/how-it-works")}
                className="cursor-pointer inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-colors duration-200 hover:border-[#1F6F5F] hover:text-[#1F6F5F]"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "transparent",
                  border: "1px solid rgba(13,31,28,0.18)",
                  color: "rgba(13,31,28,0.6)",
                }}
              >
                See how it works
              </button>
            </div>

            {/* [FP1] Trust badges */}
            <div
              className="flex flex-wrap gap-5 mt-7"
              style={anim(0.38)}
            >
              {trustBadges.map((t) => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} strokeWidth={2.5} color="#2FA084" />
                  <span
                    className="text-[12.5px] font-semibold text-[rgba(13,31,28,0.5)]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Benefit cards grid ── */}
          {/*
            [FP2] slideLeft motion.div removed → CSS fpFadeUp on wrapper.
            [FP3] Each card: motion.div → plain div, delay via inline style.
          */}
          <div
            className="hidden lg:grid grid-cols-2 gap-3 sm:gap-4"
            style={anim(0.2)}
          >
            {benefitCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="fp-card flex flex-col gap-3 rounded-2xl p-5 border transition-shadow duration-300 hover:shadow-md"
                  style={{
                    background: card.accent,
                    borderColor: card.border,
                    // [FP3] stagger via CSS animation-delay, not JS loop
                    ...(!reduced && inView
                      ? {
                          animation: `fpFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${0.25 + i * 0.07}s both`,
                        }
                      : { opacity: reduced ? 1 : inView ? undefined : 0 }),
                  }}
                >
                  {/* [FP5] Icon — CSS scale only, compositor-safe */}
                  <div
                    className="fp-icon w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: "rgba(31,111,95,0.10)",
                      color: "#1F6F5F",
                    }}
                  >
                    <Icon size={17} strokeWidth={1.75} />
                  </div>

                  <p
                    className="text-[14px] font-semibold leading-snug tracking-[-0.02em] text-[#0D1F1C]"
                    style={{ fontFamily: "var(--font-clash)" }}
                  >
                    {card.title}
                  </p>

                  <p
                    className="text-[12px] leading-[1.65] text-[rgba(13,31,28,0.52)]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {card.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default ForProfessionals;