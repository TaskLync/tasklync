"use client";

import { usePageView, useScrollTracker } from "@/hooks/useAnalytics";

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  usePageView();
  useScrollTracker();
  return <>{children}</>;
}