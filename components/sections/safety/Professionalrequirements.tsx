"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

// ─── Content ──────────────────────────────────────────────────────────────────

const requirements = [
  {
    heading: "Identity",
    image: "/images/safety/tasklync-identity-card-under-lamp-verification.png",
    alt: "Identity card illuminated under a lamp representing TaskLync professional identity verification",
    href: "/blog/what-every-professional-must-provide",
  },
  {
    heading: "Licensing",
    image: "/images/safety/tasklync-trade-certificate-hanging-on-wall-licensing.png",
    alt: "Trade certificate hanging on a wall representing TaskLync professional licensing verification",
    href: "/blog/what-every-professional-must-provide",
  },
  {
    heading: "Insurance",
    image: "/images/safety/tasklync-5-star-insurance-reviews-stacked-cards.png",
    alt: "Stacked 5-star review cards representing TaskLync professional insurance and trust standards",
    href: "/blog/what-every-professional-must-provide",
  },
  {
    heading: "Verification",
    image: "/images/safety/tasklync-verification-checklist-on-paper-background-check.png",
    alt: "Checklist on paper representing TaskLync professional background verification process",
    href: "/blog/what-every-professional-must-provide",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SafetyDocumentation() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-[#F7F7F5] py-16 lg:py-24 overflow-hidden">

      {/* Section header — inside max-width */}
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16 mb-10">
        <span className="font-['Poppins'] inline-block mb-3 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.14em]">
          Documentation
        </span>
        <h2
          className="font-['Fredoka'] text-[#0D1F1C] font-bold leading-[1.1] tracking-[-0.025em]"
          style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.7rem)" }}
        >
          What every professional{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 60%,#6FCF97 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            must provide.
          </span>
        </h2>
      </div>

      {/* Scroll container — bleeds edge to edge but starts at max-width left padding */}
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">
        <div
          ref={scrollRef}
          className="sd-scroll flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
          }}
        >
          {/* Hide webkit scrollbar */}
          <style>{`
            .sd-scroll::-webkit-scrollbar { display: none; }
          `}</style>

          {requirements.map((item) => (
            <div
              key={item.heading}
              className="sd-card group flex-none"
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
                  src={item.image}
                  alt={item.alt}
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
                    className="font-['Fredoka'] text-white font-bold leading-[1.15] tracking-[-0.01em]"
                    style={{
                      fontSize: "clamp(1.3rem, 2vw, 1.65rem)",
                      textShadow: "0 1px 8px rgba(0,0,0,0.35)",
                    }}
                  >
                    {item.heading}
                  </h3>
                </div>

                {/* Learn More — bottom of image */}
                <div className="absolute bottom-5 left-5">
                  <Link
                    href={item.href}
                    className="font-['Poppins'] inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-semibold text-white border border-white/40 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors duration-200"
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
        <p className="font-['Poppins'] text-[rgba(13,31,28,0.35)] text-[11px] tracking-wide">
          Scroll to explore
        </p>
        <div className="flex gap-1.5">
          {requirements.map((_, i) => (
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