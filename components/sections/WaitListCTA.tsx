"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { fadeUp, slideRight } from "@/lib/motion/variants";
import { EASE_EXPO_OUT, DUR } from "@/lib/motion/transitions";

// ─────────────────────────────────────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────────────────────────────────────

const perks = [
  "Priority access before public launch",
  "Founder pricing locked in forever",
  "Early city launch notification",
  "Shape the product with direct feedback",
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function WaitlistCTA() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden bg-[#F7F7F2] py-12 lg:py-18"
    >
      {/* Dot texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(13,31,28,0.055) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        ref={ref}
        className="relative z-10 mx-auto max-w-275 px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
      >

        {/* ── LEFT ──────────────────────────────────────────────────────── */}
        <div>

          {/* Label */}
          <motion.div
            className="inline-flex items-center gap-2 mb-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1F6F5F]"
            style={{ fontFamily: "var(--font-body)" }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
          >
            <span className="block w-5 h-0.5 rounded-sm bg-[#1F6F5F]" />
            Early Access
          </motion.div>

          {/* Title */}
          <motion.h2
            className="mb-4 leading-[1.05] tracking-[-0.03em] text-[#0D1F1C] font-bold"
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
          >
            Get in before<br />
            <span
              style={{
                backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 60%,#6FCF97 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              everyone else does.
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="leading-[1.72] mb-10 max-w-sm italic"
            style={{
              fontFamily: "var(--font-serif-italic)",
              fontSize: "1rem",
              color: "rgba(13,31,28,0.48)",
            }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.2}
          >
            We're launching city by city. Join the waitlist now and be the
            first to book — or earn — when TaskLync goes live near you.
          </motion.p>

          {/* Perks */}
          <div className="flex flex-col gap-3.5">
            {perks.map((p, i) => (
              <motion.div
                key={p}
                className="flex items-center gap-3"
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={0.3 + i * 0.08}
              >
                <span className="w-2 h-2 rounded-full shrink-0 bg-[#2FA084]" />
                <span
                  className="text-[13.5px] font-medium text-[rgba(13,31,28,0.55)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {p}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── RIGHT dark card (desktop only) ────────────────────────────── */}
        <motion.div
          className="hidden lg:block"
          variants={slideRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.4}
        >
          <div
            className="relative rounded-[28px] overflow-hidden p-10 border border-[rgba(47,160,132,0.15)]"
            style={{ background: "linear-gradient(145deg, #0D1F1C 0%, #081512 100%)" }}
          >
            {/* Dot grid */}
            <div
              className="absolute inset-0 rounded-[28px] pointer-events-none"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(111,207,151,0.04) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(111,207,151,0.04) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* Glow */}
            <div
              className="absolute -top-15 -right-15 w-70 h-70 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(47,160,132,0.2) 0%, transparent 70%)" }}
            />

            <div className="relative z-10">

              {/* Pill */}
              <div
                className="inline-flex items-center gap-1.5 mb-6 px-3 py-1.5 rounded-full border border-[rgba(111,207,151,0.2)] text-[#6FCF97] text-[10px] font-bold tracking-widest uppercase"
                style={{
                  background: "rgba(111,207,151,0.1)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#6FCF97] animate-pulse" />
                Limited spots
              </div>

              {/* Card title */}
              <div
                className="text-white mb-3 leading-[1.08] tracking-[-0.03em] font-bold"
                style={{
                  fontFamily: "var(--font-clash)",
                  fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                }}
              >
                Join the waitlist.<br />Pick your side.
              </div>

              {/* Card body */}
              <div
                className="text-[13.5px] leading-[1.7] mb-8 text-[rgba(255,255,255,0.42)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Are you a homeowner looking to book trusted pros, or a
                professional ready to grow your income? We'll onboard you first.
              </div>

              {/* Divider */}
              <div className="w-full h-px mb-7 bg-[rgba(255,255,255,0.07)]" />

              {/* Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full border-none text-white text-[14px] font-semibold cursor-pointer transition-opacity duration-200 hover:opacity-85"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                    boxShadow: "0 0 28px rgba(47,160,132,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  I need a service done <ArrowRight size={14} strokeWidth={2} />
                </button>

                <button
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-[14px] font-medium cursor-pointer transition-all duration-200 hover:border-[rgba(255,255,255,0.25)] hover:text-white"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  I&apos;m a professional <ArrowRight size={14} strokeWidth={2} />
                </button>
              </div>

              {/* Note */}
              <p
                className="mt-5 text-center text-[11px] text-[rgba(255,255,255,0.22)]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Free to join · No spam · Cancel anytime
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── MOBILE buttons (card hidden on mobile) ────────────────────── */}
        <motion.div
          className="flex flex-col gap-3 lg:hidden"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.4}
        >
          <button
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full border-none text-white text-[14px] font-semibold cursor-pointer transition-opacity duration-200 hover:opacity-85"
            style={{
              fontFamily: "var(--font-body)",
              background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
              boxShadow: "0 0 28px rgba(47,160,132,0.25)",
            }}
          >
            I need a service done <ArrowRight size={14} strokeWidth={2} />
          </button>

          <button
            className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-[14px] font-medium cursor-pointer transition-all duration-200 hover:border-[rgba(255,255,255,0.25)] hover:text-white"
            style={{
              fontFamily: "var(--font-body)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            I&apos;m a professional <ArrowRight size={14} strokeWidth={2} />
          </button>
        </motion.div>

      </div>
    </section>
  );
}