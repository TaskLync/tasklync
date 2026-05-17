// components/sections/SocialProof.tsx
"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/motion/CountUp";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { staggerContainer, fadeUp } from "@/lib/motion/variants";

// ─── Stat data ─────────────────────────────────────────────────────────────────
type StatItem =
  | {
      type: "counter";
      target: number;
      suffix?: string;
      prefix?: string;
      label: string;
    }
  | {
      type: "static";
      display: string;
      label: string;
    };

const STATS: StatItem[] = [
  { type: "counter", target: 7, suffix: "×", label: "Verification Steps" },
  { type: "counter", target: 60, suffix: "s", label: "Avg. Booking Time" },
  { type: "counter", target: 94, suffix: "%", label: "Pro Acceptance Rate" },
  { type: "static", display: "3", label: "Steps to Book" },
  { type: "static", display: "Always", label: "Escrow Protected" },
];

// ─── StatCell ─────────────────────────────────────────────────────────────────
function StatCell({
  stat,
  index,
}: {
  stat: StatItem;
  index: number;
}) {
  const number =
    stat.type === "counter" ? (
      <CountUp
        target={stat.target}
        suffix={stat.suffix}
        prefix={stat.prefix}
      />
    ) : (
      stat.display
    );

  return (
    <motion.div
      variants={fadeUp}
      className="w-1/2 md:w-1/5"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(1.2rem, 3vw, 2.2rem) 1rem",
        borderRight:
          index !== STATS.length - 1
            ? "1px solid var(--sp-divider)"
            : "none",
        borderBottom:
          index < 4 ? "1px solid var(--sp-divider)" : "none",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-clash)",
          fontSize: "clamp(1.4rem, 2.8vw, 2.5rem)",
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color: "var(--primary)",
          marginBottom: "0.5rem",
        }}
      >
        {number}
      </div>

      <div
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.68rem",
          fontWeight: 500,
          letterSpacing: "0.09em",
          textTransform: "uppercase",
          color: "rgba(31,111,95,0.45)",
          textAlign: "center",
        }}
      >
        {stat.label}
      </div>
    </motion.div>
  );
}

// ─── SocialProof ──────────────────────────────────────────────────────────────
export default function SocialProof() {
  const { ref, inView } = useIntersectionObserver({
    threshold: 0.15,
  });

  return (
    <div
      ref={ref}
      style={{
        background: "#F7F7F5",
        borderTop: "1px solid var(--sp-divider)",
        borderBottom: "1px solid var(--sp-divider)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(1rem, 5vw, 4rem)",
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap md:flex-nowrap items-stretch"
        >
          {STATS.map((stat, i) => (
            <StatCell key={i} stat={stat} index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}