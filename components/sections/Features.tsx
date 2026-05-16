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

interface FeatureItem {
  Icon: LucideIcon;
  title: string;
  description: string;
}

const customerFeatures: FeatureItem[] = [
  { Icon: SearchCheck,       title: "Zero sourcing stress",           description: "Find trusted professionals in minutes, not hours" },
  { Icon: BadgeDollarSign,   title: "Fixed, transparent prices",      description: "No surprise bills, ever" },
  { Icon: MapPin,            title: "Real-time professional tracking", description: "Know exactly when they arrive" },
  { Icon: ShieldCheck,       title: "Guaranteed quality",             description: "Not satisfied? We make it right" },
  { Icon: MessageSquareLock, title: "All communication in-app",       description: "No personal info shared" },
];

const proFeatures: FeatureItem[] = [
  { Icon: Users,         title: "Steady local demand",        description: "Customers come to you automatically" },
  { Icon: Zap,           title: "Instant payment processing", description: "Get paid within 24 hours" },
  { Icon: Star,          title: "Build your reputation",      description: "Verified reviews drive more bookings" },
  { Icon: CalendarClock, title: "Full schedule control",      description: "You set your hours and service area" },
  { Icon: BarChart3,     title: "Business growth tools",      description: "Analytics, insights, and repeat clients" },
];

function FeatureRow({ Icon, title, description }: FeatureItem) {
  return (
    <li className="group flex items-start gap-3">
      {/* icon pill — light green tint */}
      <span
        aria-hidden="true"
        className="mt-0.5 flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-[7px] transition-all duration-200 group-hover:scale-110"
        style={{
          background: "rgba(31,111,95,0.10)",
          color: "#1F6F5F",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(31,111,95,0.18)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(31,111,95,0.10)")}
      >
        <Icon size={15} strokeWidth={2} />
      </span>

      <p className="pt-1">
        <strong
          className="font-semibold"
          style={{
            fontFamily: "'Clash Display', sans-serif",
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
            fontFamily: "'Cabinet Grotesk', sans-serif",
            fontSize: "13px",
            color: "rgba(13,31,28,0.52)",
            lineHeight: 1.65,
          }}
        >
          {description}
        </span>
      </p>
    </li>
  );
}

export function Features() {
  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=cabinet-grotesk@400,500,700&display=swap');
      `}</style>

      <section
        className="relative overflow-hidden px-4 py-10 md:px-6 md:py-14"
        style={{
          background: "linear-gradient(155deg, #f0f7f4 0%, #e8f5f0 45%, #f2f9f6 75%, #edf7f3 100%)",
        }}
      >
        {/* noise */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />
        {/* grid */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(31,111,95,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(31,111,95,.6) 1px,transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />

        {/* blobs — same as hero */}
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
          <h2
            style={{
              fontFamily: "'Clash Display', sans-serif",
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
          </h2>
          <p
            className="mt-3"
            style={{
              fontFamily: "'Cabinet Grotesk', sans-serif",
              fontSize: "13.5px",
              lineHeight: 1.7,
              color: "rgba(13,31,28,0.50)",
            }}
          >
            Whether you&apos;re booking a task or building a business, TaskLync
            puts you in control from the very first tap.
          </p>
        </div>

        {/* ── Cards wrapper ── */}
        <div className="relative z-10 mx-auto flex max-w-5xl flex-col overflow-hidden rounded-[20px] border border-[rgba(31,111,95,0.14)] md:flex-row"
          style={{ boxShadow: "0 4px 40px rgba(31,111,95,0.07), 0 1px 0 rgba(255,255,255,0.9) inset" }}
        >

          {/* ── LEFT — Customers ── */}
          <div
            className="relative flex flex-1 flex-col gap-7 overflow-hidden px-6 py-8 md:px-9 md:py-10 border-b border-b-[rgba(31,111,95,0.12)] md:border-b-0 md:border-r md:border-r-[rgba(31,111,95,0.12)]"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.82) 0%, rgba(236,248,243,0.75) 100%)",
              backdropFilter: "blur(12px)",
            }}
          >
            {/* inner glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-16 h-64 w-64"
              style={{ background: "radial-gradient(circle,rgba(47,160,132,0.12) 0%,transparent 65%)" }}
            />

            <div className="relative">
              <p
                className="mb-2 uppercase tracking-[0.12em]"
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "11px", fontWeight: 600, color: "#1F6F5F" }}
              >
                For Customers
              </p>
              <h3
                style={{
                  fontFamily: "'Clash Display', sans-serif",
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

            <ul className="relative flex flex-1 flex-col gap-3.5">
              {customerFeatures.map((f) => <FeatureRow key={f.title} {...f} />)}
            </ul>

            <div className="relative">
              <button
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                  boxShadow: "0 4px 20px rgba(31,111,95,0.28), inset 0 1px 0 rgba(255,255,255,0.15)",
                  border: "none", borderRadius: 999,
                  padding: "0.8rem 1.6rem",
                  color: "#fff", fontSize: "0.875rem", fontWeight: 600,
                  cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  transition: "opacity .2s, box-shadow .2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.88"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                Book Your First Task
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* ── RIGHT — Professionals ── */}
          <div
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
                style={{ fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "11px", fontWeight: 600, color: "#1F6F5F" }}
              >
                For Professionals
              </p>
              <h3
                style={{
                  fontFamily: "'Clash Display', sans-serif",
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

            <ul className="relative flex flex-1 flex-col gap-3.5">
              {proFeatures.map((f) => <FeatureRow key={f.title} {...f} />)}
            </ul>

            <div className="relative">
              <button
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  background: "rgba(13,31,28,0.05)",
                  border: "1px solid rgba(31,111,95,0.22)",
                  borderRadius: 999, padding: "0.8rem 1.6rem",
                  color: "#1F6F5F", fontSize: "0.875rem", fontWeight: 500,
                  cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  transition: "border-color .2s, background .2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(31,111,95,0.45)";
                  e.currentTarget.style.background = "rgba(31,111,95,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(31,111,95,0.22)";
                  e.currentTarget.style.background = "rgba(13,31,28,0.05)";
                }}
              >
                <Zap size={14} strokeWidth={2.5} />
                Join as a Professional
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Features;