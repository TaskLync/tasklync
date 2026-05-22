"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { UserCheck, Eye, PhoneCall, Lock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const tips = [
  {
    Icon: UserCheck,
    title: "Verify before the door opens",
    body: "Every professional's profile shows their verified name, photo, trade category, and review history. Match the photo to the person at your door before letting them in. Their ID badge is available in-app.",
    link: { label: "How to check a professional's credentials", href: "/blog/verify-professional-credentials" },
  },
  {
    Icon: Eye,
    title: "Stay present for access jobs",
    body: "For jobs requiring access to multiple rooms or utilities, remain at home or designate a trusted adult. You can share your live location with a contact directly from the app during any booking.",
    link: null,
  },
  {
    Icon: PhoneCall,
    title: "If something feels wrong, stop the job",
    body: "You are never obligated to continue. Tap \"End Job\" in the app at any point. You will not be charged for incomplete work. Our team is available 24/7 via the in-app support chat.",
    link: { label: "What to do if you feel unsafe", href: "/blog/homeowner-safety-guide" },
  },
  {
    Icon: Lock,
    title: "Keep payments in the app",
    body: "Never pay cash before a job starts, and never transfer money outside the platform. TaskLync holds funds in escrow and releases them only after you confirm the work is complete.",
    link: null,
  },
];

const quickChecks = [
  "Check the professional's profile photo matches the person at your door",
  "Confirm the booking reference matches your in-app confirmation",
  "Agree on the scope of work before any work begins",
  "Take photos of the area before work starts for large jobs",
  "Do not share access to other rooms outside the job scope",
  "Rate the job in the app as soon as it is complete",
];

export default function SafetyForHomeowners() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref as React.RefObject<HTMLDivElement>}
      className="bg-[#F7F7F5] py-18 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-290 mx-auto">

        {/* Header */}
        <div
          className="mb-12"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        >
          <div
            className="inline-flex items-center gap-2 mb-4 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            For Homeowners
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2
              className="text-[#0D1F1C] font-bold leading-[1.05] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
              }}
            >
              Practical safety guide<br className="hidden lg:block" /> for every booking.
            </h2>
            <p
              className="text-[rgba(13,31,28,0.5)] text-[13.5px] leading-[1.65] max-w-xs"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Our vetting does the heavy lifting. These habits make every job
              even safer.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Tips column (spans 2 cols) */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tips.map((tip, i) => {
              const Icon = tip.Icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-[rgba(13,31,28,0.08)] rounded-2xl p-6 flex flex-col gap-4"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(14px)",
                    transition: `opacity 0.5s ${0.06 * i}s ease, transform 0.5s ${0.06 * i}s ease`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-[rgba(31,111,95,0.15)]"
                    style={{ background: "rgba(31,111,95,0.07)" }}
                  >
                    <Icon size={16} strokeWidth={1.75} color="#1F6F5F" />
                  </div>
                  <div>
                    <div
                      className="text-[#0D1F1C] font-semibold text-[14.5px] leading-snug tracking-[-0.02em] mb-1.5"
                      style={{ fontFamily: "var(--font-clash)" }}
                    >
                      {tip.title}
                    </div>
                    <p
                      className="text-[12.5px] text-[rgba(13,31,28,0.52)] leading-[1.65]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {tip.body}
                    </p>
                  </div>
                  {tip.link && (
                    <Link
                      href={tip.link.href}
                      className="mt-auto flex items-center gap-1.5 text-[#1F6F5F] text-[12px] font-semibold group"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {tip.link.label}
                      <ArrowUpRight
                        size={13}
                        strokeWidth={2}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick checklist */}
          <div
            className="bg-[#0D1F1C] rounded-2xl p-6 flex flex-col"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(14px)",
              transition: "opacity 0.5s 0.24s ease, transform 0.5s 0.24s ease",
            }}
          >
            <div
              className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-[#6FCF97] mb-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Day-of Checklist
            </div>
            <div
              className="text-white font-bold text-[1.1rem] leading-snug tracking-[-0.02em] mb-5"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              Before letting anyone in
            </div>
            <div className="flex flex-col gap-3 flex-1">
              {quickChecks.map((check, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full border border-[rgba(111,207,151,0.25)] flex items-center justify-center shrink-0 text-[#6FCF97] text-[9px] font-bold"
                    style={{ background: "rgba(111,207,151,0.08)" }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-[12.5px] text-[rgba(255,255,255,0.52)] leading-[1.55]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {check}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.07)]">
              <Link
                href="/blog/homeowner-safety-guide"
                className="flex items-center gap-1.5 text-[#6FCF97] text-[12px] font-semibold group"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Full homeowner safety guide
                <ArrowUpRight
                  size={13}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}