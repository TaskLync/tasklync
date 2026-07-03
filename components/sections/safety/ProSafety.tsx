"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Lock, AlertTriangle, Star } from "lucide-react";

const cards = [
  {
    Icon: ShieldCheck,
    title: "Your identity is your access",
    body: "Sending someone else to a job in your name is grounds for immediate permanent removal.",
    link: { label: "Learn more", href: "/blog/safety-works-both-ways-for-professionals" },
  },
  {
    Icon: Lock,
    title: "Keep payments in the platform",
    body: "Requesting cash or transfers outside TaskLync violates conduct policy. Funds release after job confirmation.",
    link: { label: "Learn more", href: "/blog/safety-works-both-ways-for-professionals" },
  },
  {
    Icon: AlertTriangle,
    title: "Agree scope before you start",
    body: "Extra work must be quoted and accepted in app. Unapproved charges are reversed automatically.",
    link: { label: "How disputes work", href: "/blog/safety-works-both-ways-for-professionals" },
  },
  {
    Icon: Star,
    title: "Your rating is your licence",
    body: "Accounts below 4.3 stars or above a 2% dispute rate are reviewed and may be suspended.",
    link: { label: "How ratings work", href: "/blog/safety-works-both-ways-for-professionals" },
  },
];

export default function SafetyForProfessionals() {
  return (
    <section className="bg-[#F7F7F5] py-14">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 mb-3 font-['Poppins'] text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]">
              For Professionals
            </div>
            <h2
              className="font-['Fredoka'] text-[#0D1F1C] font-bold leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)" }}
            >
              Safety works both ways.
            </h2>
          </div>
          <Link
            href="/for-professionals"
            className="inline-flex items-center gap-1.5 font-['Poppins'] text-[#1F6F5F] text-[15px] font-semibold shrink-0"
          >
            Professional onboarding guide
            <ArrowUpRight size={13} strokeWidth={2} />
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
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center border border-[rgba(31,111,95,0.15)]"
                  style={{ background: "rgba(31,111,95,0.07)" }}
                >
                  <Icon size={15} strokeWidth={1.75} color="#1F6F5F" />
                </div>
                <div>
                  <div className="font-['Fredoka'] text-[#0D1F1C] font-semibold text-[13.5px] leading-snug tracking-[-0.01em] mb-1.5">
                    {card.title}
                  </div>
                  <p className="font-['Poppins'] text-[13px] text-[rgba(13,31,28,0.5)] leading-[1.6]">
                    {card.body}
                  </p>
                </div>
                <Link
                  href={card.link.href}
                  className="mt-auto inline-flex items-center gap-1 font-['Poppins'] text-[#1F6F5F] text-[11.5px] font-semibold"
                >
                  {card.link.label}
                  <ArrowUpRight size={11} strokeWidth={2} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}