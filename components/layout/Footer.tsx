"use client";
import Link from "next/link";
import { MapPin, Mail, ArrowUpRight } from "lucide-react";
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
    ],
  },
];

const SOCIALS = [
  { Icon: TwitterX,      label: "X (Twitter)", href: "#" },
  { Icon: InstagramIcon, label: "Instagram",   href: "https://www.instagram.com/tasklync/" },
  { Icon: LinkedInIcon,  label: "LinkedIn",    href: "https://www.linkedin.com/company/127063937/" },
  { Icon: YoutubeIcon,   label: "YouTube",     href: "#" },
];

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer() {
  const { show } = useToast();
  const { openModal } = useConsentStore();

  function handleDownloadApp() {
    show({
      message: "TaskLync App isn't available yet. Join the waitlist to get notified the moment we launch in your city.",
      variant: "success",
    });
  }

  return (
    <footer className="relative overflow-hidden" style={{ background: "#162420" }}>

      {/* Top glow line */}
      <div
        className="h-px"
        style={{
          background: "linear-gradient(90deg,transparent 0%,rgba(47,160,132,0.3) 30%,rgba(111,207,151,0.45) 50%,rgba(47,160,132,0.3) 70%,transparent 100%)",
        }}
      />

      {/* Main body */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 py-14 md:px-10 md:py-16">

        {/* Top row: brand + nav */}
        <div className="flex flex-col gap-12 md:flex-row md:gap-8 lg:gap-16">

          {/* Brand column */}
          <div className="flex flex-col gap-5 md:max-w-60">

            {/* Logo */}
            <Link href="/" aria-label="TaskLync Home" className="flex items-center gap-2 w-fit">
              <span className="font-['Fredoka'] text-2xl font-bold tracking-[-0.02em] text-[#e8f5f0] leading-none">
                Task<span className="text-[#2FA084]">Lync</span>
              </span>
            </Link>

            {/* Tagline */}
            <p className="font-['Poppins'] text-[13.5px] leading-[1.7] text-[rgba(232,245,240,0.42)]">
              Connecting you instantly with verified local professionals on demand, every time.
            </p>

            {/* Contact info */}
            <ul className="flex flex-col gap-2.5">
              {[
                { Icon: MapPin, text: "Faisalabad, Pakistan" },
                { Icon: Mail,   text: "team@tasklync.pk"     },
              ].map(({ Icon, text }) => (
                <li key={text} className="flex items-center gap-2 font-['Poppins'] text-[12.5px] text-[rgba(232,245,240,0.36)]">
                  <Icon size={13} strokeWidth={1.8} className="text-[#2FA084] shrink-0" />
                  {text}
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="flex gap-2 mt-1">
              {SOCIALS.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-[34px] h-[34px] rounded-lg flex items-center justify-center text-[rgba(232,245,240,0.4)] transition-[background,border-color,color] duration-200 hover:text-[#2FA084]"
                  style={{
                    background: "rgba(232,245,240,0.05)",
                    border: "1px solid rgba(232,245,240,0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(47,160,132,0.12)";
                    e.currentTarget.style.borderColor = "rgba(47,160,132,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(232,245,240,0.05)";
                    e.currentTarget.style.borderColor = "rgba(232,245,240,0.08)";
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
                <p className="font-['Poppins'] text-[10.5px] font-semibold tracking-[0.12em] uppercase text-[#2FA084] mb-4">
                  {col.label}
                </p>

                <ul className="flex flex-col gap-2.5">
                  {col.links.map(({ label, href }) => {

                    if (label === "Download App") {
                      return (
                        <li key={label}>
                          <button
                            onClick={handleDownloadApp}
                            className="font-['Poppins'] text-[13.5px] text-[rgba(232,245,240,0.46)] bg-none border-none p-0 cursor-pointer text-left transition-colors duration-200 hover:text-[#e8f5f0]"
                          >
                            {label}
                          </button>
                        </li>
                      );
                    }

                    if (label === "Cookie Settings") {
                      return (
                        <li key={label}>
                          <button
                            onClick={openModal}
                            className="font-['Poppins'] text-[13.5px] text-[rgba(232,245,240,0.46)] bg-none border-none p-0 cursor-pointer text-left transition-colors duration-200 hover:text-[#e8f5f0]"
                          >
                            {label}
                          </button>
                        </li>
                      );
                    }

                    return (
                      <li key={label}>
                        <Link
                          href={href}
                          className="font-['Poppins'] text-[13.5px] text-[rgba(232,245,240,0.46)] no-underline inline-flex items-center gap-1 transition-colors duration-200 hover:text-[#e8f5f0]"
                        >
                          {label}
                          {label === "Press Kit" && (
                            <ArrowUpRight size={11} strokeWidth={2} className="opacity-40" />
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
        <div className="mt-10 pt-6 border-t border-[rgba(232,245,240,0.07)] flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            suppressHydrationWarning
            className="font-['Poppins'] text-[12px] text-[rgba(232,245,240,0.25)] tracking-[0.01em]"
          >
            © {new Date().getFullYear()} TaskLync. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;