import type { Transition } from "framer-motion";

export const cinematic: Transition = {
  duration: 1.0,
  ease: [0.16, 1, 0.3, 1],
};

export const cinematicSlow: Transition = {
  duration: 1.6,
  ease: [0.16, 1, 0.3, 1],
};

export const spring = {
  stiff: {
    type: "spring" as const,
    stiffness: 260,
    damping: 22,
  },
  soft: {
    type: "spring" as const,
    stiffness: 80,
    damping: 20,
    mass: 1.2,
  },
  landing: {
    type: "spring" as const,
    stiffness: 60,
    damping: 16,
    mass: 1.6,
  },
};

export const snappy: Transition = {
  duration: 0.35,
  ease: [0.32, 0.72, 0, 1],
};

export const gentle: Transition = {
  duration: 0.7,
  ease: "easeInOut",
};

// GSAP-style easing expressed as cubic-bezier
export const expo = {
  out: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.87, 0, 0.13, 1] as [number, number, number, number],
};

// Animation stage delays (seconds)
export const TIMELINE = {
  ATMOSPHERE: 0.0,
  PHONE_ENTER: 0.4,
  PHONE_LAND: 1.8,
  CAMERA_ZOOM: 2.4,
  SEARCH_START: 3.2,
  MAP_OPEN: 5.8,
  WORKER_SELECT: 7.4,
  BOOKING_START: 8.8,
  BOOKING_CONFIRM: 10.0,
  PHONE_MOVE: 11.2,
  CONTENT_REVEAL: 12.0,
};


// ─── Easing curves ─────────────────────────────────────────────────────────────

/** Apple-style smooth deceleration */
export const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const;

/** Gentle ease in-out for ambient motion */
export const EASE_GENTLE = [0.45, 0, 0.55, 1] as const;

/** Spring-like overshoot */
export const EASE_BACK_OUT = [0.34, 1.56, 0.64, 1] as const;

/** Cinematic ease in */
export const EASE_CINEMATIC_IN = [0.7, 0, 1, 1] as const;

/** Cinematic ease out */
export const EASE_CINEMATIC_OUT = [0, 0, 0.3, 1] as const;

// ─── Duration tokens ───────────────────────────────────────────────────────────

export const DUR = {
  instant: 0.15,
  fast: 0.3,
  base: 0.5,
  slow: 0.8,
  cinematic: 1.2,
  epic: 1.8,
} as const;

// ─── GSAP master timeline phases (seconds) ─────────────────────────────────────

export const GSAP_PHASES = {
  phoneEnter: 0.4,
  phoneLand: 1.9,
  onboardingScreen: 2.7,
  searchScreen: 4.0,
  mapScreen: 6.6,
  bookingScreen: 9.2,
  confirmedScreen: 11.0,
  phoneSlideRight: 11.5,
  heroTextReveal: 12.0,
  sequenceDone: 13.8,
} as const;

// ─── Shared spring configs ─────────────────────────────────────────────────────

export const SPRING_STIFF = { stiffness: 120, damping: 14 } as const;
export const SPRING_GENTLE = { stiffness: 40, damping: 20 } as const;
export const SPRING_SNAPPY = { stiffness: 280, damping: 22 } as const;

// ─── Framer Motion transition presets ─────────────────────────────────────────

export const transitionFadeUp = {
  duration: DUR.slow,
  ease: EASE_EXPO_OUT,
};

export const transitionSpringGentle = {
  type: "spring" as const,
  ...SPRING_GENTLE,
};

export const transitionFloat = {
  duration: 3.5,
  repeat: Infinity,
  ease: "easeInOut" as const,
};