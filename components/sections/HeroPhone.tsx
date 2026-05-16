"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Wrench,
  MapPin,
  Star,
  BadgeCheck,
  Trophy,
  Zap,
  DollarSign,
  Search,
  UserRound,
  Check,
} from "lucide-react";

export type Phase = "idle" | "onboarding" | "search" | "map" | "booking" | "confirmed";

// ─── Shared screen transition ──────────────────────────────────────────────────
const screenVariants = {
  enter: { opacity: 0, y: 10 },
  center: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25, ease: "easeIn" as const },
  },
};

// ─── IDLE ──────────────────────────────────────────────────────────────────────
function IdleScreen() {
  return (
    <motion.div
      key="idle"
      variants={screenVariants} initial="enter" animate="center" exit="exit"
      style={{ position: "absolute", inset: 0, background: "#060e0b" }}
    />
  );
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
function OnboardingScreen() {
  return (
    <motion.div
      key="onboarding"
      variants={screenVariants} initial="enter" animate="center" exit="exit"
      style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(170deg,#091410 0%,#0c1c18 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "0 24px",
      }}
    >
      {/* logo */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ marginBottom: 24 }}
      >
        <div style={{
          width: 64, height: 64, borderRadius: 18,
          background: "linear-gradient(135deg,#1F6F5F,#2FA084)",
          boxShadow: "0 8px 32px rgba(47,160,132,0.45)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Wrench size={28} color="white" strokeWidth={2} />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: 36 }}
      >
        <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>TaskLync</div>
        <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 10, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginTop: 4 }}>
          Home services, redefined
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        style={{ width: "100%" }}
      >
        <div style={{
          width: "100%", borderRadius: 14,
          background: "linear-gradient(135deg,#1F6F5F,#2FA084)",
          boxShadow: "0 4px 20px rgba(47,160,132,0.4)",
          padding: "12px 0",
          textAlign: "center",
          fontFamily: "'Cabinet Grotesk',sans-serif",
          fontSize: 13, fontWeight: 600, color: "#fff",
        }}>
          Get Started
        </div>
        <div style={{ marginTop: 10, textAlign: "center", fontSize: 11, fontFamily: "'Cabinet Grotesk',sans-serif", color: "rgba(255,255,255,0.28)" }}>
          Already have an account? <span style={{ color: "#6FCF97" }}>Sign in</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Typing hook ───────────────────────────────────────────────────────────────
function useTyping(text: string, speed = 70) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed(""); setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return { displayed, done };
}

