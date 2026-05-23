"use client";

import Link from "next/link";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { ArrowUpRight, ShieldCheck, Lock, AlertTriangle, Star } from "lucide-react";

const cards = [
  {
    Icon: ShieldCheck,
    title: "Your identity is your access",
    body: "Sending someone else to a job in your name is grounds for immediate permanent removal.",
    link: { label: "Learn more", href: "/blog/professional-conduct-policy" },
  },
  {
    Icon: Lock,
    title: "Keep payments in the platform",
    body: "Requesting cash or transfers outside TaskLync violates conduct policy. Funds release after job confirmation.",
    link: { label: "Learn more", href: "/blog/professional-conduct-policy" },
  },
  {
    Icon: AlertTriangle,
    title: "Agree scope before you start",
    body: "Extra work must be quoted and accepted in-app. Unapproved charges are reversed automatically.",
    link: { label: "How disputes work", href: "/blog/professional-dispute-guide" },
  },
  {
    Icon: Star,
    title: "Your rating is your licence",
    body: "Accounts below 4.3 stars or above a 2% dispute rate are reviewed and may be suspended.",
    link: { label: "How ratings work", href: "/blog/how-tasklync-ratings-work" },
  },
];

export default function SafetyForProfessionals() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref as React.RefObject<HTMLDivElement>}
      className="bg-[#F7F7F5] py-14 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-290 mx-auto">

        <div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.45s ease, transform 0.45s ease",
          }}
        >
          <div>
            <div
              className="inline-flex items-center gap-1.5 mb-3 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              For Professionals
            </div>
            <h2
              className="text-[#0D1F1C] font-bold leading-[1.05] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-clash)", fontSize: "clamp(1.9rem, 3vw, 2.6rem)", }}
            >
              Safety works both ways.
            </h2>
          </div>
          <Link
            href="/for-professionals"
            className="inline-flex items-center gap-1.5 text-[#1F6F5F] text-[12.5px] font-semibold shrink-0 group"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Professional onboarding guide
            <ArrowUpRight size={13} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((card, i) => {
            const Icon = card.Icon;
            return (
              <div
                key={i}
                className="bg-white border border-[rgba(13,31,28,0.08)] rounded-2xl p-5 flex flex-col gap-3"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.45s ${0.06 * i}s ease, transform 0.45s ${0.06 * i}s ease`,
                }}
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center border border-[rgba(31,111,95,0.15)]"
                  style={{ background: "rgba(31,111,95,0.07)" }}
                >
                  <Icon size={15} strokeWidth={1.75} color="#1F6F5F" />
                </div>
                <div>
                  <div
                    className="text-[#0D1F1C] font-semibold text-[13.5px] leading-snug tracking-[-0.01em] mb-1.5"
                    style={{ fontFamily: "var(--font-clash)" }}
                  >
                    {card.title}
                  </div>
                  <p
                    className="text-[12px] text-[rgba(13,31,28,0.5)] leading-[1.6]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {card.body}
                  </p>
                </div>
                <Link
                  href={card.link.href}
                  className="mt-auto inline-flex items-center gap-1 text-[#1F6F5F] text-[11.5px] font-semibold group"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {card.link.label}
                  <ArrowUpRight size={11} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}