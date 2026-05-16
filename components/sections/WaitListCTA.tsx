"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

const perks = [
  "Priority access before public launch",
  "Founder pricing locked in forever",
  "Early city launch notification",
  "Shape the product with direct feedback",
];

export default function WaitlistCTA() {
  const { ref, inView } = useInView();

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=cabinet-grotesk@400,500,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap');
        .wl-card-grid {
          position: absolute; inset: 0; border-radius: 28px; pointer-events: none;
          background-image: linear-gradient(rgba(111,207,151,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(111,207,151,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .wl-btn-ghost {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.6);
          transition: border-color 0.2s, color 0.2s;
        }
        .wl-btn-ghost:hover {
          border-color: rgba(255,255,255,0.25);
          color: #fff;
        }
        .wl-btn-primary { transition: opacity 0.2s; }
        .wl-btn-primary:hover { opacity: 0.85; }
      `}</style>

      <section
        id="waitlist"
        className="relative overflow-hidden bg-[#F7F7F2] py-12 lg:py-18"
      >
        {/* dot texture */}
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
          {/* ── LEFT ───────────────────────────────────── */}
          <div>
            {/* label */}
            <div
              className="inline-flex items-center gap-2 mb-5"
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "#1F6F5F",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <span className="block w-5 h-0.5 rounded-sm bg-[#1F6F5F]" />
              Early Access
            </div>

            {/* title */}
            <h2
              className="mb-4 leading-[1.05] tracking-[-0.03em] text-[#0D1F1C]"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}
            >
              Get in before<br />
              <span style={{
                backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 60%,#6FCF97 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                everyone else does.
              </span>
            </h2>

            {/* subtitle */}
            <p
              className="leading-[1.72] mb-10 max-w-95"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "rgba(13,31,28,0.48)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
              }}
            >
              We're launching city by city. Join the waitlist now and be the
              first to book — or earn — when TaskLync goes live near you.
            </p>

            {/* perks */}
            <div className="flex flex-col gap-3.5">
              {perks.map((p, i) => (
                <div
                  key={p}
                  className="flex items-center gap-3"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 0.5s ease ${0.3 + i * 0.08}s, transform 0.5s ease ${0.3 + i * 0.08}s`,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: "#2FA084" }}
                  />
                  <span
                    className="text-[13.5px] font-medium"
                    style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      color: "rgba(13,31,28,0.55)",
                    }}
                  >
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT dark card ─────────────────────────── */}
          <div
            className="hidden lg:block"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(32px)",
              transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
            }}
          >
            <div
              className="relative rounded-[28px] overflow-hidden p-10 border border-[rgba(47,160,132,0.15)]"
              style={{
                background: "linear-gradient(145deg, #0D1F1C 0%, #081512 100%)",
              }}
            >
              {/* grid */}
              <div className="wl-card-grid" />

              {/* glow */}
              <div
                className="absolute w-70 h-70 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(47,160,132,0.2) 0%, transparent 70%)",
                  top: -60, right: -60,
                }}
              />

              <div className="relative z-10">
                {/* pill */}
                <div
                  className="inline-flex items-center gap-1.5 mb-6 px-3 py-1.5 rounded-full border border-[rgba(111,207,151,0.2)] text-[#6FCF97] text-[10px] font-bold tracking-widest uppercase"
                  style={{
                    background: "rgba(111,207,151,0.1)",
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6FCF97] animate-pulse" />
                  Limited spots
                </div>

                {/* card title */}
                <div
                  className="text-white mb-3 leading-[1.08] tracking-[-0.03em] font-bold"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                  }}
                >
                  Join the waitlist.<br />Pick your side.
                </div>

                {/* card body */}
                <div
                  className="text-[13.5px] leading-[1.7] mb-8"
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    color: "rgba(255,255,255,0.42)",
                  }}
                >
                  Are you a homeowner looking to book trusted pros, or a
                  professional ready to grow your income? We'll onboard you first.
                </div>

                {/* divider */}
                <div className="w-full h-px mb-7 bg-[rgba(255,255,255,0.07)]" />

                {/* buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    className="wl-btn-primary w-full flex items-center justify-center gap-2 py-3.5 rounded-full border-none text-white text-[14px] font-semibold cursor-pointer"
                    style={{
                      fontFamily: "'Cabinet Grotesk', sans-serif",
                      background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                      boxShadow: "0 0 28px rgba(47,160,132,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                    }}
                  >
                    I need a service done <ArrowRight size={14} strokeWidth={2} />
                  </button>

                  <button
                    className="wl-btn-ghost w-full flex items-center justify-center gap-2 py-3.5 rounded-full text-[14px] font-medium cursor-pointer"
                    style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                  >
                    I&apos;m a professional <ArrowRight size={14} strokeWidth={2} />
                  </button>
                </div>

                {/* note */}
                <p
                  className="mt-5 text-center text-[11px]"
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    color: "rgba(255,255,255,0.22)",
                  }}
                >
                  Free to join · No spam · Cancel anytime
                </p>
              </div>
            </div>
          </div>

          {/* ── MOBILE buttons (card hidden on mobile) ──── */}
          <div className="flex flex-col gap-3 lg:hidden">
            <button
              className="wl-btn-primary w-full flex items-center justify-center gap-2 py-4 rounded-full border-none text-white text-[14px] font-semibold cursor-pointer"
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                boxShadow: "0 0 28px rgba(47,160,132,0.25)",
              }}
            >
              I need a service done <ArrowRight size={14} strokeWidth={2} />
            </button>
            <button
              className="wl-btn-ghost w-full flex items-center justify-center gap-2 py-4 rounded-full text-[14px] font-medium cursor-pointer"
              style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
            >
              I&apos;m a professional <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>

        </div>
      </section>
    </>
  );
}