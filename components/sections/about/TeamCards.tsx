const team = [
  {
    name: "Furqan",
    role: "Co-Founder",
    bio: "Software Engineering student and builder focused on product design and system architecture. Responsible for shaping the core platform, user experience, and technical execution of TaskLync from the ground up.",
    location: "Remote",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Uzair",
    role: "Co-Founder",
    bio: "Software Engineering student with a focus on backend systems, platform reliability, and scalable architecture. Leads technical development and ensures the foundation of TaskLync is built for long-term growth.",
    location: "Remote",
    linkedin: "https://linkedin.com",
  },
];

export default function TeamCards() {
  return (
    <section className="bg-[#F7F7F5] py-20 px-6 sm:px-10 lg:px-16 border-b border-[rgba(31,111,95,0.1)]">
      <div className="max-w-5xl mx-auto">
        <span
          className="inline-block mb-5 text-[#1F6F5F] uppercase text-[11px] font-semibold tracking-[0.12em]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          The Team
        </span>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-12">
          <h2
            className="text-[#0D1F1C] font-bold leading-[1.08] tracking-[-0.03em]"
            style={{
              fontFamily: "var(--font-clash)",
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            }}
          >
            Built by students, focused on real-world problems
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[rgba(31,111,95,0.1)] rounded-2xl overflow-hidden border border-[rgba(31,111,95,0.1)]">
          {team.map((member) => (
            <div key={member.name} className="bg-[#F7F7F5] p-8 flex flex-col">
              <div className="w-14 h-14 rounded-2xl bg-[rgba(31,111,95,0.08)] border border-[rgba(31,111,95,0.15)] flex items-center justify-center mb-6">
                <span
                  className="text-[#1F6F5F] font-bold text-[18px]"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>

              <div className="mb-1">
                <h3
                  className="text-[#0D1F1C] font-semibold text-[17px] tracking-[-0.02em]"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  {member.name}
                </h3>
                <div
                  className="text-[#1F6F5F] text-[12.5px] font-medium mt-0.5"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {member.role}
                </div>
              </div>

              <p
                className="text-[rgba(13,31,28,0.58)] text-[13.5px] leading-[1.7] mt-4 mb-6"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {member.bio}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <span
                  className="text-[rgba(13,31,28,0.4)] text-[12px]"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {member.location}
                </span>

                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1F6F5F] text-[12.5px] font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}