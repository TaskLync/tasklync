const assets = [
  {
    category: "Logos",
    items: [
      {
        name: "Primary Logo",
        format: "SVG",
        usage: "Main brand logo for editorial and digital use.",
        file: "images/press/tasklync-logo-primary.svg",
      },
      {
        name: "Primary Logo",
        format: "PNG",
        usage: "Transparent background version for general use.",
        file: "images/press/tasklync-logo-primary@2x.png",
      },
      {
        name: "Dark Background Logo",
        format: "SVG",
        usage: "Optimized for dark surfaces and overlays.",
        file: "images/press/tasklync-logo-dark.svg",
      },
      {
        name: "TaskLync Symbol",
        format: "SVG",
        usage: "App icon, favicon, and square placements.",
        file: "images/press/tasklync-icon.svg",
      },
    ],
  },
  // {
  //   category: "Product Screens",
  //   items: [
  //     {
  //       name: "Homepage Experience",
  //       format: "PNG",
  //       usage: "Desktop product screenshot.",
  //       file: "/press/screenshot-homepage-desktop.png",
  //     },
  //     {
  //       name: "Professional Profile",
  //       format: "PNG",
  //       usage: "Verified professional profile interface.",
  //       file: "/press/screenshot-professional-profile.png",
  //     },
  //     {
  //       name: "Mobile Booking Flow",
  //       format: "PNG",
  //       usage: "Customer booking experience on mobile.",
  //       file: "/press/screenshot-booking-mobile.png",
  //     },
  //     {
  //       name: "Verification Dashboard",
  //       format: "PNG",
  //       usage: "Internal vetting and verification system.",
  //       file: "/press/screenshot-vetting-dashboard.png",
  //     },
  //   ],
  // },
];

export default function PressKit() {
  return (
    <section className="w-full bg-[#F7F7F5] py-20 lg:py-32 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.1)] overflow-hidden">
      <div className="mx-auto w-full" style={{ maxWidth: "1200px" }}>
        <span
          className="inline-block mb-4 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.14em]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Press Kit
        </span>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-14">
          <div>
            <h2
              className="text-[#0D1F1C] font-bold leading-[1.1] tracking-[-0.025em]"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: "clamp(1.85rem, 3.6vw, 2.85rem)",
              }}
            >
              Brand and media assets
            </h2>

            <p
              className="text-[rgba(13,31,28,0.52)] leading-[1.8] mt-4 max-w-[460px]"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "0.9rem" }}
            >
              Official TaskLync logos, founder photos, product screenshots,
              and media resources for publications, articles, interviews,
              and editorial coverage.
            </p>
          </div>

        </div>

        <div className="space-y-14">
          {assets.map((cat) => (
            <div key={cat.category}>
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-[rgba(31,111,95,0.1)]">
                <h3
                  className="text-[#0D1F1C] font-semibold text-[13px] uppercase tracking-[0.08em]"
                  style={{ fontFamily: "'Fredoka', sans-serif" }}
                >
                  {cat.category}
                </h3>

                <div
                  className="text-[rgba(13,31,28,0.4)] text-[12px]"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {cat.items.length} Assets
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {cat.items.map((item) => (
                  <div
                    key={`${cat.category}-${item.name}-${item.format}`}
                    className="group relative w-full bg-white border border-[rgba(31,111,95,0.1)] rounded-2xl hover:border-[rgba(31,111,95,0.18)] hover:shadow-md transition-all"
                  >
                    {/* Square ratio box — padding-top trick guarantees 1:1 regardless of Tailwind version */}
                    <div className="relative w-full" style={{ paddingTop: "100%" }}>
                      <div className="absolute inset-0 p-5 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className="shrink-0 inline-flex items-center justify-center h-7 px-2.5 rounded-lg bg-[rgba(31,111,95,0.08)] text-[#1F6F5F] text-[11px] font-semibold uppercase tracking-[0.06em]"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            {item.format}
                          </span>
                        </div>

                        <div>
                          <h4
                            className="text-[#0D1F1C] text-[14px] font-semibold leading-snug"
                            style={{ fontFamily: "'Fredoka', sans-serif" }}
                          >
                            {item.name}
                          </h4>

                          <p
                            className="text-[rgba(13,31,28,0.5)] leading-[1.6] mt-2 line-clamp-3"
                            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12.5px" }}
                          >
                            {item.usage}
                          </p>

                          <a
                            href={item.file}
                            download
                            className="inline-flex items-center text-[#1F6F5F] text-[12.5px] font-medium underline underline-offset-2 hover:opacity-70 transition-opacity mt-3"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                          >
                            Download Asset
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}