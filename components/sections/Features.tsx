"use client";

import {
  SearchCheck,
  BadgeDollarSign,
  MapPin,
  ShieldCheck,
  MessageSquareLock,
  Zap,
  Users,
  Star,
  CalendarClock,
  BarChart3,
  LucideIcon,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { EASE_EXPO_OUT, DUR } from "@/lib/motion/transitions";

// ─────────────────────────────────────────────────────────────────────────────
// Types & content
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// Local variants
// ─────────────────────────────────────────────────────────────────────────────

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DUR.slow,
      ease: [...EASE_EXPO_OUT] as [number, number, number, number],
      delay,
    },
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// FeatureRow
// ─────────────────────────────────────────────────────────────────────────────

function FeatureRow({ Icon, title, description }: FeatureItem) {
  return (
    <motion.li variants={fadeUp} className="group flex items-start gap-3">
      {/* Icon pill — hover handled by Tailwind group-hover */}
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-[7px] transition-all duration-200 group-hover:scale-110 group-hover:bg-[rgba(31,111,95,0.18)]"
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
    </motion.li>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function Features() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-4 py-10 md:px-6 md:py-14"
      style={{
        background: "linear-gradient(155deg, #f0f7f4 0%, #e8f5f0 45%, #f2f9f6 75%, #edf7f3 100%)",
      }}
    >
      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(rgba(31,111,95,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(31,111,95,.6) 1px,transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Blobs */}
      <div
        className="pointer-events-none absolute left-[20%] top-[30%] h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.14]"
        style={{ background: "radial-gradient(circle,#2FA084 0%,transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute right-[10%] bottom-[10%] h-72 w-72 rounded-full opacity-[0.10]"
        style={{ background: "radial-gradient(circle,#1F6F5F 0%,transparent 70%)" }}
      />

      {/* ── Headline ── */}
      <div className="relative z-10 mx-auto mb-8 max-w-2xl text-center md:mb-10">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          style={{
            fontFamily: "var(--font-clash)",
            fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: "-0.03em",
            color: "#0D1F1C",
          }}
        >
          Built for{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 50%,#6FCF97 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            both sides.
          </span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.1}
          className="mt-3"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "13.5px",
            lineHeight: 1.7,
            color: "rgba(13,31,28,0.50)",
          }}
        >
          Whether you&apos;re booking a task or building a business, TaskLync
          puts you in control from the very first tap.
        </motion.p>
      </div>

      {/* ── Cards wrapper ── */}
      <div
        className="relative z-10 mx-auto flex max-w-5xl flex-col overflow-hidden rounded-[20px] border border-[rgba(31,111,95,0.14)] md:flex-row"
        style={{ boxShadow: "0 4px 40px rgba(31,111,95,0.07), 0 1px 0 rgba(255,255,255,0.9) inset" }}
      >

        {/* ── LEFT — Customers ── */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.2}
          className="relative flex flex-1 flex-col gap-7 overflow-hidden px-6 py-8 md:px-9 md:py-10 border-b border-b-[rgba(31,111,95,0.12)] md:border-b-0 md:border-r md:border-r-[rgba(31,111,95,0.12)]"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(236,248,243,0.75) 100%)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Inner glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-16 -top-16 h-64 w-64"
            style={{ background: "radial-gradient(circle,rgba(47,160,132,0.12) 0%,transparent 65%)" }}
          />

          <div className="relative">
            <p
              className="mb-2 uppercase tracking-[0.12em]"
              style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 600, color: "#1F6F5F" }}
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

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative flex flex-1 flex-col gap-3.5"
          >
            {customerFeatures.map((f) => <FeatureRow key={f.title} {...f} />)}
          </motion.ul>

          <div className="relative">
            <button
              className="inline-flex items-center gap-2 rounded-full border-none px-6 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85"
              style={{
                fontFamily: "var(--font-body)",
                background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                boxShadow: "0 4px 20px rgba(31,111,95,0.28), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              Book Your First Task
              <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>
        </motion.div>

        {/* ── RIGHT — Professionals ── */}
        <motion.div
          variants={cardVariant}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.35}
          className="relative flex flex-1 flex-col gap-7 overflow-hidden px-6 py-8 md:px-9 md:py-10"
          style={{
            background: "linear-gradient(145deg, rgba(232,245,240,0.80) 0%, rgba(220,240,234,0.70) 100%)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64"
            style={{ background: "radial-gradient(circle,rgba(31,111,95,0.10) 0%,transparent 65%)" }}
          />

          <div className="relative">
            <p
              className="mb-2 uppercase tracking-[0.12em]"
              style={{ fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 600, color: "#1F6F5F" }}
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

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative flex flex-1 flex-col gap-3.5"
          >
            {proFeatures.map((f) => <FeatureRow key={f.title} {...f} />)}
          </motion.ul>

          <div className="relative">
            <button
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 hover:bg-[rgba(31,111,95,0.07)] hover:border-[rgba(31,111,95,0.45)]"
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
        </motion.div>

      </div>
    </section>
  );
}

export default Features;