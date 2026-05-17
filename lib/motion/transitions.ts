// ─── transitions.ts ───────────────────────────────────────────────────────────
// Single source of truth for timing, easing, spring, and phase constants.
// Import from here — never hardcode these values at the call site.

import type { Transition } from "framer-motion";

// ─── Easing curves ─────────────────────────────────────────────────────────────

/** Apple-style smooth deceleration — primary easing for the whole product */
export const EASE_EXPO_OUT     = [0.16, 1, 0.3, 1]   as const;

/** Gentle ease in-out for ambient / looping motion */
export const EASE_GENTLE       = [0.45, 0, 0.55, 1]  as const;

/** Spring-like overshoot for attention-grabbing reveals */
export const EASE_BACK_OUT     = [0.34, 1.56, 0.64, 1] as const;

/** Cinematic ease in — heavy entrance deceleration */
export const EASE_CINEMATIC_IN  = [0.7, 0, 1, 1]     as const;

/** Cinematic ease out — heavy exit deceleration */
export const EASE_CINEMATIC_OUT = [0, 0, 0.3, 1]     as const;

// ─── Duration tokens ───────────────────────────────────────────────────────────
// Change one value → every animation using it updates globally.

export const DUR = {
  instant:   0.15,
  fast:      0.3,
  base:      0.5,
  slow:      0.8,
  cinematic: 1.2,
  epic:      1.8,
} as const;

// ─── GSAP master timeline phases (seconds) ────────────────────────────────────
// Every .to() / .call() position in the Hero GSAP timeline references these.
// Rename a phase here — it updates everywhere automatically.

export const GSAP_PHASES = {
  phoneEnter:       0.4,
  phoneLand:        1.9,
  onboardingScreen: 2.7,
  searchScreen:     4.0,
  mapScreen:        6.6,
  bookingScreen:    9.2,
  confirmedScreen:  11.0,
  phoneSlideRight:  11.5,
  heroTextReveal:   12.0,
  sequenceDone:     13.8,
} as const;

// ─── Spring configs ────────────────────────────────────────────────────────────
// Plain objects — usable by both useSpring() and Framer transition props.

/** Loose, weighty spring — hero phone parallax tilt */
export const SPRING_GENTLE = { stiffness: 40,  damping: 20 } as const;

/** Fast, snappy spring — interactive UI elements */
export const SPRING_SNAPPY = { stiffness: 280, damping: 22 } as const;

/** Firm spring — drawer / sheet entrances */
export const SPRING_STIFF  = { stiffness: 120, damping: 14 } as const;

// ─── Framer Motion transition presets ─────────────────────────────────────────
// Drop these directly into `transition={}` — no magic numbers at the call site.

/** Standard fade-up reveal — pairs with the fadeUp variant */
export const transitionFadeUp: Transition = {
  duration: DUR.slow,
  ease: [...EASE_EXPO_OUT],
};

/** Gentle spring — drop-in Framer transition */
export const transitionSpringGentle: Transition = {
  type: "spring",
  ...SPRING_GENTLE,
};

/** Infinite float loop — shared by phoneFloat and any floating UI element */
export const transitionFloat: Transition = {
  duration: 3.5,
  repeat: Infinity,
  ease: "easeInOut",
};