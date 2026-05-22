import {
  CalendarClock,
  BadgeDollarSign,
  Star,
  ShieldCheck,
  MessageSquare,
  Scale,
  LucideIcon,
} from "lucide-react";

interface Benefit {
  Icon: LucideIcon;
  title: string;
  desc: string;
}

const benefits: Benefit[] = [
  {
    Icon: CalendarClock,
    title: "Scheduling",
    desc: "Smart booking system that matches availability instantly.",
  },
  {
    Icon: BadgeDollarSign,
    title: "Payments",
    desc: "Secure, fast payouts processed within 24 hours.",
  },
  {
    Icon: Star,
    title: "Reviews",
    desc: "Verified ratings that build long-term trust.",
  },
  {
    Icon: ShieldCheck,
    title: "Insurance validation",
    desc: "Every professional is identity and safety verified.",
  },
  {
    Icon: MessageSquare,
    title: "Customer communication",
    desc: "In-app messaging with privacy protection built in.",
  },
  {
    Icon: Scale,
    title: "Dispute resolution",
    desc: "Fair, fast conflict handling with payment protection.",
  },
];

export default function PlatformBenefits() {
  return (
    <section className="bg-[#F7F7F5] py-10 md:py-14">
      <div className="max-w-290 mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h2
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#0D1F1C",
            }}
          >
            What We Handle
          </h2>

          <p
            className="leading-[1.72] mb-8 italic text-[rgba(13,31,28,0.48)]"
            style={{
                fontFamily: "var(--font-serif-italic)",
                fontSize: "1.15rem",
            }}
          >
            Everything is managed seamlessly in the background, so the entire process stays simple and efficient.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">

          {benefits.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-3 p-4 rounded-[14px] border border-[rgba(31,111,95,0.10)] bg-white"
            >

              {/* icon */}
              <div
                className="w-9 h-9 flex items-center justify-center rounded-[10px] shrink-0"
                style={{
                  background: "rgba(31,111,95,0.08)",
                  color: "#1F6F5F",
                }}
              >
                <Icon size={16} strokeWidth={2} />
              </div>

              {/* text */}
              <div className="leading-tight">

                <h3
                  style={{
                    fontFamily: "var(--font-clash)",
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#0D1F1C",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {title}
                </h3>

                <p
                  className="mt-1"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "12.8px",
                    lineHeight: 1.45,
                    color: "rgba(13,31,28,0.55)",
                  }}
                >
                  {desc}
                </p>

              </div>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
}