"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { BadgeCheck, AlertCircle, Eye } from "lucide-react";

const requirements = [
  {
    category: "Identity",
    items: [
      { label: "Government-issued photo ID", status: "verified", note: "Passport, driving licence, or national ID card" },
      { label: "Proof of address (dated within 90 days)", status: "verified", note: "Utility bill, bank statement, or council document" },
      { label: "Selfie match against ID photo", status: "verified", note: "Biometric liveness check performed at onboarding" },
    ],
  },
  {
    category: "Insurance",
    items: [
      { label: "Public liability insurance certificate", status: "required", note: "Minimum £1M per incident, active at time of each job" },
      { label: "Employers' liability (where applicable)", status: "required", note: "Required for professionals with subcontractors" },
      { label: "Annual policy renewal confirmation", status: "reviewed", note: "We check expiry dates and send renewal reminders" },
    ],
  },
  {
    category: "Licensing",
    items: [
      { label: "Trade-specific licence or certification", status: "verified", note: "Gas Safe, NICEIC, CSCS, and equivalents by trade" },
      { label: "Business registration (if operating as Ltd)", status: "required", note: "Companies House or equivalent authority confirmation" },
      { label: "VAT registration number (if applicable)", status: "reviewed", note: "Cross-referenced with HMRC public database" },
    ],
  },
  {
    category: "References",
    items: [
      { label: "Two professional references", status: "required", note: "Contacted directly by our onboarding team" },
      { label: "Work portfolio or photo evidence", status: "reviewed", note: "Reviewed for quality and authenticity" },
      { label: "Prior platform history (if applicable)", status: "reviewed", note: "Previous ratings on Checkatrade, MyBuilder, etc." },
    ],
  },
];

const statusConfig = {
  verified: { label: "Verified", color: "#1F6F5F", bg: "rgba(31,111,95,0.08)", Icon: BadgeCheck },
  required: { label: "Required", color: "#B45309", bg: "rgba(180,83,9,0.07)", Icon: AlertCircle },
  reviewed: { label: "Reviewed", color: "#1D4ED8", bg: "rgba(29,78,216,0.07)", Icon: Eye },
};

export default function ProfessionalRequirements() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref as React.RefObject<HTMLDivElement>}
      className="bg-[#F7F7F5] py-18 px-6 sm:px-10 lg:px-16"
    >
      <div className="max-w-290 mx-auto">

        {/* Header */}
        <div
          className="mb-10"
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
            Documentation
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2
              className="text-[#0D1F1C] font-bold leading-[1.05] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
              }}
            >
              What every professional<br className="hidden lg:block" /> must provide.
            </h2>
            <p
              className="text-[rgba(13,31,28,0.5)] text-[13.5px] leading-[1.65] max-w-xs"
              style={{ fontFamily: "var(--font-body)" }}
            >
              These are minimum requirements. Professionals missing any item are
              suspended until resolved.
            </p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 mt-6">
            {Object.entries(statusConfig).map(([key, val]) => {
              const Icon = val.Icon;
              return (
                <div key={key} className="flex items-center gap-1.5">
                  <Icon size={12} color={val.color} strokeWidth={2} />
                  <span
                    className="text-[11.5px] text-[rgba(13,31,28,0.5)]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {val.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Requirements grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requirements.map((group, gi) => (
            <div
              key={gi}
              className="border border-[rgba(13,31,28,0.08)] rounded-2xl overflow-hidden"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 0.5s ${gi * 0.06}s ease, transform 0.5s ${gi * 0.06}s ease`,
              }}
            >
              {/* Category header */}
              <div
                className="px-5 py-3.5 border-b border-[rgba(13,31,28,0.07)] bg-[#F7F7F5]"
              >
                <span
                  className="text-[11px] font-semibold tracking-widest uppercase text-[rgba(13,31,28,0.45)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {group.category}
                </span>
              </div>

              {/* Items */}
              <div className="divide-y divide-[rgba(13,31,28,0.05)]">
                {group.items.map((item, ii) => {
                  const status = statusConfig[item.status as keyof typeof statusConfig];
                  const StatusIcon = status.Icon;
                  return (
                    <div key={ii} className="px-5 py-4 flex items-start gap-3">
                      <div
                        className="mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: status.bg }}
                      >
                        <StatusIcon size={13} color={status.color} strokeWidth={2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[13.5px] font-semibold text-[#0D1F1C] leading-snug mb-0.5"
                          style={{ fontFamily: "var(--font-clash)" }}
                        >
                          {item.label}
                        </div>
                        <div
                          className="text-[12px] text-[rgba(13,31,28,0.42)] leading-normal"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {item.note}
                        </div>
                      </div>
                      <span
                        className="shrink-0 text-[10.5px] font-semibold px-2 py-0.5 rounded-full"
                        style={{
                          background: status.bg,
                          color: status.color,
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {status.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}