"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  Fingerprint,
  ScanFace,
  FileCheck,
  ShieldPlus,
  ClipboardCheck,
  Activity,
} from "lucide-react";

const steps = [
  {
    num: "01",
    name: "Identity Verification",
    what: "Government-issued photo ID cross-referenced against national identity databases.",
    who: "Automated via our KYC partner (Onfido), reviewed by our Trust team on any flag.",
    pass: "ID matches, face matches, no fraud signals.",
    fail: "Mismatched documents, altered IDs, or prior fraudulent accounts.",
    Icon: Fingerprint,
  },
  {
    num: "02",
    name: "Background Check",
    what: "Criminal record search covering the past 7 years across county, state, and federal databases.",
    who: "Conducted by a licensed CRA (Consumer Reporting Agency) in compliance with FCRA.",
    pass: "No disqualifying convictions. Minor, non-violent offences reviewed case-by-case.",
    fail: "Violent offences, theft, fraud, sexual misconduct, or active warrants.",
    Icon: ScanFace,
  },
  {
    num: "03",
    name: "License Verification",
    what: "Trade-specific licensing checked against official state or national licensing boards.",
    who: "Our compliance team verifies directly with issuing authorities.",
    pass: "Active, in-good-standing licence for the service category applied for.",
    fail: "Expired, revoked, or non-existent licences.",
    Icon: FileCheck,
  },
  {
    num: "04",
    name: "Insurance Validation",
    what: "Proof of public liability insurance with a minimum coverage of £1M per incident.",
    who: "Documents reviewed by our insurance verification partner. Policy status checked at renewal.",
    pass: "Active policy, adequate coverage, TaskLync listed as additional insured.",
    fail: "Lapsed coverage, insufficient limits, or fraudulent certificates.",
    Icon: ShieldPlus,
  },
  {
    num: "05",
    name: "Skills Assessment",
    what: "Practical review of work quality, relevant certifications, and customer references.",
    who: "Our onboarding team conducts structured reference calls and reviews portfolio submissions.",
    pass: "Verified references, demonstrable expertise, consistent quality across work samples.",
    fail: "Unverifiable references, repeated customer complaints, or unproven competency.",
    Icon: ClipboardCheck,
  },
  {
    num: "06",
    name: "Ongoing Monitoring",
    what: "Continuous performance tracking via job ratings, response time, and dispute history after onboarding.",
    who: "Automated scoring system with human review triggered at threshold breaches.",
    pass: "Rating above 4.3 average, dispute rate under 2%, response SLA met.",
    fail: "Sustained low ratings, repeat disputes, or any new criminal record match.",
    Icon: Activity,
  },
];

export default function VettingProcess() {
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
            How We Vet
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2
              className="text-[#0D1F1C] font-bold leading-[1.05] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
              }}
            >
              Six steps. Zero shortcuts.
            </h2>
            <p
              className="text-[rgba(13,31,28,0.5)] text-[13.5px] leading-[1.65] max-w-xs"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Every professional completes all six stages. There is no fast track.
              Incomplete applications are rejected automatically.
            </p>
          </div>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(31,111,95,0.1)] rounded-2xl overflow-hidden border border-[rgba(31,111,95,0.1)]">
          {steps.map((step, i) => {
            const Icon = step.Icon;
            return (
              <div
                key={i}
                className="bg-[#F7F7F5] p-6 flex flex-col gap-4"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(14px)",
                  transition: `opacity 0.5s ${0.05 * i}s ease, transform 0.5s ${0.05 * i}s ease`,
                }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-[rgba(31,111,95,0.15)]"
                    style={{ background: "rgba(31,111,95,0.07)" }}
                  >
                    <Icon size={18} strokeWidth={1.75} color="#1F6F5F" />
                  </div>
                  <span
                    className="text-[11px] font-bold text-[rgba(13,31,28,0.2)] tracking-[0.08em]"
                    style={{ fontFamily: "var(--font-clash)" }}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Name */}
                <div
                  className="text-[#0D1F1C] font-semibold text-[15px] tracking-[-0.02em] leading-snug"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  {step.name}
                </div>

                {/* What */}
                <p
                  className="text-[13px] text-[rgba(13,31,28,0.52)] leading-[1.65]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {step.what}
                </p>

                <div className="h-px bg-[rgba(31,111,95,0.08)]" />

                {/* Pass / Fail */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-[rgba(31,111,95,0.12)] flex items-center justify-center shrink-0">
                      <span className="text-[#1F6F5F] text-[9px] font-bold">✓</span>
                    </span>
                    <span
                      className="text-[12px] text-[rgba(13,31,28,0.55)] leading-[1.6]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {step.pass}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 w-4 h-4 rounded-full bg-[rgba(220,50,50,0.08)] flex items-center justify-center shrink-0">
                      <span className="text-[#C0392B] text-[9px] font-bold">✕</span>
                    </span>
                    <span
                      className="text-[12px] text-[rgba(13,31,28,0.55)] leading-[1.6]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {step.fail}
                    </span>
                  </div>
                </div>

                {/* Who conducts */}
                <div
                  className="mt-auto pt-3 border-t border-[rgba(31,111,95,0.07)] text-[11px] text-[rgba(13,31,28,0.35)]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  <span className="font-semibold text-[rgba(13,31,28,0.5)]">Conducted by: </span>
                  {step.who}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}