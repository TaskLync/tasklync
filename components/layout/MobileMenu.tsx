"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  mobileMenuVariants,
  mobileLinkVariants,
  mobileCtaVariants,
} from "@/lib/motion/variants";
import type { NavItem } from "@/config/nav";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavItem[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-[#EEEEEE]/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Fullscreen panel */}
          <motion.div
            key="panel"
            className="fixed inset-0 z-50 flex flex-col overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, #e8ede9 0%, #EEEEEE 40%, #e6eeea 100%)",
            }}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Noise texture overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-40 -right-20 h-96 w-96 rounded-full bg-[#2FA084]/10 blur-[80px]" />
            <div className="pointer-events-none absolute bottom-20 -left-20 h-72 w-72 rounded-full bg-[#1F6F5F]/08 blur-[60px]" />

            {/* Top bar */}
            <div className="flex items-center justify-between px-6 pt-6 pb-0">
              <span
                className="font-['Playfair_Display'] text-xl font-medium tracking-[-0.02em] text-[#111210]"
              >
                Task<span className="text-[#1F6F5F]">Lync</span>
              </span>

              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#1F6F5F]/20 bg-white/40 text-[#1F6F5F] backdrop-blur-sm transition-all duration-200 hover:border-[#1F6F5F]/50 hover:bg-white/60"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex flex-1 flex-col justify-center px-8">
              <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1F6F5F]/50">
                Navigation
              </div>

              <ul className="space-y-1" role="list">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    custom={i}
                    variants={mobileLinkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="group flex items-center justify-between border-b border-[#1F6F5F]/08 py-4 transition-colors duration-200 hover:border-[#1F6F5F]/25"
                    >
                      <span className="font-['Playfair_Display'] text-[2.2rem] font-medium leading-none tracking-[-0.02em] text-[#111210] transition-colors duration-200 group-hover:text-[#1F6F5F]">
                        {link.label}
                      </span>
                      <span className="translate-x-0 text-[#1F6F5F]/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#1F6F5F]">
                        <ArrowIcon />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom CTA block */}
            <motion.div
              variants={mobileCtaVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="border-t border-[#1F6F5F]/10 px-8 py-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <Link
                  href="/login"
                  onClick={onClose}
                  className="flex-1 rounded-full border border-[#1F6F5F]/30 bg-white/50 py-3 text-center text-sm font-medium text-[#1F6F5F] backdrop-blur-sm transition-all duration-200 hover:border-[#1F6F5F] hover:bg-white/80"
                >
                  Log in
                </Link>
                <Link
                  href="/for-professionals"
                  onClick={onClose}
                  className="flex-1 rounded-full border border-[#1F6F5F]/20 bg-transparent py-3 text-center text-sm font-medium text-[#4a5250] transition-all duration-200 hover:border-[#1F6F5F]/50 hover:text-[#1F6F5F]"
                >
                  For Pros
                </Link>
              </div>
              <Link
                href="/waitlist"
                onClick={onClose}
                className="block w-full rounded-full bg-[#1F6F5F] py-4 text-center text-sm font-semibold tracking-wide text-white shadow-[0_4px_24px_rgba(31,111,95,0.3)] transition-all duration-300 hover:bg-[#1a5e50] hover:shadow-[0_6px_32px_rgba(31,111,95,0.4)] active:scale-[0.98]"
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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}