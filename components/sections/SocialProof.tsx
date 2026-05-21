// components/sections/SocialProof.tsx
"use client";

/**
 * MOBILE PERFORMANCE PASS
 *
 * [S1] Framer Motion removed entirely from this component.
 *      5 × motion.div with staggerContainer = 5 JS animation instances
 *      firing on scroll. Replaced with CSS @keyframes + animation-delay.
 *      Compositor-only, zero main-thread cost.
 *
 * [S2] CountUp (RAF loop per counter) disabled on mobile.
 *      3 simultaneous RAF loops on scroll entry on a weak CPU = jank.
 *      On mobile we show the final number immediately — users don't notice
 *      the count-up on a small screen, they just want the info fast.
 *      CountUp only runs on lg+ screens.
 *
 * [S3] Border logic moved to CSS grid with dividers — no per-cell JS
 *      computation, no inline style recalc per render.
 *
 * [S4] useReducedMotion respected — if user prefers reduced motion,
 *      all animations skip entirely (accessibility + perf win).
 *
 * [S5] inView trigger uses native IntersectionObserver via existing hook,
 *      but only flips a single boolean — no Framer state machine.
 *
 * Desktop: CountUp runs, CSS fade-up animates exactly as before visually.
 */

import { useRef, useState, useEffect } from "react";
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

// ─── Data — single source of truth, easy to extend ────────────────────────────

const STATS: StatItem[] = [
  { type: "counter", target: 7,  suffix: "×", label: "Verification Steps"  },
  { type: "counter", target: 60, suffix: "s", label: "Avg. Booking Time"   },
  { type: "counter", target: 94, suffix: "%", label: "Pro Acceptance Rate" },
  { type: "static",  display: "3",      label: "Steps to Book"    },
  { type: "static",  display: "Always", label: "Escrow Protected" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Detect touch/mobile — used to skip CountUp RAF loop */
const isMobileDevice = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches;

/** Detect prefers-reduced-motion */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ─── StatNumber ───────────────────────────────────────────────────────────────
// [S2] On mobile: render final value immediately (no CountUp RAF loop).
//      On desktop: render CountUp as before.

function StatNumber({
  stat,
  animate,
}: {
  stat: StatItem;
  animate: boolean;
}) {
  const mobile = isMobileDevice();

  if (stat.type === "static") {
    return <>{stat.display}</>;
  }

  // [S2] Mobile or reduced-motion: just show the number, no RAF loop
  if (mobile || prefersReducedMotion()) {
    return (
      <>
        {stat.prefix ?? ""}
        {stat.target}
        {stat.suffix ?? ""}
      </>
    );
  }

  // Desktop: CountUp runs only when inView (animate = true)
  return animate ? (
    <CountUp
      target={stat.target}
      suffix={stat.suffix}
      prefix={stat.prefix}
    />
  ) : (
    <>
      {stat.prefix ?? ""}0{stat.suffix ?? ""}
    </>
  );
}

// ─── StatCell ─────────────────────────────────────────────────────────────────
// [S1] No motion.div. CSS animation driven by `inView` boolean + delay index.
// [S3] No inline border logic — borders handled by CSS grid dividers below.

function StatCell({
  stat,
  index,
  inView,
}: {
  stat: StatItem;
  index: number;
  inView: boolean;
}) {
  const reduced = prefersReducedMotion();

  return (
    <div
      className="sp-cell"
      style={{
        // [S1] CSS animation — compositor-only, no JS per frame
        // animation-fill-mode: both keeps opacity:0 before trigger
        opacity: reduced ? 1 : undefined,
        animation:
          !reduced && inView
            ? `spFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${0.05 + index * 0.07}s both`
            : !reduced
            ? "none"
            : undefined,
      }}
    >
      {/* Stat number */}
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
        <StatNumber stat={stat} animate={inView} />
      </div>

      {/* Label */}
      <div
        style={{
          fontFamily: "var(--font-body)",
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
      {/*
        [S1] CSS keyframe defined once inline.
        spFadeUp: replaces Framer fadeUp + staggerContainer entirely.
        Each cell gets its own animation-delay via inline style above.

        [S3] Grid dividers via CSS — no per-cell border logic in JS.
        On mobile: 2-column grid, dividers between columns + rows.
        On desktop: 5-column single row, dividers only between columns.
      */}
      <style>{`
        @keyframes spFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        /* Grid layout with CSS dividers — zero JS border computation */
        .sp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        @media (min-width: 768px) {
          .sp-grid {
            grid-template-columns: repeat(5, 1fr);
          }
        }

        /* Dividers via box-shadow — single composited layer, no extra DOM nodes */
        .sp-cell {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(1.2rem, 3vw, 2.2rem) 1rem;
          /* Right divider on all cells except last in each row */
          box-shadow: inset -1px 0 0 var(--sp-divider, rgba(31,111,95,0.1));
        }
        /* Remove right divider on even cells (right column) on mobile 2-col */
        @media (max-width: 767px) {
          .sp-cell:nth-child(2n) {
            box-shadow: none;
          }
          /* Bottom divider for first row (cells 1-2) on mobile */
          .sp-cell:nth-child(-n+2) {
            box-shadow:
              inset -1px 0 0 var(--sp-divider, rgba(31,111,95,0.1)),
              inset 0 -1px 0 var(--sp-divider, rgba(31,111,95,0.1));
          }
          .sp-cell:nth-child(2) {
            box-shadow:
              inset 0 -1px 0 var(--sp-divider, rgba(31,111,95,0.1));
          }
          /* Bottom divider for middle rows */
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
          /* Last cell — no dividers */
          .sp-cell:last-child {
            box-shadow: none;
          }
        }
        /* Desktop: only right divider, no bottom */
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
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 clamp(1rem, 5vw, 4rem)",
          }}
        >
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