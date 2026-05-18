// components/waitlist/WaitlistForm.tsx
"use client";

import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp } from "@/lib/motion/variants";
import type { WaitlistFormProps } from "@/types/waitlist";

export function WaitlistForm({
  onSubmit,
  loading,
  error,
  email,
  setEmail,
  name,
  setName,
  emailRef,
}: WaitlistFormProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) onSubmit();
  };

  return (
    <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>

      {/* Eyebrow */}
      <motion.div
        className="inline-flex items-center gap-2 mb-5"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <Sparkles size={12} strokeWidth={2} color="#2FA084" />
        <span
          className="text-[11px] font-bold uppercase tracking-[0.12em]"
          style={{ fontFamily: "var(--font-body)", color: "#1F6F5F" }}
        >
          Early Access
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h2
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.06}
        style={{
          fontFamily: "var(--font-clash)",
          fontSize: "clamp(1.6rem, 4vw, 2rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          color: "#0D1F1C",
        }}
      >
        Get early access
        <br />
        <span
          style={{
            backgroundImage: "linear-gradient(100deg,#1F6F5F 0%,#2FA084 60%,#6FCF97 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          to TaskLync.
        </span>
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.12}
        className="mt-2.5 leading-relaxed"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          color: "rgba(13,31,28,0.5)",
        }}
      >
        Be first in line when we launch in your city.
      </motion.p>

      {/* Divider */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.18}
        className="my-6 h-px"
        style={{ background: "rgba(13,31,28,0.07)" }}
      />

      {/* Fields */}
      <motion.div
        className="flex flex-col gap-3"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.22}
      >
        {/* Email */}
        <div>
          <label
            htmlFor="wl-email"
            className="block mb-1.5 text-[12px] font-semibold tracking-wide"
            style={{ fontFamily: "var(--font-body)", color: "rgba(13,31,28,0.55)" }}
          >
            Email address <span style={{ color: "#2FA084" }}>*</span>
          </label>
          <input
            ref={emailRef}
            id="wl-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
            style={{
              fontFamily: "var(--font-body)",
              background: "#fff",
              border: error ? "1.5px solid #E05252" : "1.5px solid rgba(13,31,28,0.12)",
              color: "#0D1F1C",
              boxShadow: "0 1px 4px rgba(13,31,28,0.04)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "1.5px solid #2FA084";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(47,160,132,0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = error
                ? "1.5px solid #E05252"
                : "1.5px solid rgba(13,31,28,0.12)";
              e.currentTarget.style.boxShadow = "0 1px 4px rgba(13,31,28,0.04)";
            }}
          />
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="wl-name"
            className="block mb-1.5 text-[12px] font-semibold tracking-wide"
            style={{ fontFamily: "var(--font-body)", color: "rgba(13,31,28,0.55)" }}
          >
            First name{" "}
            <span className="font-normal" style={{ color: "rgba(13,31,28,0.33)" }}>
              (optional)
            </span>
          </label>
          <input
            id="wl-name"
            type="text"
            placeholder="Alex"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200"
            style={{
              fontFamily: "var(--font-body)",
              background: "#fff",
              border: "1.5px solid rgba(13,31,28,0.12)",
              color: "#0D1F1C",
              boxShadow: "0 1px 4px rgba(13,31,28,0.04)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "1.5px solid #2FA084";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(47,160,132,0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = "1.5px solid rgba(13,31,28,0.12)";
              e.currentTarget.style.boxShadow = "0 1px 4px rgba(13,31,28,0.04)";
            }}
          />
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-[12px] font-medium"
              style={{ fontFamily: "var(--font-body)", color: "#E05252" }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Submit */}
      <motion.button
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.3}
        onClick={onSubmit}
        disabled={loading}
        className="mt-5 w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white transition-opacity duration-200"
        style={{
          fontFamily: "var(--font-body)",
          background: loading
            ? "rgba(31,111,95,0.6)"
            : "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
          boxShadow: "0 0 28px rgba(47,160,132,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? (
          <>
            <Loader2 size={14} strokeWidth={2.2} className="animate-spin" />
            Joining…
          </>
        ) : (
          <>
            Join the Waitlist
            <ArrowRight size={14} strokeWidth={2} />
          </>
        )}
      </motion.button>

      {/* Trust line */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.36}
        className="mt-4 text-center text-[11.5px]"
        style={{ fontFamily: "var(--font-body)", color: "rgba(13,31,28,0.35)" }}
      >
        Join before public release and get priority access in your city.
      </motion.p>
    </motion.div>
  );
}

export default WaitlistForm;