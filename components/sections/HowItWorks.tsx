"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// ─── Data ─────────────────────────────────────────────────────────────────────

const steps = [
  {
    num: "01",
    title: "Search & Select a Service",
    body: "Browse services or tap what you need. Our smart matching engine shows available, nearby verified professionals with transparent pricing.",
    image: "/images/home/search-and-select-home-service-tasklync.png",
    alt: "User searching and selecting a home service on TaskLync app in Pakistan",
  },
  {
    num: "02",
    title: "Book in Under 30 Seconds",
    body: "Pick a time slot, confirm your location, and book instantly. See the professional's profile, ratings, and estimated arrival before you confirm.",
    image: "/images/home/book-home-service-under-30-seconds-tasklync.png",
    alt: "Homeowner booking a verified professional in under 30 seconds on TaskLync",
  },
  {
    num: "03",
    title: "Job Done. Pay Securely.",
    body: "The professional arrives, completes the job, and you pay securely in-app or cash. Rate the experience. Dispute anything within 24 hours with full payment protection.",
    image: "/images/home/job-done-pay-securely-tasklync-home-services.png",
    alt: "Pakistani homeowner paying securely after job completion on TaskLync platform",
  },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function HowItWorks() {
  const [active, setActive] = useState(0);
  const [imgVisible, setImgVisible] = useState(true);
  const { ref, inView } = useIntersectionObserver({ threshold: 0.15 });

  const handleStepChange = (i: number) => {
    if (i === active) return;
    setImgVisible(false);
    setTimeout(() => {
      setActive(i);
      setImgVisible(true);
    }, 180);
  };

  const step = steps[active];

  return (
    <>
      <style>{`
        .hiw-img-wrap {
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
      `}</style>

      <section
        id="how-it-works"
        className="bg-[#F7F7F5] py-16 lg:py-28"
        ref={ref as React.RefObject<HTMLDivElement>}
      >
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16">

          {/* ── Header ── */}
          <div className="mb-10 lg:mb-14">
            <span
              className="inline-block mb-3 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.14em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              How It Works
            </span>
            <h2
              className="text-[#0D1F1C] leading-[1.06] tracking-[-0.025em] font-bold"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
              }}
            >
              Three steps to a{" "}
              <em className="not-italic text-[#4ECBA5]">fixed home.</em>
            </h2>
          </div>

          {/* ── Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-8 lg:gap-16 items-start">

            {/* LEFT — Steps */}
            <div className="flex flex-col divide-y divide-[rgba(31,111,95,0.1)]">
              {steps.map((s, i) => {
                const isActive = active === i;
                return (
                  <div
                    key={i}
                    className="relative flex gap-4 py-5 px-2 cursor-pointer"
                    onMouseEnter={() => handleStepChange(i)}
                    onClick={() => handleStepChange(i)}
                  >
                    {/* Active bar */}
                    <div
                      className="absolute left-0 top-5 bottom-5 w-[2.5px] rounded-r-full bg-[#4ECBA5]"
                      style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.2s ease" }}
                    />

                    {/* Number */}
                    <span
                      className="shrink-0 text-[13px] font-semibold mt-[2px]"
                      style={{
                        fontFamily: "'Poppins', sans-serif",
                        color: isActive ? "#1F6F5F" : "rgba(13,31,28,0.25)",
                        transition: "color 0.2s ease",
                      }}
                    >
                      {s.num}
                    </span>

                    {/* Text */}
                    <div>
                      <p
                        className="text-[1rem] font-semibold leading-snug mb-1"
                        style={{
                          fontFamily: "'Fredoka', sans-serif",
                          color: isActive ? "#0D1F1C" : "rgba(13,31,28,0.5)",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {s.title}
                      </p>
                      <p
                        className="text-[13px] leading-[1.65] text-[rgba(13,31,28,0.42)]"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        {s.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT — Image (desktop only) */}
            <div className="hidden lg:block sticky top-28">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ aspectRatio: "16/9" }}
              >
                <div
                  className="hiw-img-wrap absolute inset-0"
                  style={{
                    opacity: imgVisible ? 1 : 0,
                    transform: imgVisible ? "scale(1)" : "scale(1.015)",
                  }}
                >
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1440px) 55vw, 780px"
                    priority={active === 0}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}