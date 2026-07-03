"use client";

import Image from "next/image";
import { useToast } from "@/components/ui/Toast";

export function FinalCTA() {
  const { show } = useToast();

  return (
    <section className="relative overflow-hidden bg-[#F7F7F5] py-16 md:py-24">

      {/* Dot texture */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(13,31,28,0.055) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Constrain to 1200px with side margins */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">

        {/* Green card */}
        <div
          className="relative overflow-hidden rounded-[20px]"
          style={{
            background: "linear-gradient(135deg,#1a4a3a 0%,#1F6F5F 40%,#2FA084 75%,#3ab896 100%)",
            boxShadow: "0 24px 80px rgba(31,111,95,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Subtle blobs */}
          <div
            className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full opacity-20"
            style={{ background: "radial-gradient(circle,#6FCF97 0%,transparent 70%)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full opacity-[0.12]"
            style={{ background: "radial-gradient(circle,#0D1F1C 0%,transparent 70%)" }}
          />

          {/* Card content */}
          <div className="relative z-10 flex flex-col items-center text-center px-8 py-14 md:px-20 md:py-20">

            {/* Eyebrow */}
            <span className="font-['Poppins'] text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50 mb-4">
              Available on iOS & Android
            </span>

            {/* Headline */}
            <h2
              className="font-['Fredoka'] font-bold text-white leading-[1.05] tracking-[-0.02em] mb-4"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              Ready to get{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(100deg,#d4f5e6 0%,#a7edcc 50%,#6FCF97 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                things done?
              </span>
            </h2>

            {/* Subtitle */}
            <p className="hidden md:block font-['Poppins'] text-[15px] leading-[1.72] text-white/55 mb-10 max-w-md">
              Download the TaskLync app and connect with verified professionals
              in minutes, wherever you are.
            </p>

            {/* App store buttons */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <button
                onClick={() =>
                  show({
                    message:
                      "TaskLync App isn't available yet, join the waitlist to get notified the moment we launch in your city.",
                    variant: "success",
                  })
                }
                className="cursor-pointer border-none bg-transparent p-0"
                aria-label="Get it on Google Play"
              >
                <Image
                  src="/images/home/play-store.webp"
                  alt="Get it on Google Play"
                  width={200}
                  height={58}
                  className="h-17 w-auto"
                />
              </button>
            </div>

            {/* Fine print */}
            <p className="font-['Poppins'] mt-6 text-[11px] tracking-[0.01em] text-white/35">
              Find and book trusted professionals near you.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCTA;