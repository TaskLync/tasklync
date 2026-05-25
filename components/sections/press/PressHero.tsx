export default function PressHero() {
  return (
    <section className="bg-[#F7F7F5] pt-20 pb-16 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.1)]">
      <div className="max-w-6xl mx-auto">
        <span
          className="inline-block mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          For Media
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h1
              className="text-[#0D1F1C] font-bold leading-[1.06] tracking-[-0.03em] mb-6"
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              Press and Media
            </h1>

            <p
              className="text-[rgba(13,31,28,0.65)] text-[15px] leading-[1.8] max-w-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              This page includes official company information, brand assets,
              product screenshots, founder information, and media resources
              related to TaskLync. For interviews, partnerships, or press
              enquiries, contact us directly using the information provided.
            </p>
          </div>

          {/* Fixed Card */}
          <div className="bg-white border border-[rgba(31,111,95,0.15)] rounded-2xl p-8 sm:p-9">
            <div
              className="text-[#0D1F1C] font-semibold text-[13px] uppercase tracking-[0.07em] mb-5"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              Press Contact
            </div>

            <div className="space-y-2 mb-6">
              <div
                className="text-[#0D1F1C] text-[17px] font-semibold tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-clash)" }}
              >
                TaskLync Media Team
              </div>

              <div
                className="text-[rgba(13,31,28,0.55)] text-[13.5px] leading-[1.6]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Press, partnerships, and company enquiries
              </div>
            </div>

            <a
              href="mailto:press@tasklync.pk"
              className="inline-flex items-center justify-center w-full h-11 rounded-xl bg-[#1F6F5F] text-white text-[13.5px] font-medium hover:opacity-90 transition-opacity"
              style={{ fontFamily: "var(--font-body)" }}
            >
              press@tasklync.pk
            </a>

            <p
              className="text-[rgba(13,31,28,0.42)] text-[12px] text-center leading-[1.7] mt-4"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Most media enquiries are answered within one business day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}