"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { NAV_LINKS } from "@/config/nav";
import { navbarVariants, navLinkVariants } from "@/lib/motion/variants";
import { LogoMark } from "./LogoMark";
import { MobileMenu } from "./MobileMenu";
import { useWaitlist } from "@/components/waitlist/WaitlistContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";

// Only run magnetic effect on non-touch devices
const isTouch = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: none)").matches;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { openModal } = useWaitlist();
  const { track } = useAnalytics();

  const pathname = usePathname();

  // Magnetic CTA — only desktop
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 280, damping: 20 });
  const springY = useSpring(my, { stiffness: 280, damping: 20 });

  // Detect scroll — passive, no layout read on every frame
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Magnetic CTA — skip on touch devices entirely
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isTouch()) return;
    const el = ctaRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.25);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.25);
  };

  const handleCtaMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const navLinkColor = scrolled
    ? "text-[#4a5250] hover:text-[#111210]"
    : "text-[#1F6F5F]/80 hover:text-[#0D1F1C]";

  const navLinkActiveColor = "text-[#1F6F5F]";
  const underlineColor = "bg-[#1F6F5F]";

  const logoWordColor = scrolled
    ? "text-[#111210] group-hover:text-[#1F6F5F]"
    : "text-[#0D1F1C] group-hover:text-[#1F6F5F]";

  return (
    <>
      <motion.header
        role="banner"
        variants={navbarVariants}
        initial="hidden"
        animate="visible"
        className="fixed left-0 right-0 top-0 z-50 pointer-events-none"
      >
        {/* Main navbar shell
            KEY FIX: replaced transition-all (paints everything) with only
            the properties that actually change: shadow, background, padding.
            backdrop-blur stays — it's only on desktop-visible nav, not the
            mobile fullscreen panel anymore.
        */}
        <div
          className={[
            "mx-auto",
            // Only transition the props that change, never transition-all
            "transition-[background-color,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? [
                  "mt-0 rounded-none",
                  "border-b border-[#1F6F5F]/12",
                  "bg-[#EEEEEE]/80 backdrop-blur-[20px] backdrop-saturate-150",
                  "shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_4px_32px_rgba(31,111,95,0.06)]",
                ].join(" ")
              : [
                  "mt-0",
                  "bg-white/40 backdrop-blur-md",
                  "border-b border-[#1F6F5F]/8",
                ].join(" "),
          ].join(" ")}
        >
          {/* Inner navbar */}
          <div
            className={[
              "pointer-events-auto flex items-center justify-between gap-6",
              // Only transition padding, not everything
              "transition-[padding] duration-500",
              scrolled
                ? "px-6 py-3 lg:px-10 lg:py-3.5"
                : "px-6 py-5 lg:px-12 lg:py-6",
            ].join(" ")}
          >
            {/* ───────────────── Logo ───────────────── */}
            <Link
              href="/"
              aria-label="TaskLync Home"
              className="group flex shrink-0 items-center gap-2.5"
            >
              <LogoMark size={42} />
              <span
                className={[
                  "font-['Playfair_Display'] text-[2.2rem] font-medium tracking-tight transition-colors duration-300",
                  logoWordColor,
                ].join(" ")}
                style={{ lineHeight: 1 }}
              >
                Task
                <span className="text-[#1F6F5F]">Lync</span>
              </span>
            </Link>

            {/* ───────────────── Desktop Navigation ───────────────── */}
            <nav
              aria-label="Primary navigation"
              className="hidden items-center gap-1 lg:flex"
            >
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;

                return (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={navLinkVariants}
                    initial="hidden"
                    animate="visible"
                    onHoverStart={() => setHoveredIndex(i)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    className="relative"
                  >
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      className={[
                        "relative block px-3.5 py-2",
                        "font-['DM_Sans'] text-[14px] font-medium tracking-[0.005em]",
                        "transition-colors duration-200",
                        isActive ? navLinkActiveColor : navLinkColor,
                      ].join(" ")}
                    >
                      {link.label}

                      {/* Underline indicator */}
                      <motion.span
                        aria-hidden="true"
                        className={[
                          "absolute bottom-1 left-3.5 right-3.5 h-px origin-left",
                          underlineColor,
                        ].join(" ")}
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: isActive || hoveredIndex === i ? 1 : 0,
                          opacity: isActive ? 1 : 0.7,
                        }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* ───────────────── Desktop Actions ───────────────── */}
            <div className="hidden items-center gap-3 lg:flex">
              {/* For Professionals — outline pill */}
              <motion.div
                custom={NAV_LINKS.length}
                variants={navLinkVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  href="/for-professionals"
                  className={[
                    "inline-flex items-center gap-1.5 rounded-full px-5 py-2.5",
                    "border text-[13px] font-medium transition-[border-color,background-color] duration-300",
                    "font-['DM_Sans']",
                    "border-[#1F6F5F]/25 text-[#1F6F5F]",
                    "hover:border-[#1F6F5F]/55 hover:bg-[#1F6F5F]/6",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className="inline-block h-1.5 w-1.5 rounded-full bg-[#2FA084]"
                  />
                  For Professionals
                </Link>
              </motion.div>

              {/* Primary CTA — magnetic only on desktop */}
              <motion.div
                custom={NAV_LINKS.length + 1}
                variants={navLinkVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.a
                  onClick={() => {
                    openModal();
                    track(ANALYTICS_EVENTS.NAV_CTA_CLICKED);
                  }}
                  ref={ctaRef}
                  style={{ x: springX, y: springY }}
                  onMouseMove={handleCtaMouseMove}
                  onMouseLeave={handleCtaMouseLeave}
                  whileTap={{ scale: 0.96 }}
                  className={[
                    "inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-2.5",
                    "font-['DM_Sans'] text-[13px] font-semibold tracking-[0.01em]",
                    "transition-[box-shadow,filter] duration-300",
                    "bg-linear-to-br from-[#1F6F5F] to-[#2FA084] text-white",
                    "shadow-[0_4px_20px_rgba(31,111,95,0.30)]",
                    "hover:shadow-[0_6px_28px_rgba(31,111,95,0.42)] hover:brightness-110",
                  ].join(" ")}
                >
                  Get Started
                  <motion.span
                    aria-hidden="true"
                    animate={{ x: [0, 2, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </motion.div>
            </div>

            {/* ───────────────── Mobile Hamburger ───────────────── */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
              className={[
                "flex h-10 w-10 flex-col items-center justify-center gap-1.25 rounded-full",
                // Only transition border/bg, not all properties
                "transition-[border-color,background-color] duration-200 lg:hidden",
                scrolled
                  ? "border border-[#1F6F5F]/15 bg-white/70 text-[#1F6F5F]"
                  : "border border-[#1F6F5F]/20 bg-white/50 text-[#1F6F5F]",
              ].join(" ")}
            >
              {/* 
                KEY FIX: Replaced 3× motion.span hamburger with a pure CSS
                approach. No JS animation overhead on every tap.
                CSS transform is compositor-only — zero layout, zero paint.
              */}
              <HamburgerLines open={mobileOpen} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ───────────────── Mobile Menu ───────────────── */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

/**
 * Pure CSS hamburger — no Framer Motion, no JS per frame.
 * Uses CSS custom transforms on <span> elements.
 * Compositor-only: translate + rotate never trigger layout or paint.
 */
function HamburgerLines({ open }: { open: boolean }) {
  return (
    <span aria-hidden="true" className="flex flex-col items-center justify-center gap-1.25 w-4.5">
      <span
        className="block h-px w-full origin-center bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: open ? "translateY(6px) rotate(45deg)" : "none",
        }}
      />
      <span
        className="block h-px w-full origin-center bg-current transition-[transform,opacity] duration-200"
        style={{
          transform: open ? "scaleX(0)" : "scaleX(1)",
          opacity: open ? 0 : 1,
        }}
      />
      <span
        className="block h-px w-full origin-center bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform: open ? "translateY(-6px) rotate(-45deg)" : "none",
        }}
      />
    </span>
  );
}