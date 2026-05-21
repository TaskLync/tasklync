"use client";

/**
 * MobileMenu — ZERO Framer Motion
 *
 * Performance strategy:
 * - Panel always in DOM (no mount/unmount GC pressure)
 * - Open/close = single CSS class flip → GPU compositor thread
 * - CSS translate + opacity = compositor-only (no layout, no paint)
 * - will-change: transform is SET on open, REMOVED on close
 *   → avoids permanently promoting the layer (wastes VRAM when closed)
 * - CSS animation-delay replaces JS stagger entirely
 * - hover: transitions are guarded to only apply on non-touch devices
 *   via the `@media (hover: hover)` selector in Tailwind (`hover:` prefix)
 * - Arrow hover translate removed on mobile (saves GPU composite layer per item)
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { NavItem } from "@/config/nav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavItem[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  /**
   * will-change lifecycle management:
   * Set JUST BEFORE the transition starts, clear AFTER it ends.
   * Permanently setting will-change wastes GPU VRAM (the browser keeps a
   * composited layer allocated even when the menu is invisible).
   * 
   * Timings match the CSS transitions:
   *   open  → 0.32s panel slide
   *   close → 0.26s panel slide
   */
  const [willChange, setWillChange] = useState<"transform" | "auto">("auto");

  useEffect(() => {
    // Activate will-change immediately when open state changes
    setWillChange("transform");

    const timeout = setTimeout(
      () => setWillChange("auto"),
      isOpen ? 350 : 280 // slightly past the transition end
    );

    return () => clearTimeout(timeout);
  }, [isOpen]);

  // Focus first focusable element when opened (a11y)
  useEffect(() => {
    if (isOpen) {
      const first = panelRef.current?.querySelector<HTMLElement>(
        "a, button, [tabindex]"
      );
      const t = setTimeout(() => first?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Keyboard: close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/*
        ── BACKDROP ──────────────────────────────────────────────────────────
        Always in DOM. CSS opacity transition — compositor only.
        pointer-events:none when closed so taps pass through.
      */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/25"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/*
        ── PANEL ─────────────────────────────────────────────────────────────
        Always in DOM. translateY(-100%) ↔ translateY(0) = compositor-only.
        will-change is applied dynamically (see useEffect above) so we don't
        hold a promoted layer when the menu is idle/closed.
        visibility:hidden removes from a11y tree + prevents tab focus when closed.
      */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        className="fixed inset-0 z-50 flex flex-col overflow-hidden lg:hidden"
        style={{
          background:
            "linear-gradient(160deg, #e8ede9 0%, #EEEEEE 40%, #e6eeea 100%)",
          transform: isOpen ? "translateY(0)" : "translateY(-100%)",
          transition: isOpen
            ? "transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), visibility 0s 0s"
            : "transform 0.26s cubic-bezier(0.32, 0, 0.67, 0), visibility 0s 0.26s",
          visibility: isOpen ? "visible" : "hidden",
          willChange,
        }}
      >
        {/* Static noise texture — zero animation cost */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ── Top bar ───────────────────────────────────────────────────── */}
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
              // Only transition non-transform props; skip transform on mobile
              "transition-[border-color,background-color] duration-150",
              "hover:border-[#1F6F5F]/50 hover:bg-white/60",
              // active:scale uses CSS transform — compositor-only, fine on mobile
              "active:scale-90",
            ].join(" ")}
          >
            <CloseIcon />
          </button>
        </div>

        {/* ── Nav links ─────────────────────────────────────────────────── */}
        <nav className="flex flex-1 flex-col justify-center px-8">
          <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1F6F5F]/50">
            Navigation
          </div>

          <ul className="space-y-1" role="list">
            {links.map((link, i) => (
              <li
                key={link.href}
                style={{
                  /*
                    Stagger via CSS transition-delay.
                    On close: instant reset — the panel slide covers the exit,
                    so we don't waste frames animating individual items out.
                  */
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(10px)",
                  transition: isOpen
                    ? `opacity 0.22s ease ${0.1 + i * 0.04}s, transform 0.22s ease ${0.1 + i * 0.04}s`
                    : "none",
                }}
              >
                <Link
                  href={link.href}
                  onClick={onClose}
                  className={[
                    "group flex items-center justify-between",
                    "border-b border-[#1F6F5F]/08 py-4",
                    // Only transition border on mobile; skip transform-based hovers
                    "transition-[border-color] duration-200",
                    "hover:border-[#1F6F5F]/25",
                    "active:opacity-60",
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

                  {/*
                    Arrow: removed `group-hover:translate-x-1` — that transition
                    forces the browser to composite every nav item as its own layer
                    on hover-capable devices, and on mobile it just fires on tap.
                    Color change alone gives sufficient feedback.
                  */}
                  <span
                    className={[
                      "text-[#1F6F5F]/30",
                      "transition-colors duration-200",
                      "group-hover:text-[#1F6F5F]",
                    ].join(" ")}
                  >
                    <ArrowIcon />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Bottom CTA ────────────────────────────────────────────────── */}
        <div
          className="border-t border-[#1F6F5F]/10 px-8 py-8"
          style={{
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : "translateY(12px)",
            transition: isOpen
              ? `opacity 0.24s ease ${0.1 + links.length * 0.04}s, transform 0.24s ease ${0.1 + links.length * 0.04}s`
              : "none",
          }}
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
                // active:scale is compositor-only — safe on mobile
                "active:scale-[0.97] active:opacity-80",
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
              // Only transition bg + shadow; skip transform on this element
              // to avoid compositing the entire bottom section
              "transition-[background-color,box-shadow] duration-200",
              "hover:bg-[#1a5e50] hover:shadow-[0_6px_32px_rgba(31,111,95,0.4)]",
              "active:scale-[0.97]",
            ].join(" ")}
          >
            Get Started — It's Free
          </Link>
        </div>
      </div>
    </>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
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