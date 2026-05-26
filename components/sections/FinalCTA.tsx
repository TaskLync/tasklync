"use client";

import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useToast } from "@/components/ui/Toast";

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ flexShrink: 0, display: "block" }}>
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.199c.396.228.642.651.642 1.109 0 .458-.246.881-.642 1.109l-2.031 1.173L13.207 12l2.46-2.46 2.031 1.168zM5.864 3.658L16.8 10 14.5 12.3 5.864 3.658z" />
    </svg>
  );
}

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
      <div
        className="absolute top-3.5 left-1/2 -translate-x-1/2 rounded-full"
        style={{ width: 72, height: 22, background: "#0a1912" }}
      />
      <div className="absolute inset-0 flex flex-col gap-2.5" style={{ padding: "52px 18px 20px" }}>
        <div
          className="relative flex-1 overflow-hidden rounded-2xl"
          style={{ background: "linear-gradient(135deg,#1a3830 0%,#0e2218 100%)" }}
        >
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: "linear-gradient(rgba(111,207,151,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(111,207,151,.8) 1px,transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
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
          <svg className="absolute inset-0 w-full h-full opacity-40">
            <path d="M 30 130 Q 60 80 100 95 Q 130 110 110 60" stroke="#6FCF97" strokeWidth="2" fill="none" strokeDasharray="5 4" />
          </svg>
        </div>
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
      <div
        className="absolute bottom-2.5 left-1/2 -translate-x-1/2 rounded-full"
        style={{ width: 80, height: 4, background: "rgba(255,255,255,0.2)" }}
      />
    </div>
  );
}

export function FinalCTA() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const {show} = useToast();

  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const anim = (delay: number): React.CSSProperties =>
    !reduced && inView
      ? { animation: `ctaFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s both` }
      : { opacity: reduced ? 1 : inView ? undefined : 0 };

  return (
    <>
      <style>{`
        @keyframes ctaFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        className="relative overflow-hidden px-4 py-6 md:px-6 md:py-20"
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

        {/* Green card */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-3xl md:rounded-[36px]"
          style={{
            background: "linear-gradient(135deg,#1a4a3a 0%,#1F6F5F 40%,#2FA084 75%,#3ab896 100%)",
            boxShadow: "0 24px 80px rgba(31,111,95,0.35), 0 4px 16px rgba(31,111,95,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
            ...anim(0),
          }}
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
          <div className="relative z-10 flex flex-col items-center gap-4 px-5 py-7 md:flex-row md:items-center md:gap-0 md:px-16 md:py-16">

            {/* LEFT */}
            <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">

              {/* Eyebrow — hidden on mobile */}
              <p
                className="hidden md:block mb-4 uppercase tracking-[0.14em] text-[11px] font-semibold text-[rgba(255,255,255,0.55)]"
                style={{ fontFamily: "var(--font-body)", ...anim(0.1) }}
              >
                Available on iOS & Android
              </p>

              {/* Headline */}
              <h2
                className="font-bold leading-[1.05] tracking-[-0.02em] text-white mb-2 md:mb-5"
                style={{
                  fontFamily: "var(--font-clash)",
                  fontSize: "clamp(1.65rem, 4.5vw, 4rem)",
                  ...anim(0.18),
                }}
              >
                Ready to get{" "}
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
              </h2>

              {/* Subtitle — short version on mobile, full on desktop */}
              <p
                className="italic leading-[1.6] text-[rgba(255,255,255,0.60)] mb-5 md:mb-8 max-w-xs md:max-w-none"
                style={{
                  fontFamily: "var(--font-serif-italic)",
                  fontSize: "clamp(0.85rem, 1.5vw, 1.15rem)",
                  ...anim(0.26),
                }}
              >
                <span className="md:hidden">Connect with verified professionals in minutes.</span>
                <span className="hidden md:inline">
                  Download the TaskLync app and connect with verified professionals
                  in minutes, wherever you are.
                </span>
              </p>

              {/* App store buttons */}
<div
  className="flex items-center justify-center md:justify-start"
  style={anim(0.34)}
>
  {/* Google Play */}
  <a
    onClick={() =>
    show({
      message: "TaskLync App isn't available yet, join the waitlist to get notified the moment we launch in your city.",
      variant: "success",
    })
  }
    aria-label="Get it on Google Play"
    className="cursor-pointer
      inline-flex items-center gap-2
      rounded-2xl
      whitespace-nowrap no-underline
      px-4 py-2.5 md:px-5 md:py-3
      text-black
      transition-all duration-200
      hover:-translate-y-0.5 hover:shadow-xl
      active:translate-y-0
    "
    style={{
      fontFamily: "var(--font-body)",
      background: "rgba(255,255,255,0.96)",
      border: "1px solid rgba(255,255,255,0.18)",
      boxShadow: "0 10px 28px rgba(0,0,0,0.10)",
    }}
  >
    <PlayIcon />

    <span className="flex flex-col leading-none text-left">
      <span className="text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.12em] text-black/45">
        Get it on
      </span>

      <span className="mt-1 text-[0.9rem] md:text-[1rem] font-semibold tracking-[-0.01em]">
        Google Play
      </span>
    </span>
  </a>
</div>

              {/* Fine print */}
              <p
                className="mt-3 md:mt-4 text-[11px] md:text-[12px] tracking-[0.01em] text-[rgba(255,255,255,0.38)]"
                style={{ fontFamily: "var(--font-body)", ...anim(0.42) }}
              >
                Find and book trusted professionals near you.
              </p>
            </div>

            {/* Phone mockup — desktop only */}
            <div
              className="hidden md:flex items-end justify-center"
              style={{ paddingLeft: "3rem", minWidth: 220, ...anim(0.3) }}
            >
              <PhoneMockup />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default FinalCTA;