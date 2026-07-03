"use client";

import { ArrowRight, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useWaitlist } from "../waitlist/WaitlistContext";

const customerFeatures = [
  "Find verified local professionals quickly",
  "Review clear pricing before confirming",
  "Real time arrival & service tracking",
  "Dedicated support on every booking",
  "Secure in app messaging",
];

const proFeatures = [
  "Connect with customers in your area",
  "Reliable, streamlined payouts",
  "Build trust through verified reviews",
  "Manage your schedule & service zones",
  "Track growth with business analytics",
];

export function Features() {
  const { openModal } = useWaitlist();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const cardWidth = el.scrollWidth / 2;
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="bg-[#F7F7F5] py-16 px-6 sm:py-20 sm:px-6">

      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block font-['Poppins'] text-[11px] font-semibold tracking-[0.14em] uppercase text-[#1F6F5F] mb-3.5">
          What you get
        </span>
        <h2 className="font-['Fredoka'] text-[clamp(2rem,4vw,3rem)] font-bold text-[#0D1F1C] leading-[1.08] tracking-[-0.025em]">
          Built for{" "}
          <em className="not-italic text-[#4ECBA5]">both sides.</em>
        </h2>
      </div>

      {/* Cards */}
      <div
        ref={scrollRef}
        className="
          flex gap-5 max-w-[1100px] mx-auto
          max-[720px]:overflow-x-auto
          max-[720px]:snap-x
          max-[720px]:snap-mandatory
          max-[720px]:[-webkit-overflow-scrolling:touch]
          max-[720px]:px-6
          max-[720px]:pb-4
          max-[720px]:gap-4
          max-[720px]:[scrollbar-width:none]
          max-[720px]:[&::-webkit-scrollbar]:hidden
        "
      >
        {/* Card 1 — Customers */}
        <div
          className="
            flex-1 bg-white rounded-[20px] border border-black/[0.07]
            px-10 pt-10 pb-9 flex flex-col gap-0
            max-[720px]:min-w-[82vw] max-[720px]:snap-start
            max-[720px]:shrink-0 max-[720px]:px-6 max-[720px]:pt-7 max-[720px]:pb-7
          "
        >
          <p className="font-['Poppins'] text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1F6F5F] mb-3">
            For Customers
          </p>
          <h3 className="font-['Fredoka'] text-[clamp(1.7rem,2.4vw,2.2rem)] font-bold text-[#0D1F1C] leading-[1.1] tracking-[-0.02em] mb-8 max-[720px]:mb-6">
            Get it done right,<br />the first time.
          </h3>

          <div className="h-px bg-black/[0.07] mb-7" />

          <ul className="list-none p-0 m-0 mb-9 flex flex-col flex-1 max-[720px]:mb-7">
            {customerFeatures.map((f) => (
              <li
                key={f}
                className="
                  font-['Poppins'] text-sm font-medium text-[#0D1F1C]
                  py-3.5 border-b border-black/[0.06] last:border-b-0
                  flex items-center justify-between cursor-default
                "
              >
                {f}
                <span className="text-base text-black/[0.18]">›</span>
              </li>
            ))}
          </ul>

          <button
            onClick={openModal}
            className="
              inline-flex items-center gap-2
              font-['Poppins'] text-[13px] font-semibold text-white
              bg-[#1F6F5F] border-none rounded-full
              px-6 py-3.5 cursor-pointer w-fit
              transition-opacity duration-150 hover:opacity-80
            "
          >
            Book your first task <ArrowRight size={14} strokeWidth={2.5} />
          </button>
        </div>

        {/* Card 2 — Professionals */}
        <div
          className="
            flex-1 bg-white rounded-[20px] border border-black/[0.07]
            px-10 pt-10 pb-9 flex flex-col gap-0
            max-[720px]:min-w-[82vw] max-[720px]:snap-start
            max-[720px]:shrink-0 max-[720px]:px-6 max-[720px]:pt-7 max-[720px]:pb-7
          "
        >
          <p className="font-['Poppins'] text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1F6F5F] mb-3">
            For Professionals
          </p>
          <h3 className="font-['Fredoka'] text-[clamp(1.7rem,2.4vw,2.2rem)] font-bold text-[#0D1F1C] leading-[1.1] tracking-[-0.02em] mb-8 max-[720px]:mb-6">
            Grow a business<br />you're proud of.
          </h3>

          <div className="h-px bg-black/[0.07] mb-7" />

          <ul className="list-none p-0 m-0 mb-9 flex flex-col flex-1 max-[720px]:mb-7">
            {proFeatures.map((f) => (
              <li
                key={f}
                className="
                  font-['Poppins'] text-sm font-medium text-[#0D1F1C]
                  py-3.5 border-b border-black/[0.06] last:border-b-0
                  flex items-center justify-between cursor-default
                "
              >
                {f}
                <span className="text-base text-black/[0.18]">›</span>
              </li>
            ))}
          </ul>

          <button
            onClick={openModal}
            className="
              inline-flex items-center gap-2
              font-['Poppins'] text-[13px] font-semibold text-[#0D1F1C]
              bg-transparent border border-[rgba(13,31,28,0.2)] rounded-full
              px-6 py-3.5 cursor-pointer w-fit
              transition-[border-color,background] duration-150
              hover:border-[rgba(13,31,28,0.45)] hover:bg-[rgba(13,31,28,0.04)]
            "
          >
            Join as a professional
          </button>
        </div>
      </div>

      {/* Mobile scroll indicator dots */}
      <div className="flex justify-center gap-2 mt-5 sm:hidden">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => {
              const el = scrollRef.current;
              if (!el) return;
              const cardWidth = el.scrollWidth / 2;
              el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
            }}
            className={`
              h-1.5 rounded-full transition-all duration-300 cursor-pointer border-none
              ${activeIndex === i
                ? "w-6 bg-[#1F6F5F]"
                : "w-1.5 bg-[#0D1F1C]/20"
              }
            `}
            aria-label={`Go to card ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
}

export default Features;