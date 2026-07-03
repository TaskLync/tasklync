// components/waitlist/WaitlistModal.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { submitWaitlist } from "@/lib/waitlist/submit";
import { waitlistSchema } from "@/lib/waitlist/validate";
import { WaitlistForm } from "./WaitlistForm";
import { SuccessState } from "./SuccessState";
import type { WaitlistModalProps, WaitlistStep } from "@/types/waitlist";

interface ExtendedWaitlistModalProps extends WaitlistModalProps {
  startAtSuccess?: boolean;
}

export function WaitlistModal({
  open,
  onClose,
  onSuccess,
  startAtSuccess = false,
}: ExtendedWaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [step, setStep]   = useState<WaitlistStep>(startAtSuccess ? "success" : "idle");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (startAtSuccess) setStep("success");
  }, [startAtSuccess]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Escape to close
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
    if (!startAtSuccess && step !== "success") {
      setStep("idle");
      setError("");
    }
  };

  if (!open || !mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={resetAndClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99998,
          background: "rgba(13,31,28,0.5)",
        }}
      />

      {/* Panel wrapper */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 1rem",
          pointerEvents: "none",
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Join the TaskLync waitlist"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "28rem",
            borderRadius: "28px",
            overflow: "hidden",
            background: "#FAFAF6",
            boxShadow:
              "0 0 0 1px rgba(13,31,28,0.07), 0 8px 40px rgba(13,31,28,0.14), 0 2px 8px rgba(13,31,28,0.06)",
            pointerEvents: "auto",
          }}
        >
          {/* Close button */}
          <button
            onClick={resetAndClose}
            aria-label="Close"
            className="cursor-pointer absolute top-5 right-5 z-20 w-8 h-8 rounded-full flex items-center justify-center border-none transition-colors duration-150 hover:bg-black/10"
            style={{
              background: "rgba(13,31,28,0.06)",
              color: "rgba(13,31,28,0.45)",
            }}
          >
            <X size={15} strokeWidth={2.2} />
          </button>

          {/* Body */}
          <div style={{ padding: "2rem 2rem 2.25rem" }}>
            {step === "success" ? (
              <SuccessState onClose={resetAndClose} />
            ) : (
              <WaitlistForm
                onSubmit={handleSubmit}
                loading={step === "loading"}
                error={error}
                email={email}
                setEmail={(v) => {
                  setEmail(v);
                  setError("");
                  setStep("idle");
                }}
                emailRef={emailRef}
              />
            )}
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default WaitlistModal;