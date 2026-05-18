"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { Search, CalendarCheck, ShieldCheck } from "lucide-react";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { fadeUp, slideRight } from "@/lib/motion/variants";
import { EASE_EXPO_OUT, DUR } from "@/lib/motion/transitions";

// ─────────────────────────────────────────────────────────────────────────────
// Content
// ─────────────────────────────────────────────────────────────────────────────

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

const cards = [
  {
    label: "Step 01",
    title: "Find what you need",
    body: "Explore a wide range of trusted local services with real time availability, transparent pricing, and verified professionals near you.",
    tag: "Smart Matching",
    icon: Search,
  },
  {
    label: "Step 02",
    title: "Instant confirmation",
    body: "See professional profiles, ratings, and arrival times before you book. Confirm your slot in under 60 seconds.",
    tag: "60-sec Booking",
    icon: CalendarCheck,
  },
  {
    label: "Step 03",
    title: "Secure & done",
    body: "Pay in app after completion. Rate the service. Dispute anything within 24 hours with full payment protection guaranteed.",
    tag: "Escrow Protected",
    icon: ShieldCheck,
  },
] as const;

// ─────────────────────────────────────────────────────────────────────────────
// Local variant — card content swap animation
// ─────────────────────────────────────────────────────────────────────────────

const cardContentVariants: Variants = {
  hidden:  { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [...EASE_EXPO_OUT] as [number, number, number, number],
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: DUR.instant, ease: "easeIn" },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useIntersectionObserver({ threshold: 0.15 });

  const card = cards[active];
  const Icon = card.icon;

  return (
    <section id="how-it-works" className="bg-[#F7F7F5] py-20 lg:py-32">
      <div
        ref={ref}
        className="max-w-290 mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
      >

        {/* ── LEFT ──────────────────────────────────────────────────────── */}
        <div>

          {/* Label */}
          <motion.div
            className="inline-flex items-center gap-2 mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
            style={{ fontFamily: "var(--font-body)" }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
          >
            <span className="block w-5 h-0.5 rounded-sm bg-[#1F6F5F]" />
            How It Works
          </motion.div>

          {/* Title */}
          <motion.h2
            className="text-[#0D1F1C] mb-4 leading-[1.05] tracking-[-0.03em] font-bold"
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.1}
          >
            Three steps to<br />a fixed home.
          </motion.h2>

          {/* Subtitle — Instrument Serif italic, matches Hero.tsx subheading */}
          <motion.p
            className="text-[rgba(13,31,28,0.5)] leading-[1.7] mb-12 max-w-sm italic"
            style={{ fontFamily: "var(--font-serif-italic)", fontSize: "1.15rem" }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.2}
          >
            TaskLync makes it easy to find, book, and manage trusted local services from one seamless platform.
          </motion.p>

          {/* Steps */}
          <div className="flex flex-col">
            {steps.map((s, i) => (
              <motion.div
                key={i}
                className={[
                  "relative flex gap-5 py-6 cursor-pointer",
                  i < steps.length - 1 ? "border-b border-[rgba(31,111,95,0.1)]" : "",
                ].join(" ")}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={0.3 + i * 0.1}
                onMouseEnter={() => setActive(i)}
              >
                {/* Accent bar */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-0.75 bg-[#1F6F5F] rounded-r-sm transition-opacity duration-250"
                  style={{ opacity: active === i ? 1 : 0 }}
                />

                {/* Number pill */}
                <div
                  className="shrink-0 w-11.5 h-11.5 rounded-[14px] flex items-center justify-center text-[15px] font-bold border-[1.5px] transition-all duration-300"
                  style={{
                    fontFamily:  "var(--font-clash)",
                    background:  active === i ? "#1F6F5F" : "#EFEFED",
                    color:       active === i ? "#fff"    : "rgba(13,31,28,0.35)",
                    borderColor: active === i ? "#1F6F5F" : "rgba(31,111,95,0.12)",
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
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── RIGHT (desktop only) ──────────────────────────────────────── */}
        <motion.div
          className="hidden lg:block sticky top-28"
          variants={slideRight}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.4}
        >
          {/* Card shell */}
          <div
            className="relative rounded-[28px] overflow-hidden flex flex-col justify-end min-h-90 p-10 border border-[rgba(47,160,132,0.15)]"
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

            {/* Glow blob */}
            <div
              className="absolute -top-15 -right-15 w-70 h-70 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(47,160,132,0.2) 0%, transparent 70%)" }}
            />

            {/* Animated content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative z-10"
                variants={cardContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-[rgba(47,160,132,0.25)]"
                  style={{ background: "rgba(47,160,132,0.15)" }}
                >
                  <Icon size={24} strokeWidth={1.75} color="#6FCF97" />
                </div>

                {/* Step label */}
                <div
                  className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#6FCF97] mb-2.5"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {card.label}
                </div>

                {/* Card title */}
                <div
                  className="text-white mb-3 leading-[1.1] tracking-[-0.03em] font-bold"
                  style={{
                    fontFamily: "var(--font-clash)",
                    fontSize: "clamp(1.4rem, 2.5vw, 1.7rem)",
                  }}
                >
                  {card.title}
                </div>

                {/* Card body */}
                <div
                  className="text-[13.5px] text-[rgba(255,255,255,0.45)] leading-[1.7]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {card.body}
                </div>

                {/* Tag pill */}
                <div
                  className="inline-flex items-center gap-1.5 mt-6 px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-[#6FCF97] border border-[rgba(47,160,132,0.2)]"
                  style={{
                    background:  "rgba(47,160,132,0.12)",
                    fontFamily:  "var(--font-body)",
                  }}
                >
                  <Icon size={12} strokeWidth={2} color="#6FCF97" />
                  {card.tag}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </section>
  );
}