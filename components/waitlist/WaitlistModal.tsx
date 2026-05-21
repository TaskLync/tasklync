// components/waitlist/WaitlistModal.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { submitWaitlist } from "@/lib/waitlist/submit";
import { waitlistSchema } from "@/lib/waitlist/validate";
import { WaitlistForm } from "./WaitlistForm";
import { SuccessState } from "./SuccessState";
import type { WaitlistModalProps, WaitlistStep } from "@/types/waitlist";

export function WaitlistModal({ open, onClose, onSuccess }: WaitlistModalProps) {
  const [email, setEmail]   = useState("");
  const [step, setStep]     = useState<WaitlistStep>("idle");
  const [error, setError]   = useState("");
  const [visible, setVisible] = useState(false); // drives CSS open/close
  const emailRef            = useRef<HTMLInputElement | null>(null);

  // Sync open → visible with a tiny delay so CSS transition fires
  useEffect(() => {
    if (open) {
      // Mount first, then flip visible so transition runs
      requestAnimationFrame(() => setVisible(true));
      const t = setTimeout(() => emailRef.current?.focus(), 300);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
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

  if (!open) return null;

  return (
    <>
      {/* Backdrop — opacity-only transition, NO backdrop-filter blur (kills perf) */}
      <div
        aria-hidden="true"
        onClick={resetAndClose}
        className="fixed inset-0 z-9998"
        style={{
          background: "rgba(13,31,28,0.5)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.22s ease",
        }}
      />

      {/* Panel wrapper — centers the card */}
      <div
        className="fixed inset-0 z-9999 flex items-center justify-center px-4"
        style={{ pointerEvents: "none" }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Join the TaskLync waitlist"
          className="relative w-full max-w-md rounded-[28px] overflow-hidden"
          style={{
            background: "#FAFAF6",
            boxShadow: "0 0 0 1px rgba(13,31,28,0.07), 0 8px 40px rgba(13,31,28,0.14), 0 2px 8px rgba(13,31,28,0.06)",
            // Single transform + opacity — one compositor layer, nothing else
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.98)",
            transition: "opacity 0.28s cubic-bezier(0.16,1,0.3,1), transform 0.28s cubic-bezier(0.16,1,0.3,1)",
            pointerEvents: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top accent bar */}
          <div
            className="h-0.5 w-full"
            style={{ background: "linear-gradient(90deg,#1F6F5F 0%,#2FA084 55%,#6FCF97 100%)" }}
          />

          {/* Close button */}
          <button
            onClick={resetAndClose}
            className="absolute top-5 right-5 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-150"
            style={{ background: "rgba(13,31,28,0.06)", color: "rgba(13,31,28,0.45)" }}
            aria-label="Close"
          >
            <X size={15} strokeWidth={2.2} />
          </button>

          {/* Body */}
          <div className="px-8 pt-8 pb-9">
            {step === "success" ? (
              <SuccessState onClose={resetAndClose} />
            ) : (
              <WaitlistForm
                onSubmit={handleSubmit}
                loading={step === "loading"}
                error={error}
                email={email}
                setEmail={(v) => { setEmail(v); setError(""); setStep("idle"); }}
                emailRef={emailRef}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default WaitlistModal;