import type { Metadata } from "next";
import {
  Playfair_Display,
  DM_Sans,
  Syne,
  Instrument_Serif,
  Poppins,
  Fredoka,
} from "next/font/google";
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
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-italic",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-fredoka-one",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TaskLync | On-Demand Home Services",
    template: "%s | TaskLync",
  },
  description :
    "Connect with verified home service professionals in minutes. TaskLync is the intelligent layer between homeowners and the tradespeople they trust.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
        ${playfair.variable}
        ${dmSans.variable}
        ${syne.variable}
        ${instrumentSerif.variable}
        ${poppins.variable}
        ${fredoka.variable}
      `}
    >
      <head>
        {/*
          Clash Display & Cabinet Grotesk — loaded via fontshare.
          next/font/google doesn't support fontshare, so we use a
          <link> tag here. preconnect first to cut DNS + TLS overhead.
        */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=cabinet-grotesk@400,500,700&display=swap"
        />
      </head>
      <body className="bg-surface antialiased">
        {children}
      </body>
    </html>
  );
}