export default function ContactHero() {
  return (
    <section className="bg-[#F7F7F5] pt-20 pb-14 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.1)]">
      <div className="max-w-5xl mx-auto">
        <span
          className="inline-block mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Get In Touch
        </span>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
          <div>
            <h1
              className="text-[#0D1F1C] font-bold leading-[1.06] tracking-[-0.03em]"
              style={{
                fontFamily: "'Fredoka', sans-serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
              }}
            >
              Contact TaskLync
            </h1>
          </div>
          <p
            className="text-[rgba(13,31,28,0.6)] text-[15px] leading-[1.8]"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Select the category that matches your enquiry below. Each type
            routes to the right person on our team and carries a specific
            response time commitment. We do not have a general inbox.
          </p>
        </div>
      </div>
    </section>
  );
}