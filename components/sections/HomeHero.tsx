"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";

// ─── Types ────────────────────────────────────────────────────────────────────

type TransitionType = "door" | "grid" | "diagonal" | "iris" | "venetian" | "cube";

interface Slide {
  image: string;
  alt: string;
  headline: React.ReactNode;
  sub: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  transition: TransitionType;
}

// ─── Slide Data ───────────────────────────────────────────────────────────────

const SLIDES: Slide[] = [
  {
    image: "tasklync-app-booking-professional-pakistan.png",
    alt: "Person booking a home service professional on the TaskLync app in Pakistan",
    headline: (
      <>
        Your Home Expert,{" "}
        <em className="not-italic text-[#4ECBA5]">One Tap Away</em>
      </>
    ),
    sub: "Browse verified professionals nearby and book instantly, all from your phone.",
    primaryCta: { label: "Download App", href: "#download" },
    secondaryCta: { label: "Find a Pro", href: "/services" },
    transition: "door",
  },
  {
    image: "verified-home-service-professional-working-pakistan.png",
    alt: "Verified TaskLync professional completing a home service job in Pakistan",
    headline: (
      <>
        Top Tier Talent,{" "}
        <em className="not-italic text-[#4ECBA5]">In Your Home</em>
      </>
    ),
    sub: "Every professional is background verified, rated, and ready to deliver quality work.",
    primaryCta: { label: "Download App", href: "#download" },
    secondaryCta: { label: "Meet the Pros", href: "/for-professionals" },
    transition: "grid",
  },
  {
    image: "instant-home-service-booking-confirmation-tasklync.png",
    alt: "TaskLync professional confirming instant job booking and arrival in Pakistan",
    headline: (
      <>
        Pros Arrive{" "}
        <em className="not-italic text-[#4ECBA5]">Before You Blink</em>
      </>
    ),
    sub: "Real time dispatch. Fast response. Fair pricing. Zero hidden fees.",
    primaryCta: { label: "Download App", href: "#download" },
    secondaryCta: { label: "How It Works", href: "/how-it-works" },
    transition: "diagonal",
  },
  {
    image: "homeowner-trusting-tasklync-professional-home-services.png",
    alt: "Pakistani homeowner confidently welcoming a trusted TaskLync professional",
    headline: (
      <>
        Your Home,{" "}
        <em className="not-italic text-[#4ECBA5]">Your Trust</em>
      </>
    ),
    sub: "Escrow payments, ID verified pros, and our TaskLync guarantee every single booking.",
    primaryCta: { label: "Download App", href: "#download" },
    secondaryCta: { label: "Our Guarantee", href: "/safety" },
    transition: "iris",
  },
  {
    image: "tasklync-branded-professional-uniform-badge-pakistan.png",
    alt: "TaskLync branded badge on a professional uniform representing quality and mission",
    headline: (
      <>
        Built for{" "}
        <em className="not-italic text-[#4ECBA5]">Pakistan&apos;s Homes</em>
      </>
    ),
    sub: "A movement to formalize home services and empower skilled workers across Pakistan.",
    primaryCta: { label: "Download App", href: "#download" },
    secondaryCta: { label: "Our Story", href: "/blog/our-founding-story" },
    transition: "venetian",
  },
  {
    image: "tasklync-home-services-coverage-across-pakistan-cities.png",
    alt: "Aerial drone view of Pakistani city neighbourhoods showing TaskLync city-wide service coverage",
    headline: (
      <>
        Every Street.{" "}
        <em className="not-italic text-[#4ECBA5]">Every Home.</em>{" "}
        Every City.
      </>
    ),
    sub: "From Karachi to Lahore to Faisalabad, scaling across Pakistan, one city at a time.",
    primaryCta: { label: "Download App", href: "#download" },
    secondaryCta: { label: "See Coverage", href: "/blog/where-is-tasklync-available-right-now" },
    transition: "cube",
  },
];

const AUTO_PLAY_MS = 5500;
const BG = "#0D1F1C";

// ─── Easing ───────────────────────────────────────────────────────────────────

