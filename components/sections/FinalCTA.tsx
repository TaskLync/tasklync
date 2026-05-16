"use client";

// ── Apple App Store Icon ──────────────────────────────────────────────────────
function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83zM13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

// ── Google Play Icon ──────────────────────────────────────────────────────────
function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3.18 23.76c.3.17.64.24.99.2l12.7-11.66-2.9-2.9L3.18 23.76zM20.54 10.23l-2.84-1.64-3.19 2.93 3.19 2.93 2.87-1.66c.82-.47.82-1.09-.03-1.56zM2.01 1.05C1.69 1.4 1.5 1.96 1.5 2.69v18.6c0 .73.19 1.29.53 1.62l.09.08L13.38 12v-.27L2.1.97l-.09.08zM13.97 6.37l-10.8-6.24.09-.08 10.89 9.96-3.19 2.93 2.91-2.67.1-.9z" />
    </svg>
  );
}

// ── Phone mockup (pure CSS/SVG, no external deps) ────────────────────────────
function PhoneMockup() {
  return (
    <div
      style={{
        width: 200,
        height: 360,
        borderRadius: 36,
        background: "linear-gradient(145deg,#0D1F1C 0%,#1a3830 100%)",
        boxShadow:
          "0 32px 80px rgba(13,31,28,0.28), 0 8px 20px rgba(13,31,28,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {/* notch */}
      <div style={{
        position: "absolute", top: 14, left: "50%", transform: "translateX(-50%)",
        width: 72, height: 22, borderRadius: 99,
        background: "#0a1912",
      }} />

      {/* screen content */}
      <div style={{ position: "absolute", inset: 0, padding: "52px 18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        {/* map placeholder */}
        <div style={{
          flex: 1, borderRadius: 16,
          background: "linear-gradient(135deg,#1a3830 0%,#0e2218 100%)",
          position: "relative", overflow: "hidden",
        }}>
          {/* grid lines */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.15,
            backgroundImage: "linear-gradient(rgba(111,207,151,.8) 1px,transparent 1px),linear-gradient(90deg,rgba(111,207,151,.8) 1px,transparent 1px)",
            backgroundSize: "24px 24px",
          }} />
          {/* map pin */}
          <div style={{
            position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50% 50% 50% 0",
              background: "linear-gradient(135deg,#1F6F5F,#2FA084)",
              transform: "rotate(-45deg)",
              boxShadow: "0 4px 14px rgba(47,160,132,0.5)",
            }} />
            <div style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
              transform: "rotate(45deg)",
            }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
            </div>
          </div>
          {/* route line */}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }}>
            <path d="M 30 130 Q 60 80 100 95 Q 130 110 110 60" stroke="#6FCF97" strokeWidth="2" fill="none" strokeDasharray="5 4" />
          </svg>
        </div>

        {/* booking card */}
        <div style={{
          borderRadius: 14,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(111,207,151,0.15)",
          padding: "10px 12px",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10, flexShrink: 0,
            background: "linear-gradient(135deg,#1F6F5F,#2FA084)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div>
            <div style={{ width: 72, height: 7, borderRadius: 4, background: "rgba(255,255,255,0.3)", marginBottom: 5 }} />
            <div style={{ width: 48, height: 5, borderRadius: 4, background: "rgba(111,207,151,0.4)" }} />
          </div>
          <div style={{ marginLeft: "auto" }}>
            <div style={{
              padding: "4px 8px", borderRadius: 99,
              background: "rgba(47,160,132,0.2)",
              fontSize: 8, fontWeight: 600, color: "#6FCF97", letterSpacing: "0.04em",
              fontFamily: "sans-serif",
            }}></div>
          </div>
        </div>
      </div>

      {/* home bar */}
      <div style={{
        position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
        width: 80, height: 4, borderRadius: 99, background: "rgba(255,255,255,0.2)",
      }} />
    </div>
  );
}

// ── FinalCTA ──────────────────────────────────────────────────────────────────
export function FinalCTA() {
  return (
    <>
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=cabinet-grotesk@400,500,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
      `}</style>

      {/* ── outer section — same light hero bg ── */}
      <section
        className="relative overflow-hidden px-4 py-14 md:px-6 md:py-20"
        style={{
          background: "linear-gradient(155deg,#f0f7f4 0%,#e8f5f0 45%,#f2f9f6 75%,#edf7f3 100%)",
        }}
      >
        {/* noise */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px 180px",
          }}
        />
        {/* grid */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(31,111,95,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(31,111,95,.6) 1px,transparent 1px)`,
            backgroundSize: "72px 72px",
          }}
        />

        {/* ── rounded green card — the hero of this section ── */}
        <div
          className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-[28px] md:rounded-[36px]"
          style={{
            background: "linear-gradient(135deg,#1a4a3a 0%,#1F6F5F 40%,#2FA084 75%,#3ab896 100%)",
            boxShadow:
              "0 24px 80px rgba(31,111,95,0.35), 0 4px 16px rgba(31,111,95,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          {/* card noise overlay */}
          <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "160px 160px",
            }}
          />

          {/* card inner blobs */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle,#6FCF97 0%,transparent 70%)" }}
          />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle,#0D1F1C 0%,transparent 70%)" }}
          />

          {/* ── card content ── */}
          <div className="relative z-10 flex flex-col items-center gap-10 px-6 py-12 md:flex-row md:items-center md:gap-0 md:px-16 md:py-16">

            {/* ── LEFT: text + buttons ── */}
            <div className="flex flex-1 flex-col items-center text-center md:items-start md:text-left">

              {/* eyebrow */}
              <p
                className="mb-4 uppercase tracking-[0.14em]"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.55)",
                  letterSpacing: "0.14em",
                }}
              >
                Available on iOS & Android
              </p>

              {/* headline — matches hero: Clash Display, clamp, weight 700, tight tracking */}
              <h2
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontSize: "clamp(2.2rem,4.5vw,4rem)",
                  fontWeight: 700,
                  lineHeight: 1.03,
                  letterSpacing: "-0.02em",
                  color: "#ffffff",
                  marginBottom: "1.25rem",
                }}
              >
                Ready to get<br />
                <span style={{
                  backgroundImage: "linear-gradient(100deg,#d4f5e6 0%,#a7edcc 50%,#6FCF97 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  things done?
                </span>
              </h2>

              {/* subtitle — matches hero: Instrument Serif italic, clamp, muted */}
              <p
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontSize: "clamp(1rem,1.5vw,1.15rem)",
                  lineHeight: 1.72,
                  color: "rgba(255,255,255,0.60)",
                  maxWidth: 400,
                  marginBottom: "2rem",
                }}
              >
                Download the TaskLync app and connect with verified professionals
                in minutes — wherever you are.
              </p>

              {/* ── App Store Buttons ── */}
              <div className="flex flex-wrap items-center gap-3">

                {/* App Store — primary style matching hero primary button */}
                <a
                  href="#"
                  aria-label="Download on the App Store"
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    borderRadius: 999,
                    padding: "0.85rem 1.6rem",
                    background: "#ffffff",
                    color: "#0D1F1C",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(13,31,28,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
                    transition: "opacity .2s, transform .2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.90";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <AppleIcon />
                  <span>
                    <span style={{ display: "block", fontSize: "9px", fontWeight: 500, opacity: 0.5, letterSpacing: "0.06em", lineHeight: 1, textTransform: "uppercase" }}>
                      Download on the
                    </span>
                    App Store
                  </span>
                </a>

                {/* Google Play — secondary style matching hero secondary button */}
                <a
                  href="#"
                  aria-label="Get it on Google Play"
                  style={{
                    fontFamily: "'Cabinet Grotesk', sans-serif",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.55rem",
                    borderRadius: 999,
                    padding: "0.85rem 1.6rem",
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.22)",
                    color: "#ffffff",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    textDecoration: "none",
                    backdropFilter: "blur(8px)",
                    transition: "border-color .2s, background .2s, transform .2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.18)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.10)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <PlayIcon />
                  <span>
                    <span style={{ display: "block", fontSize: "9px", fontWeight: 500, opacity: 0.5, letterSpacing: "0.06em", lineHeight: 1, textTransform: "uppercase" }}>
                      Get it on
                    </span>
                    Google Play
                  </span>
                </a>
              </div>

              {/* fine print — matches hero scroll cue text style */}
              <p
                className="mt-4"
                style={{
                  fontFamily: "'Cabinet Grotesk', sans-serif",
                  fontSize: "12px",
                  letterSpacing: "0.01em",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                No commitments. No hidden fees. Cancel anytime.
              </p>
            </div>

            {/* ── RIGHT: phone mockup ── */}
            <div
              className="hidden md:flex"
              style={{
                paddingLeft: "3rem",
                alignItems: "flex-end",
                justifyContent: "center",
                minWidth: 220,
              }}
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