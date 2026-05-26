const limitations = [
  {
    area: "PDF documents",
    status: "Partial",
    detail:
      "Some PDF documents linked from the platform, particularly older trade licence templates, may not be fully accessible to screen readers. We are migrating all documents to accessible HTML alternatives.",
  },
  {
    area: "Third-party payment widget",
    status: "Third-party",
    detail:
      "The payment entry form is rendered by our payment processor in an iframe. We have reviewed their published accessibility statement and confirmed WCAG 2.1 AA conformance. We are monitoring their upgrade to WCAG 2.2.",
  },
  {
    area: "Map interface",
    status: "Partial",
    detail:
      "The professional location map used during booking is not fully keyboard navigable. A text-based list alternative is available on all screens where the map appears. We are working with our mapping provider to improve this.",
  },
  {
    area: "Image uploads",
    status: "Partial",
    detail:
      "The drag-and-drop interface for job photo uploads is not accessible via keyboard alone. A click-to-browse fallback is available and functions correctly with keyboard and screen reader.",
  },
];

export default function KnownLimitations() {
  return (
    <section className="bg-[#F7F7F5] py-20 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.1)]">
      <div className="max-w-5xl mx-auto">
        <span
          className="inline-block mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Known Limitations
        </span>

        <h2
          className="text-[#0D1F1C] font-bold leading-[1.08] tracking-[-0.03em] mb-4"
          style={{
            fontFamily: "var(--font-clash)",
            fontSize: "clamp(1.7rem, 2.8vw, 2.3rem)",
          }}
        >
          Where we are not yet fully conformant
        </h2>

        <p
          className="text-[rgba(13,31,28,0.6)] text-[14.5px] leading-[1.8] mb-10 max-w-2xl"
          style={{ fontFamily: "var(--font-body)" }}
        >
          We document known limitations honestly. Where we are aware of a
          gap, we list it here along with the alternative we provide and our
          remediation plan.
        </p>

        <div className="space-y-3">
          {limitations.map((l) => (
            <div
              key={l.area}
              className="bg-white border border-[rgba(31,111,95,0.1)] rounded-xl p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3
                  className="text-[#0D1F1C] font-semibold text-[14.5px] tracking-[-0.01em]"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  {l.area}
                </h3>
                <span
                  className="shrink-0 inline-block px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-[0.06em] uppercase bg-[rgba(31,111,95,0.08)] text-[#1F6F5F]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {l.status}
                </span>
              </div>
              <p
                className="text-[rgba(13,31,28,0.6)] text-[13.5px] leading-[1.7]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {l.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}