const ease = {
  outCubic:  (t: number) => 1 - Math.pow(1 - t, 3),
  inOutQuad: (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  outQuint:  (t: number) => 1 - Math.pow(1 - t, 5),
};

// ─── Transition Runners ───────────────────────────────────────────────────────

type Runner = (ctx: CanvasRenderingContext2D, W: number, H: number, onDone: () => void) => void;

function loop(draw: (p: number) => boolean, onDone: () => void, step = 0.04) {
  let p = 0;
  const tick = () => {
    p = Math.min(1, p + step);
    if (!draw(p)) requestAnimationFrame(tick);
    else onDone();
  };
  requestAnimationFrame(tick);
}

const RUNNERS: Record<TransitionType, Runner> = {
  door: (ctx, W, H, done) =>
    loop((p) => {
      const open = (W / 2) * ease.outCubic(p);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = BG;
      const rem = W / 2 - open;
      if (rem > 0) { ctx.fillRect(0, 0, rem, H); ctx.fillRect(W / 2 + open, 0, rem, H); }
      return p >= 1;
    }, done, 0.048),

  grid: (ctx, W, H, done) => {
    const cols = 6, rows = 4, tw = W / cols, th = H / rows;
    const tiles = Array.from({ length: rows * cols }, (_, i) => ({
      x: (i % cols) * tw, y: Math.floor(i / cols) * th,
      delay: (Math.floor(i / cols) + (i % cols)) * 0.026,
    }));
    let t = 0;
    const tick = () => {
      t += 0.044;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = BG;
      let allDone = true;
      for (const tile of tiles) {
        const p = Math.max(0, Math.min(1, (t - tile.delay) / 0.4));
        if (p < 1) allDone = false;
        const alpha = 1 - ease.outCubic(p);
        if (alpha > 0.005) { ctx.globalAlpha = alpha; ctx.fillRect(tile.x, tile.y, tw, th); }
      }
      ctx.globalAlpha = 1;
      if (!allDone) requestAnimationFrame(tick); else done();
    };
    requestAnimationFrame(tick);
  },

  diagonal: (ctx, W, H, done) =>
    loop((p) => {
      const pos = ease.outCubic(p) * (W + H);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = BG;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.min(pos, W), 0);
      if (pos > W) ctx.lineTo(W, pos - W);
      ctx.lineTo(0, Math.min(pos, H));
      ctx.closePath();
      ctx.fill();
      return p >= 1;
    }, done, 0.05),

  iris: (ctx, W, H, done) => {
    const cx = W / 2, cy = H / 2;
    const maxR = Math.sqrt(cx * cx + cy * cy) + 10;
    let t = 0;
    const tick = () => {
      t += 0.055;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = BG;
      if (t <= 1) {
        const r = maxR * (1 - ease.outCubic(Math.min(t, 1)));
        ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath(); ctx.arc(cx, cy, Math.max(0, r), 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      } else {
        const t2 = t - 1;
        const r = maxR * ease.outQuint(Math.min(t2, 1));
        ctx.fillRect(0, 0, W, H);
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
        ctx.globalCompositeOperation = "source-over";
        if (t2 >= 1) { done(); return; }
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  },

  venetian: (ctx, W, H, done) => {
    const slats = 9, sh = H / slats;
    loop((p) => {
      const e = ease.outCubic(p);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = BG;
      for (let i = 0; i < slats; i++) {
        const h = sh * (1 - e);
        if (h > 0) ctx.fillRect(0, i * sh, W, h);
      }
      return p >= 1;
    }, done, 0.055);
  },

  cube: (ctx, W, H, done) =>
    loop((p) => {
      const x = W * ease.inOutQuad(p);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = BG;
      if (W - x > 0) ctx.fillRect(0, 0, W - x, H);
      return p >= 1;
    }, done, 0.055),
};

// ─── Icons ────────────────────────────────────────────────────────────────────

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 12l-5 5-5-5M12 17V3M5 21h14" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function NavArrow({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      {dir === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HomeHero() {
  const { show } = useToast();

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(true);

  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const autoRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchX     = useRef(0);
  const currentRef = useRef(0);

  useEffect(() => { currentRef.current = current; }, [current]);

  const resizeCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
  }, []);

  const clearCanvas = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.getContext("2d")?.clearRect(0, 0, c.width, c.height);
  }, []);

  const stopAuto = useCallback(() => {
    if (autoRef.current) clearInterval(autoRef.current);
  }, []);

  const startAuto = useCallback(() => {
    stopAuto();
    autoRef.current = setInterval(() => {
      const next = (currentRef.current + 1) % SLIDES.length;
      window.dispatchEvent(new CustomEvent("hero:auto", { detail: next }));
    }, AUTO_PLAY_MS);
  }, [stopAuto]);

  const goTo = useCallback(
    (next: number, fromAuto = false) => {
      if (animating || next === currentRef.current) return;
      if (!fromAuto) stopAuto();

      setAnimating(true);
      setVisible(false);

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      resizeCanvas();

      const runner = RUNNERS[SLIDES[currentRef.current].transition];

      setTimeout(() => {
        runner(ctx, canvas.width, canvas.height, () => {
          clearCanvas();
          setCurrent(next);
          setVisible(true);
          setAnimating(false);
          if (!fromAuto) startAuto();
        });
      }, 80);
    },
    [animating, stopAuto, startAuto, resizeCanvas, clearCanvas]
  );

  useEffect(() => {
    const handler = (e: Event) => goTo((e as CustomEvent<number>).detail, true);
    window.addEventListener("hero:auto", handler);
    return () => window.removeEventListener("hero:auto", handler);
  }, [goTo]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    startAuto();
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      stopAuto();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  goTo((current - 1 + SLIDES.length) % SLIDES.length);
      if (e.key === "ArrowRight") goTo((current + 1) % SLIDES.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo]);

  const slide = SLIDES[current];

  // Shared animation style — NO mixing of shorthand + longhand (fixes React warning)
  const contentStyle = (delayMs: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(14px)",
    transitionProperty: "opacity, transform",
    transitionDuration: "380ms",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionDelay: visible ? `${delayMs}ms` : "0ms",
  });

  return (
    <section
      aria-label="TaskLync Hero"
      className="relative h-[60svh] sm:h-[100svh] min-h-[500px] w-full overflow-hidden bg-[#e5ebea]"
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 48)
          goTo(dx < 0
            ? (current + 1) % SLIDES.length
            : (current - 1 + SLIDES.length) % SLIDES.length
          );
      }}
    >
      {/* ── Background image — no gradient ── */}
      <Image
        key={slide.image}
        src={`/images/home/${slide.image}`}
        alt={slide.alt}
        fill
        priority={current === 0}
        loading={current === 0 ? "eager" : "lazy"}
        quality={80}
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Minimal bottom vignette — only for story bar legibility */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent z-[1]" />

      {/* ── Canvas ── */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        aria-hidden
      />

      {/* ── Content — centered ── */}
      <div className="absolute inset-0 z-20 flex flex-col items-start justify-end px-6 sm:px-10 lg:px-16 pb-20 sm:pb-16">

        {/* Headline */}
        <h1
          className="mb-4 font-['Fredoka'] font-bold leading-[1.06] tracking-[-0.01em] text-white text-[clamp(2rem,5.5vw,3.75rem)] max-w-[min(620px,92vw)] drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]"
          style={contentStyle(40)}
        >
          {slide.headline}
        </h1>

        {/* Short description */}
        <p
          className="mb-8 font-['Poppins'] text-[clamp(0.85rem,1.35vw,1rem)] font-normal leading-[1.6] text-white/70 max-w-[min(420px,85vw)] drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
          style={contentStyle(130)}
        >
          {slide.sub}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3" style={contentStyle(210)}>
          <a
            onClick={() =>
              show({
                message:
                  "TaskLync App isn't available yet, join the waitlist to get notified the moment we launch in your city.",
                variant: "success",
              })
            }
            className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-[#1F6F5F] px-6 py-[11px] font-['Poppins'] text-[0.875rem] font-semibold text-white transition-[background,box-shadow] duration-200 hover:bg-[#18594c] hover:shadow-[0_4px_20px_rgba(31,111,95,0.55)] active:scale-[0.97]"
          >
            <DownloadIcon />
            {slide.primaryCta.label}
          </a>

          <Link
            href={slide.secondaryCta.href}
            className="inline-flex items-center gap-[6px] rounded-full border border-white/30 bg-white/10 px-6 py-[11px] font-['Poppins'] text-[0.875rem] font-medium text-white backdrop-blur-sm transition-[background,border-color] duration-200 hover:border-white/55 hover:bg-white/20 active:scale-[0.97]"
          >
            {slide.secondaryCta.label}
            <ChevronRight />
          </Link>
        </div>
      </div>

      {/* ── Arrows — desktop only ── */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo((current - 1 + SLIDES.length) % SLIDES.length)}
        className="absolute left-5 top-1/2 z-30 -translate-y-1/2 hidden lg:flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-[background,border-color] duration-150 hover:border-white/40 hover:bg-black/35"
      >
        <NavArrow dir="left" />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={() => goTo((current + 1) % SLIDES.length)}
        className="absolute right-5 top-1/2 z-30 -translate-y-1/2 hidden lg:flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-[background,border-color] duration-150 hover:border-white/40 hover:bg-black/35"
      >
        <NavArrow dir="right" />
      </button>

      {/* ── Story progress lines — floating above bottom, with horizontal margins ── */}
      <div
        role="tablist"
        aria-label="Story slides"
        className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-[6px] px-0"
        style={{ width: "min(480px, calc(100vw - 48px))" }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="group relative flex-1 h-[3px] rounded-full overflow-hidden bg-white/20 cursor-pointer transition-transform duration-150 hover:scale-y-[1.8]"
          >
            {/* Fill bar — animates across when active */}
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-[#4ECBA5]"
              style={{
                width: i === current ? "100%" : i < current ? "100%" : "0%",
                background: i === current ? "#4ECBA5" : i < current ? "rgba(255,255,255,0.45)" : "transparent",
                transitionProperty: i === current ? "width" : "none",
                transitionDuration: i === current ? `${AUTO_PLAY_MS}ms` : "0ms",
                transitionTimingFunction: "linear",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}