// config/site.ts

export const siteConfig = {
  // =========================
  // CORE BRAND
  // =========================

  name: "TaskLync",

  shortName: "TaskLync",

  title:
    "TaskLync, Trusted Home Services Platform",

  description:
  "TaskLync is Pakistan’s modern home services platform connecting you instantly with trusted, verified, and skilled professionals for everyday repairs, maintenance, and home improvement.",

  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://tasklync.pk",

  domain: "tasklync.pk",

  // =========================
  // SEO / SOCIAL
  // =========================

  twitter: "@tasklync",

  // =========================
  // CONTACT
  // =========================

  contact: {
    email: {
      sender:
        "furqanshabbir234@gmail.com",

      senderName: "TaskLync",

      support:
        "support@tasklync.pk",

      hello:
        "hello@tasklync.pk",
    },

    phone: "+49 30 000 0000",

    address: {
      city: "Faisalabad",
      country: "Pakistan",
    },
  },

  // =========================
  // SOCIAL LINKS
  // =========================

  social: {
    twitter:
      "https://twitter.com/tasklync",

    instagram:
      "https://instagram.com/tasklync",

    linkedin:
      "https://linkedin.com/company/tasklync",

    xHandle: "@tasklync",
  },

  // =========================
  // BRANDING
  // =========================

  branding: {
    logo: "/logo.svg",

    favicon: "/favicon.ico",

    ogImage:
      "/images/og/default.png",
  },
} as const

export type SiteConfig =
  typeof siteConfig