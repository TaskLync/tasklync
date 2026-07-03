"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";

interface FAQItem {
  q: string;
  a: string;
}

const homeownerFAQs: FAQItem[] = [
  {
    q: "How quickly can I get a professional to my home?",
    a: "Most requests are matched within minutes. Based on availability in your area, a professional can arrive the same day or at a scheduled time that suits you.",
  },
  {
    q: "How do I know the professionals are trustworthy?",
    a: "Every professional completes a strict verification process that includes identity checks, background screening, license validation where required, and skills review before joining the platform.",
  },
  {
    q: "What happens if something goes wrong with the job?",
    a: "All bookings are covered by the TaskLync Guarantee. If something is not completed as expected, you can raise a dispute within 24 hours. Our team reviews and resolves it fairly with payment protection in place.",
  },
  {
    q: "Which cities is TaskLync available in?",
    a: "TaskLync is launching city by city. Join the waitlist to get notified when it becomes available in your area.",
  },
];

const professionalFAQs: FAQItem[] = [
  {
    q: "How much does it cost to join as a professional?",
    a: "Joining TaskLync is free. There are no upfront fees or subscriptions. We only charge a small commission on completed jobs.",
  },
  {
    q: "What does the verification process involve?",
    a: "We verify your identity, relevant licenses, and skills depending on your service category. Some categories may include additional checks before approval.",
  },
  {
    q: "How does TaskLync help me grow my income?",
    a: "You receive consistent local job requests without spending on advertising. Higher-rated professionals get better visibility and more booking opportunities.",
  },
  {
    q: "What if a customer raises a dispute?",
    a: "All disputes are reviewed using job records and communication history. We ensure fair outcomes based on evidence and protect professionals from misuse.",
  },
];

const EXPO_OUT = "0.16,1,0.3,1";

// ─── FAQRow ───────────────────────────────────────────────────────────────────

function FAQRow({ item, isOpen, onToggle }: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const answerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (answerRef.current) {
      setHeight(isOpen ? answerRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-[rgba(31,111,95,0.1)] last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-5 text-left bg-transparent border-none cursor-pointer"
      >
        <span
          className={`font-['Fredoka'] text-[16px] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-200 ${
            isOpen ? "text-[#1F6F5F]" : "text-[#0D1F1C]"
          }`}
        >
          {item.q}
        </span>

        <span
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-[background,border-color] duration-200"
          style={{
            background: isOpen ? "#1F6F5F" : "rgba(31,111,95,0.08)",
            border: `1px solid ${isOpen ? "#1F6F5F" : "rgba(31,111,95,0.15)"}`,
          }}
        >
          {isOpen
            ? <Minus size={14} strokeWidth={2.5} color="#fff" />
            : <Plus  size={14} strokeWidth={2.5} color="#1F6F5F" />
          }
        </span>
      </button>

      <div
        style={{
          height,
          overflow: "hidden",
          transition: `height 0.35s cubic-bezier(${EXPO_OUT})`,
        }}
      >
        <div ref={answerRef} className="pb-5 pr-14">
          <p className="font-['Poppins'] text-[14px] leading-[1.75] text-[rgba(13,31,28,0.55)]">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export default function FAQ() {
  const [tab, setTab] = useState<"homeowner" | "professional">("homeowner");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const router = useRouter();

  const faqs = tab === "homeowner" ? homeownerFAQs : professionalFAQs;

  const handleTabChange = (t: "homeowner" | "professional") => {
    setTab(t);
    setOpenIndex(0);
  };

  return (
    <section
      id="faq"
      className="relative bg-[#F7F7F5] py-16 lg:py-24 overflow-hidden"
    >
      {/* Dot texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(13,31,28,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 sm:px-10 lg:px-16">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-14">

          <div>
            <div className="inline-flex items-center gap-2 mb-5 font-['Poppins'] text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1F6F5F]">
              FAQ
            </div>

            <h2
              className="font-['Fredoka'] font-bold text-[#0D1F1C] leading-[1.05] tracking-[-0.025em]"
              style={{
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              }}
            >
              Everything you<br />
              <span
                style={{
                  backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 60%,#6FCF97 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                need to know.
              </span>
            </h2>
          </div>

          {/* Subtitle + tab switcher */}
          <div>
            <p className="font-['Poppins'] text-[15px] leading-[1.72] mb-8 text-[rgba(13,31,28,0.48)]">
              Got questions? We&apos;ve got straight answers. If you don&apos;t find what
              you&apos;re looking for, our team is one message away.
            </p>

            {/* Tab switcher */}
            <div
              className="inline-flex p-1 rounded-full"
              style={{
                background: "rgba(31,111,95,0.08)",
                border: "1px solid rgba(31,111,95,0.12)",
              }}
            >
              {(["homeowner", "professional"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => handleTabChange(t)}
                  className="px-5 py-2 rounded-full font-['Poppins'] text-[13px] font-semibold cursor-pointer border-none transition-[color,box-shadow] duration-200"
                  style={{
                    background: tab === t
                      ? "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)"
                      : "transparent",
                    color: tab === t ? "#fff" : "rgba(13,31,28,0.5)",
                    boxShadow: tab === t ? "0 2px 12px rgba(47,160,132,0.25)" : "none",
                  }}
                >
                  {t === "homeowner" ? "Homeowners" : "Professionals"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ list box */}
        <div
          className="rounded-3xl overflow-hidden border border-[rgba(31,111,95,0.1)] bg-white"
          style={{
            boxShadow: "0 4px 32px rgba(13,31,28,0.06)",
          }}
        >
          <div className="px-8 py-2">
            {faqs.map((item, i) => (
              <FAQRow
                key={`${tab}-${i}`}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="font-['Poppins'] text-[14px] mb-3 text-[rgba(13,31,28,0.4)]">
            Still have questions?
          </p>

          <button
            onClick={() => router.push("/contact")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-['Poppins'] text-[13.5px] font-semibold border cursor-pointer bg-transparent text-[#1F6F5F] transition-colors duration-200 hover:bg-[rgba(31,111,95,0.06)] hover:border-[#1F6F5F]"
            style={{ borderColor: "rgba(31,111,95,0.25)" }}
          >
            Contact our team →
          </button>
        </div>

      </div>
    </section>
  );
}