import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800" ,],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TaskLync — On-Demand Home Services",
    template: "%s | TaskLync",
  },
  description:
    "Connect with verified home service professionals in minutes. TaskLync is the intelligent layer between homeowners and the tradespeople they trust.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${syne.variable}`}>
      <body className="bg-surface antialiased">
        {children}
      </body>
    </html>
  );
}