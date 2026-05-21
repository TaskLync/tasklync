"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import type { NavItem } from "@/config/nav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavItem[];
}

/**
 * MOBILE PERFORMANCE FIXES applied here:
 *
 * 1. REMOVED backdrop-blur from the fullscreen panel.
 *    backdrop-blur on a fullscreen element = GPU must composite the entire
 *    screen on every frame. On mobile this tanks FPS instantly.
 *    The solid gradient background looks equally good without it.
 *
 * 2. REMOVED backdrop-blur from the backdrop overlay for the same reason.
 *    Replaced with a simple opacity fade.
 *
 * 3. REMOVED large blur-[80px] / blur-[60px] ambient glow divs.
 *    Large CSS blur filters repaint on scroll/animation. On mobile they're
 *    invisible anyway (lost in the gradient). Cut them entirely.
 *
 * 4. SIMPLIFIED animation variants.
 *    Old: panel slides Y + opacity, THEN each link staggers in individually.
 *    New: panel clips in with a fast CSS transform, links fade as a group.
 *    Staggering N individual elements via JS = N animation timers. One
 *    group fade with CSS animation-delay is compositor-only.
 *
 * 5. REMOVED backdrop-blur-sm from close button — tiny surface but still
 *    triggers a compositing layer.
 *
 * 6. Used will-change: transform on the panel so the browser promotes it
 *    to its own layer before the animation starts (no jank on first open).
 */

// Simplified panel animation — translate Y only, no scale
// translate is compositor-only on mobile (no layout, no paint)
const panelVariants: Variants = {
  closed: {
    opacity: 0,
    y: "-100%",
    transition: { duration: 0.28, ease: [0.32, 0, 0.67, 0] as [number, number, number, number] },
  },
  open: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.32, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

// Single group fade for all links — no per-item stagger timers
const linksGroupVariants: Variants = {
  closed: { opacity: 0 },
  open: {
    opacity: 1,
    transition: { delay: 0.12, duration: 0.22 },
  },
};

const ctaVariants: Variants = {
  closed: { opacity: 0, y: 8 },
  open: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.2, duration: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  // Focus trap — move focus into panel when opened
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) {
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
        "a, button, [tabindex]"
      );
      firstFocusable?.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — simple opacity fade, NO backdrop-blur */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Fullscreen panel
              - No backdrop-blur (biggest perf win on mobile)
              - Solid gradient background — looks clean, zero GPU overhead
              - will-change: transform tells browser to promote layer early
          */}
          <motion.div
            key="panel"
            ref={panelRef}
            id="mobile-menu"
            className="fixed inset-0 z-50 flex flex-col overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, #e8ede9 0%, #EEEEEE 40%, #e6eeea 100%)",
              willChange: "transform",
            }}
            variants={panelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Noise texture — kept, it's a single CSS bg with no animation */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* 
              REMOVED: The two large blur ambient glows.
              blur-[80px] / blur-[60px] on absolutely positioned divs create
              separate composited layers and repaint during animation.
              If you want a subtle color accent, use a radial-gradient on the
              background instead (zero extra layers).
            */}

            {/* Top bar */}
            <div className="flex items-center justify-between px-6 pt-6 pb-0">
              <span className="font-['Playfair_Display'] text-xl font-medium tracking-[-0.02em] text-[#111210]">
                Task<span className="text-[#1F6F5F]">Lync</span>
              </span>

              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                className={[
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  "border border-[#1F6F5F]/20 bg-white/40 text-[#1F6F5F]",
                  // Removed backdrop-blur-sm — extra compositing layer for tiny button
                  "transition-[border-color,background-color] duration-200",
                  "hover:border-[#1F6F5F]/50 hover:bg-white/60",
                  // active state for mobile tap feedback (no hover on touch)
                  "active:bg-white/70 active:scale-95",
                ].join(" ")}
              >
                <CloseIcon />
              </button>
            </div>

            {/* Nav links — animated as a group, not individually */}
            <nav className="flex flex-1 flex-col justify-center px-8">
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1F6F5F]/50">
                Navigation
              </div>

              <motion.ul
                className="space-y-1"
                role="list"
                variants={linksGroupVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={[
                        "group flex items-center justify-between",
                        "border-b border-[#1F6F5F]/08 py-4",
                        // Only transition border-color, not all
                        "transition-[border-color] duration-200",
                        "hover:border-[#1F6F5F]/25",
                        // Touch-friendly active state
                        "active:opacity-70",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "font-['Playfair_Display'] text-[2.2rem] font-medium leading-none",
                          "tracking-[-0.02em] text-[#111210]",
                          "transition-colors duration-200 group-hover:text-[#1F6F5F]",
                        ].join(" ")}
                      >
                        {link.label}
                      </span>
                      <span
                        className={[
                          "text-[#1F6F5F]/30",
                          // translate is compositor-only — fine to keep
                          "transition-[transform,color] duration-300",
                          "group-hover:translate-x-1 group-hover:text-[#1F6F5F]",
                        ].join(" ")}
                      >
                        <ArrowIcon />
                      </span>
                    </Link>
                  </li>
                ))}
              </motion.ul>
            </nav>

            {/* Bottom CTA block */}
            <motion.div
              variants={ctaVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="border-t border-[#1F6F5F]/10 px-8 py-8"
            >
              <div className="mb-4">
                <Link
                  href="/for-professionals"
                  onClick={onClose}
                  className={[
                    "block w-full rounded-full border border-[#1F6F5F]/20 bg-transparent",
                    "py-3 text-center text-sm font-medium text-[#4a5250]",
                    "transition-[border-color,color] duration-200",
                    "hover:border-[#1F6F5F]/50 hover:text-[#1F6F5F]",
                    "active:scale-[0.98] active:opacity-80",
                  ].join(" ")}
                >
                  For Professionals
                </Link>
              </div>
              <Link
                href="/waitlist"
                onClick={onClose}
                className={[
                  "block w-full rounded-full bg-[#1F6F5F]",
                  "py-4 text-center text-sm font-semibold tracking-wide text-white",
                  "shadow-[0_4px_24px_rgba(31,111,95,0.3)]",
                  // Only transition shadow + bg, not all
                  "transition-[background-color,box-shadow] duration-300",
                  "hover:bg-[#1a5e50] hover:shadow-[0_6px_32px_rgba(31,111,95,0.4)]",
                  "active:scale-[0.98]",
                ].join(" ")}
              >
                Get Started — It's Free
              </Link>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 2L14 14M14 2L2 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10h12M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}