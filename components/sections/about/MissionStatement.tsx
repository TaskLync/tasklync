"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── Component ────────────────────────────────────────────────────────────────

export function MissionStatement() {
  return (
    <section
      id="mission"
      className="bg-[#F7F7F5] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">

        {/* Landscape card */}
        <div
          className="bg-white rounded-[20px] overflow-hidden flex flex-col lg:flex-row"
          style={{
            boxShadow: "0 2px 24px rgba(13,31,28,0.07)",
          }}
        >

          {/* ── LEFT: Copy ── */}
          <div className="flex flex-col justify-center px-8 py-12 lg:px-14 lg:py-16 flex-1">

            {/* Eyebrow */}
            <span
              className="inline-block mb-4 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.14em]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Our Mission
            </span>

            {/* Heading */}
            <h2
              className="text-[#0D1F1C] font-bold leading-[1.1] tracking-[-0.025em] mb-4"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: "clamp(1.75rem, 3vw, 2.55rem)",
              }}
            >
              We&rsquo;re building the{" "}
              <em className="not-italic text-[#4ECBA5]">
                infrastructure of trust.
              </em>
            </h2>

            {/* Subheading — Poppins body style, same as FoundingStory paragraphs */}
            <p
              className="leading-[1.8] text-[rgba(13,31,28,0.52)] mb-4"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.9rem",
                maxWidth: "460px",
              }}
            >
              Home services run on a trillion dollar handshake and for too
              long, that handshake has been a gamble. Homeowners cross their
              fingers. Skilled professionals get buried next to unverified
              strangers with nothing but a phone number.
            </p>
            <p
              className="leading-[1.8] text-[rgba(13,31,28,0.52)] mb-8"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "0.9rem",
                maxWidth: "460px",
              }}
            >
              We believe reliability shouldn&rsquo;t be luck. Quality
              shouldn&rsquo;t be invisible. And trust shouldn&rsquo;t be rebuilt
              from scratch every single time. So we built a system that makes it
              structural, not accidental.
            </p>

            {/* CTA */}
            <div>
              <Link
                href="/blog/our-mission"
                className="inline-flex items-center gap-2 text-[#1F6F5F] text-sm font-semibold border-b border-[#1F6F5F] pb-0.5 hover:opacity-70 transition-opacity duration-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Learn more <ArrowRight size={13} strokeWidth={2.5} />
              </Link>
            </div>

          </div>

          {/* ── RIGHT: Image ── */}
          <div className="relative w-full lg:w-[45%] self-stretch min-h-[420px] flex-shrink-0">
            <Image
              src="/images/about/mission-person-phone.png"
              alt="Person relaxed, using phone — representing the ease TaskLync brings to hiring trusted professionals"
              fill
              className="object-cover object-center pt-10"
              sizes="(max-width: 1024px) 100vw, 45vw"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default MissionStatement;