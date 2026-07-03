"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── Component ────────────────────────────────────────────────────────────────

export function FoundingStory() {
  return (
    <section className="relative bg-[#F7F7F5] py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── LEFT — Stacked tilted images ── */}
          <div className="relative flex justify-center items-center" style={{ minHeight: "640px" }}>

            {/* Portrait — whiteboard planning scene (tallest, base layer) */}
            <div
              className="relative rounded-2xl overflow-hidden shadow-xl"
              style={{
                width: "340px",
                height: "500px",
                transform: "rotate(-3deg)",
                zIndex: 1,
              }}
            >
              <Image
                src="/images/about/founding-whiteboard-planning.png"
                alt="Furqan and co-founder planning TaskLync late at night on a whiteboard"
                fill
                className="object-cover object-center"
                sizes="340px"
              />
            </div>

            {/* Square overlay — person holding phone (top-left corner, just peeking) */}
            <div
              className="absolute rounded-xl overflow-hidden shadow-2xl border-[5px] border-white"
              style={{
                width: "200px",
                height: "200px",
                top: "30px",
                left: "30px",
                transform: "rotate(-4deg)",
                zIndex: 3,
              }}
            >
              <Image
                src="/images/about/founding-person-calling-professional.png"
                alt="Person struggling to find and call a home service professional in Pakistan"
                fill
                className="object-cover object-center"
                sizes="200px"
              />
            </div>

            {/* Square overlay — broken-down car on road (bottom-left corner, just peeking) */}
            <div
              className="absolute rounded-xl overflow-hidden shadow-2xl border-[5px] border-white"
              style={{
                width: "200px",
                height: "200px",
                bottom: "32px",
                left: "38px",
                transform: "rotate(3.5deg)",
                zIndex: 3,
              }}
            >
              <Image
                src="/images/about/founding-car-bonnet-open-road.avif"
                alt="Car bonnet open on a Pakistani road in summer heat — showing the problem"
                fill
                className="object-cover object-center"
                sizes="200px"
              />
            </div>

            {/* Soft decorative blob behind the cluster */}
            <div
              className="absolute rounded-full bg-[#4ECBA5] opacity-[0.07]"
              style={{
                width: "380px",
                height: "380px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 0,
                filter: "blur(48px)",
              }}
              aria-hidden
            />
          </div>

          {/* ── RIGHT — Copy ── */}
          <div>

            {/* Eyebrow */}
            <span
              className="inline-block mb-4 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.14em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Our Founding Story
            </span>

            {/* Heading */}
            <h2
              className="text-[#0D1F1C] font-bold leading-[1.1] tracking-[-0.025em]"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: "clamp(1.85rem, 3.6vw, 2.85rem)",
              }}
            >
              Everyone Knows Someone.{" "}
              <em className="not-italic text-[#4ECBA5]">Until They Don't.</em>
            </h2>

            {/* Subheading */}
            <p
              className="mt-4 font-semibold text-[rgba(13,31,28,0.45)] text-[0.83rem] tracking-[0.04em] uppercase"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Pakistan, 2026. A simple job. A longer search than it should have been.
            </p>


            {/* Story — first paragraph with pull-quote feel */}
            <p
              className="leading-[1.8] text-[rgba(13,31,28,0.52)] mb-4 mt-4"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.9rem",
                maxWidth: "460px",
              }}
            >
              Imagine 42°C on a Pakistani highway in July. Your car stops. Bonnet open,
              traffic crawling past. You reach for your phone to call a mechanic
              and suddenly realize the number you saved two years ago no longer connects.
              The backup?
            </p>

            <p
              className="leading-[1.8] text-[rgba(13,31,28,0.52)] mb-4"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.9rem",
                maxWidth: "460px",
              }}
            >
              Pakistan has no shortage of skilled people. Every neighbourhood has a car mechanic, 
              plumber, an electrician, a painter. Everyone has a contact saved from
              years ago. But when you actually
              need help when the AC stops working in July, when the kitchen needs
              fixing before a family gathering, that network suddenly feels thin.
            </p>


            <p
              className="leading-[1.8] text-[rgba(13,31,28,0.52)]"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.9rem",
                maxWidth: "460px",
              }}
            >
              Pakistan has always had the professionals. What it never had was a way
              to find them with confidence to know their name, their rating, their
              track record, before they ever walk through your door. That missing layer
              of trust is exactly what we set out to build.
            </p>

            {/* Learn more */}
            <div className="mt-8">
              <Link
                href="/blog/our-founding-story"
                className="inline-flex items-center gap-2 text-[#1F6F5F] text-sm font-semibold border-b border-[#1F6F5F] pb-0.5 hover:opacity-70 transition-opacity duration-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Learn more about our story <ArrowRight size={13} strokeWidth={2.5} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default FoundingStory;