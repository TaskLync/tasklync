export default function FoundingStory() {
  return (
    <section className="bg-white py-20 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.1)]">
      <div className="w-full mx-auto">
        <span
          className="inline-block mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          How We Started
        </span>

        <h2
          className="text-[#0D1F1C] font-bold leading-[1.08] tracking-[-0.03em] mb-12"
          style={{
            fontFamily: "var(--font-clash)",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          }}
        >
          The founding story
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <p
              className="text-[#0D1F1C] text-[15.5px] leading-[1.8]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              TaskLync began with a simple observation. Finding reliable local professionals was still inconsistent, unstructured, and often based more on guesswork than trust.

Across home repairs, maintenance, and everyday services, the experience lacked transparency, accountability, and consistency for both homeowners and skilled professionals. Qualified professionals struggled to stand out, while customers were often left uncertain about who they could actually trust.

That gap became the foundation for TaskLync.
            </p>
            <p
              className="text-[#0D1F1C] text-[15.5px] leading-[1.8]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              We experienced firsthand how difficult it can be to get small but important tasks done without uncertainty. Whether it was home repairs, maintenance, or everyday services, the process lacked transparency and accountability. That shared frustration turned into a discussion, and that discussion eventually became the foundation of TaskLync.
            </p>
            <p
              className="text-[#0D1F1C] text-[15.5px] leading-[1.8]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              We started building TaskLync as a way to bring structure, verification, and trust into a space that has traditionally been informal and fragmented. What began as a university idea between two peers quickly evolved into a focused product vision, a vetted marketplace where quality and reliability come first.
            </p>
            <p
              className="text-[#0D1F1C] text-[15.5px] leading-[1.8]"
              style={{ fontFamily: "var(--font-body)" }}
            >
             We are still early in our journey, building step by step, learning fast, and improving continuously. But the belief is clear, trust in local services should not be accidental, it should be engineered.
            </p>
          </div>

          {/* Pull quote + context box */}
          <div className="lg:col-span-5 space-y-6">

            <div className="border border-[rgba(31,111,95,0.12)] rounded-2xl p-8 space-y-4">
              <div
                className="text-[#0D1F1C] font-semibold text-[13px] uppercase tracking-[0.08em]"
                style={{ fontFamily: "var(--font-clash)" }}
              >
                By the numbers at founding
              </div>
              {[
                ["60", "Homeowner interviews completed"],
                ["20", "Trade professionals interviewed"],
                ["3", "Months of research before first line of code"],
                ["March 2026", "Date of incorporation"],
              ].map(([n, l]) => (
                <div
                  key={l}
                  className="flex items-baseline justify-between border-t border-[rgba(31,111,95,0.08)] pt-3"
                >
                  <span
                    className="text-[#1F6F5F] font-bold text-[15px]"
                    style={{ fontFamily: "var(--font-clash)" }}
                  >
                    {n}
                  </span>
                  <span
                    className="text-[rgba(13,31,28,0.55)] text-[12px] text-right ml-4 max-w-40"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {l}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}