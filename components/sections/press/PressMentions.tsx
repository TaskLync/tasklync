export default function PressMentions() {
  const mentions = [
    {
      publication: "TaskLync Journal",
      headline:
        "Why TaskLync is building a trust-first platform for home services in Pakistan",
      date: "May 2026",
      url: "#",
      type: "Company Update",
    },
    {
      publication: "Founder Story",
      headline:
        "The problem that led to the creation of TaskLync and the vision behind the platform",
      date: "April 2026",
      url: "#",
      type: "Story",
    },
    {
      publication: "Platform Update",
      headline:
        "Inside the verification systems designed to improve trust and accountability",
      date: "March 2026",
      url: "#",
      type: "Product",
    },
  ];

  return (
    <section className="bg-[#F7F7F5] py-20 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.1)]">
      <div className="max-w-6xl mx-auto">
        <span
          className="inline-block mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Coverage
        </span>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-14">
          {/* Left Content */}
          <div>
            <h2
              className="text-[#0D1F1C] font-bold leading-[1.08] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(1.9rem, 3vw, 2.8rem)",
              }}
            >
              Press and announcements
            </h2>

            <p
              className="mt-5 text-[rgba(13,31,28,0.64)] text-[15px] leading-[1.8] max-w-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              TaskLync is currently in its early stage. This section includes
              company updates, founder stories, platform announcements, and
              future media coverage related to the product, trust systems, and
              the broader home services industry in Pakistan.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative overflow-hidden rounded-3xl border border-[rgba(31,111,95,0.12)] bg-white shadow-sm">
            <img
              src="/images/press/press-announcement.jpeg"
              alt="Professional home service work"
              className="w-full h-[140px] sm:h-[220px] lg:h-[100%] object-cover"
            />
          </div>
        </div>

        {/* Mentions */}
        <div className="space-y-4">
          {mentions.map((m, i) => (
            <a
              key={`${m.publication}-${m.date}-${i}`}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 bg-white border border-[rgba(31,111,95,0.1)] rounded-2xl p-6 hover:border-[rgba(31,111,95,0.25)] hover:bg-[#F9FAF9] transition-all duration-200"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className="text-[#0D1F1C] font-semibold text-[14px]"
                    style={{ fontFamily: "var(--font-clash)" }}
                  >
                    {m.publication}
                  </span>

                  <span
                    className="inline-flex items-center rounded-full bg-[rgba(31,111,95,0.08)] px-2.5 py-1 text-[10.5px] uppercase tracking-[0.08em] font-semibold text-[#1F6F5F]"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {m.type}
                  </span>
                </div>

                <p
                  className="text-[rgba(13,31,28,0.72)] text-[15px] leading-[1.7] max-w-3xl"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {m.headline}
                </p>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-5 flex-shrink-0">
                <span
                  className="text-[rgba(13,31,28,0.42)] text-[12.5px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {m.date}
                </span>

                <span
                  className="text-[#1F6F5F] text-[13px] font-medium hover:underline underline-offset-4"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  View
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 bg-white border border-[rgba(31,111,95,0.12)] rounded-2xl p-6">
          <p
            className="text-[rgba(13,31,28,0.58)] text-[13.5px] leading-[1.75]"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Are you a journalist, publication, podcast, or creator interested
            in covering TaskLync? Reach out at{" "}
            <a
              href="mailto:press@tasklync.pk"
              className="text-[#1F6F5F] underline underline-offset-2"
            >
              press@tasklync.pk
            </a>{" "}
            for interviews, company information, founder commentary, or media
            assets.
          </p>
        </div>
      </div>
    </section>
  );
}