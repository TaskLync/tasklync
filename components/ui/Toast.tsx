"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type ToastVariant = "success" | "error";

interface ToastMessage {
  id: string;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  show: (opts: { message: string; variant?: ToastVariant }) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

const AUTO_DISMISS_MS = 5000;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = useState<ToastMessage[]>([]);
  const [current, setCurrent] = useState<ToastMessage | null>(null);
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);   // ← track hover pause
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!current && queue.length > 0) {
      const [next, ...rest] = queue;
      setQueue(rest);
      setCurrent(next);
      setTimeout(() => setVisible(true), 10);
    }
  }, [current, queue]);

  // Auto dismiss — only runs when visible and NOT paused
  useEffect(() => {
    if (!visible || paused) return;

    timerRef.current = setTimeout(() => dismiss(), AUTO_DISMISS_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [visible, paused]);   // ← re-runs when paused changes

  function dismiss() {
    setVisible(false);
    setTimeout(() => {
      setCurrent(null);
      setPaused(false);   // ← reset pause state for next toast
    }, 320);
  }

  function handleMouseEnter() {
    setPaused(true);
    if (timerRef.current) clearTimeout(timerRef.current);  // ← kill the timer immediately
  }

  function handleMouseLeave() {
    setPaused(false);   // ← useEffect above will restart timer
  }

  const show = useCallback(
    ({ message, variant = "success" }: { message: string; variant?: ToastVariant }) => {
      const id = Math.random().toString(36).slice(2);
      setQueue((q) => [...q, { id, message, variant }]);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      {current && (
        // 1. Add aria-atomic and tabIndex so focus doesn't jump
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"          
  tabIndex={-1}               
  onMouseEnter={handleMouseEnter}
  onMouseLeave={handleMouseLeave}
  style={{
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999999,
    height: "64px",
    pointerEvents: visible ? "auto" : "none",   
    willChange: "transform",                    
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "40px",
    paddingRight: "40px",
    backgroundColor: current.variant === "success" ? "#1F6F5F" : "#C0392B",
    transform: visible ? "translateY(0)" : "translateY(-100%)",
    transition: "transform 0.3s ease-out",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    cursor: "default",
  }}
>
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              fontWeight: 500,
              color: "#ffffff",
              letterSpacing: "0.01em",
            }}
          >
            {current.message}
          </span>

          <button
            onClick={dismiss}
            aria-label="Dismiss notification"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              opacity: 0.8,
              color: "#ffffff",
              flexShrink: 0,
              marginLeft: "16px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
}