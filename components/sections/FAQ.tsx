"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { fadeUp } from "@/lib/motion/variants";
import { EASE_EXPO_OUT, DUR } from "@/lib/motion/transitions";

// ─────────────────────────────────────────────────────────────────────────────
// Types & content
// ─────────────────────────────────────────────────────────────────────────────

interface FAQItem {
  q: string;
  a: string;
}

const homeownerFAQs: FAQItem[] = [
  {
    q: "How quickly can I get a professional to my home?",
    a: "Most bookings are matched within 8 minutes. Depending on availability in your city, a professional can arrive the same day or at a scheduled time that works for you. You'll see real-time availability before you confirm.",
  },
  {
    q: "How do I know the professionals are trustworthy?",
    a: "Every professional on TaskLync passes a 7-step verification process — government ID check, background screening, trade license verification, proof of insurance, address confirmation, skills assessment, and an in-person review. They cannot go live on the platform without clearing all seven.",
  },
  {
    q: "What happens if something goes wrong with the job?",
    a: "Every booking is covered by the TaskLync Guarantee. If the work isn't completed to standard, raise a dispute within 24 hours and our support team resolves it — with full payment protection throughout. You never pay for work that wasn't done right.",
  },
  {
    q: "How does payment work? Do I pay in cash?",
    a: "No cash, ever. All payments happen securely in-app after you confirm the job is complete. Your payment is held in escrow until you mark the task done. Bank-grade encryption protects every transaction.",
  },
  {
    q: "Can I request the same professional again?",
    a: "Yes. Found someone you trust? Re-book them directly from your booking history in one tap. You can build a personal roster of go-to professionals for different services.",
  },
  {
    q: "Is there a minimum job value or booking fee?",
    a: "No minimum job value and no hidden booking fees. You see the full cost before you confirm — what you see is exactly what you pay. No surprise 'inspection fees' or weekend surcharges.",
  },
  {
    q: "Which cities is TaskLync available in?",
    a: "We're launching city by city. Join the waitlist and we'll notify you the moment we go live in your area. Early waitlist members get priority access and founder pricing when their city launches.",
  },
];

