"use client";

import {
  Fingerprint,
  ScanFace,
  FileCheck,
  ShieldPlus,
  ClipboardCheck,
  Activity,
} from "lucide-react";
import { useRouter } from "next/navigation";

const steps = [
  {
    num: "01",
    name: "Identity Verification",
    desc: "Government issued ID and facial match verification before approval.",
    Icon: Fingerprint,
  },
  {
    num: "02",
    name: "Background Check",
    desc: "Criminal background screening across relevant public databases.",
    Icon: ScanFace,
  },
  {
    num: "03",
    name: "License Verification",
    desc: "Trade licences checked directly with official authorities.",
    Icon: FileCheck,
  },
  {
    num: "04",
    name: "Insurance Validation",
    desc: "Coverage and policy status verified before activation.",
    Icon: ShieldPlus,
  },
  {
    num: "05",
    name: "Skills Assessment",
    desc: "Work quality, references, and certifications reviewed carefully.",
    Icon: ClipboardCheck,
  },
  {
    num: "06",
    name: "Ongoing Monitoring",
    desc: "Continuous review of ratings, disputes, and platform behaviour.",
    Icon: Activity,
  },
];

export default function VettingProcess() {
  const router = useRouter();

  return (
    <section className="bg-[#F7F7F5] py-18">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-4 font-['Poppins'] text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]">
            How We Vet
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2
              className="font-['Fredoka'] text-[#0D1F1C] font-bold leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)" }}
            >
              Six steps. Zero shortcuts.
            </h2>
            <p className="font-['Poppins'] text-[rgba(13,31,28,0.5)] text-[15px] leading-[1.65] max-w-xs">
              Every professional completes all six stages. There is no fast
              track. Incomplete applications are rejected automatically.
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
                className="bg-[#F7F7F5] p-6 flex flex-col min-h-62.5"
              >
                {/* Top */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-[rgba(31,111,95,0.15)]"
                    style={{ background: "rgba(31,111,95,0.07)" }}
                  >
                    <Icon size={18} strokeWidth={1.75} color="#1F6F5F" />
                  </div>
                  <span className="font-['Fredoka'] text-[11px] font-bold text-[rgba(13,31,28,0.2)] tracking-[0.08em]">
                    {step.num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-['Fredoka'] text-[#0D1F1C] font-semibold text-[15px] tracking-[-0.02em] leading-snug mb-3">
                  {step.name}
                </h3>

                {/* Description */}
                <p className="font-['Poppins'] text-[13px] text-[rgba(13,31,28,0.52)] leading-[1.7] mb-8">
                  {step.desc}
                </p>

                {/* Learn more */}
                <button
                  onClick={() => router.push("/blog/how-tasklync-vets-professionals")}
                  className="font-['Poppins'] cursor-pointer mt-auto h-11 w-full rounded-xl bg-[#1F6F5F] text-white text-[13px] font-medium hover:opacity-90"
                >
                  Learn more
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}