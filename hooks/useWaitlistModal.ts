"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const FIRST_DELAY_MS      = 15_000;
const RETRY_DELAY_MS      = 15_000;
const MAX_AUTO_SHOWS      = 2;
const SESSION_KEY_COUNT   = "tl_wl_shown_count";  // sessionStorage — resets per tab (intentional)
const LOCAL_KEY_JOINED    = "tl_wl_joined";        // localStorage  — persists across sessions

export function useWaitlistModal() {
  const [open, setOpen] = useState(false);

  /**
   * Read the joined flag from localStorage on mount.
   * Starts false (SSR-safe), flips to true on hydration if flag is set.
   */
  const [isSignedUp, setIsSignedUp] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate isSignedUp from localStorage once on the client
  useEffect(() => {
    if (localStorage.getItem(LOCAL_KEY_JOINED) === "true") {
      setIsSignedUp(true);
    }
  }, []);

  const scheduleShow = useCallback((delayMs: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      // Never auto-show if the user already joined (persists across sessions)
      if (localStorage.getItem(LOCAL_KEY_JOINED) === "true") return;

      const count = parseInt(sessionStorage.getItem(SESSION_KEY_COUNT) ?? "0", 10);
      if (count >= MAX_AUTO_SHOWS) return;

      sessionStorage.setItem(SESSION_KEY_COUNT, String(count + 1));
      setOpen(true);
    }, delayMs);
  }, []);

  // Start the 15s auto-show timer — but only if not already signed up
  useEffect(() => {
    if (isSignedUp) return; // already joined → never schedule
    scheduleShow(FIRST_DELAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isSignedUp, scheduleShow]);

  const dismiss = useCallback(() => {
    setOpen(false);
    // Only retry if not joined and under the auto-show limit
    if (localStorage.getItem(LOCAL_KEY_JOINED) === "true") return;
    const count = parseInt(sessionStorage.getItem(SESSION_KEY_COUNT) ?? "0", 10);
    if (count < MAX_AUTO_SHOWS) scheduleShow(RETRY_DELAY_MS);
  }, [scheduleShow]);

  const openManual = useCallback(() => setOpen(true), []);

  const markJoined = useCallback(() => {
    // Persist across all future sessions in this browser
    localStorage.setItem(LOCAL_KEY_JOINED, "true");
    // Also kill the session counter so no more auto-shows this tab
    sessionStorage.setItem(SESSION_KEY_COUNT, String(MAX_AUTO_SHOWS));
    setIsSignedUp(true);
    // Cancel any pending timer
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  return { open, dismiss, openManual, markJoined, isSignedUp };
}