const professionalFAQs: FAQItem[] = [
  {
    q: "How much does it cost to join as a professional?",
    a: "Joining TaskLync is completely free. There are no upfront fees, no monthly subscriptions, and no joining charges. We take a small platform commission on completed jobs — so we only make money when you do.",
  },
  {
    q: "How and when do I get paid?",
    a: "Payments are released directly to your registered account within 24 hours of job completion. No chasing invoices, no cash handling disputes. You can track all earnings and payouts in your pro dashboard.",
  },
  {
    q: "Can I choose which jobs I accept?",
    a: "Absolutely. You set your availability, your service radius, and the types of jobs you want. Our matching engine shows you relevant jobs — you accept or decline. No pressure, no penalties for passing on a job.",
  },
  {
    q: "What does the verification process involve?",
    a: "We verify your government ID, trade certifications, business license (where applicable), proof of insurance, and conduct an in-person skills review for your primary service category. The process typically takes 3–5 business days. We re-verify insurance quarterly.",
  },
  {
    q: "How does TaskLync help me grow my income?",
    a: "You get a consistent pipeline of verified, pre-screened job requests without spending on advertising or chasing leads. High-rated professionals unlock premium badge status and priority placement in search results — meaning more visibility, better jobs, higher earnings.",
  },
  {
    q: "What if a customer raises a dispute?",
    a: "Our support team reviews all disputes fairly using job photos, chat logs, and completion records. We protect professionals from unfair claims. If a customer is found to be acting in bad faith, we take action on their account, not yours.",
  },
  {
    q: "Can I work in multiple service categories?",
    a: "Yes. You can list multiple trade skills on your profile. Each category requires separate verification, but once verified you can accept jobs across all your listed services. Many pros on TaskLync offer 3–5 categories.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FAQRow
// ─────────────────────────────────────────────────────────────────────────────

function FAQRow({ item, index, isOpen, onToggle }: {
  item: FAQItem;
  index: number;
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
        className="w-full flex items-center justify-between gap-6 py-5 text-left"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <span
          className="text-[15px] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-200"
          style={{
            fontFamily: "var(--font-clash)",
            color: isOpen ? "#1F6F5F" : "#0D1F1C",
          }}
        >
          {item.q}
        </span>

        <span
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
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
          transition: `height 0.35s cubic-bezier(${EASE_EXPO_OUT.join(",")})`,
        }}
      >
        <div ref={answerRef} className="pb-5 pr-14">
          <p
            className="text-[14px] leading-[1.75] text-[rgba(13,31,28,0.55)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function FAQ() {
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });
  const [tab, setTab] = useState<"homeowner" | "professional">("homeowner");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = tab === "homeowner" ? homeownerFAQs : professionalFAQs;

  const handleTabChange = (t: "homeowner" | "professional") => {
    setTab(t);
    setOpenIndex(0);
  };

  return (
    <section
      id="faq"
      className="relative bg-[#F7F7F2] py-12 lg:py-18 overflow-hidden"
    >
      {/* Dot texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(rgba(13,31,28,0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div
        ref={ref}
        className="relative z-10 mx-auto max-w-275 px-6 sm:px-10 lg:px-16"
      >

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-14">

          <div>
            {/* Label */}
            <motion.div
              className="inline-flex items-center gap-2 mb-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#1F6F5F]"
              style={{ fontFamily: "var(--font-body)" }}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0}
            >
              <span className="block w-5 h-0.5 rounded-sm bg-[#1F6F5F]" />
              FAQ
            </motion.div>

            {/* Title */}
            <motion.h2
              className="leading-[1.05] tracking-[-0.03em] text-[#0D1F1C] font-bold"
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
              }}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0.1}
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
            </motion.h2>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0.2}
          >
            {/* Subtitle */}
            <p
              className="leading-[1.72] mb-8 italic text-[rgba(13,31,28,0.48)]"
              style={{
                fontFamily: "var(--font-serif-italic)",
                fontSize: "1rem",
              }}
            >
              Got questions? We've got straight answers. If you don't find what
              you're looking for, our team is one message away.
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
                  className="px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer border-none"
                  style={{
                    fontFamily: "var(--font-body)",
                    background: tab === t
                      ? "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)"
                      : "transparent",
                    color: tab === t ? "#fff" : "rgba(13,31,28,0.5)",
                    boxShadow: tab === t ? "0 2px 12px rgba(47,160,132,0.25)" : "none",
                  }}
                >
                  {t === "homeowner" ? "For Homeowners" : "For Professionals"}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── FAQ list ──────────────────────────────────────────────────── */}
        <motion.div
          className="rounded-3xl overflow-hidden border border-[rgba(31,111,95,0.1)]"
          style={{
            background: "#fff",
            boxShadow: "0 4px 32px rgba(13,31,28,0.06)",
          }}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.3}
        >
          <div className="px-8 py-2">
            {faqs.map((item, i) => (
              <FAQRow
                key={`${tab}-${i}`}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </motion.div>

        {/* ── Bottom CTA ────────────────────────────────────────────────── */}
        <motion.div
          className="mt-10 text-center"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0.5}
        >
          <p
            className="text-[14px] mb-3 text-[rgba(13,31,28,0.4)]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Still have questions?
          </p>

          <button
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13.5px] font-semibold border cursor-pointer transition-all duration-200 hover:bg-[rgba(31,111,95,0.06)] hover:border-[#1F6F5F]"
            style={{
              fontFamily: "var(--font-body)",
              background: "transparent",
              borderColor: "rgba(31,111,95,0.25)",
              color: "#1F6F5F",
            }}
          >
            Contact our team →
          </button>
        </motion.div>

      </div>
    </section>
  );
}