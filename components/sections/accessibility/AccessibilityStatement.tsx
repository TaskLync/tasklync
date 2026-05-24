export default function AccessibilityStatement() {
  return (
    <section className="bg-[#F7F7F5] pt-20 pb-16 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.1)]">
      <div className="max-w-4xl mx-auto">
        <span
          className="inline-block mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Accessibility
        </span>
        <h1
          className="text-[#0D1F1C] font-bold leading-[1.06] tracking-[-0.03em] mb-8"
          style={{
            fontFamily: "var(--font-clash)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          Accessibility Statement
        </h1>

        <div className="space-y-5 max-w-2xl">
          <p
            className="text-[#0D1F1C] text-[15.5px] leading-[1.8]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            TaskLync is committed to making our platform accessible to
            everyone, including people who use assistive technologies, people
            with permanent or temporary disabilities, and people in
            situational limitations such as bright sunlight or one-handed use.
          </p>
          <p
            className="text-[rgba(13,31,28,0.65)] text-[15px] leading-[1.8]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Accessible design is not a compliance exercise for us. A platform
            that homeowners and professionals cannot use is a platform that
            does not work. We treat accessibility as a product requirement,
            not an afterthought.
          </p>
          <p
            className="text-[rgba(13,31,28,0.65)] text-[15px] leading-[1.8]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            This statement was last reviewed and updated on{" "}
            <strong className="text-[#0D1F1C]">15 April 2025</strong>. We
            review it each time a significant product update ships and at
            minimum on an annual basis.
          </p>
        </div>
      </div>
    </section>
  );
}