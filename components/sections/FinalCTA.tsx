"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { fadeUp } from "@/lib/motion/variants";
import { EASE_EXPO_OUT, DUR } from "@/lib/motion/transitions";

// ─────────────────────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────────────────────

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.18 23.76c.3.17.64.24.99.2l12.7-11.66-2.9-2.9L3.18 23.76zM20.54 10.23l-2.84-1.64-3.19 2.93 3.19 2.93 2.87-1.66c.82-.47.82-1.09-.03-1.56zM2.01 1.05C1.69 1.4 1.5 1.96 1.5 2.69v18.6c0 .73.19 1.29.53 1.62l.09.08L13.38 12v-.27L2.1.97l-.09.08zM13.97 6.37l-10.8-6.24.09-.08 10.89 9.96-3.19 2.93 2.91-2.67.1-.9z" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Phone mockup
// ─────────────────────────────────────────────────────────────────────────────

function PhoneMockup() {
  return (
    <div
      className="relative overflow-hidden shrink-0"
      style={{
        width: 200,
        height: 360,
        borderRadius: 36,
        background: "linear-gradient(145deg,#0D1F1C 0%,#1a3830 100%)",
        boxShadow: "0 32px 80px rgba(13,31,28,0.28), 0 8px 20px rgba(13,31,28,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Notch */}
      <div
        className="absolute top-3.5 left-1/2 -translate-x-1/2 rounded-full"
        style={{ width: 72, height: 22, background: "#0a1912" }}
      />

      {/* Screen content */}
      <div className="absolute inset-0 flex flex-col gap-2.5" style={{ padding: "52px 18px 20px" }}>

        {/* Map */}
        <div
          className="relative flex-1 overflow-hidden rounded-2xl"
          style={{ background: "linear-gradient(135deg,#1a3830 0%,#0e2218 100%)" }}
        >
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: "linear-gradient(rgba(111,207,151,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(111,207,151,.8) 1px,transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Pin */}
          <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="w-7 h-7"
              style={{
                borderRadius: "50% 50% 50% 0",
                background: "linear-gradient(135deg,#1F6F5F,#2FA084)",
                transform: "rotate(-45deg)",
                boxShadow: "0 4px 14px rgba(47,160,132,0.5)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: "rotate(45deg)" }}>
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
          {/* Route */}
          <svg className="absolute inset-0 w-full h-full opacity-40">
            <path d="M 30 130 Q 60 80 100 95 Q 130 110 110 60" stroke="#6FCF97" strokeWidth="2" fill="none" strokeDasharray="5 4" />
          </svg>
        </div>

        {/* Booking card */}
        <div
          className="flex items-center gap-2.5 rounded-2xl p-[10px_12px]"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(111,207,151,0.15)",
          }}
        >
          <div
            className="w-8 h-8 shrink-0 rounded-[10px] flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#1F6F5F,#2FA084)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div className="w-18 h-1.75 rounded mb-1.25" style={{ background: "rgba(255,255,255,0.3)" }} />
            <div className="w-12 h-1.25 rounded" style={{ background: "rgba(111,207,151,0.4)" }} />
          </div>
        </div>
      </div>

      {/* Home bar */}
      <div
        className="absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-full"
        style={{ width: 80, height: 4, background: "rgba(255,255,255,0.2)" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export function FinalCTA() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      className="relative overflow-hidden px-4 py-14 md:px-6 md:py-20"
      style={{
        background: "linear-gradient(155deg,#f0f7f4 0%,#e8f5f0 45%,#f2f9f6 75%,#edf7f3 100%)",
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

      {/* ── Green card ── */}
      <motion.div
        ref={ref}
        className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-[28px] md:rounded-[36px]"
        style={{
          background: "linear-gradient(135deg,#1a4a3a 0%,#1F6F5F 40%,#2FA084 75%,#3ab896 100%)",
          boxShadow: "0 24px 80px rgba(31,111,95,0.35), 0 4px 16px rgba(31,111,95,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        custom={0}
      >
        {/* Card noise */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "160px 160px",
          }}
        />

        {/* Blobs */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle,#6FCF97 0%,transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full opacity-[0.15]"
          style={{ background: "radial-gradient(circle,#0D1F1C 0%,transparent 70%)" }}
        />

        {/* Card content */}
        <div className="relative z-10 flex flex-col items-center gap-10 px-6 py-12 md:flex-row md:items-center md:gap-0 md:px-16 md:py-16">

          {/* ── LEFT ── */}
          <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">

            {/* Eyebrow */}
            <motion.p
              className="mb-4 uppercase tracking-[0.14em] text-[11px] font-semibold text-[rgba(255,255,255,0.55)]"
              style={{ fontFamily: "var(--font-body)" }}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.1}
            >
              Available on iOS & Android
            </motion.p>

            {/* Headline */}
            <motion.h2
              className="font-bold leading-[1.03] tracking-[-0.02em] text-white mb-5"
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
              }}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.18}
            >
              Ready to get<br />
              <span
                style={{
                  backgroundImage: "linear-gradient(100deg,#d4f5e6 0%,#a7edcc 50%,#6FCF97 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                things done?
              </span>
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              className="italic leading-[1.72] text-[rgba(255,255,255,0.60)] mb-8 max-w-100"
              style={{
                fontFamily: "var(--font-serif-italic)",
                fontSize: "clamp(1rem, 1.5vw, 1.15rem)",
              }}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.26}
            >
              Download the TaskLync app and connect with verified professionals
              in minutes — wherever you are.
            </motion.p>

            {/* App store buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-3"
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.34}
            >
              {/* App Store */}
              <a
                href="#"
                aria-label="Download on the App Store"
                className="inline-flex items-center gap-[0.55rem] rounded-full whitespace-nowrap no-underline font-bold text-[0.875rem] text-[#0D1F1C] transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
                style={{
                  fontFamily: "var(--font-body)",
                  padding: "0.85rem 1.6rem",
                  background: "#ffffff",
                  boxShadow: "0 4px 20px rgba(13,31,28,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                <AppleIcon />
                <span>
                  <span className="block text-[9px] font-medium opacity-50 tracking-[0.06em] leading-none uppercase">
                    Download on the
                  </span>
                  App Store
                </span>
              </a>

              {/* Google Play */}
              <a
                href="#"
                aria-label="Get it on Google Play"
                className="inline-flex items-center gap-[0.55rem] rounded-full whitespace-nowrap no-underline font-semibold text-[0.875rem] text-white transition-all duration-200 hover:border-[rgba(255,255,255,0.45)] hover:bg-[rgba(255,255,255,0.18)] hover:-translate-y-px"
                style={{
                  fontFamily: "var(--font-body)",
                  padding: "0.85rem 1.6rem",
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.22)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <PlayIcon />
                <span>
                  <span className="block text-[9px] font-medium opacity-50 tracking-[0.06em] leading-none uppercase">
                    Get it on
                  </span>
                  Google Play
                </span>
              </a>
            </motion.div>

            {/* Fine print */}
            <motion.p
              className="mt-4 text-[12px] tracking-[0.01em] text-[rgba(255,255,255,0.38)]"
              style={{ fontFamily: "var(--font-body)" }}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.42}
            >
              No commitments. No hidden fees. Cancel anytime.
            </motion.p>
          </div>

          {/* ── RIGHT — phone mockup ── */}
          <motion.div
            className="hidden md:flex items-end justify-center"
            style={{ paddingLeft: "3rem", minWidth: 220 }}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.3}
          >
            <PhoneMockup />
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}

export default FinalCTA;