// ─── SEARCH ───────────────────────────────────────────────────────────────────
function SearchScreen() {
  const { displayed, done } = useTyping("Car mechanic near me", 68);
  const [showResults, setShowResults] = useState(false);
  useEffect(() => { if (done) setTimeout(() => setShowResults(true), 350); }, [done]);

  const results = [
    { name: "AutoFix Pro",  dist: "0.4 mi", rating: "4.9", avail: "Now",    color: "#6FCF97" },
    { name: "SpeedWrench",  dist: "0.9 mi", rating: "4.8", avail: "8 min",  color: "#2FA084" },
    { name: "MechMaster",   dist: "1.2 mi", rating: "4.7", avail: "12 min", color: "#1F6F5F" },
  ];

  return (
    <motion.div
      key="search"
      variants={screenVariants} initial="enter" animate="center" exit="exit"
      style={{ position: "absolute", inset: 0, background: "#091410", display: "flex", flexDirection: "column" }}
    >
      {/* status bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px 8px" }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 500 }}>9:41</span>
        <div style={{ display: "flex", gap: 3, alignItems: "flex-end" }}>
          {[8, 10, 12].map(h => (
            <div key={h} style={{ width: 3, height: h, borderRadius: 2, background: "rgba(255,255,255,0.5)" }} />
          ))}
        </div>
      </div>

      {/* search bar */}
      <div style={{ padding: "4px 16px 14px" }}>
        <div style={{ fontSize: 9, fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 600, letterSpacing: "0.18em", color: "rgba(111,207,151,0.65)", textTransform: "uppercase", marginBottom: 8 }}>
          Find a pro
        </div>
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          borderRadius: 14, border: "1px solid rgba(255,255,255,0.1)",
          background: "rgba(255,255,255,0.05)", padding: "10px 14px",
          backdropFilter: "blur(10px)",
        }}>
          <Search size={14} color="#2FA084" strokeWidth={2} style={{ flexShrink: 0 }} />
          <span style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 12, color: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center" }}>
            {displayed}
            {!done && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{ display: "inline-block", width: 1.5, height: 13, background: "#6FCF97", marginLeft: 2, borderRadius: 1 }}
              />
            )}
          </span>
        </div>
      </div>

      {/* results */}
      <div style={{ flex: 1, overflowY: "hidden", padding: "0 16px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        <AnimatePresence>
          {showResults && results.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.11, duration: 0.38 }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.04)", padding: "10px 12px",
              }}
            >
              {/* icon pill */}
              <div style={{
                width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                background: `${r.color}20`, border: `1px solid ${r.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Wrench size={16} color={r.color} strokeWidth={2} />
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 11, fontWeight: 600, color: "#fff" }}>{r.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)" }}>{r.dist}</span>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)" }}>·</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Star size={8} color="rgba(250,204,21,0.9)" fill="rgba(250,204,21,0.9)" />
                    <span style={{ fontSize: 9, color: "rgba(250,204,21,0.8)", fontFamily: "'Cabinet Grotesk',sans-serif" }}>{r.rating}</span>
                  </span>
                </div>
              </div>

              <div style={{
                borderRadius: 999, padding: "3px 9px",
                background: `${r.color}20`, color: r.color,
                fontSize: 9, fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 600, flexShrink: 0,
              }}>{r.avail}</div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── MAP ──────────────────────────────────────────────────────────────────────
function MapPinMarker({ x, y, delay, isUser }: { x: number; y: number; delay: number; isUser?: boolean }) {
  return (
    <motion.div
      style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
    >
      {isUser && (
        <motion.div
          style={{
            position: "absolute", inset: -10, borderRadius: "50%",
            background: "rgba(111,207,151,0.18)",
          }}
          animate={{ scale: [1, 2.2], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <div style={{
        width: isUser ? 28 : 24, height: isUser ? 28 : 24,
        borderRadius: "50%",
        background: isUser ? "linear-gradient(135deg,#1F6F5F,#2FA084)" : "rgba(255,255,255,0.10)",
        border: isUser ? "none" : "1px solid rgba(255,255,255,0.18)",
        boxShadow: isUser ? "0 4px 16px rgba(47,160,132,0.55)" : "none",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {isUser
          ? <MapPin size={13} color="white" strokeWidth={2.5} />
          : <Wrench size={11} color="rgba(255,255,255,0.7)" strokeWidth={2} />
        }
      </div>
    </motion.div>
  );
}

function MapScreen() {
  return (
    <motion.div
      key="map"
      variants={screenVariants} initial="enter" animate="center" exit="exit"
      style={{ position: "absolute", inset: 0, background: "#091410", display: "flex", flexDirection: "column" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 20px 8px" }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'Cabinet Grotesk',sans-serif" }}>9:41</span>
        <span style={{ fontSize: 9, fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 600, color: "rgba(111,207,151,0.7)", letterSpacing: "0.12em" }}>3 PROS NEARBY</span>
      </div>

      {/* map */}
      <div style={{ flex: 1, margin: "4px 14px 14px", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", position: "relative" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(160deg,#0a1e19 0%,#0d2a22 100%)",
          backgroundImage: `
            linear-gradient(rgba(47,160,132,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(47,160,132,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "22px 22px",
        }} />

        {/* roads */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 200 300" preserveAspectRatio="none">
          <path d="M0 150 Q100 138 200 150" stroke="rgba(111,207,151,0.1)" strokeWidth="8" fill="none"/>
          <path d="M100 0 L100 300" stroke="rgba(111,207,151,0.07)" strokeWidth="5" fill="none"/>
          <path d="M0 100 L200 118" stroke="rgba(111,207,151,0.05)" strokeWidth="4" fill="none"/>
          <path d="M0 220 L200 205" stroke="rgba(111,207,151,0.05)" strokeWidth="4" fill="none"/>
        </svg>

        <MapPinMarker x={50} y={50} delay={0.15} isUser />
        <MapPinMarker x={28} y={28} delay={0.45} />
        <MapPinMarker x={72} y={33} delay={0.65} />
        <MapPinMarker x={20} y={66} delay={0.85} />
        <MapPinMarker x={76} y={68} delay={1.05} />

        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.45 }}
          style={{
            position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
            borderRadius: 999, padding: "4px 12px",
            background: "rgba(31,111,95,0.3)", border: "1px solid rgba(111,207,151,0.2)",
            backdropFilter: "blur(8px)",
            fontSize: 9, fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 600, color: "#6FCF97",
            whiteSpace: "nowrap",
          }}
        >
          4 available pros nearby
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── BOOKING ──────────────────────────────────────────────────────────────────
function BookingScreen() {
  return (
    <motion.div
      key="booking"
      variants={screenVariants} initial="enter" animate="center" exit="exit"
      style={{ position: "absolute", inset: 0, background: "#091410", display: "flex", flexDirection: "column" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 20px 8px" }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "'Cabinet Grotesk',sans-serif" }}>9:41</span>
        <span style={{ fontSize: 9, fontFamily: "'Cabinet Grotesk',sans-serif", color: "rgba(111,207,151,0.6)" }}>AutoFix Pro</span>
      </div>

      <div style={{ flex: 1, overflowY: "hidden", padding: "0 14px 14px" }}>
        <motion.div
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45 }}
          style={{
            borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)", padding: "14px",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* worker header */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            {/* avatar */}
            <div style={{
              width: 46, height: 46, borderRadius: 14, flexShrink: 0,
              background: "linear-gradient(135deg,rgba(31,111,95,0.3),rgba(47,160,132,0.3))",
              border: "1px solid rgba(47,160,132,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <UserRound size={22} color="#2FA084" strokeWidth={1.8} />
            </div>

            <div>
              <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 12, fontWeight: 700, color: "#fff" }}>Alex Martinez</div>
              <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={8} color="rgba(250,204,21,0.9)" fill="rgba(250,204,21,0.9)" />
                ))}
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "'Cabinet Grotesk',sans-serif", marginLeft: 2 }}>4.9 · 312 jobs</span>
              </div>
              <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                {/* Verified badge */}
                <span style={{
                  borderRadius: 999, padding: "2px 7px", fontSize: 8,
                  fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 600,
                  color: "rgba(111,207,151,0.9)", background: "rgba(111,207,151,0.12)",
                  display: "inline-flex", alignItems: "center", gap: 3,
                }}>
                  <BadgeCheck size={8} strokeWidth={2.5} />
                  Verified
                </span>
                {/* Top Pro badge */}
                <span style={{
                  borderRadius: 999, padding: "2px 7px", fontSize: 8,
                  fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 600,
                  color: "rgba(96,165,250,0.9)", background: "rgba(96,165,250,0.12)",
                  display: "inline-flex", alignItems: "center", gap: 3,
                }}>
                  <Trophy size={8} strokeWidth={2.5} />
                  Top Pro
                </span>
              </div>
            </div>
          </div>

          {/* stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 12 }}>
            {[
              { Icon: Zap,        val: "8 min", lbl: "ETA",  iconColor: "#6FCF97" },
              { Icon: DollarSign, val: "$65/hr", lbl: "Rate", iconColor: "#2FA084" },
              { Icon: Wrench,     val: "312",    lbl: "Jobs",  iconColor: "#1F6F5F" },
            ].map(({ Icon, val, lbl, iconColor }) => (
              <div key={lbl} style={{ borderRadius: 12, padding: "8px 4px", textAlign: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
                  <Icon size={14} color={iconColor} strokeWidth={2} />
                </div>
                <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 11, fontWeight: 700, color: "#fff" }}>{val}</div>
                <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 8, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{lbl}</div>
              </div>
            ))}
          </div>

          {/* service */}
          <div style={{ borderRadius: 12, padding: "10px 12px", marginBottom: 12, background: "rgba(47,160,132,0.08)", border: "1px solid rgba(47,160,132,0.15)" }}>
            <div style={{ fontSize: 8, fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 600, letterSpacing: "0.15em", color: "rgba(111,207,151,0.65)", textTransform: "uppercase", marginBottom: 4 }}>Service</div>
            <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 11, color: "#fff" }}>Car mechanic · Diagnostic + Repair</div>
          </div>

          {/* book button */}
          <motion.div
            whileTap={{ scale: 0.97 }}
            style={{
              borderRadius: 14, padding: "12px 0", textAlign: "center",
              background: "linear-gradient(135deg,#1F6F5F,#2FA084)",
              boxShadow: "0 4px 18px rgba(47,160,132,0.35)",
              fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 12, fontWeight: 600, color: "#fff",
              cursor: "pointer",
            }}
          >
            Confirm Booking
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── CONFIRMED ────────────────────────────────────────────────────────────────
function ConfirmedScreen() {
  return (
    <motion.div
      key="confirmed"
      variants={screenVariants} initial="enter" animate="center" exit="exit"
      style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(165deg,#061410 0%,#0b1f19 100%)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "0 20px",
      }}
    >
      {/* success ring */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", width: 80, height: 80, marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <motion.div
          style={{
            position: "absolute", inset: -10, borderRadius: "50%",
            background: "rgba(111,207,151,0.15)",
          }}
          animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
        <div style={{
          width: 80, height: 80, borderRadius: "50%",
          background: "linear-gradient(135deg,#1F6F5F,#2FA084)",
          boxShadow: "0 8px 36px rgba(47,160,132,0.5)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <Check size={34} color="white" strokeWidth={2.8} />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        <div style={{ fontFamily: "'Clash Display',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>Booking Confirmed</div>
        <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.38)", marginTop: 5 }}>Alex Martinez is on his way</div>
      </motion.div>

      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        style={{
          width: "100%", borderRadius: 18, border: "1px solid rgba(255,255,255,0.09)",
          background: "rgba(255,255,255,0.04)", padding: "14px 16px",
          backdropFilter: "blur(10px)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 10, color: "rgba(255,255,255,0.38)" }}>Estimated arrival</span>
          <span style={{ fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 13, fontWeight: 700, color: "#6FCF97" }}>8 min</span>
        </div>
        <div style={{ height: 4, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <motion.div
            style={{ height: "100%", borderRadius: 999, background: "linear-gradient(90deg,#1F6F5F,#6FCF97)" }}
            initial={{ width: "0%" }}
            animate={{ width: "35%" }}
            transition={{ delay: 0.85, duration: 1.1, ease: "easeOut" }}
          />
        </div>
        <div style={{ marginTop: 10, textAlign: "center", fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.25)" }}>
          Booking #TL-20489 · Payment secured
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Phone chrome ──────────────────────────────────────────────────────────────
export default function HeroPhone({ phase }: { phase: Phase }) {
  return (
    <div style={{
      position: "relative",
      width: 270,
      height: 560,
      filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.75)) drop-shadow(0 0 40px rgba(47,160,132,0.18))",
    }}>
      {/* body */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 44, overflow: "hidden",
        background: "linear-gradient(160deg,#1c1c1c 0%,#0e0e0e 100%)",
        border: "1px solid rgba(255,255,255,0.13)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -1px 0 rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.9)",
      }}>
        {/* screen bezel */}
        <div style={{ position: "absolute", inset: 3, borderRadius: 42, background: "#060e0b", overflow: "hidden" }}>

          {/* Dynamic Island */}
          <div style={{
            position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)",
            zIndex: 30, width: 76, height: 26, borderRadius: 999,
            background: "#000",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#1a1a1a" }} />
            <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#222" }} />
          </div>

          {/* screens */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              {phase === "idle"       && <IdleScreen       key="idle"       />}
              {phase === "onboarding" && <OnboardingScreen key="onboarding" />}
              {phase === "search"     && <SearchScreen     key="search"     />}
              {phase === "map"        && <MapScreen        key="map"        />}
              {phase === "booking"    && <BookingScreen    key="booking"    />}
              {phase === "confirmed"  && <ConfirmedScreen  key="confirmed"  />}
            </AnimatePresence>
          </div>

          {/* glare */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 20, borderRadius: 42, pointerEvents: "none",
            background: "linear-gradient(135deg,rgba(255,255,255,0.055) 0%,transparent 45%,transparent 60%,rgba(255,255,255,0.018) 100%)",
          }} />
        </div>

        {/* hardware buttons — right */}
        <div style={{ position: "absolute", right: -3, top: 110, width: 3, height: 60, borderRadius: "2px 0 0 2px", background: "linear-gradient(180deg,#282828,#181818)" }} />
        <div style={{ position: "absolute", right: -3, top: 185, width: 3, height: 38, borderRadius: "2px 0 0 2px", background: "linear-gradient(180deg,#282828,#181818)" }} />
        {/* hardware buttons — left */}
        <div style={{ position: "absolute", left: -3, top: 95,  width: 3, height: 30, borderRadius: "0 2px 2px 0", background: "linear-gradient(180deg,#282828,#181818)" }} />
        <div style={{ position: "absolute", left: -3, top: 138, width: 3, height: 48, borderRadius: "0 2px 2px 0", background: "linear-gradient(180deg,#282828,#181818)" }} />
        <div style={{ position: "absolute", left: -3, top: 200, width: 3, height: 48, borderRadius: "0 2px 2px 0", background: "linear-gradient(180deg,#282828,#181818)" }} />
      </div>

      {/* floor reflection */}
      <div style={{
        position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)",
        width: 180, height: 12, borderRadius: "50%",
        background: "radial-gradient(ellipse,rgba(47,160,132,0.28) 0%,transparent 70%)",
        filter: "blur(6px)",
      }} />
    </div>
  );
}