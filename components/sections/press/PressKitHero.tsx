"use client";
import Image from "next/image";
import Link from "next/link";

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
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

export function PressKitHero() {
  return (
    <section
      aria-label="TaskLync Press Kit"
      className="relative h-[60svh] sm:h-[100svh] min-h-[500px] w-full overflow-hidden"
    >
      {/* Background image */}
      <Image
        src="/images/press/tasklync-microphone-press-kit.png"
        alt="Microphone in the foreground with a speaker in the background, representing TaskLync's media presence"
        fill
        priority
        loading="eager"
        quality={80}
        className="object-cover object-center"
        sizes="100vw"
      />
      {/* Bottom vignette */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-[1]" />
      {/* Top vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent z-[1]" />
      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-start justify-end px-6 sm:px-10 lg:px-16 pb-14 sm:pb-20">
        {/* Eyebrow */}
        <span className="font-['Poppins'] inline-block mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4ECBA5]">
          Press & Media
        </span>
        {/* Headline */}
        <h1 className="font-['Fredoka'] mb-4 font-bold leading-[1.06] tracking-[-0.01em] text-white text-[clamp(2rem,5.5vw,3.75rem)] max-w-[min(620px,92vw)] drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
          The TaskLync Story,{" "}
          <em className="not-italic text-[#4ECBA5]">Ready to Tell</em>
        </h1>
        {/* Subheading */}
        <p className="font-['Poppins'] mb-8 text-[clamp(0.85rem,1.35vw,1rem)] font-normal leading-[1.6] text-white/70 max-w-[min(420px,85vw)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
          Logos, brand assets, founder bios, and the facts behind Pakistan's fastest growing home services platform, everything you need to cover TaskLync.
        </p>
        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Primary — Download Press Kit */}
          <Link
            href="#download-kit"
            className="inline-flex items-center gap-2 rounded-full bg-[#1F6F5F] px-6 py-[11px] font-['Poppins'] text-[0.875rem] font-semibold text-white transition-[background,box-shadow] duration-200 hover:bg-[#18594c] hover:shadow-[0_4px_20px_rgba(31,111,95,0.55)] active:scale-[0.97]"
          >
            <DownloadIcon />
            Download Press Kit
          </Link>
          {/* Secondary — Media Enquiries */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-[6px] rounded-full border border-white/30 bg-white/10 px-6 py-[11px] font-['Poppins'] text-[0.875rem] font-medium text-white backdrop-blur-sm transition-[background,border-color] duration-200 hover:border-white/55 hover:bg-white/20 active:scale-[0.97]"
          >
            Media Enquiries
            <ChevronRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PressKitHero;