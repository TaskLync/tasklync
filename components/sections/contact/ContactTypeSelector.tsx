"use client";

import { useState } from "react";
import ContactFAQ from "./ContactFAQ";
import ContactForm from "./ContactForm";

export type ContactType = "support" | "press" | "partnerships" | "professional";

const contactTypes: { id: ContactType; label: string; description: string }[] =
  [
    {
      id: "support",
      label: "Support",
      description: "Questions about your account, a booking, or a refund",
    },
    {
      id: "press",
      label: "Press",
      description: "Media coverage, interviews, and asset requests",
    },
    {
      id: "partnerships",
      label: "Partnerships",
      description: "Insurance, real estate, and property management partnerships",
    },
    {
      id: "professional",
      label: "Professional onboarding",
      description: "Questions about joining the platform as a service professional",
    },
  ];

export default function ContactTypeSelector() {
  const [selected, setSelected] = useState<ContactType>("support");

  return (
    <section className="bg-[#F7F7F5] py-16 px-6 sm:px-10 lg:px-16">
      <div className="max-w-5xl mx-auto">
        {/* Type selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-14">
          {contactTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelected(type.id)}
              className={`text-left p-5 rounded-xl border transition-colors ${
                selected === type.id
                  ? "border-[#1F6F5F] bg-[rgba(31,111,95,0.05)]"
                  : "border-[rgba(31,111,95,0.12)] hover:border-[rgba(31,111,95,0.3)] bg-white"
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span
                  className={`text-[13.5px] font-semibold tracking-[-0.01em] ${
                    selected === type.id
                      ? "text-[#1F6F5F]"
                      : "text-[#0D1F1C]"
                  }`}
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  {type.label}
                </span>
                {selected === type.id && (
                  <div className="w-2 h-2 rounded-full bg-[#1F6F5F] flex-shrink-0 mt-1" />
                )}
              </div>
              <p
                className="text-[rgba(13,31,28,0.5)] text-[12.5px] leading-[1.55]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {type.description}
              </p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: FAQ + response commitment */}
          <div className="lg:col-span-5 space-y-8">
            <ContactFAQ type={selected} />
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <ContactForm type={selected} />
          </div>
        </div>
      </div>
    </section>
  );
}