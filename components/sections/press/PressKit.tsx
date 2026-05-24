const assets = [
  {
    category: "Logos",
    items: [
      {
        name: "Primary Logo",
        format: "SVG",
        usage: "Main brand logo for editorial and digital use.",
        file: "/press/tasklync-logo-primary.svg",
      },
      {
        name: "Primary Logo",
        format: "PNG",
        usage: "Transparent background version for general use.",
        file: "/press/tasklync-logo-primary@2x.png",
      },
      {
        name: "Dark Background Logo",
        format: "SVG",
        usage: "Optimized for dark surfaces and overlays.",
        file: "/press/tasklync-logo-dark.svg",
      },
      {
        name: "TaskLync Symbol",
        format: "SVG",
        usage: "App icon, favicon, and square placements.",
        file: "/press/tasklync-icon.svg",
      },
    ],
  },
  {
    category: "Founder Photos",
    items: [
      {
        name: "Furqan, Co-Founder",
        format: "JPG",
        usage: "High resolution editorial headshot.",
        file: "/press/headshot-furqan.jpg",
      },
      {
        name: "Uzair, Co-Founder",
        format: "JPG",
        usage: "High resolution editorial headshot.",
        file: "/press/headshot-uzair.jpg",
      },
      {
        name: "Founding Team",
        format: "JPG",
        usage: "Official TaskLync founders photo.",
        file: "/press/headshot-team.jpg",
      },
    ],
  },
  {
    category: "Product Screens",
    items: [
      {
        name: "Homepage Experience",
        format: "PNG",
        usage: "Desktop product screenshot.",
        file: "/press/screenshot-homepage-desktop.png",
      },
      {
        name: "Professional Profile",
        format: "PNG",
        usage: "Verified professional profile interface.",
        file: "/press/screenshot-professional-profile.png",
      },
      {
        name: "Mobile Booking Flow",
        format: "PNG",
        usage: "Customer booking experience on mobile.",
        file: "/press/screenshot-booking-mobile.png",
      },
      {
        name: "Verification Dashboard",
        format: "PNG",
        usage: "Internal vetting and verification system.",
        file: "/press/screenshot-vetting-dashboard.png",
      },
    ],
  },
];

export default function PressKit() {
  return (
    <section className="bg-[#F7F7F5] py-20 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.1)]">
      <div className="max-w-6xl mx-auto">
        <span
          className="inline-block mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Press Kit
        </span>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-14">
          <div>
            <h2
              className="text-[#0D1F1C] font-bold leading-[1.08] tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-clash)",
                fontSize: "clamp(1.9rem, 3vw, 2.7rem)",
              }}
            >
              Brand and media assets
            </h2>

            <p
              className="text-[rgba(13,31,28,0.58)] text-[14px] leading-[1.75] mt-4 max-w-2xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Official TaskLync logos, founder photos, product screenshots,
              and media resources for publications, articles, interviews,
              and editorial coverage.
            </p>
          </div>

          <a
            href="/press/tasklync-press-kit.zip"
            className="inline-flex items-center justify-center h-11 px-5 rounded-xl border border-[rgba(31,111,95,0.18)] text-[#0D1F1C] text-[13px] font-medium hover:bg-[#F7F7F5] transition-colors flex-shrink-0"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Download Full Kit
          </a>
        </div>

        <div className="space-y-14">
          {assets.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[rgba(31,111,95,0.1)]">
                <h3
                  className="text-[#0D1F1C] font-semibold text-[13px] uppercase tracking-[0.08em]"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  {cat.category}
                </h3>

                <div
                  className="text-[rgba(13,31,28,0.4)] text-[12px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {cat.items.length} Assets
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.items.map((item) => (
                  <div
                    key={`${cat.category}-${item.name}-${item.format}`}
                    className="bg-white border border-[rgba(31,111,95,0.1)] rounded-2xl p-5 flex flex-col justify-between hover:border-[rgba(31,111,95,0.18)] transition-colors"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h4
                            className="text-[#0D1F1C] text-[14px] font-semibold leading-[1.5]"
                            style={{ fontFamily: "var(--font-clash)" }}
                          >
                            {item.name}
                          </h4>

                          <p
                            className="text-[rgba(13,31,28,0.55)] text-[13px] leading-[1.7] mt-2"
                            style={{ fontFamily: "var(--font-body)" }}
                          >
                            {item.usage}
                          </p>
                        </div>

                        <span
                          className="flex-shrink-0 inline-flex items-center justify-center h-7 px-2.5 rounded-lg bg-[rgba(31,111,95,0.08)] text-[#1F6F5F] text-[11px] font-semibold uppercase tracking-[0.06em]"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {item.format}
                        </span>
                      </div>
                    </div>

                    <a
                      href={item.file}
                      download
                      className="inline-flex items-center text-[#1F6F5F] text-[13px] font-medium underline underline-offset-2 hover:opacity-70 transition-opacity mt-3"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      Download Asset
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* EXTRA SEPARATED GUIDELINES SECTION */}
        <div className="border-t border-[rgba(31,111,95,0.08)] p-5">
          <div className="bg-[#F7F7F5] border border-[rgba(31,111,95,0.12)] rounded-2xl p-10">
            <p
              className="text-[rgba(13,31,28,0.62)] text-[13.5px] leading-[1.8]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <strong className="text-[#0D1F1C]">
                Usage guidelines:
              </strong>{" "}
              TaskLync media assets may be used for editorial and press
              coverage without prior approval. Logos and visual assets should
              not be modified, distorted, recolored, or used in ways that
              imply endorsement or partnership without written permission.
              For additional requests or custom media enquiries, contact{" "}
              <a
                href="mailto:press@tasklync.pk"
                className="text-[#1F6F5F] underline underline-offset-2"
              >
                press@tasklync.pk
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}