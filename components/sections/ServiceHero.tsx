"use client";

import Image from "next/image";
import Link from "next/link";
import { useWaitlist } from "../waitlist/WaitlistContext";

function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
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

export function ServicesHero() {
  const { openModal } = useWaitlist();

  return (
    <section
      aria-label="TaskLync Services"
      className="relative h-[60svh] sm:h-[100svh] min-h-[500px] w-full overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/images/services/clean-modern-home-interior-by-tasklync-services-pakistan.png"
        alt="Spotlessly clean and beautifully maintained home interior showcasing TaskLync professional home services in Pakistan"
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
          Professional Home Services
        </span>

        {/* Headline */}
        <h1 className="font-['Fredoka'] mb-4 font-bold leading-[1.06] tracking-[-0.01em] text-white text-[clamp(2rem,5.5vw,3.75rem)] max-w-[min(620px,92vw)] drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
          Your Home Deserves{" "}
          <em className="not-italic text-[#4ECBA5]">Nothing But Tasklync</em>
        </h1>

        {/* Description */}
        <p className="font-['Poppins'] mb-8 text-[clamp(0.85rem,1.35vw,1rem)] font-normal leading-[1.6] text-white/70 max-w-[min(420px,85vw)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
          From deep cleaning to repairs and beyond book verified local professionals who treat your home like their own.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 rounded-full bg-[#1F6F5F] px-6 py-[11px] font-['Poppins'] text-[0.875rem] font-semibold text-white border-none cursor-pointer hover:bg-[#18594c] hover:shadow-[0_4px_20px_rgba(31,111,95,0.55)]"
          >
            Book a Service
          </button>

          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-[6px] rounded-full border border-white/30 bg-white/10 px-6 py-[11px] font-['Poppins'] text-[0.875rem] font-medium text-white no-underline backdrop-blur-sm hover:border-white/55 hover:bg-white/20"
          >
            How It Works
            <ChevronRight />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default ServicesHero;