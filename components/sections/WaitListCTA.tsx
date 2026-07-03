"use client";

import { ArrowRight } from "lucide-react";
import { useWaitlist } from "../waitlist/WaitlistContext";

const perks = [
  "Priority access before public launch",
  "Founder pricing locked in forever",
  "Early city launch notification",
  "Shape the product with direct feedback",
];

export default function WaitlistCTA() {
  const { openModal } = useWaitlist();

  return (
    <>

      <section
        id="waitlist"
        className="relative overflow-hidden bg-[#F7F7F5] py-16 lg:py-24"
      >
        {/* Dot texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(13,31,28,0.055) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* ── LEFT ──────────────────────────────────────────────────── */}
          <div>

            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 mb-5 font-['Poppins'] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1F6F5F]"
            >
              Early Access
            </div>

            {/* Title */}
            <h2
              className="font-['Fredoka'] font-bold text-[#0D1F1C] leading-[1.05] tracking-[-0.025em] mb-4"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              }}
            >
              Get in before<br />
              <span
                style={{
                  backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 60%,#6FCF97 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                everyone else does.
              </span>
            </h2>

            {/* Subtitle */}
            <p
              className="font-['Poppins'] text-[15px] leading-[1.75] mb-10 max-w-sm"
              style={{
                color: "rgba(13,31,28,0.48)",
              }}
            >
              We&apos;re launching city by city. Join the waitlist now and be the
              first to book or earn when TaskLync goes live near you.
            </p>

            {/* Perks */}
            <div className="flex flex-col gap-3.5">
              {perks.map((p) => (
                <div key={p} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full shrink-0 bg-[#2FA084]" />
                  <span className="font-['Poppins'] text-[13.5px] font-medium text-[rgba(13,31,28,0.55)]">
                    {p}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-10 lg:hidden">
              <button
                onClick={openModal}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-white font-['Poppins'] text-[14px] font-semibold cursor-pointer transition-opacity duration-200 hover:opacity-85 border-none"
                style={{
                  background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                  boxShadow: "0 0 28px rgba(47,160,132,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                Join the Waitlist <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* ── RIGHT — light minimalist card (desktop only) ───────────── */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-[20px] border border-black/[0.07] px-10 pt-10 pb-9 flex flex-col">

              {/* Pill */}
              <span className="inline-block font-['Poppins'] text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1F6F5F] mb-4">
                Rolling Out Soon
              </span>

              {/* Card title */}
              <h3
                className="font-['Fredoka'] font-bold text-[#0D1F1C] leading-[1.1] tracking-[-0.02em] mb-3"
                style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)" }}
              >
                Join the waitlist.
              </h3>

              {/* Card body */}
              <p className="font-['Poppins'] text-[13.5px] leading-[1.72] text-[rgba(13,31,28,0.48)] mb-8">
                Are you a homeowner looking to book trusted pros, or a
                professional ready to grow your income? We&apos;ll onboard you first.
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-black/[0.07] mb-7" />

              {/* Button */}
              <button
                onClick={openModal}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full border-none font-['Poppins'] text-[14px] font-semibold text-white cursor-pointer transition-opacity duration-200 hover:opacity-85"
                style={{
                  background: "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
                  boxShadow: "0 0 28px rgba(47,160,132,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
              >
                Join the Waitlist <ArrowRight size={14} strokeWidth={2} />
              </button>

              {/* Note */}
              <p className="mt-5 text-center font-['Poppins'] text-[11px] text-[rgba(13,31,28,0.3)]">
                Join before public release and get priority access in your city.
              </p>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}