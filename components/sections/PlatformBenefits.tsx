// components/sections/WhatWeHandle.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

// ─── Content ──────────────────────────────────────────────────────────────────

const items = [
  {
    image: "/images/professionals/tasklync-professional-scheduling-smart-booking-system-pakistan.png",
    alt: "TaskLync smart scheduling system matching professional availability with customer bookings in Pakistan",
    heading: "Scheduling",
    href: "/blog/what-tasklync-handles-for-professionals",
  },
  {
    image: "/images/professionals/tasklync-professional-secure-fast-payment-payout-pakistan.png",
    alt: "TaskLync secure payment payout processed within 24 hours for professionals in Pakistan",
    heading: "Payments",
    href: "/blog/what-tasklync-handles-for-professionals",
  },
   {
    image: "/images/professionals/tasklync-professional-customer-communication-in-app-messaging-pakistan.png",
    alt: "TaskLync in-app customer communication and messaging for professionals with privacy protection in Pakistan",
    heading: "In App Chat",
    href: "/blog/what-tasklync-handles-for-professionals",
  },
  {
    image: "/images/professionals/tasklync-professional-insurance-identity-safety-validation-pakistan.png",
    alt: "TaskLync professional identity and insurance validation badge for verified home service providers in Pakistan",
    heading: "Insurance Check",
    href: "/blog/what-tasklync-handles-for-professionals",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhatWeHandle() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-[#F7F7F5] py-16 lg:py-24 overflow-hidden">

      {/* Section header — inside max-width */}
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16 mb-10">
        <span
          className="font-['Poppins'] inline-block mb-3 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.14em]"
        >
          Platform Benefits
        </span>
        <h2
          className="font-['Fredoka'] text-[#0D1F1C] font-bold leading-[1.1] tracking-[-0.025em]"
          style={{ fontSize: "clamp(1.85rem, 3.4vw, 2.7rem)" }}
        >
          What we handle{" "}
          <span
            style={{
              backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 60%,#6FCF97 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            for you.
          </span>
        </h2>
      </div>

      {/* Scroll container — bleeds edge to edge but starts at max-width left padding */}
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">
        <div
          ref={scrollRef}
          className="whw-scroll flex gap-5 overflow-x-auto pb-4 scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            scrollSnapType: "x mandatory",
          }}
        >
          {/* Hide webkit scrollbar */}
          <style>{`
            .whw-scroll::-webkit-scrollbar { display: none; }
          `}</style>

          {items.map((item) => (
            <div
              key={item.heading}
              className="whw-card group flex-none"
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
          {items.map((_, i) => (
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