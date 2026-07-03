"use client";

import { UserCheck, Eye, PhoneCall, Lock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const tips = [
  {
    Icon: UserCheck,
    title: "Verify before the door opens",
    body: "Every professional's profile shows their verified name, photo, trade category, and review history. Match the photo to the person at your door before letting them in. Their ID badge is available in app.",
    link: { label: "How to check a professional's credentials", href: "/blog/practical-safety-guide-for-homeowners" },
  },
  {
    Icon: Eye,
    title: "Stay present for access jobs",
    body: "For jobs requiring access to multiple rooms or utilities, remain at home or designate a trusted adult. You can share your live location with a contact directly from the app during any booking.",
    link: null,
  },
  {
    Icon: PhoneCall,
    title: "If something feels wrong, stop the job",
    body: "You are never obligated to continue. Tap \"End Job\" in the app at any point. You will not be charged for incomplete work. Our team is available 24/7 via the in app support chat.",
    link: { label: "What to do if you feel unsafe", href: "/blog/practical-safety-guide-for-homeowners" },
  },
  {
    Icon: Lock,
    title: "Keep payments in the app",
    body: "Never pay cash before a job starts, and never transfer money outside the platform. TaskLync holds funds in escrow and releases them only after you confirm the work is complete.",
    link: null,
  },
];

export default function SafetyForHomeowners() {
  return (
    <section className="bg-[#F7F7F5] py-18">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 mb-4 font-['Poppins'] text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]">
            For Homeowners
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2
              className="font-['Fredoka'] text-[#0D1F1C] font-bold leading-[1.05] tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)" }}
            >
              Practical safety guide<br className="hidden lg:block" /> for every booking.
            </h2>
            <p className="font-['Poppins'] text-[rgba(13,31,28,0.5)] text-[15px] leading-[1.65] max-w-xs">
              Our vetting does the heavy lifting. These habits make every job even safer.
            </p>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Tips — spans 2 cols */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tips.map((tip, i) => {
              const Icon = tip.Icon;
              return (
                <div
                  key={i}
                  className="bg-white border border-[rgba(13,31,28,0.08)] rounded-2xl p-6 flex flex-col gap-4"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center border border-[rgba(31,111,95,0.15)]"
                    style={{ background: "rgba(31,111,95,0.07)" }}
                  >
                    <Icon size={16} strokeWidth={1.75} color="#1F6F5F" />
                  </div>
                  <div>
                    <div className="font-['Fredoka'] text-[#0D1F1C] font-semibold text-[15px] leading-snug tracking-[-0.02em] mb-1.5">
                      {tip.title}
                    </div>
                    <p className="font-['Poppins'] text-[13px] text-[rgba(13,31,28,0.52)] leading-[1.65]">
                      {tip.body}
                    </p>
                  </div>
                  {tip.link && (
                    <Link
                      href={tip.link.href}
                      className="mt-auto flex items-center gap-1.5 font-['Poppins'] text-[#1F6F5F] text-[12px] font-semibold group"
                    >
                      {tip.link.label}
                      <ArrowUpRight
                        size={13}
                        strokeWidth={2}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right — portrait image */}
          <div className="relative rounded-2xl overflow-hidden min-h-[420px] lg:min-h-0">
            <img
              src="/images/safety/tasklync-homeowner-reading-safety-guide.avif"
              alt="Homeowner Reading a TaskLync practical guide inside a home in Pakistan"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
            />

            {/* Subtle top fade */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/20 to-transparent" />

            {/* Bottom vignette + link */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
              <Link
                href="/blog/practical-safety-guide-for-homeowners"
                className="pointer-events-auto inline-flex items-center gap-1.5 font-['Poppins'] text-white text-[12px] font-semibold group"
              >
                Full homeowner safety guide
                <ArrowUpRight
                  size={13}
                  strokeWidth={2}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}