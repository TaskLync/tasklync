"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useWaitlist } from "../waitlist/WaitlistContext";

// ─── Content ──────────────────────────────────────────────────────────────────

const perks = [
  "Priority access before public launch",
  "Founder pricing locked in forever",
  "Early city launch notification",
  "Shape the product with direct feedback",
];

// ─── WaitlistCTA ──────────────────────────────────────────────────────────────

export default function WaitlistCTA() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.15 });
  const { openModal } = useWaitlist();

  // [W5] Hydration fix — read matchMedia only after mount, never on the server
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    // Also update if the user changes their OS preference at runtime
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Helper: returns animation style only when in view and motion is allowed
  const anim = (delay: number): React.CSSProperties =>
    !reduced && inView
      ? { animation: `wlFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${delay}s both` }
      : { opacity: reduced ? 1 : inView ? undefined : 0 };

  return (
    <>
      <style>{`
        @keyframes wlFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section
        id="waitlist"
        className="relative overflow-hidden bg-[#F7F7F2] py-12 lg:py-18"
      >
        {/* Dot texture — static */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(13,31,28,0.055) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="relative z-10 mx-auto max-w-275 px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >

          {/* ── LEFT ──────────────────────────────────────────────────── */}
          <div>

            {/* Label */}
            <div
              className="inline-flex items-center gap-2 mb-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1F6F5F]"
              style={{ fontFamily: "var(--font-body)", ...anim(0) }}
            >
              Early Access
            </div>

            {/* Title */}
            <h2
              className="mb-4 leading-[1.05] tracking-[-0.03em] text-[#0D1F1C] font-bold"
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                ...anim(0.1),
              }}
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
            </h2>

            {/* Subtitle */}
            <p
              className="leading-[1.72] mb-10 max-w-sm italic"
              style={{
                fontFamily: "var(--font-serif-italic)",
                fontSize: "1.15rem",
                color: "rgba(13,31,28,0.48)",
                ...anim(0.2),
              }}
            >
              We&apos;re launching city by city. Join the waitlist now and be the
              first to book or earn, when TaskLync goes live near you.
            </p>

            {/* Perks */}
            <div className="flex flex-col gap-3.5">
              {perks.map((p, i) => (
                <div
                  key={p}
                  className="flex items-center gap-3"
                  style={
                    !reduced && inView
                      ? { animation: `wlFadeUp 0.5s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.08}s both` }
                      : { opacity: reduced ? 1 : inView ? undefined : 0 }
                  }
                >
                  <span className="w-2 h-2 rounded-full shrink-0 bg-[#2FA084]" />
                  <span
                    className="text-[13.5px] font-medium text-[rgba(13,31,28,0.55)]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {p}
                  </span>
                </div>
              ))}
            </div>

            {/*
              [W4] Mobile — single button only, green gradient matching
              the desktop card's "Get Early Access" button exactly.
              Hidden on lg+ (desktop card handles it there).
            */}
            <div
              className="mt-10 lg:hidden"
              style={anim(0.62)}
            >
              <button
                onClick={openModal}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-white text-[14px] font-semibold cursor-pointer transition-opacity duration-200 hover:opacity-85"
                style={{
                  fontFamily: "var(--font-body)",
                  background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                  boxShadow: "0 0 28px rgba(47,160,132,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                  border: "none",
                }}
              >
                Get Early Access <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* ── RIGHT dark card (desktop only) ────────────────────────── */}
          <div
            className="hidden lg:block"
            style={anim(0.4)}
          >
            <div
              className="relative rounded-[28px] overflow-hidden p-10 border border-[rgba(47,160,132,0.15)]"
              style={{ background: "linear-gradient(145deg, #0D1F1C 0%, #081512 100%)" }}
            >
              {/* Dot grid — static */}
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

              {/* Glow — desktop-only, no mobile cost */}
              <div
                className="absolute -top-15 -right-15 w-70 h-70 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(47,160,132,0.2) 0%, transparent 70%)" }}
              />

              <div className="relative z-10">

                {/* Pill */}
                <div
                    className="inline-flex items-center gap-1.5 mb-6 px-3 py-1.5 rounded-full border border-[rgba(111,207,151,0.2)] text-[#6FCF97] text-[10px] font-bold tracking-widest uppercase"
                    style={{ background: "rgba(111,207,151,0.1)", fontFamily: "var(--font-body)" }}
                >
                  Rolling Out Soon
                </div>

                {/* Card title */}
                <div
                  className="text-white mb-3 leading-[1.08] tracking-[-0.03em] font-bold"
                  style={{
                    fontFamily: "var(--font-clash)",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  }}
                >
                  Join the waitlist.
                </div>

                {/* Card body */}
                <div
                  className="text-[13.5px] leading-[1.7] mb-8 text-[rgba(255,255,255,0.42)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Are you a homeowner looking to book trusted pros, or a
                  professional ready to grow your income? We&apos;ll onboard you first.
                </div>

                {/* Divider */}
                <div className="w-full h-px mb-7 bg-[rgba(255,255,255,0.07)]" />

                {/* Button */}
                <button
                  onClick={openModal}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full border-none text-white text-[14px] font-semibold cursor-pointer transition-opacity duration-200 hover:opacity-85"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                    boxShadow: "0 0 28px rgba(47,160,132,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  Get Early Access <ArrowRight size={14} strokeWidth={2} />
                </button>

                {/* Note */}
                <p
                  className="mt-5 text-center text-[11px] text-[rgba(255,255,255,0.22)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Join before public release and get priority access in your city.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}