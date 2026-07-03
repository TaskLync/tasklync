export function BlogHero() {
  return (
    <section
      className="relative pt-[100px] sm:pt-[120px] pb-14 overflow-hidden"
      style={{ background: '#F7F7F2' }}
    >
      {/* Dot texture */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(13,31,28,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Subtle green radial glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 rounded-full"
        style={{
          background: 'radial-gradient(ellipse, rgba(31,111,95,0.07) 0%, transparent 70%)',
        }}
      />
      <div className="relative z-10 mx-auto max-w-[1300px] px-6 sm:px-10 lg:px-16">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 mb-5 font-['Poppins'] text-[11px] font-bold uppercase tracking-[0.12em]"
          style={{ color: '#1F6F5F' }}
        >
          The TaskLync Blog
        </div>
        {/* Headline */}
        <h1
          className="font-['Fredoka'] font-bold leading-[1.05] tracking-[-0.03em] mb-5"
          style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', color: '#0D1F1C' }}
        >
          Home Services,{' '}
          <span
            style={{
              backgroundImage: 'linear-gradient(100deg,#1F6F5F 0%,#2FA084 60%,#6FCF97 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Demystified.
          </span>
        </h1>
        {/* Subtitle */}
        <p
          className="font-['Poppins'] max-w-xl leading-[1.72]"
          style={{ fontSize: '1rem', color: 'rgba(13,31,28,0.48)' }}
        >
          Expert guides on hiring the right professional, what home services
          actually cost, and what's happening inside TaskLync.
        </p>
      </div>
    </section>
  );
}