import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { WaitlistProvider } from "@/components/waitlist/WaitlistProvider";
import { AnalyticsProvider } from "@/components/layout/AnalyticsProvider";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <WaitlistProvider>
      <AnalyticsProvider>
        <Header />
        <main>{children}</main>
        <Footer />
      </AnalyticsProvider>
    </WaitlistProvider>
  );
}