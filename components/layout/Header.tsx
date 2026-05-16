"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, useSpring } from "framer-motion";

import { NAV_LINKS } from "@/config/nav";
import { navbarVariants, navLinkVariants } from "@/lib/motion/variants";
import { LogoMark } from "./LogoMark";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const pathname = usePathname();

  // Magnetic CTA
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const springX = useSpring(mx, { stiffness: 280, damping: 20 });
  const springY = useSpring(my, { stiffness: 280, damping: 20 });

  // Detect scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Magnetic CTA
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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

  // ─── Color tokens ────────────────────────────────────────────────────────────
  // Unscrolled = sitting on light green hero → use dark/green colours
  // Scrolled   = frosted glass bar → same dark/green colours (already correct)
  //
  // Both states now share the same palette since the hero is light.
  // The only visual difference between states is the backdrop & shadow.

  const navLinkColor = scrolled
    ? "text-[#4a5250] hover:text-[#111210]"
    : "text-[#1F6F5F]/80 hover:text-[#0D1F1C]";

  const navLinkActiveColor = scrolled
    ? "text-[#1F6F5F]"
    : "text-[#1F6F5F]";

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
        {/* Main navbar shell */}
        <div
          className={[
            "mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            scrolled
              ? [
                  "mt-0 rounded-none",
                  "border-b border-[#1F6F5F]/12",
                  "bg-[#EEEEEE]/80 backdrop-blur-[20px] backdrop-saturate-150",
                  "shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_4px_32px_rgba(31,111,95,0.06)]",
                ].join(" ")
              : [
                  "mt-0",
                  // subtle frosted tint so the bar is distinguishable on the light hero
                  "bg-white/40 backdrop-blur-md",
                  "border-b border-[#1F6F5F]/8",
                ].join(" "),
          ].join(" ")}
        >
          {/* Inner navbar */}
          <div
            className={[
              "pointer-events-auto flex items-center justify-between gap-6 transition-all duration-500",
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
                    "border text-[13px] font-medium transition-all duration-300",
                    "font-['DM_Sans']",
                    // Light-theme–friendly: always green outline
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

              {/* Primary CTA — solid green pill with magnetic effect */}
              <motion.div
                custom={NAV_LINKS.length + 1}
                variants={navLinkVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.a
                  ref={ctaRef}
                  href="/waitlist"
                  style={{ x: springX, y: springY }}
                  onMouseMove={handleCtaMouseMove}
                  onMouseLeave={handleCtaMouseLeave}
                  whileTap={{ scale: 0.96 }}
                  className={[
                    "inline-flex items-center gap-2 rounded-full px-5 py-2.5",
                    "font-['DM_Sans'] text-[13px] font-semibold tracking-[0.01em]",
                    "transition-all duration-300",
                    // Always solid green — matches hero's primary CTA exactly
                    "bg-linear-to-br from-[#1F6F5F] to-[#2FA084] text-white",
                    "shadow-[0_4px_20px_rgba(31,111,95,0.30)]",
                    "hover:shadow-[0_6px_28px_rgba(31,111,95,0.42)] hover:brightness-110",
                  ].join(" ")}
                >
                  Get Started
                  <motion.span
                    aria-hidden="true"
                    animate={{ x: [0, 2, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
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
                "transition-all duration-300 lg:hidden",
                // Mobile: always uses the same tint (mobile was already correct)
                scrolled
                  ? "border border-[#1F6F5F]/15 bg-white/70 text-[#1F6F5F] backdrop-blur-xl"
                  : "border border-[#1F6F5F]/20 bg-white/50 text-[#1F6F5F] backdrop-blur-xl",
              ].join(" ")}
            >
              <HamburgerLines open={mobileOpen} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ───────────────── Mobile Menu (untouched) ───────────────── */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function HamburgerLines({ open }: { open: boolean }) {
  return (
    <>
      <motion.span
        aria-hidden="true"
        className="block h-px w-4.5 origin-center bg-current"
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        aria-hidden="true"
        className="block h-px w-4.5 origin-center bg-current"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        aria-hidden="true"
        className="block h-px w-4.5 origin-center bg-current"
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  );
}