const values = [
  {
    title: "Verification before velocity",
    description:
      "We will never trade a shortcut in the vetting process for faster growth. The six-step process exists because every step has caught something. When we find a new failure mode, we add a check. We do not remove checks to reduce friction for professionals who cannot clear them.",
  },
  {
    title: "Accountability with a name attached",
    description:
      "Every policy decision on this platform has a named person responsible for it. Every professional has a verified identity on file. Every dispute is handled by a human, not closed by an algorithm. We believe anonymity in high-stakes transactions is a feature that platforms add to protect themselves, not their users.",
  },
  {
    title: "Specificity over scale",
    description:
      "We launched in one city. We intend to be genuinely excellent there before expanding. We would rather serve 500 homeowners who trust us completely than 50,000 who use us because we showed up first in a search result. This affects every decision we make about where to invest attention.",
  },
  {
    title: "Professionals are partners, not inventory",
    description:
      "We charge professionals a fair fee for access to verified demand. We do not take a cut that makes sustainable pricing impossible. We do not remove professionals from the platform without documented cause and a clear appeals process. A marketplace that treats supply poorly will always have a supply problem.",
  },
];

export default function CompanyValues() {
  return (
    <section className="bg-[#F7F7F5] py-20 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.1)]">
      <div className="max-w-5xl mx-auto">
        <span
          className="inline-block mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          How We Operate
        </span>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <h2
            className="text-[#0D1F1C] font-bold leading-[1.08] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            }}
          >
            Four values we actually operate by
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[rgba(31,111,95,0.1)] rounded-2xl overflow-hidden border border-[rgba(31,111,95,0.1)]">
          {values.map((v, i) => (
            <div key={i} className="bg-[#F7F7F5] p-8">
              <div
                className="text-[rgba(13,31,28,0.2)] font-bold text-[11px] tracking-[0.08em] uppercase mb-4"
                style={{ fontFamily: "var(--font-clash)" }}
              >
                0{i + 1}
              </div>
              <h3
                className="text-[#0D1F1C] font-semibold text-[16px] tracking-[-0.02em] leading-snug mb-4"
                style={{ fontFamily: "var(--font-clash)" }}
              >
                {v.title}
              </h3>
              <p
                className="text-[rgba(13,31,28,0.58)] text-[13.5px] leading-[1.75]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}