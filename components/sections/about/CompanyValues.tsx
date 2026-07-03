"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

// ─── Content ──────────────────────────────────────────────────────────────────

const cards = [
  {
    image: "/images/about/value-verification-magnifying-glass.png",
    alt: "Close-up of a person reviewing a document through a magnifying glass — TaskLync verification process",
    heading: "Verified First",
    href: "/blog/our-values",
  },
  {
    image: "/images/about/value-tasklync-office-wall-docs.png",
    alt: "TaskLync team member reviewing documents on an office wall, back toward camera",
    heading: "Built Here",
    href: "/blog/our-values",
  },
  {
    image: "/images/about/value-seed-growing-soil.png",
    alt: "Seed growing from soil — representing professional growth and opportunity on TaskLync",
    heading: "Grow With Us",
    href: "/blog/our-values",
  },
  {
    image: "/images/about/value-worker-walking-street.png",
    alt: "TaskLync professional walking down a street, shot from behind — representing trust and reliability",
    heading: "Real Trust",
    href: "/blog/our-values",
  },
  {
    image: "/images/about/value-worker-badge-shirt.png",
    alt: "Close-up of a TaskLync worker badge on a shirt showing name and TaskLync branding",
    heading: "Your Name. Our Platform.",
    href: "/blog/our-values",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function ValueCards() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-[#F7F7F5] py-16 lg:py-24 overflow-hidden">

      {/* Section header — inside max-width */}
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16 mb-10">
        <span
          className="inline-block mb-3 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.14em]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          What We Stand For
        </span>
        <h2
          className="text-[#0D1F1C] font-bold leading-[1.1] tracking-[-0.025em]"
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: "clamp(1.85rem, 3.4vw, 2.7rem)",
          }}
        >
          The values behind{" "}
          <em className="not-italic text-[#4ECBA5]">everything we build.</em>
        </h2>
      </div>

      {/* Scroll container — bleeds edge to edge but starts at max-width left padding */}
      <div
        className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16"
      >
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            // Snap
            scrollSnapType: "x mandatory",
          }}
        >
          {/* Hide webkit scrollbar */}
          <style>{`
            .value-scroll::-webkit-scrollbar { display: none; }
          `}</style>

          {cards.map((card) => (
            <div
              key={card.heading}
              className="value-card group flex-none"
              style={{
                width: "calc((100%) / 3 - 14px)",
                minWidth: "260px",
                scrollSnapAlign: "start",
              }}
            >
              {/* Card */}
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ aspectRatio: "3/4" }}
              >
                {/* Image */}
                <Image
                  src={card.image}
                  alt={card.alt}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 80vw, 33vw"
                />

                {/* Dark gradient overlay — bottom heavy */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.72) 100%)",
                  }}
                />

                {/* Heading — on image, top-left */}
                <div className="absolute top-5 left-5 right-5">
                  <h3
                    className="text-white font-bold leading-[1.15] tracking-[-0.01em]"
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: "clamp(1.3rem, 2vw, 1.65rem)",
                      textShadow: "0 1px 8px rgba(0,0,0,0.35)",
                    }}
                  >
                    {card.heading}
                  </h3>
                </div>

                {/* Learn More — bottom of image */}
                <div className="absolute bottom-5 left-5">
                  <Link
                    href={card.href}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-semibold text-white border border-white/40 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors duration-200"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Learn more <ArrowRight size={11} strokeWidth={2.5} />
                  </Link>
                </div>

              </div>
            </div>
          ))}

          {/* Right padding spacer so last card doesn't hug the edge */}
          <div className="flex-none w-6 lg:w-10 shrink-0" />
        </div>
      </div>

      {/* Scroll hint dots */}
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16 mt-6 flex items-center gap-3">
        <p
          className="text-[rgba(13,31,28,0.35)] text-[11px] tracking-wide"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Scroll to explore
        </p>
        <div className="flex gap-1.5">
          {cards.map((c, i) => (
            <div
              key={i}
              className="rounded-full bg-[#1F6F5F]"
              style={{ width: i === 0 ? "18px" : "6px", height: "6px", opacity: i === 0 ? 1 : 0.2 }}
            />
          ))}
        </div>
      </div>

    </section>
  );
}

export default ValueCards;