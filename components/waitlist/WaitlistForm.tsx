// components/waitlist/WaitlistForm.tsx
"use client";

import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import type { WaitlistFormProps } from "@/types/waitlist";

export function WaitlistForm({
  onSubmit,
  loading,
  error,
  email,
  setEmail,
  emailRef,
}: WaitlistFormProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) onSubmit();
  };

  return (
    <div>
      {/* Eyebrow */}
      <div className="inline-flex items-center gap-2 mb-5">
        <Sparkles size={12} strokeWidth={2} color="#2FA084" />
        <span
          className="text-[11px] font-bold uppercase tracking-[0.12em]"
          style={{ fontFamily: "var(--font-body)", color: "#1F6F5F" }}
        >
          Early Access
        </span>
      </div>

      {/* Headline */}
      <h2
        className="text-[clamp(1.6rem,4vw,2rem)] font-bold leading-[1.1] tracking-[-0.03em]"
        style={{ fontFamily: "var(--font-clash)", color: "#0D1F1C" }}
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
      </h2>

      {/* Subtitle */}
      <p
        className="mt-2.5 leading-relaxed text-sm"
        style={{ fontFamily: "var(--font-body)", color: "rgba(13,31,28,0.5)" }}
      >
        Be first in line when we launch in your city.
      </p>

      {/* Divider */}
      <div className="my-6 h-px" style={{ background: "rgba(13,31,28,0.07)" }} />

      {/* Email field */}
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
          className="w-full rounded-xl px-4 py-3 text-sm outline-none"
          style={{
            fontFamily: "var(--font-body)",
            background: "#fff",
            border: error ? "1.5px solid #E05252" : "1.5px solid rgba(13,31,28,0.12)",
            color: "#0D1F1C",
            boxShadow: "0 1px 4px rgba(13,31,28,0.04)",
            transition: "border-color 0.15s ease, box-shadow 0.15s ease",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#2FA084";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(47,160,132,0.12)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? "#E05252" : "rgba(13,31,28,0.12)";
            e.currentTarget.style.boxShadow = "0 1px 4px rgba(13,31,28,0.04)";
          }}
        />

        {error && (
          <p
            className="mt-2 text-[12px] font-medium"
            style={{ fontFamily: "var(--font-body)", color: "#E05252" }}
          >
            {error}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={onSubmit}
        disabled={loading}
        className="mt-5 w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold text-white active:scale-[0.98]"
        style={{
          fontFamily: "var(--font-body)",
          background: loading
            ? "rgba(31,111,95,0.6)"
            : "linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)",
          boxShadow: "0 0 28px rgba(47,160,132,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "opacity 0.15s ease",
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
      </button>

      {/* Trust line */}
      <p
        className="mt-4 text-center text-[11.5px]"
        style={{ fontFamily: "var(--font-body)", color: "rgba(13,31,28,0.35)" }}
      >
        Join before public release and get priority access in your city.
      </p>
    </div>
  );
}

export default WaitlistForm;