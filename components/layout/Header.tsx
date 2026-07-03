"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/public/images/logo/tasklync-logo-primary@2x.png";

import { NAV_LINKS } from "@/config/nav";
import { MobileMenu } from "./MobileMenu";
import { useWaitlist } from "@/components/waitlist/WaitlistContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openModal } = useWaitlist();
  const { track } = useAnalytics();
  const pathname = usePathname();

  // Pages where navbar should always appear solid (no transparent state)
  const forceSolid = pathname === "/blog" ||
  pathname.startsWith("/blog/");

  const solid = scrolled || forceSolid;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        role="banner"
        className={[
          "fixed left-0 right-0 top-0 z-50 px-6 lg:px-10",
          "transition-[background-color,border-color,box-shadow] duration-300 ease-out",
          solid
            ? "bg-[#FAF9F6]/92 backdrop-blur-[18px] backdrop-saturate-150 border-b border-[#1F6F5F]/10 shadow-[0_1px_28px_rgba(0,0,0,0.07)]"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div
          className={[
            "mx-auto max-w-[1240px] flex items-center justify-between gap-6",
            "transition-[height] duration-300",
            solid ? "h-[66px]" : "h-[80px]",
          ].join(" ")}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            aria-label="TaskLync Home"
            className="flex shrink-0 items-center gap-3"
          >
            <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[11px] bg-[#1F6F5F] overflow-hidden">
              <Image
                src={logo}
                alt=""
                width={30}
                height={30}
                priority
                className="h-[35px] w-[35px] object-contain brightness-0 invert"
              />
            </div>
            <span
              className={[
                "font-['Fredoka'] text-[1.75rem] leading-none tracking-[0.01em]",
                "transition-colors duration-300",
                solid ? "text-[#0D1F1C]" : "text-white",
              ].join(" ")}
            >
              Task<span className="text-[#4ECBA5]">Lync</span>
            </span>
          </Link>

          {/* ── Desktop Navigation ── */}
          <nav
            aria-label="Primary navigation"
            className="hidden items-center lg:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "relative px-4 py-2.5 group",
                    "font-['Poppins'] text-[0.875rem] font-medium tracking-[0.005em]",
                    "transition-colors duration-200",
                    solid
                      ? isActive ? "text-[#1F6F5F]" : "text-[#4a5250] hover:text-[#0D1F1C]"
                      : isActive ? "text-white" : "text-white/78 hover:text-white",
                  ].join(" ")}
                >
                  {link.label}
                  <span
                    className={[
                      "absolute bottom-1 left-4 right-4 h-px origin-left",
                      "transition-transform duration-[250ms] ease-[cubic-bezier(0.16,1,0.3,1)]",
                      solid ? "bg-[#1F6F5F]" : "bg-white",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ── Desktop Actions ── */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/for-professionals"
              className={[
                "inline-flex items-center rounded-full px-[1.375rem] py-[0.5625rem]",
                "font-['Poppins'] text-[0.875rem] font-medium",
                "border-[1.5px] transition-[border-color,background-color,color] duration-200",
                solid
                  ? "border-[#1F6F5F]/28 text-[#1F6F5F] hover:border-[#1F6F5F]/60 hover:bg-[#1F6F5F]/5"
                  : "border-white/22 text-white/88 hover:border-white/50 hover:bg-white/7 hover:text-white",
              ].join(" ")}
            >
              For Professionals
            </Link>

            <button
              type="button"
              onClick={() => {
                openModal();
                track(ANALYTICS_EVENTS.NAV_CTA_CLICKED);
              }}
              className={[
                "cursor-pointer inline-flex items-center rounded-full px-6 py-[0.5625rem]",
                "font-['Poppins'] text-[0.875rem] font-semibold text-white",
                "bg-[#1F6F5F]",
                "transition-[background,box-shadow] duration-200",
                "hover:bg-[#18594c] hover:shadow-[0_4px_18px_rgba(31,111,95,0.38)]",
              ].join(" ")}
            >
              Get Started
            </button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className={[
              "flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden",
              "transition-[border-color,background-color] duration-200",
              solid
                ? "border border-[#1F6F5F]/15 bg-white/70 text-[#1F6F5F]"
                : "border border-white/20 bg-white/10 text-white",
            ].join(" ")}
          >
            <HamburgerLines open={mobileOpen} />
          </button>
        </div>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}

function HamburgerLines({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="flex w-[18px] flex-col items-center justify-center gap-[5px]">
      <span
        className="block h-px w-full origin-center bg-current transition-transform duration-300"
        style={{ transform: open ? "translateY(6px) rotate(45deg)" : "none" }}
      />
      <span
        className="block h-px w-full origin-center bg-current transition-[transform,opacity] duration-200"
        style={{ transform: open ? "scaleX(0)" : "scaleX(1)", opacity: open ? 0 : 1 }}
      />
      <span
        className="block h-px w-full origin-center bg-current transition-transform duration-300"
        style={{ transform: open ? "translateY(-6px) rotate(-45deg)" : "none" }}
      />
    </span>
  );
}