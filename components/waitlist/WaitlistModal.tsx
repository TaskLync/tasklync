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
  const [email, setEmail]     = useState("");
  const [step, setStep]       = useState<WaitlistStep>(startAtSuccess ? "success" : "idle");
  const [error, setError]     = useState("");
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false); // tracks if we're on the client
  const emailRef              = useRef<HTMLInputElement | null>(null);

  // Wait for client mount before calling createPortal (no SSR mismatch)
  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (startAtSuccess) setStep("success");
  }, [startAtSuccess]);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
      if (!startAtSuccess && step !== "success") {
        setStep("idle");
        setError("");
      }
    }, 300);
  };

  if (!open || !mounted) return null;

  // Portal renders directly into document.body — completely outside any
  // stacking context created by transforms, filters, or will-change on
  // parent elements. This guarantees it always sits on top of everything.
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
          opacity: visible ? 1 : 0,
          transition: "opacity 0.22s ease",
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
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0) scale(1)"
              : "translateY(12px) scale(0.98)",
            transition:
              "opacity 0.28s cubic-bezier(0.16,1,0.3,1), transform 0.28s cubic-bezier(0.16,1,0.3,1)",
            pointerEvents: "auto",
          }}
        >
          {/* Close button */}
          <button
            onClick={resetAndClose}
            aria-label="Close"
            style={{
              cursor: "pointer",
              position: "absolute",
              top: "1.25rem",
              right: "1.25rem",
              zIndex: 20,
              width: "2rem",
              height: "2rem",
              borderRadius: "9999px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(13,31,28,0.06)",
              color: "rgba(13,31,28,0.45)",
              border: "none",
              transition: "background 0.15s",
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