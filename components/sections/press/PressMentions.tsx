"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// ─── Content ──────────────────────────────────────────────────────────────────

const mentions = [
  {
    image: "/images/press/press-trust-first-platform.jpg",
    alt: "TaskLync trust first platform for home services in Pakistan",
    heading: "Why TaskLync is building a trust first platform",
    type: "Company Update",
    date: "May 2026",
    href: "/blog/what-is-tasklync",
  },
  {
    image: "/images/press/press-founder-story.png",
    alt: "The founder story behind TaskLync",
    heading: "The problem that led to the creation of TaskLync",
    type: "Story",
    date: "March 2026",
    href: "/our-founding-story",
  },
  {
    image: "/images/press/press-verification-systems.jpg",
    alt: "Inside TaskLync's verification systems",
    heading: "Inside the verification systems built for trust",
    type: "Product",
    date: "March 2026",
    href: "/blog/how-tasklync-vets-professionals",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function PressMentions() {
  return (
    <section className="bg-[#F7F7F5] py-16 lg:py-24 border-b border-[rgba(31,111,95,0.1)]">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <span
          className="inline-block mb-3 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.14em]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Coverage
        </span>

        <h2
          className="text-[#0D1F1C] font-bold leading-[1.1] tracking-[-0.025em] mb-5"
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: "clamp(1.85rem, 3.4vw, 2.7rem)",
          }}
        >
          Press and announcements
        </h2>

        <p
          className="text-[rgba(13,31,28,0.52)] leading-[1.8] mb-12 max-w-[460px]"
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}
        >
          TaskLync is currently in its early stage. This section includes
          company updates, founder stories, platform announcements, and
          future media coverage.
        </p>

        {/* Cards — 3 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mentions.map((m) => (
            <div key={m.heading} className="group">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{ aspectRatio: "3/4" }}
              >
                {/* Image */}
                <Image
                  src={m.image}
                  alt={m.alt}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 90vw, 33vw"
                />

                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.18) 45%, rgba(0,0,0,0.74) 100%)",
                  }}
                />

                {/* Tag — top-left */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between">
                  <span
                    className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-sm border border-white/30 px-2.5 py-1 text-[10.5px] uppercase tracking-[0.08em] font-semibold text-white"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {m.type}
                  </span>
                  <span
                    className="text-white/70 text-[11px]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {m.date}
                  </span>
                </div>

                {/* Heading + Learn more — bottom */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h3
                    className="text-white font-bold leading-[1.2] tracking-[-0.01em] mb-4"
                    style={{
                      fontFamily: "'Fredoka', sans-serif",
                      fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)",
                      textShadow: "0 1px 8px rgba(0,0,0,0.35)",
                    }}
                  >
                    {m.heading}
                  </h3>

                  <Link
                    href={m.href}
                    className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[12.5px] font-semibold text-white border border-white/40 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-colors duration-200"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Learn more <ArrowRight size={11} strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 bg-white border border-[rgba(31,111,95,0.12)] rounded-2xl p-6">
          <p
            className="text-[rgba(13,31,28,0.58)] leading-[1.75]"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13.5px" }}
          >
            Are you a journalist, publication, podcast, or creator interested
            in covering TaskLync? Reach out at{" "}
            <a
              href="mailto:press@tasklync.pk"
              className="text-[#1F6F5F] underline underline-offset-2"
            >
              press@tasklync.pk
            </a>{" "}
            for interviews, company information, founder commentary, or media
            assets.
          </p>
        </div>
      </div>
    </section>
  );
}

export default PressMentions;