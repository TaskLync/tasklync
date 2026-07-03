"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useWaitlist } from "../waitlist/WaitlistContext";
import { useRouter } from "next/navigation";

// ─── Component ────────────────────────────────────────────────────────────────

export function ForProfessionals() {
  const { openModal } = useWaitlist();
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-[#F7F7F5] py-16 lg:py-28">
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* ── LEFT — Copy ── */}
        <div>

          <span
            className="inline-block mb-4 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.14em]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            For Professionals
          </span>

          <h2
            className="text-[#0D1F1C] font-bold leading-[1.08] tracking-[-0.025em]"
            style={{
              fontFamily: "'Fredoka', sans-serif",
              fontSize: "clamp(2rem, 3.8vw, 3rem)",
            }}
          >
            Turn your skills into{" "}
            <em className="not-italic text-[#4ECBA5]">steady income,</em>{" "}
            on your own terms.
          </h2>

          <p
            className="mt-5 leading-[1.75] text-[rgba(13,31,28,0.52)]"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.92rem",
              maxWidth: "420px",
            }}
          >
            Pakistan has millions of skilled workers and millions of homes that need them.
            TaskLync connects the two giving professionals like you a verified profile,
            real bookings, and a platform that actually works for you. No middlemen,
            no guesswork, no waiting around for word of mouth.
          </p>

          <p
            className="mt-4 leading-[1.75] text-[rgba(13,31,28,0.52)]"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "0.92rem",
              maxWidth: "420px",
            }}
          >
            Set your own hours, build your reputation with verified reviews, and get
            paid securely after every job. Whether you're an electrician, plumber,
            AC technician, or cleaner, there's demand waiting for you right now.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-8">
            <button
              onClick={openModal}
              className="cursor-pointer inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85"
              style={{
                fontFamily: "'Poppins', sans-serif",
                background: "#1F6F5F",
              }}
            >
              Apply to Join <ArrowRight size={14} strokeWidth={2} />
            </button>

            <button
              onClick={() => router.push("/how-it-works")}
              className="cursor-pointer inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium border border-[rgba(13,31,28,0.15)] text-[rgba(13,31,28,0.55)] transition-colors duration-200 hover:border-[#1F6F5F] hover:text-[#1F6F5F]"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              See how it works
            </button>
          </div>
        </div>

        {/* ── RIGHT — Portrait image ── */}
        <div>
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: "9/10" }}
          >
            <Image
              src="/images/home/tasklync-worker-fixing-ac-home-service-pakistan.png"
              alt="Verified TaskLync professional fixing AC unit at a home in Pakistan"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1440px) 45vw, 620px"
              priority={false}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

export default ForProfessionals;