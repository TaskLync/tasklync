// components/sections/ServiceCategoryGrid.tsx

import Link from "next/link";
import {
  Wrench,
  Zap,
  Hammer,
  Sparkles,
  Tv,
} from "lucide-react";

const categories = [
  {
    name: "Plumbing",
    icon: Wrench,
    href: "/services/plumbing",
    image: "/images/services/plumbing.avif",
    description:
      "From leaking pipes to full fixture installations, trusted plumbers ready for every repair.",
  },
  {
    name: "Electrical",
    icon: Zap,
    href: "/services/electrical",
    image: "/images/services/electrical.avif",
    description:
      "Safe and professional electrical work for lighting, wiring, outlets, and upgrades.",
  },
  {
    name: "Carpentry",
    icon: Hammer,
    href: "/services/carpentry",
    image: "/images/services/carpentry.avif",
    description:
      "Custom woodwork, repairs, shelving, doors, and handcrafted finishing touches.",
  },
  {
   name: "Car Mechanic",
   icon: Wrench,
   href: "/services/car-mechanic",
   image: "/images/services/car-mechanic.avif",
   description:
    "Professional vehicle maintenance and repair services for diagnostics, battery issues, and routine servicing.",
},
  {
    name: "Cleaning",
    icon: Sparkles,
    href: "/services/cleaning",
    image: "/images/services/cleaning.avif",
    description:
      "Reliable home and office cleaning services tailored to your schedule and lifestyle.",
  },
  {
    name: "TV & Tech",
    icon: Tv,
    href: "/services/tv-tech",
    image: "/images/services/tv-tech.avif",
    description:
      "TV mounting, smart home setup, WiFi optimization, and in-home tech assistance.",
  },
];

export default function ServiceCategoryGrid() {
  return (
    <section
      className="relative overflow-hidden py-10 lg:py-14"
      style={{
        background: "#F7F7F5",
      }}
    >
      {/* subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(31,111,95,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(31,111,95,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative mx-auto max-w-290 px-6 sm:px-10 lg:px-16">

        {/* HEADER */}
        <div className="text-center mb-14">

          <div
            className="mb-5 text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{
              fontFamily: "var(--font-body)",
              color: "#1F6F5F",
            }}
          >
            Explore Services
          </div>

          <h2
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "#0D1F1C",
            }}
          >
            Professional help for
            <br />
            every part of your home
          </h2>

          <p
            className="mx-auto text-center text-[rgba(13,31,28,0.5)] leading-[1.7] mb-12 max-w-sm italic mt-3"
            style={{
            fontFamily: "var(--font-serif-italic)",
            fontSize: "1.15rem",
            }}
          >
            Discover trusted professionals across a wide range of home services,
            from quick repairs to full-scale maintenance and installations.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={category.href}
                className="group overflow-hidden rounded-[28px] border transition-all duration-300 hover:-translate-y-0.75 hover:shadow-[0_20px_60px_rgba(13,31,28,0.08)]"
                style={{
                  background: "#FFFFFF",
                  borderColor: "rgba(31,111,95,0.10)",
                }}
              >
                {/* IMAGE */}
                <div className="relative h-65 overflow-hidden">

                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* overlay */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(13,31,28,0.55), rgba(13,31,28,0.06))",
                    }}
                  />

                  {/* icon */}
                  <div
                    className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-[14px] backdrop-blur-md"
                    style={{
                      background: "rgba(255,255,255,0.14)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "#FFFFFF",
                    }}
                  >
                    <Icon size={19} strokeWidth={2} />
                  </div>

                  {/* title */}
                  <div className="absolute bottom-5 left-5 right-5">

                    <h3
                      style={{
                        fontFamily: "var(--font-clash)",
                        fontSize: "23px",
                        fontWeight: 600,
                        letterSpacing: "-0.03em",
                        color: "#FFFFFF",
                      }}
                    >
                      {category.name}
                    </h3>

                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "14px",
                      lineHeight: 1.75,
                      color: "rgba(13,31,28,0.58)",
                    }}
                  >
                    {category.description}
                  </p>

                </div>
              </Link>
            );
          })}

        </div>
      </div>
    </section>
  );
}