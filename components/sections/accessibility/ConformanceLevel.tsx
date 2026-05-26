const criteria = [
  {
    principle: "Perceivable",
    description:
      "All non-text content has text alternatives. All page content is presentable without loss of information when rendered by assistive technology. Colour is not the only means of conveying information.",
  },
  {
    principle: "Operable",
    description:
      "All functionality is accessible via keyboard. No keyboard traps exist. Skip navigation links are provided. Focus order follows a logical visual sequence. No content flashes more than three times per second.",
  },
  {
    principle: "Understandable",
    description:
      "Page language is declared in HTML. Error messages identify the field in error and describe the problem. Required fields are labelled as such before form submission.",
  },
  {
    principle: "Robust",
    description:
      "Markup is valid and parses correctly. Name, role, and value are exposed for all interface components. ARIA is used only where native HTML semantics are insufficient.",
  },
];

export default function ConformanceLevel() {
  return (
    <section className="bg-[#F7F7F5] py-20 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.1)]">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12">
          <div>
            <span
              className="inline-block mb-4 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Conformance
            </span>
            <h2
              className="text-[#0D1F1C] font-bold leading-[1.08] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)",
              }}
            >
              Our target: WCAG 2.2 Level AA
            </h2>
          </div>

          <div className="sm:shrink-0 bg-[rgba(31,111,95,0.06)] border border-[rgba(31,111,95,0.2)] rounded-xl px-6 py-4 text-center">
            <div
              className="text-[#1F6F5F] font-bold text-[1.6rem] tracking-[-0.03em]"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              WCAG 2.2 AA
            </div>
            <div
              className="text-[rgba(13,31,28,0.5)] text-[11.5px] mt-1"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Target conformance level
            </div>
          </div>
        </div>

        <p
          className="text-[rgba(13,31,28,0.65)] text-[14.5px] leading-[1.8] mb-10 max-w-2xl"
          style={{ fontFamily: "var(--font-body)" }}
        >
          We aim for full conformance with the Web Content Accessibility
          Guidelines (WCAG) 2.2 at Level AA. The four principles underlying
          WCAG and how we approach each are described below.
        </p>

        <div className="space-y-4">
          {criteria.map((c) => (
            <div
              key={c.principle}
              className="border border-[rgba(31,111,95,0.1)] rounded-xl p-6 grid grid-cols-1 sm:grid-cols-12 gap-4"
            >
              <div className="sm:col-span-3">
                <h3
                  className="text-[#1F6F5F] font-semibold text-[14px] tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  {c.principle}
                </h3>
              </div>
              <p
                className="sm:col-span-9 text-[rgba(13,31,28,0.65)] text-[13.5px] leading-[1.75]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}