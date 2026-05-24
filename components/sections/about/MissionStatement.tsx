import missionImage from "../../../public/images/about/mission-home-service.jpg";

export default function MissionStatement() {
  return (
    <section className="bg-[#F7F7F5] pt-20 pb-16 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.12)]">
      <div className="w-full mx-auto">
        <span
          className="inline-block mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Our Mission
        </span>

        <h1
          className="text-[#0D1F1C] font-bold leading-[1.06] tracking-[-0.03em] mb-8"
          style={{
            fontFamily: "var(--font-clash)",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
          }}
        >
          We are building the infrastructure of trust.
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10 items-center">
          {/* Left Content */}
          <div>
            <p
              className="text-[#0D1F1C] text-[16px] leading-[1.75]"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Home services are a multi trillion dollar category where trust is still largely built on word of mouth and luck rather than structured systems. Homeowners are expected to accept risk as part of the process, never fully sure whether the person they hire will show up on time, do the job correctly, or charge fairly. At the same time, skilled and experienced professionals with real credentials are forced to compete in the same space as unverified individuals who simply have a phone number and availability, making it difficult for quality and reliability to stand out. We believe this imbalance is not just inefficient, but something that can and should be fixed through a more transparent and trust-driven system.
            </p>

            <p
              className="text-[rgba(13,31,28,0.6)] text-[15px] leading-[1.8] mt-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              TaskLync is a vetted marketplace where trust is built into the system from the start. Every professional on the platform goes through a thorough verification process that includes identity confirmation, criminal background screening, license validation, and insurance verification before they are allowed to take their first job. This ensures that only qualified and reliable individuals are matched with customers. Homeowners can book services with confidence knowing they are hiring verified professionals, while professionals are able to compete based on the quality of their work and reputation rather than marketing budgets or visibility tricks.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[180px] sm:h-[260px] lg:h-[420px] rounded-2xl overflow-hidden border border-[rgba(31,111,95,0.12)] shadow-sm">
          <img
            src="/images/about/mission-home-service.avif"
            alt="Professional completing verified home service work"
            className="w-full h-full object-cover"
           />
          </div>
        </div>
      </div>
    </section>
  );
}