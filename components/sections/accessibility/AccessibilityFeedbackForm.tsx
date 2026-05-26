"use client";

import { useState } from "react";

export default function AccessibilityFeedbackForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Replace with actual submission logic
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <section className="bg-[#F7F7F5] py-20 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.1)]">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div>
            <span
              className="inline-block mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Feedback
            </span>
            <h2
              className="text-[#0D1F1C] font-bold leading-[1.1] tracking-[-0.03em] mb-5"
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)",
              }}
            >
              Report an accessibility issue
            </h2>
            <p
              className="text-[rgba(13,31,28,0.6)] text-[14px] leading-[1.8]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              If you encounter an accessibility barrier on the TaskLync
              platform, please tell us. We investigate every report. We will
              acknowledge your submission within 2 business days and provide
              a substantive response within 10 business days.
            </p>
            <p
              className="text-[rgba(13,31,28,0.6)] text-[14px] leading-[1.8] mt-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              If you need immediate assistance accessing the platform, you
              may also email us directly at{" "}
              <a
                href="mailto:accessibility@tasklync.com"
                className="text-[#1F6F5F] underline underline-offset-2"
              >
                accessibility@tasklync.com
              </a>
              .
            </p>
          </div>

          <div>
            {submitted ? (
              <div className="bg-white border border-[rgba(31,111,95,0.15)] rounded-2xl p-8 h-full flex flex-col justify-center">
                <div
                  className="text-[#1F6F5F] font-semibold text-[16px] mb-2"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  Report received
                </div>
                <p
                  className="text-[rgba(13,31,28,0.6)] text-[13.5px] leading-[1.7]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Thank you. We will respond within 2 business days.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-[rgba(31,111,95,0.12)] rounded-2xl p-8 space-y-5"
              >
                <div>
                  <label
                    htmlFor="a11y-page"
                    className="block text-[#0D1F1C] text-[13px] font-medium mb-1.5"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Which page or feature has the issue?
                  </label>
                  <input
                    id="a11y-page"
                    type="text"
                    required
                    placeholder="e.g. Booking confirmation page"
                    className="w-full h-11 rounded-xl border border-[rgba(31,111,95,0.2)] bg-[#F7F7F5] px-4 text-[13.5px] text-[#0D1F1C] placeholder:text-[rgba(13,31,28,0.35)] focus:outline-none focus:ring-2 focus:ring-[#1F6F5F] focus:ring-offset-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="a11y-tech"
                    className="block text-[#0D1F1C] text-[13px] font-medium mb-1.5"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Assistive technology used (if any)
                  </label>
                  <input
                    id="a11y-tech"
                    type="text"
                    placeholder="e.g. NVDA with Chrome on Windows 11"
                    className="w-full h-11 rounded-xl border border-[rgba(31,111,95,0.2)] bg-[#F7F7F5] px-4 text-[13.5px] text-[#0D1F1C] placeholder:text-[rgba(13,31,28,0.35)] focus:outline-none focus:ring-2 focus:ring-[#1F6F5F] focus:ring-offset-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="a11y-description"
                    className="block text-[#0D1F1C] text-[13px] font-medium mb-1.5"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Describe the barrier
                  </label>
                  <textarea
                    id="a11y-description"
                    required
                    rows={4}
                    placeholder="What were you trying to do? What happened instead?"
                    className="w-full rounded-xl border border-[rgba(31,111,95,0.2)] bg-[#F7F7F5] px-4 py-3 text-[13.5px] text-[#0D1F1C] placeholder:text-[rgba(13,31,28,0.35)] focus:outline-none focus:ring-2 focus:ring-[#1F6F5F] focus:ring-offset-1 resize-none"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="a11y-email"
                    className="block text-[#0D1F1C] text-[13px] font-medium mb-1.5"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Your email (optional, for follow-up)
                  </label>
                  <input
                    id="a11y-email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full h-11 rounded-xl border border-[rgba(31,111,95,0.2)] bg-[#F7F7F5] px-4 text-[13.5px] text-[#0D1F1C] placeholder:text-[rgba(13,31,28,0.35)] focus:outline-none focus:ring-2 focus:ring-[#1F6F5F] focus:ring-offset-1"
                    style={{ fontFamily: "var(--font-body)" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-[#1F6F5F] text-white text-[13.5px] font-medium hover:opacity-90 disabled:opacity-60 transition-opacity"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {loading ? "Sending..." : "Submit report"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}