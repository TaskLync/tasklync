// components/waitlist/WaitlistModal.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { backdropVariants, panelVariants } from "@/lib/motion/variants";
import { submitWaitlist } from "@/lib/waitlist/submit";
import { waitlistSchema } from "@/lib/waitlist/validate";
import { WaitlistForm } from "./WaitlistForm";
import { SuccessState } from "./SuccessState";
import type { WaitlistModalProps, WaitlistStep } from "@/types/waitlist";

export function WaitlistModal({ open, onClose, onSuccess }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [step, setStep]   = useState<WaitlistStep>("idle");
  const [error, setError] = useState("");
  const emailRef          = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => emailRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleSubmit = async () => {
    setError("");

    const parsed = waitlistSchema.safeParse({ email: email.trim() });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }

    setStep("loading");
    try {
      await submitWaitlist(parsed.data);
      setStep("success");
      onSuccess?.();
    } catch {
      setStep("error");
      setError("Something went wrong. Please try again.");
    }
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      if (step !== "success") { setStep("idle"); setError(""); }
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-9998"
            style={{ background: "rgba(13,31,28,0.45)", backdropFilter: "blur(6px)" }}
            variants={backdropVariants} initial="hidden" animate="visible" exit="exit"
            onClick={resetAndClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog" aria-modal="true" aria-label="Join the TaskLync waitlist"
            className="fixed inset-0 z-9999 flex items-center justify-center px-4"
            variants={panelVariants} initial="hidden" animate="visible" exit="exit"
          >
            <div
              className="relative w-full max-w-115 rounded-[28px] overflow-hidden"
              style={{
                background: "#FAFAF6",
                boxShadow: "0 0 0 1px rgba(13,31,28,0.07), 0 8px 40px rgba(13,31,28,0.14), 0 2px 8px rgba(13,31,28,0.06)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent bar */}
              <div className="h-0.75 w-full" style={{ background: "linear-gradient(90deg,#1F6F5F 0%,#2FA084 55%,#6FCF97 100%)" }} />

              {/* Noise texture */}
              <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.022]"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  backgroundSize: "160px 160px",
                }}
              />

              {/* Close button */}
              <button
                onClick={resetAndClose}
                className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150"
                style={{ background: "rgba(13,31,28,0.06)", color: "rgba(13,31,28,0.45)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(13,31,28,0.10)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(13,31,28,0.75)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(13,31,28,0.06)";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(13,31,28,0.45)";
                }}
                aria-label="Close"
              >
                <X size={15} strokeWidth={2.2} />
              </button>

              {/* Body */}
              <div className="relative z-10 px-8 pt-8 pb-9">
                <AnimatePresence mode="wait">
                  {step === "success" ? (
                    <SuccessState key="success" onClose={resetAndClose} />
                  ) : (
                    <WaitlistForm
                      key="form"
                      onSubmit={handleSubmit}
                      loading={step === "loading"}
                      error={error}
                      email={email}
                      setEmail={(v) => { setEmail(v); setError(""); setStep("idle"); }}
                      emailRef={emailRef}
                    />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default WaitlistModal;