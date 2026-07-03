"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import type { NavItem } from "@/config/nav";
import { useWaitlist } from "../waitlist/WaitlistContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import { ANALYTICS_EVENTS } from "@/lib/analytics/events";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavItem[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { openModal } = useWaitlist();
  const { track } = useAnalytics();

  // Focus first focusable element when opened
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    }, 50);
    return () => clearTimeout(t);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <>
      {/* ── Backdrop ── */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(0,0,0,0.4)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* ── Drawer — slides from RIGHT ── */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "82%",
          maxWidth: 360,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          background: "#FAF9F6",
          borderRadius: "24px 0 0 24px",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: isOpen
            ? "transform 0.32s cubic-bezier(0.4,0,0.2,1)"
            : "transform 0.26s cubic-bezier(0.4,0,0.2,1)",
          visibility: isOpen ? "visible" : "hidden",
          overflow: "hidden",
        }}
      >
        {/* ── Top bar ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 20px 0" }}>
          <span style={{
            fontFamily: "'Fredoka', cursive",
            fontSize: "1.2rem",
            color: "#0D1F1C",
            lineHeight: 1,
          }}>
            Task<span style={{ color: "#1F6F5F" }}>Lync</span>
          </span>

          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid rgba(31,111,95,0.18)",
              background: "white",
              color: "#1F6F5F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontSize: "0.875rem",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
        </div>

        {/* ── Nav links ── */}
        <nav
          aria-label="Mobile navigation"
          style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 24px" }}
        >
          <div style={{
            fontSize: "9px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "rgba(31,111,95,0.45)",
            marginBottom: 10,
            fontFamily: "'Poppins', sans-serif",
          }}>
            Navigation
          </div>

          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {links.map((link) => (
              <li key={link.href} style={{ borderBottom: "1px solid rgba(31,111,95,0.08)" }}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 0",
                    fontFamily: "'Poppins', sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: "#0D1F1C",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                  <span style={{ fontSize: "0.9rem", color: "rgba(31,111,95,0.35)" }}>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Bottom CTAs ── */}
        <div style={{ borderTop: "1px solid rgba(31,111,95,0.08)", padding: "20px" }}>
          <Link
            href="/for-professionals"
            onClick={onClose}
            style={{
              display: "block",
              width: "100%",
              borderRadius: 999,
              border: "1px solid rgba(31,111,95,0.22)",
              padding: "11px 0",
              textAlign: "center",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "#4a5250",
              textDecoration: "none",
              marginBottom: 10,
              boxSizing: "border-box",
            }}
          >
            For Professionals
          </Link>

          <button
            onClick={() => {
              openModal();
              track(ANALYTICS_EVENTS.NAV_CTA_CLICKED);
              onClose();
            }}
            style={{
              display: "block",
              width: "100%",
              borderRadius: 999,
              background: "#1F6F5F",
              padding: "14px 0",
              textAlign: "center",
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.8125rem",
              fontWeight: 600,
              color: "white",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(31,111,95,0.28)",
              boxSizing: "border-box",
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}