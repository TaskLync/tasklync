"use client";

interface PageHeroProps {
  breadcrumb: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({
  breadcrumb,
  title,
  subtitle,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden">

      {/* ───── BACKGROUND IMAGE ───── */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/images/hero-bg.jpg)",
        }}
      />

      {/* ───── TASKLYNC OVERLAY ───── */}
      <div className="absolute inset-0">

        {/* soft dark-green tint (lighter than before) */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0f1f1b]/60 via-[#0d1c18]/50 to-[#0b1714]/70" />

        {/* green glow */}
        <div
          className="absolute -top-40 -right-40 w-162.5 h-162.5 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(47,160,132,0.18) 0%, transparent 65%)",
          }}
        />

        {/* secondary glow */}
        <div
          className="absolute top-1/2 -left-40 w-130 h-130 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(111,207,151,0.10) 0%, transparent 70%)",
          }}
        />

        {/* grid (very subtle) */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(111,207,151,0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(111,207,151,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ───── CONTENT ───── */}
      <div className="relative max-w-290 mx-auto px-6 sm:px-10 lg:px-16 min-h-[60vh] flex items-center">

        <div className="w-full text-center">

          {/* breadcrumb */}
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6FCF97] mb-5"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Home / {breadcrumb}
          </div>

          {/* title */}
          <h1
            className="text-white font-bold leading-[1.05] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "clamp(2.2rem, 4vw, 3.4rem)",
            }}
          >
            {title}
          </h1>

          {/* subtitle (mobile hidden) */}
          {subtitle && (
            <p
              className="hidden sm:block mt-5 text-[rgba(255,255,255,0.65)] leading-[1.7] max-w-2xl mx-auto"
              style={{
                fontFamily: "var(--font-serif-italic)",
                fontSize: "1.15rem",
              }}
            >
              {subtitle}
            </p>
          )}

        </div>
      </div>
    </section>
  );
}