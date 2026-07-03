// components/sections/SocialProof.tsx
"use client";

import { useState, useEffect } from "react";
import { CountUp } from "@/components/motion/CountUp";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// ─── Types ─────────────────────────────────────────────────────────────────────

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

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS: StatItem[] = [
  { type: "counter", target: 7,  suffix: "×", label: "Verification Steps"  },
  { type: "counter", target: 60, suffix: "s", label: "Avg. Booking Time"   },
  { type: "counter", target: 94, suffix: "%", label: "Pro Acceptance Rate" },
  { type: "static",  display: "3",      label: "Steps to Book"    },
  { type: "static",  display: "Always", label: "Escrow Protected" },
];

// ─── useClientSideFlags ───────────────────────────────────────────────────────

function useClientSideFlags() {
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setIsMobile(
      window.matchMedia("(hover: none) and (pointer: coarse)").matches
    );
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  return { isMobile, reducedMotion };
}

// ─── StatNumber ───────────────────────────────────────────────────────────────

function StatNumber({ stat, animate }: { stat: StatItem; animate: boolean }) {
  const { isMobile, reducedMotion } = useClientSideFlags();

  if (stat.type === "static") return <>{stat.display}</>;

  if (isMobile || reducedMotion) {
    return (
      <>
        {stat.prefix ?? ""}
        {stat.target}
        {stat.suffix ?? ""}
      </>
    );
  }

  return animate ? (
    <CountUp target={stat.target} suffix={stat.suffix} prefix={stat.prefix} />
  ) : (
    <>
      {stat.prefix ?? ""}0{stat.suffix ?? ""}
    </>
  );
}

// ─── StatCell ─────────────────────────────────────────────────────────────────

function StatCell({ stat, index, inView }: { stat: StatItem; index: number; inView: boolean }) {
  const { reducedMotion } = useClientSideFlags();

  return (
    <div
      className="sp-cell"
      style={{
        opacity: reducedMotion ? 1 : undefined,
        animation:
          !reducedMotion && inView
            ? `spFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${0.05 + index * 0.07}s both`
            : !reducedMotion
            ? "none"
            : undefined,
      }}
    >
      {/* Stat number */}
      <div
        className="font-['Fredoka']"
        style={{
          fontSize: "clamp(1.4rem, 2.8vw, 2.5rem)",
          fontWeight: 700,
          lineHeight: 1,
          letterSpacing: "-0.025em",
          color: "var(--primary)",
          marginBottom: "0.5rem",
        }}
      >
        <StatNumber stat={stat} animate={inView} />
      </div>

      {/* Label */}
      <div
        className="font-['Poppins']"
        style={{
          fontSize: "0.68rem",
          fontWeight: 500,
          letterSpacing: "0.09em",
          textTransform: "uppercase" as const,
          color: "rgba(31,111,95,0.45)",
          textAlign: "center" as const,
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

// ─── SocialProof ──────────────────────────────────────────────────────────────

export default function SocialProof() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.15 });

  return (
    <>
      <style>{`
        @keyframes spFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .sp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (min-width: 768px) {
          .sp-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        .sp-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(1.2rem, 3vw, 2.2rem) 1rem;
          box-shadow: inset -1px 0 0 var(--sp-divider, rgba(31,111,95,0.1));
        }
        @media (max-width: 767px) {
          .sp-cell:nth-child(2n) {
            box-shadow: none;
          }
          .sp-cell:nth-child(-n+2) {
            box-shadow:
              inset -1px 0 0 var(--sp-divider, rgba(31,111,95,0.1)),
              inset 0 -1px 0 var(--sp-divider, rgba(31,111,95,0.1));
          }
          .sp-cell:nth-child(2) {
            box-shadow:
              inset 0 -1px 0 var(--sp-divider, rgba(31,111,95,0.1));
          }
          .sp-cell:nth-child(3),
          .sp-cell:nth-child(4) {
            box-shadow:
              inset -1px 0 0 var(--sp-divider, rgba(31,111,95,0.1)),
              inset 0 -1px 0 var(--sp-divider, rgba(31,111,95,0.1));
          }
          .sp-cell:nth-child(4) {
            box-shadow:
              inset 0 -1px 0 var(--sp-divider, rgba(31,111,95,0.1));
          }
          .sp-cell:last-child {
            box-shadow: none;
          }
        }
        @media (min-width: 768px) {
          .sp-cell {
            box-shadow: inset -1px 0 0 var(--sp-divider, rgba(31,111,95,0.1));
          }
          .sp-cell:last-child {
            box-shadow: none;
          }
        }
      `}</style>

      <div
        ref={ref}
        style={{
          background: "#F7F7F5",
          borderTop: "1px solid var(--sp-divider, rgba(31,111,95,0.1))",
          borderBottom: "1px solid var(--sp-divider, rgba(31,111,95,0.1))",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(1rem, 5vw, 4rem)" }}>
          <div className="sp-grid">
            {STATS.map((stat, i) => (
              <StatCell key={i} stat={stat} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}