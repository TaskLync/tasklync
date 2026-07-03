const boilerplates = [
  {
    length: "One sentence",
    text: "TaskLync is a trust focused home services platform building a more reliable way for homeowners to connect with verified professionals across Pakistan.",
  },
  {
    length: "One paragraph",
    text: "TaskLync is a Pakistan based technology company building a modern platform for home services. The company is focused on improving trust, accountability, and transparency in a category that has historically relied on informal referrals and inconsistent service standards. TaskLync is developing verification systems designed to help homeowners connect with professionals more confidently while giving skilled service providers a platform where quality and reliability matter more than visibility alone.",
  },
  {
    length: "Extended (for profiles and features)",
    text: "TaskLync is a Pakistan based startup building infrastructure for trust in the home services industry. Founded in 2026, the company is focused on creating a platform where homeowners can discover and hire professionals through a more structured and verification driven experience. Rather than operating as a traditional classified marketplace, TaskLync is building systems around accountability, professional standards, and long term platform reliability. The company is currently in its early stage and is preparing for its initial launch while continuing to develop product infrastructure, professional onboarding systems, and marketplace operations.",
  },
];

const keyFacts = [
  ["Founded", "2026"],
  ["Headquarters", "Pakistan"],
  ["Industry", "Home Services Technology"],
  ["Stage", "Pre Launch / Waitlist"],
  ["Website", "tasklync.pk"],
  ["Category", "Home Services Marketplace"],
  ["Focus", "Trust and Verification Infrastructure"],
  ["Press contact", "press@tasklync.pk"],
];

export default function CompanyBoilerplate() {
  return (
    <section className="w-full bg-[#F7F7F5] py-20 lg:py-32 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.1)]">
      <div className="mx-auto w-full" style={{ maxWidth: "1200px" }}>
        <span
          className="inline-block mb-4 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.14em]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Company Description
        </span>

        <h2
          className="text-[#0D1F1C] font-bold leading-[1.1] tracking-[-0.025em] mb-4"
          style={{
            fontFamily: "'Fredoka', sans-serif",
            fontSize: "clamp(1.85rem, 3.6vw, 2.85rem)",
          }}
        >
          Boilerplate copy
        </h2>

        <p
          className="text-[rgba(13,31,28,0.52)] leading-[1.8] mb-12 max-w-[460px]"
          style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}
        >
          Use these descriptions for articles, profiles, interviews, company
          references, and media coverage related to TaskLync. For additional
          information, contact{" "}
          <a
            href="mailto:press@tasklync.pk"
            className="text-[#1F6F5F] underline underline-offset-2"
          >
            press@tasklync.pk
          </a>
          .
        </p>

        {/* Boilerplate cards — landscape */}
        <div className="space-y-5">
          {boilerplates.map((b) => (
            <div
              key={b.length}
              className="bg-white border border-[rgba(31,111,95,0.1)] rounded-2xl overflow-hidden"
            >
              <div className="bg-[#F7F7F5] border-b border-[rgba(31,111,95,0.1)] px-6 py-3">
                <span
                  className="text-[#0D1F1C] text-[12px] font-semibold uppercase tracking-[0.07em]"
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  {b.length}
                </span>
              </div>

              <div className="px-6 py-5">
                <p
                  className="text-[rgba(13,31,28,0.68)] leading-[1.85]"
                  style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13.5px" }}
                >
                  {b.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Key facts */}
        <div className="mt-20">
          <h3
            className="text-[#0D1F1C] font-semibold text-[13px] uppercase tracking-[0.08em] mb-6"
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            Key facts for accuracy
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyFacts.map(([k, v]) => (
              <div
                key={k}
                className="bg-white border border-[rgba(31,111,95,0.1)] rounded-2xl p-5"
              >
                <span
                  className="block text-[rgba(13,31,28,0.45)] text-[11px] uppercase tracking-[0.06em] mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {k}
                </span>

                <span
                  className="block text-[#0D1F1C] font-semibold text-[14px]"
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
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