"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";
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

  // Focus first link when opened
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
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(0,0,0,0.25)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!isOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(160deg, #e8ede9 0%, #eeeeee 40%, #e6eeea 100%)",
          transform: isOpen ? "translateY(0)" : "translateY(-100%)",
          transition: isOpen
            ? "transform 0.28s cubic-bezier(0.16,1,0.3,1)"
            : "transform 0.22s cubic-bezier(0.32,0,0.67,0)",
          visibility: isOpen ? "visible" : "hidden",
          overflow: "hidden",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 24px 0" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 500, letterSpacing: "-0.02em", color: "#111210" }}>
            Task<span style={{ color: "#1F6F5F" }}>Lync</span>
          </span>

          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: "1px solid rgba(31,111,95,0.2)",
              background: "rgba(255,255,255,0.4)",
              color: "#1F6F5F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 32px" }}>
          <div style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.18em", color: "rgba(31,111,95,0.5)", marginBottom: 12 }}>
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
                    padding: "16px 0",
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "2.2rem",
                    fontWeight: 500,
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    color: "#111210",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                  <ArrowRight size={20} color="rgba(31,111,95,0.3)" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom CTA */}
        <div style={{ borderTop: "1px solid rgba(31,111,95,0.1)", padding: "32px" }}>
          <Link
            href="/for-professionals"
            onClick={onClose}
            style={{
              display: "block",
              width: "100%",
              borderRadius: 999,
              border: "1px solid rgba(31,111,95,0.2)",
              padding: "12px 0",
              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "#4a5250",
              textDecoration: "none",
              marginBottom: 12,
              boxSizing: "border-box", 
            }}
          >
            For Professionals
          </Link>

          <div
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
              padding: "16px 0",
              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: 600,
              letterSpacing: "0.03em",
              color: "#fff",
              textDecoration: "none",
              boxShadow: "0 4px 24px rgba(31,111,95,0.3)",
              boxSizing: "border-box",
            }}
          >
            Get Started
          </div>
        </div>
      </div>
    </>
  );
}