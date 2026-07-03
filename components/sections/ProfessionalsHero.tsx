"use client";

import Image from "next/image";
import { useWaitlist } from "../waitlist/WaitlistContext";
import { useToast } from "@/components/ui/Toast";

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 12l-5 5-5-5M12 17V3M5 21h14" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function ProfessionalsHero() {
  const { openModal } = useWaitlist();
  const { show } = useToast();

  return (
    <section
      aria-label="TaskLync For Professionals"
      className="relative h-[60svh] sm:h-[100svh] min-h-[500px] w-full overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/images/professionals/tasklync-professional-standing-city-buildings-in-pakistan.png"
        alt="Confident TaskLync professional standing in front of city buildings in Pakistan, ready to serve homeowners"
        fill
        priority
        loading="eager"
        quality={80}
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Bottom vignette for text legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[1]" />

      {/* Top vignette — subtle */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent z-[1]" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-start justify-end px-6 sm:px-10 lg:px-16 pb-14 sm:pb-20">

        {/* Eyebrow */}
        <span className="font-['Poppins'] inline-block mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4ECBA5]">
          Join as a Professional
        </span>

        {/* Headline */}
        <h1 className="font-['Fredoka'] mb-4 font-bold leading-[1.06] tracking-[-0.01em] text-white text-[clamp(2rem,5.5vw,3.75rem)] max-w-[min(620px,92vw)] drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
          Your Skills Deserve{" "}
          <em className="not-italic text-[#4ECBA5]">A Bigger Stage</em>
        </h1>

        {/* Description */}
        <p className="font-['Poppins'] mb-8 text-[clamp(0.85rem,1.35vw,1rem)] font-normal leading-[1.6] text-white/70 max-w-[min(420px,85vw)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
          Join thousands of verified professionals earning more, working flexibly, and building their reputation across Pakistan with TaskLync.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Primary — Download App */}
          <a
            onClick={() =>
              show({
                message:
                  "TaskLync App isn't available yet, join the waitlist to get notified the moment we launch in your city.",
                variant: "success",
              })
            }
            className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-[#1F6F5F] px-6 py-[11px] font-['Poppins'] text-[0.875rem] font-semibold text-white transition-[background,box-shadow] duration-200 hover:bg-[#18594c] hover:shadow-[0_4px_20px_rgba(31,111,95,0.55)] active:scale-[0.97]"
          >
            <DownloadIcon />
            Download App
          </a>

          {/* Secondary — Join Waitlist */}
          <button
            onClick={openModal}
            className="inline-flex items-center gap-[6px] rounded-full border border-white/30 bg-white/10 px-6 py-[11px] font-['Poppins'] text-[0.875rem] font-medium text-white backdrop-blur-sm cursor-pointer transition-[background,border-color] duration-200 hover:border-white/55 hover:bg-white/20 active:scale-[0.97]"
          >
            Join as a Pro
            <ChevronRight />
          </button>
        </div>

      </div>
    </section>
  );
}

export default ProfessionalsHero;