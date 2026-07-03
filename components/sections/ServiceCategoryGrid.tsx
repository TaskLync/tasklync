// components/sections/ServiceCategoryGrid.tsx
"use client";

import { useRef, useState, useEffect } from "react";
import { Wrench, Zap, Hammer, Sparkles, Tv, ArrowRight } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

const categories = [
  {
    name: "Plumbing",
    icon: Wrench,
    href: "/services/plumbing",
    image: "/images/services/plumbing.avif",
    stat: "2 hr avg. response",
    description: "From leaking pipes to full fixture installations, trusted plumbers ready for every repair.",
  },
  {
    name: "Electrical",
    icon: Zap,
    href: "/services/electrical",
    image: "/images/services/electrical.avif",
    stat: "Safety certified",
    description: "Safe and professional electrical work for lighting, wiring, outlets, and upgrades.",
  },
  {
    name: "Carpentry",
    icon: Hammer,
    href: "/services/carpentry",
    image: "/images/services/carpentry.avif",
    stat: "Handcrafted finish",
    description: "Custom woodwork, repairs, shelving, doors, and handcrafted finishing touches.",
  },
  {
    name: "Car Mechanic",
    icon: Wrench,
    href: "/services/car-mechanic",
    image: "/images/services/car-mechanic.avif",
    stat: "Doorstep repairs",
    description: "Professional vehicle maintenance and repair for diagnostics, battery issues, and routine servicing.",
  },
  {
    name: "Cleaning",
    icon: Sparkles,
    href: "/services/cleaning",
    image: "/images/services/cleaning.avif",
    stat: "4.9★ avg. rating",
    description: "Reliable home and office cleaning services tailored to your schedule and lifestyle.",
  },
  {
    name: "TV & Tech",
    icon: Tv,
    href: "/services/tv-tech",
    image: "/images/services/tv-tech.avif",
    stat: "Same-day setup",
    description: "TV mounting, smart home setup, WiFi optimization, and in-home tech assistance.",
  },
];

export default function ServiceCategoryGrid() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.scrollWidth / categories.length;
      const index = Math.min(
        categories.length - 1,
        Math.round(el.scrollLeft / cardWidth)
      );
      setActiveIndex(index);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#F7F7F5] py-10 lg:py-14">

      <div className="relative mx-auto max-w-[1200px] p-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-14">
          <span className="font-['Poppins'] inline-block mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1F6F5F]">
            Explore Services
          </span>

          <h2
            className="font-['Fredoka'] font-bold text-[#0D1F1C] leading-[1.05] tracking-[-0.025em]"
            style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)" }}
          >
            Professional help for
            <br />
            <span
              style={{
                backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 60%,#6FCF97 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              every part of your home.
            </span>
          </h2>

          <p className="font-['Poppins'] mt-4 text-[15px] leading-[1.72] text-[rgba(13,31,28,0.48)]">
            Trusted professionals across a wide range of home services from quick repairs to full scale installations.
          </p>
        </div>

        {/* Grid — desktop */}
        <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {categories.map((cat) => <ServiceCard key={cat.name} cat={cat} />)}
        </div>

        {/* Scroll — mobile */}
        <div
          ref={scrollRef}
          className="
            md:hidden flex gap-4
            overflow-x-auto snap-x snap-mandatory
            [-webkit-overflow-scrolling:touch]
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            -mx-6 px-6 pr-6 pb-2
          "
        >
          {categories.map((cat) => (
            <div key={cat.name} className="min-w-[72vw] max-w-[72vw] snap-start shrink-0">
              <ServiceCard cat={cat} />
            </div>
          ))}
        </div>

        {/* Mobile scroll indicator */}
        <div className="flex md:hidden justify-center gap-1.5 mt-5">
          {categories.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const cardWidth = el.scrollWidth / categories.length;
                el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
              }}
              className={`h-1.5 rounded-full border-none cursor-pointer transition-all duration-300 ${
                activeIndex === i ? "w-6 bg-[#1F6F5F]" : "w-1.5 bg-[#0D1F1C]/20"
              }`}
              aria-label={`Go to ${categories[i].name}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function ServiceCard({ cat }: { cat: typeof categories[0] }) {
  const Icon = cat.icon;
  const { show } = useToast();

  return (
    <div className="group flex flex-col overflow-hidden rounded-[20px] border border-black/[0.07] bg-white hover:shadow-[0_20px_60px_rgba(13,31,28,0.08)] hover:-translate-y-0.5 transition-[box-shadow,transform] duration-300">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={cat.image}
          alt={cat.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(13,31,28,0.6), rgba(13,31,28,0.08))" }}
        />

        {/* Icon */}
        <div
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-[12px] text-white"
          style={{
            background: "rgba(255,255,255,0.14)",
            border: "1px solid rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Icon size={17} strokeWidth={2} />
        </div>

        {/* Name */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-['Fredoka'] text-[22px] font-bold tracking-[-0.02em] text-white leading-none">
            {cat.name}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">

        {/* Stat */}
        <span className="font-['Poppins'] inline-block mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1F6F5F]">
          {cat.stat}
        </span>

        <p className="font-['Poppins'] text-[13.5px] leading-[1.72] text-[rgba(13,31,28,0.52)] flex-1 mb-5">
          {cat.description}
        </p>

        {/* Divider */}
        <div className="h-px bg-black/[0.06] mb-4" />

        {/* CTA row */}
        <button
          onClick={() =>
            show({
              message: `You'll be able to view and book ${cat.name} services once the app goes live.`,
              variant: "success",
            })
          }
          className="cursor-pointer flex items-center justify-between bg-transparent border-none p-0 w-full text-left"
        >
          <span className="font-['Poppins'] text-[13px] font-semibold text-[#1F6F5F]">
            View Service
          </span>
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 group-hover:bg-[#1F6F5F] group-hover:text-white"
            style={{ background: "rgba(31,111,95,0.08)", color: "#1F6F5F" }}
          >
            <ArrowRight size={14} strokeWidth={2.5} />
          </span>
        </button>

      </div>
    </div>
  );
}