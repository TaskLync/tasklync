import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    title: "Apply",
    description:
      "Sign up as a professional and submit your basic profile and service categories.",
  },
  {
    title: "Get Verified",
    description:
      "Complete identity and skill verification to earn your trusted TaskLync badge.",
  },
  {
    title: "Accept Jobs",
    description:
      "Receive job requests matched to your location, skills, and availability in real time.",
  },
  {
    title: "Get Paid",
    description:
      "Receive secure payments within 24 hours after job completion, directly to your account.",
  },
];

export default function ProSteps() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "#F7F7F5",
        paddingTop: "16px",
        paddingBottom: "16px",
      }}
    >
      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(31,111,95,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(31,111,95,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-290 px-6 sm:px-10 lg:px-16">

        {/* HEADER */}
        <div className="text-center mb-14">
          <div
            className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{
              fontFamily: "var(--font-body)",
              color: "#1F6F5F",
            }}
          >
            How It Works for Professionals
          </div>

          <h2
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              color: "#0D1F1C",
            }}
          >
            Start earning in 4 simple steps
          </h2>
        </div>

        {/* STEPS WRAPPER */}
        <div className="relative">

          {/* connector line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-[rgba(31,111,95,0.12)]" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-1 md:gap-1">

            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative flex flex-col items-start md:items-center text-left md:text-center"
              >
                {/* step circle */}
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-[14px] mb-5 border"
                  style={{
                    background: "#EFEFED",
                    borderColor: "rgba(31,111,95,0.15)",
                  }}
                >
                  <CheckCircle2 size={18} color="#1F6F5F" />
                </div>

                {/* step number line dot (desktop connector point) */}
                <div className="hidden md:block absolute top-10 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1F6F5F]" />

                {/* title */}
                <h3
                  style={{
                    fontFamily: "var(--font-clash)",
                    fontSize: "17px",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "#0D1F1C",
                    marginBottom: "8px",
                  }}
                >
                  {step.title}
                </h3>

                {/* description */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "13.5px",
                    lineHeight: 1.65,
                    color: "rgba(13,31,28,0.55)",
                    maxWidth: "240px",
                  }}
                >
                  {step.description}
                </p>

                {/* mobile connector line */}
                {index !== steps.length - 1 && (
                  <div className="md:hidden w-px h-10 bg-[rgba(31,111,95,0.12)] mt-6 ml-5" />
                )}
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}