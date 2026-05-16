"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// ─── InView hook ──────────────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
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

// ─── Earnings Calculator ──────────────────────────────────────────────────────
function EarningsCalc() {
  const [jobs, setJobs] = useState(12);
  const [rate, setRate] = useState(85);
  const monthly = jobs * rate * 4;
  const annual  = monthly * 12;

  const jobsPct = ((jobs - 1) / 29) * 100;
  const ratePct = ((rate - 25) / 275) * 100;

  return (
    <div
      className="rounded-3xl overflow-hidden border border-[rgba(31,111,95,0.14)]"
      style={{ background: "#fff", boxShadow: "0 8px 48px rgba(13,31,28,0.10), 0 1px 0 rgba(31,111,95,0.08)" }}
    >
      {/* header */}
      <div style={{ padding: "20px 28px", background: "linear-gradient(135deg,#0D1F1C 0%,#1F6F5F 100%)", borderBottom: "1px solid rgba(13,31,28,0.06)" }}>
        <p style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" as const, color: "#6FCF97", marginBottom: 4 }}>
          Earnings Calculator
        </p>
        <p style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "20px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
          How much could you make?
        </p>
      </div>

      <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column" as const, gap: 20 }}>
        {/* jobs/week */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <label style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: "10px", fontWeight: 700, color: "rgba(13,31,28,0.45)", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>
              Jobs per week
            </label>
            <span style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "20px", fontWeight: 700, color: "#0D1F1C" }}>{jobs}</span>
          </div>
          <input
            type="range" min={1} max={30} value={jobs}
            onChange={e => setJobs(Number(e.target.value))}
            className="calc-slider"
            style={{ width: "100%", background: `linear-gradient(to right,#2FA084 ${jobsPct}%,rgba(13,31,28,0.1) ${jobsPct}%)` }}
          />
        </div>

        {/* avg rate */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <label style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: "10px", fontWeight: 700, color: "rgba(13,31,28,0.45)", textTransform: "uppercase" as const, letterSpacing: "0.1em" }}>
              Avg job value
            </label>
            <span style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "20px", fontWeight: 700, color: "#0D1F1C" }}>${rate}</span>
          </div>
          <input
            type="range" min={25} max={300} step={5} value={rate}
            onChange={e => setRate(Number(e.target.value))}
            className="calc-slider"
            style={{ width: "100%", background: `linear-gradient(to right,#2FA084 ${ratePct}%,rgba(13,31,28,0.1) ${ratePct}%)` }}
          />
        </div>

        {/* result */}
        <div style={{ background: "linear-gradient(135deg,rgba(47,160,132,0.07) 0%,rgba(111,207,151,0.05) 100%)", border: "1px solid rgba(47,160,132,0.15)", borderRadius: 16, padding: "18px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div>
              <p style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: "10px", fontWeight: 700, color: "rgba(13,31,28,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 2 }}>Monthly</p>
              <p style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "32px", fontWeight: 700, color: "#1F6F5F", letterSpacing: "-0.03em", lineHeight: 1 }}>
                ${monthly.toLocaleString()}
              </p>
            </div>
            <div style={{ textAlign: "right" as const }}>
              <p style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: "10px", fontWeight: 700, color: "rgba(13,31,28,0.4)", textTransform: "uppercase" as const, letterSpacing: "0.1em", marginBottom: 2 }}>Annual</p>
              <p style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "22px", fontWeight: 700, color: "#0D1F1C", letterSpacing: "-0.02em", lineHeight: 1 }}>
                ${annual.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <button
          style={{
            fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: "0.875rem", fontWeight: 600,
            background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
            boxShadow: "0 0 24px rgba(47,160,132,0.25),inset 0 1px 0 rgba(255,255,255,0.1)",
            color: "#fff", border: "none", borderRadius: 999,
            padding: "0.85rem 1.8rem", width: "100%",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            cursor: "pointer", transition: "opacity .2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          Start Earning Today <ArrowRight size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────
const stats = [
  { value: "4.9★", label: "Average pro rating" },
  { value: "24h",  label: "First payout speed"  },
  { value: "0%",   label: "Commission on tips"  },
  { value: "2min", label: "Profile setup time"  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export function ForProfessionals() {
  const { ref, inView } = useInView(0.05);

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=cabinet-grotesk@400,500,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');

        .fp-noise {
          position: absolute; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
        }
        .fp-dots {
          position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(rgba(13,31,28,0.06) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        .calc-slider {
          height: 6px; border-radius: 999px;
          -webkit-appearance: none; appearance: none; outline: none; cursor: pointer;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px; border-radius: 50%;
          background: #1F6F5F; border: 2px solid #fff;
          box-shadow: 0 1px 6px rgba(31,111,95,0.35); cursor: pointer;
        }
        .calc-slider::-moz-range-thumb {
          width: 18px; height: 18px; border-radius: 50%;
          background: #1F6F5F; border: 2px solid #fff;
          box-shadow: 0 1px 6px rgba(31,111,95,0.35); cursor: pointer; border: none;
        }
      `}</style>

      <section
        className="relative overflow-hidden py-16 lg:py-24"
        style={{ background: "#F7F7F2" }}
        >
        <div className="fp-noise" />
        <div className="fp-dots" />

        {/* big decorative ghost text */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute"
          style={{
            fontFamily: "'Clash Display',sans-serif",
            fontSize: "clamp(120px,20vw,280px)",
            fontWeight: 700,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(31,111,95,0.07)",
            letterSpacing: "-0.05em",
            lineHeight: 1,
            right: "-2%", top: "-4%",
            zIndex: 0,
            userSelect: "none",
          }}
        >
          PRO
        </div>

        {/* ── main grid ── */}
        <div
          ref={ref}
          className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* ── LEFT copy ── */}
          <div>
            {/* eyebrow */}
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <span className="block w-5 h-0.5 rounded-sm" style={{ background: "#1F6F5F" }} />
              <span style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1F6F5F" }}>
                For Professionals
              </span>
            </div>

            {/* headline */}
            <h2
              style={{
                fontFamily: "'Clash Display',sans-serif",
                fontSize: "clamp(2.4rem,4.5vw,4rem)",
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: "#0D1F1C",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.65s ease 0.08s, transform 0.65s ease 0.08s",
              }}
            >
              Your skills.<br />
              <span style={{
                backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 60%,#6FCF97 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>
                Your schedule.
              </span>
              <br />Your income.
            </h2>

            {/* subtitle — Instrument Serif italic matching Hero */}
            <p
              style={{
                fontFamily: "'Instrument Serif',serif",
                fontStyle: "italic",
                fontSize: "clamp(1rem,1.4vw,1.15rem)",
                lineHeight: 1.72,
                color: "rgba(13,31,28,0.5)",
                marginTop: "1.4rem",
                maxWidth: 420,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.65s ease 0.18s, transform 0.65s ease 0.18s",
              }}
            >
              Join thousands of tradespeople earning more — on their own terms.
              No cold calls. No slow seasons. Just verified jobs, every week.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3 mt-8"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.65s ease 0.28s, transform 0.65s ease 0.28s",
              }}
            >
              <button
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                  boxShadow: "0 0 28px rgba(47,160,132,0.22),inset 0 1px 0 rgba(255,255,255,0.1)",
                  border: "none", borderRadius: 999,
                  padding: "0.85rem 1.8rem",
                  color: "#fff", fontSize: "0.875rem", fontWeight: 600,
                  cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  transition: "opacity .2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Apply to Join <ArrowRight size={14} strokeWidth={2} />
              </button>

              <button
                style={{
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  background: "transparent",
                  border: "1px solid rgba(13,31,28,0.18)",
                  borderRadius: 999, padding: "0.85rem 1.8rem",
                  color: "rgba(13,31,28,0.6)", fontSize: "0.875rem", fontWeight: 500,
                  cursor: "pointer", transition: "border-color .2s, color .2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1F6F5F"; e.currentTarget.style.color = "#1F6F5F"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(13,31,28,0.18)"; e.currentTarget.style.color = "rgba(13,31,28,0.6)"; }}
              >
                See how it works
              </button>
            </div>

            {/* trust badges */}
            <div
              className="flex flex-wrap gap-5 mt-7"
              style={{
                opacity: inView ? 1 : 0,
                transition: "opacity 0.65s ease 0.4s",
              }}
            >
              {["No joining fee", "First payout in 24h", "Cancel anytime"].map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} strokeWidth={2.5} color="#2FA084" />
                  <span style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: "12.5px", fontWeight: 600, color: "rgba(13,31,28,0.5)" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — earnings calculator ── */}
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0)" : "translateX(28px)",
              transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
            }}
          >
            <EarningsCalc />
          </div>
        </div>

        {/* ── stats bar ── */}
        <div
          className="relative z-10 mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 mt-14"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.55s, transform 0.6s ease 0.55s",
          }}
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4 rounded-[20px] overflow-hidden border border-[rgba(13,31,28,0.08)]"
            style={{ background: "#fff", boxShadow: "0 2px 20px rgba(13,31,28,0.05)" }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center justify-center py-6 px-4 ${i < stats.length - 1 ? "border-r border-[rgba(13,31,28,0.06)]" : ""}`}
              >
                <p style={{ fontFamily: "'Clash Display',sans-serif", fontSize: "clamp(1.3rem,2vw,1.8rem)", fontWeight: 700, color: "#1F6F5F", letterSpacing: "-0.03em", lineHeight: 1 }}>
                  {s.value}
                </p>
                <p style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: "12px", color: "rgba(13,31,28,0.45)", fontWeight: 600, marginTop: 4, textAlign: "center" }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ForProfessionals;