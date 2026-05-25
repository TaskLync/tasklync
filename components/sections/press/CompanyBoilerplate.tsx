const boilerplates = [
  {
    length: "One sentence",
    text: "TaskLync is a trust-focused home services platform building a more reliable way for homeowners to connect with verified professionals across Pakistan.",
  },
  {
    length: "One paragraph",
    text: "TaskLync is a Pakistan-based technology company building a modern platform for home services. The company is focused on improving trust, accountability, and transparency in a category that has historically relied on informal referrals and inconsistent service standards. TaskLync is developing verification systems designed to help homeowners connect with professionals more confidently while giving skilled service providers a platform where quality and reliability matter more than visibility alone.",
  },
  {
    length: "Extended (for profiles and features)",
    text: "TaskLync is a Pakistan-based startup building infrastructure for trust in the home services industry. Founded in 2026, the company is focused on creating a platform where homeowners can discover and hire professionals through a more structured and verification-driven experience. Rather than operating as a traditional classified marketplace, TaskLync is building systems around accountability, professional standards, and long-term platform reliability. The company is currently in its early stage and is preparing for its initial launch while continuing to develop product infrastructure, professional onboarding systems, and marketplace operations.",
  },
];

export default function CompanyBoilerplate() {
  return (
    <section className="bg-white py-20 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.1)]">
      <div className="max-w-6xl mx-auto">
        <span
          className="inline-block mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Company Description
        </span>

        <h2
          className="text-[#0D1F1C] font-bold leading-[1.08] tracking-[-0.03em] mb-4"
          style={{
            fontFamily: "var(--font-clash)",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          }}
        >
          Boilerplate copy
        </h2>

        <p
          className="text-[rgba(13,31,28,0.55)] text-[14px] leading-[1.8] mb-10 max-w-2xl"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Use these descriptions for articles, profiles, interviews, company
          references, and media coverage related to TaskLync. For additional
          information or custom requests, contact{" "}
          <a
            href="mailto:press@tasklync.pk"
            className="text-[#1F6F5F] underline underline-offset-2"
          >
            press@tasklync.pk
          </a>
          .
        </p>

        <div className="space-y-5">
          {boilerplates.map((b) => (
            <div
              key={b.length}
              className="border border-[rgba(31,111,95,0.12)] rounded-2xl overflow-hidden"
            >
              <div className="bg-[#F7F7F5] border-b border-[rgba(31,111,95,0.1)] px-6 py-3 flex items-center justify-between">
                <span
                  className="text-[#0D1F1C] text-[12px] font-semibold uppercase tracking-[0.07em]"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  {b.length}
                </span>
              </div>

              <div className="px-6 py-5">
                <p
                  className="text-[rgba(13,31,28,0.75)] text-[14px] leading-[1.8]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {b.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Key facts */}
        <div className="pt-20">
          <h3
            className="text-[#0D1F1C] font-semibold text-[13px] uppercase tracking-[0.08em] mb-6 pb-3 border-b border-[rgba(31,111,95,0.1)]"
            style={{ fontFamily: "var(--font-clash)" }}
          >
            Key facts for accuracy
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              ["Founded", "2026"],
              ["Headquarters", "Pakistan"],
              ["Industry", "Home Services Technology"],
              ["Stage", "Pre Launch / Waitlist"],
              ["Website", "tasklync.pk"],
              ["Category", "Home Services Marketplace"],
              ["Focus", "Trust and Verification Infrastructure"],
              ["Press contact", "press@tasklync.pk"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between border-b border-[rgba(31,111,95,0.07)] pb-3"
              >
                <span
                  className="text-[rgba(13,31,28,0.5)] text-[13px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {k}
                </span>

                <span
                  className="text-[#0D1F1C] text-[13.5px] font-medium ml-4 text-right"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}