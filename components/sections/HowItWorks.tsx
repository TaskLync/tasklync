"use client";

import { useEffect, useRef, useState } from "react";
import { Search, CalendarCheck, ShieldCheck } from "lucide-react";

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

const steps = [
  {
    num: "01",
    title: "Search & Select a Service",
    body: "Browse services or tap what you need. Our smart matching engine shows available, nearby verified professionals with transparent pricing — no hidden fees.",
  },
  {
    num: "02",
    title: "Book in Under 60 Seconds",
    body: "Pick a time slot, confirm your location, and book instantly. See the professional's profile, ratings, and estimated arrival — before you confirm.",
  },
  {
    num: "03",
    title: "Job Done. Pay Securely.",
    body: "The professional arrives, completes the job, and you pay securely in-app. Rate the experience. Dispute anything within 24 hours with full payment protection.",
  },
];

const cards = [
  {
    label: "Step 01",
    title: "Find what you need",
    body: "Browse 20+ service categories with real-time professional availability in your area. Instant quotes, no phone calls required.",
    tag: "Smart Matching",
    icon: Search,
  },
  {
    label: "Step 02",
    title: "Instant confirmation",
    body: "See professional profiles, ratings, and arrival times before you book. Confirm your slot in under 60 seconds — zero friction.",
    tag: "60-sec Booking",
    icon: CalendarCheck,
  },
  {
    label: "Step 03",
    title: "Secure & done",
    body: "Pay in-app after completion. Rate the service. Dispute anything within 24 hours with full payment protection guaranteed.",
    tag: "Escrow Protected",
    icon: ShieldCheck,
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const { ref, inView } = useInView();

  const card = cards[active];
  const Icon = card.icon;

  const handleHover = (i: number) => {
    if (i === active) return;
    setVisible(false);
    setTimeout(() => { setActive(i); setVisible(true); }, 130);
  };

  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=cabinet-grotesk@400,500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap');
        .hiw-num { transition: background 0.3s, color 0.3s, border-color 0.3s; }
        .hiw-step:hover .hiw-num { background: #1F6F5F !important; color: #fff !important; border-color: #1F6F5F !important; }
        .hiw-step-active .hiw-num { background: #1F6F5F !important; color: #fff !important; border-color: #1F6F5F !important; }
        .hiw-bar { transition: opacity 0.25s; }
        .hiw-step:hover .hiw-bar { opacity: 1 !important; }
        .hiw-step-active .hiw-bar { opacity: 1 !important; }
        .hiw-card-grid {
          position: absolute; inset: 0; border-radius: 28px; pointer-events: none;
          background-image: linear-gradient(rgba(111,207,151,0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(111,207,151,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>

      <section id="how-it-works" className="bg-[#F7F7F5] py-20 lg:py-32">
        <div
          ref={ref}
          className="max-w-290 mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
        >

          {/* ── LEFT ─────────────────────────────────────── */}
          <div>
            {/* label */}
            <div
              className="inline-flex items-center gap-2 mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
              style={{
                fontFamily: "'Cabinet Grotesk', sans-serif",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease, transform 0.6s ease",
              }}
            >
              <span className="block w-5 h-0.5 rounded-sm bg-[#1F6F5F]" />
              How It Works
            </div>

            {/* title */}
            <h2
              className="text-[#0D1F1C] mb-4 leading-[1.05] tracking-[-0.03em]"
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
                fontWeight: 700,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}
            >
              Three steps to<br />a fixed home.
            </h2>

            {/* subtitle */}
            <p
              className="text-[rgba(13,31,28,0.5)] leading-[1.7] mb-12 max-w-95"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontSize: "1rem",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
              }}
            >
              No calls, no haggling, no surprises. Book a verified professional
              in the time it takes to make coffee.
            </p>

            {/* steps */}
            <div className="flex flex-col">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`hiw-step flex gap-5 py-6 relative cursor-pointer${active === i ? " hiw-step-active" : ""}${i < steps.length - 1 ? " border-b border-[rgba(31,111,95,0.1)]" : ""}`}
                  onMouseEnter={() => handleHover(i)}
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(20px)",
                    transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
                  }}
                >
                  {/* accent bar */}
                  <div
                    className="hiw-bar absolute left-0 top-0 bottom-0 w-0.75 bg-[#1F6F5F] rounded-r-sm"
                    style={{ opacity: active === i ? 1 : 0 }}
                  />

                  {/* number */}
                  <div
                    className="hiw-num shrink-0 w-11.5 h-11.5 rounded-[14px] flex items-center justify-center text-[15px] font-bold border-[1.5px] border-[rgba(31,111,95,0.12)] bg-[#EFEFED] text-[rgba(13,31,28,0.35)]"
                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                  >
                    {s.num}
                  </div>

                  {/* text */}
                  <div>
                    <div
                      className="text-[#0D1F1C] mb-1.5 text-[17px] font-semibold leading-snug tracking-[-0.02em]"
                      style={{ fontFamily: "'Clash Display', sans-serif" }}
                    >
                      {s.title}
                    </div>
                    <div
                      className="text-[13px] text-[rgba(13,31,28,0.5)] leading-[1.65]"
                      style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                    >
                      {s.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — hidden on mobile ──────────────────── */}
          <div className="hidden lg:block sticky top-28">
            <div
              className="relative rounded-[28px] overflow-hidden flex flex-col justify-end min-h-90 p-10 border border-[rgba(47,160,132,0.15)]"
              style={{
                background: "linear-gradient(145deg, #0D1F1C 0%, #081512 100%)",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateX(0)" : "translateX(32px)",
                transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
              }}
            >
              {/* grid bg */}
              <div className="hiw-card-grid" />

              {/* glow blob */}
              <div
                className="absolute w-70 h-70 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(47,160,132,0.2) 0%, transparent 70%)",
                  top: -60, right: -60,
                }}
              />

              {/* animated content */}
              <div
                className="relative z-10"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                }}
              >
                {/* icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-[rgba(47,160,132,0.25)]"
                  style={{ background: "rgba(47,160,132,0.15)" }}
                >
                  <Icon size={24} strokeWidth={1.75} color="#6FCF97" />
                </div>

                {/* step label */}
                <div
                  className="text-[10px] font-semibold tracking-[0.12em] uppercase text-[#6FCF97] mb-2.5"
                  style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                >
                  {card.label}
                </div>

                {/* card title */}
                <div
                  className="text-white mb-3 leading-[1.1] tracking-[-0.03em] font-bold"
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: "clamp(1.4rem, 2.5vw, 1.7rem)",
                  }}
                >
                  {card.title}
                </div>

                {/* card body */}
                <div
                  className="text-[13.5px] text-[rgba(255,255,255,0.45)] leading-[1.7]"
                  style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
                >
                  {card.body}
                </div>

                {/* tag pill */}
                <div
                  className="inline-flex items-center gap-1.5 mt-6 px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-[#6FCF97] border border-[rgba(47,160,132,0.2)]"
                  style={{
                    background: "rgba(47,160,132,0.12)",
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                  }}
                >
                  <Icon size={12} strokeWidth={2} color="#6FCF97" />
                  {card.tag}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}