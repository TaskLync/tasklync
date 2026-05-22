// config/site.ts

export const siteConfig = {
  // Core Brand
  name: "TaskLync",
  shortName: "TaskLync",

  title:
    "TaskLync, Trusted Home Services Platform",

  description:
    "Modern infrastructure for trusted home services.",

  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://tasklync.pk",

  domain: "tasklync.pk",

  // Contact
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

  // Social Links
  social: {
    twitter:
      "https://twitter.com/tasklync",

    instagram:
      "https://instagram.com/tasklync",

    linkedin:
      "https://linkedin.com/company/tasklync",

    xHandle: "@tasklync",
  },

  // Branding Assets
  branding: {
    logo: "/logo.svg",
    favicon: "/favicon.ico",
    ogImage: "/images/og/default.png",
  },
} as const;

export type SiteConfig = typeof siteConfig;