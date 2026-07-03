// components/sections/ProSteps.tsx
"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Apply",
    description:
      "Sign up as a professional and submit your basic profile and service categories.",
    image: "/images/professionals/tasklync-professional-applying-online-registration-pakistan.png",
    alt: "TaskLync professional completing online registration and profile setup in Pakistan",
    stat: "Takes 5 minutes",
  },
  {
    step: "02",
    title: "Get Verified",
    description:
      "Complete identity and skill verification to earn your trusted TaskLync badge.",
    image: "/images/professionals/tasklync-professional-identity-skill-verification-badge-pakistan.png",
    alt: "TaskLync professional receiving verified badge after identity and skill check in Pakistan",
    stat: "Badge in 24 hrs",
  },
  {
    step: "03",
    title: "Accept Jobs",
    description:
      "Receive job requests matched to your location, skills, and availability in real time.",
    image: "/images/professionals/tasklync-professional-accepting-job-request-on-app-pakistan.png",
    alt: "TaskLync professional viewing and accepting a matched job request on the app in Pakistan",
    stat: "Real time dispatch",
  },
  {
    step: "04",
    title: "Get Paid",
    description:
      "Receive secure payments within 24 hours after job completion, directly to your account.",
    image: "/images/professionals/tasklync-professional-receiving-secure-payment-after-job-pakistan.png",
    alt: "TaskLync professional receiving secure payment to bank account after completing a home service job in Pakistan",
    stat: "Paid within 24 hrs",
  },
];

export default function ProSteps() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.scrollWidth / steps.length;
      const index = Math.min(steps.length - 1, Math.round(el.scrollLeft / cardWidth));
      setActiveIndex(index);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#F7F7F5] py-10 lg:py-14">

      {/* Subtle grid bg */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(31,111,95,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(31,111,95,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-14">
          <span className="font-['Poppins'] inline-block mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1F6F5F]">
            How It Works for Professionals
          </span>
          <h2
            className="font-['Fredoka'] font-bold text-[#0D1F1C] leading-[1.05] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)" }}
          >
            Start earning in
            <br />
            <span
              style={{
                backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 60%,#6FCF97 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              4 simple steps.
            </span>
          </h2>
          <p className="font-['Poppins'] mt-4 text-[15px] leading-[1.72] text-[rgba(13,31,28,0.48)]">
            Getting started is fast. From sign up to your first paid job, we guide you every step of the way.
          </p>
        </div>

        {/* Cards — desktop */}
        <div className="hidden md:grid md:grid-cols-4 gap-5">
          {steps.map((s) => <StepCard key={s.step} s={s} />)}
        </div>

        {/* Cards — mobile scroll */}
        <div
          ref={scrollRef}
          className="
            md:hidden flex gap-4
            overflow-x-auto snap-x snap-mandatory
            [-webkit-overflow-scrolling:touch]
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            -mx-6 pb-2
          "
        >
          <div className="shrink-0 w-6" />
          {steps.map((s) => (
            <div key={s.step} className="min-w-[72vw] max-w-[72vw] snap-start shrink-0">
              <StepCard s={s} />
            </div>
          ))}
          <div className="shrink-0 w-6" />
        </div>

        {/* Mobile dots */}
        <div className="flex md:hidden justify-center gap-1.5 mt-5">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const cardWidth = el.scrollWidth / steps.length;
                el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
              }}
              className={`h-1.5 rounded-full border-none cursor-pointer transition-all duration-300 ${
                activeIndex === i ? "w-6 bg-[#1F6F5F]" : "w-1.5 bg-[#0D1F1C]/20"
              }`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

        {/* Learn more */}
        <div className="flex justify-center mt-10">
          <Link
            href="/blog/how-tasklync-works-for-professionals"
            className="inline-flex items-center gap-2 font-['Poppins'] text-[13.5px] font-semibold text-[#1F6F5F] no-underline group"
          >
            Learn more about how it works
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200 group-hover:bg-[#1F6F5F] group-hover:text-white"
              style={{ background: "rgba(31,111,95,0.1)", color: "#1F6F5F" }}
            >
              <ArrowRight size={13} strokeWidth={2.5} />
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}

function StepCard({ s }: { s: typeof steps[0] }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[20px] border border-black/[0.07] bg-white">

      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={s.image}
          alt={s.alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {/* overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(13,31,28,0.55), rgba(13,31,28,0.06))" }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">

        {/* Stat */}
        <span className="font-['Poppins'] inline-block mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1F6F5F]">
          {s.stat}
        </span>

        {/* Title */}
        <h3 className="font-['Fredoka'] text-[19px] font-bold tracking-[-0.02em] text-[#0D1F1C] leading-none mb-2">
          {s.title}
        </h3>

        {/* Description */}
        <p className="font-['Poppins'] text-[13px] leading-[1.7] text-[rgba(13,31,28,0.52)]">
          {s.description}
        </p>

      </div>
    </div>
  );
}