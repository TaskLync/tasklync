"use client";

import { ArrowRight, CheckCircle2, Zap, Star, CalendarClock, BarChart3, Users, BadgeDollarSign } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { EASE_EXPO_OUT, DUR } from "@/lib/motion/transitions";

// ─────────────────────────────────────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// Local variants
// ─────────────────────────────────────────────────────────────────────────────

const slideLeft: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DUR.slow,
      ease: [...EASE_EXPO_OUT] as [number, number, number, number],
      delay,
    },
  }),
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DUR.base,
      ease: [...EASE_EXPO_OUT] as [number, number, number, number],
      delay,
    },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function ForProfessionals() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.05 });

  return (
    <section
      className="relative overflow-hidden py-16 lg:py-24"
      style={{ background: "#F7F7F2" }}
    >
      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "160px 160px",
        }}
      />

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(13,31,28,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Ghost text */}
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
        ref={ref}
        className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
      >

        {/* ── LEFT — Copy ── */}
        <div>

          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
          >
            <span className="block w-5 h-0.5 rounded-sm bg-[#1F6F5F]" />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#1F6F5F]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              For Professionals
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.08}
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "#0D1F1C",
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
          </motion.h2>

          {/* Subtitle — Instrument Serif italic */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.18}
            className="mt-5 max-w-105 italic leading-[1.72]"
            style={{
              fontFamily: "var(--font-serif-italic)",
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              color: "rgba(13,31,28,0.5)",
            }}
          >
            Join a growing network of trusted professionals using TaskLync to manage bookings, reach more customers, and grow with confidence.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-3 mt-8"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.28}
          >
            <button
              className="inline-flex items-center gap-2 rounded-full border-none px-7 py-3.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85"
              style={{
                fontFamily: "var(--font-body)",
                background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                boxShadow: "0 0 28px rgba(47,160,132,0.22), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              Apply to Join <ArrowRight size={14} strokeWidth={2} />
            </button>

            <button
              className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:border-[#1F6F5F] hover:text-[#1F6F5F]"
              style={{
                fontFamily: "var(--font-body)",
                background: "transparent",
                border: "1px solid rgba(13,31,28,0.18)",
                color: "rgba(13,31,28,0.6)",
              }}
            >
              See how it works
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap gap-5 mt-7"
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.38}
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
          </motion.div>
        </div>

        {/* ── RIGHT — Benefit cards grid ── */}
        <motion.div
          variants={slideLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.2}
          className="grid grid-cols-2 gap-3 sm:gap-4"
        >
          {benefitCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                variants={cardVariant}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={0.25 + i * 0.07}
                className="group flex flex-col gap-3 rounded-2xl p-5 border transition-shadow duration-300 hover:shadow-md"
                style={{
                  background: card.accent,
                  borderColor: card.border,
                }}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  style={{
                    background: "rgba(31,111,95,0.10)",
                    color: "#1F6F5F",
                  }}
                >
                  <Icon size={17} strokeWidth={1.75} />
                </div>

                {/* Title */}
                <p
                  className="text-[14px] font-semibold leading-snug tracking-[-0.02em] text-[#0D1F1C]"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  {card.title}
                </p>

                {/* Body */}
                <p
                  className="text-[12px] leading-[1.65] text-[rgba(13,31,28,0.52)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {card.body}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* ── Stats bar ── */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 mt-14"
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0.55}
      >
        <div
          className="grid grid-cols-2 md:grid-cols-4 rounded-[20px] overflow-hidden border border-[rgba(13,31,28,0.08)]"
          style={{ background: "#fff", boxShadow: "0 2px 20px rgba(13,31,28,0.05)" }}
        >
          {[
            { value: "4.9★", label: "Average pro rating" },
            { value: "24h",  label: "First payout speed"  },
            { value: "0%",   label: "Commission on tips"  },
            { value: "2min", label: "Profile setup time"  },
          ].map((s, i, arr) => (
            <div
              key={s.label}
              className={`flex flex-col items-center justify-center py-6 px-4 ${i < arr.length - 1 ? "border-r border-[rgba(13,31,28,0.06)]" : ""}`}
            >
              <p
                className="leading-none"
                style={{
                  fontFamily: "var(--font-clash)",
                  fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
                  fontWeight: 700,
                  color: "#1F6F5F",
                  letterSpacing: "-0.03em",
                }}
              >
                {s.value}
              </p>
              <p
                className="mt-1 text-center text-[12px] font-semibold text-[rgba(13,31,28,0.45)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default ForProfessionals;