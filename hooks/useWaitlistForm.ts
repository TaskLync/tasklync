// hooks/useWaitlistForm.ts
"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const FIRST_DELAY_MS     = 15_000;
const RETRY_DELAY_MS     = 15_000;
const MAX_AUTO_SHOWS     = 2;
const SESSION_KEY_COUNT  = "tl_wl_shown_count";
const SESSION_KEY_JOINED = "tl_wl_joined";

export function useWaitlistModal() {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleShow = useCallback((delayMs: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const alreadyJoined = sessionStorage.getItem(SESSION_KEY_JOINED) === "true";
      if (alreadyJoined) return;
      const count = parseInt(sessionStorage.getItem(SESSION_KEY_COUNT) ?? "0", 10);
      if (count >= MAX_AUTO_SHOWS) return;
      sessionStorage.setItem(SESSION_KEY_COUNT, String(count + 1));
      setOpen(true);
    }, delayMs);
  }, []);

  useEffect(() => {
    scheduleShow(FIRST_DELAY_MS);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [scheduleShow]);

  const dismiss = useCallback(() => {
    setOpen(false);
    const count = parseInt(sessionStorage.getItem(SESSION_KEY_COUNT) ?? "0", 10);
    if (count < MAX_AUTO_SHOWS) scheduleShow(RETRY_DELAY_MS);
  }, [scheduleShow]);

  const openManual = useCallback(() => setOpen(true), []);

  const markJoined = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY_JOINED, "true");
    sessionStorage.setItem(SESSION_KEY_COUNT, String(MAX_AUTO_SHOWS));
  }, []);

  return { open, dismiss, openManual, markJoined };
}