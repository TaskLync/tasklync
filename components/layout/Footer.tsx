"use client";
import Link from "next/link";
import { MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import { LogoMark } from "./LogoMark";
import { useToast } from "@/components/ui/Toast";
import { useConsentStore } from "@/lib/cookies/store";

// ─── Social icons ─────────────────────────────────────────────────────────────

function TwitterX() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_COLUMNS = [
  {
    label: "Product",
    links: [
      { label: "How It Works",      href: "/how-it-works" },
      { label: "For Customers",     href: "/services" },
      { label: "For Professionals", href: "/for-professionals" },
      { label: "Download App",      href: "/download" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About Us",  href: "/about" },
      { label: "Blog",      href: "/blog" },
      { label: "Careers",   href: "/careers" },
      { label: "Press Kit", href: "/press" },
      { label: "Contact",   href: "/contact" },
    ],
  },
  {
    label: "Legal",
    links: [
      { label: "Privacy Policy",   href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Settings",  href: "/cookies" },
      { label: "Accessibility",    href: "/accessibility" },
    ],
  },
];

const SOCIALS = [
  { Icon: TwitterX,      label: "X (Twitter)", href: "#" },
  { Icon: InstagramIcon, label: "Instagram",   href: "#" },
  { Icon: LinkedInIcon,  label: "LinkedIn",    href: "#" },
  { Icon: YoutubeIcon,   label: "YouTube",     href: "#" },
];

// Shared button style for Download App & Cookie Settings
const ghostLinkStyle: React.CSSProperties = {
  fontFamily: "var(--font-cabinet)",
  fontSize: "13.5px",
  color: "rgba(232,245,240,0.46)",
  background: "none",
  border: "none",
  padding: 0,
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.2rem",
  transition: "color .18s",
  textAlign: "left",
};

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const { show } = useToast();
  const { openModal } = useConsentStore();

  function handleDownloadApp() {
    show({
      message:
        "TaskLync App isn't available yet. Join the waitlist to get notified the moment we launch in your city.",
      variant: "success",
    });
  }

  return (
    <footer
      style={{
        background: "linear-gradient(160deg,#0f1f1b 0%,#111e1a 50%,#0d1c18 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Noise — static */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      {/* Grid — static */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(111,207,151,.7) 1px,transparent 1px),linear-gradient(90deg,rgba(111,207,151,.7) 1px,transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Ambient blobs — static */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(circle,#2FA084 0%,transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full opacity-[0.05]"
        style={{ background: "radial-gradient(circle,#6FCF97 0%,transparent 70%)" }}
      />

      {/* Top glow line */}
      <div
        style={{
          height: 1,
          background:
            "linear-gradient(90deg,transparent 0%,rgba(47,160,132,0.35) 30%,rgba(111,207,151,0.5) 50%,rgba(47,160,132,0.35) 70%,transparent 100%)",
        }}
      />

      {/* ── Main body ── */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-14 md:px-10 md:py-16">

        {/* Top row: brand + nav */}
        <div className="flex flex-col gap-12 md:flex-row md:gap-8 lg:gap-16">

          {/* Brand column */}
          <div className="flex flex-col gap-5 md:max-w-60">

            {/* Logo */}
            <Link href="/" aria-label="TaskLync Home" className="flex items-center gap-2 w-fit">
              <LogoMark size={38} />
              <span
                style={{
                  fontFamily: "var(--font-clash)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#e8f5f0",
                  lineHeight: 1,
                }}
              >
                Task<span style={{ color: "#2FA084" }}>Lync</span>
              </span>
            </Link>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "var(--font-cabinet)",
                fontSize: "13.5px",
                lineHeight: 1.7,
                color: "rgba(232,245,240,0.42)",
              }}
            >
              Connecting you instantly with verified local professionals on demand, every time.
            </p>

            {/* Contact info */}
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {[
                { Icon: MapPin, text: "Faisalabad, Pakistan" },
                { Icon: Mail,   text: "team@tasklync.pk"  },
              ].map(({ Icon, text }) => (
                <li
                  key={text}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.5rem",
                    fontFamily: "var(--font-cabinet)",
                    fontSize: "12.5px",
                    color: "rgba(232,245,240,0.36)",
                  }}
                >
                  <Icon size={13} strokeWidth={1.8} style={{ color: "#2FA084", flexShrink: 0 }} />
                  {text}
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.25rem" }}>
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 34, height: 34, borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "rgba(232,245,240,0.05)",
                    border: "1px solid rgba(232,245,240,0.08)",
                    color: "rgba(232,245,240,0.40)",
                    transition: "background .2s, border-color .2s, color .2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(47,160,132,0.14)";
                    e.currentTarget.style.borderColor = "rgba(47,160,132,0.35)";
                    e.currentTarget.style.color = "#2FA084";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(232,245,240,0.05)";
                    e.currentTarget.style.borderColor = "rgba(232,245,240,0.08)";
                    e.currentTarget.style.color = "rgba(232,245,240,0.40)";
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
            {NAV_COLUMNS.map((col) => (
              <div key={col.label}>
                <p
                  style={{
                    fontFamily: "var(--font-cabinet)",
                    fontSize: "10.5px",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#2FA084",
                    marginBottom: "1rem",
                  }}
                >
                  {col.label}
                </p>

                <ul style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                  {col.links.map(({ label, href }) => {

                    // ── Download App — toast ──────────────────────────────
                    if (label === "Download App") {
                      return (
                        <li key={label}>
                          <button
                            onClick={handleDownloadApp}
                            style={ghostLinkStyle}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "#e8f5f0";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "rgba(232,245,240,0.46)";
                            }}
                          >
                            {label}
                          </button>
                        </li>
                      );
                    }

                    // ── Cookie Settings — open modal ──────────────────────
                    if (label === "Cookie Settings") {
                      return (
                        <li key={label}>
                          <button
                            onClick={openModal}
                            style={ghostLinkStyle}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "#e8f5f0";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "rgba(232,245,240,0.46)";
                            }}
                          >
                            {label}
                          </button>
                        </li>
                      );
                    }

                    // ── All other links — normal Next Link ────────────────
                    return (
                      <li key={label}>
                        <Link
                          href={href}
                          style={{
                            fontFamily: "var(--font-cabinet)",
                            fontSize: "13.5px",
                            color: "rgba(232,245,240,0.46)",
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.2rem",
                            transition: "color .18s",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "#e8f5f0";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.color = "rgba(232,245,240,0.46)";
                          }}
                        >
                          {label}
                          {label === "Press Kit" && (
                            <ArrowUpRight size={11} strokeWidth={2} style={{ opacity: 0.4 }} />
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            suppressHydrationWarning
            style={{
              fontFamily: "var(--font-cabinet)",
              fontSize: "12px",
              color: "rgba(232,245,240,0.25)",
              letterSpacing: "0.01em",
            }}
          >
            © {new Date().getFullYear()} TaskLync. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;