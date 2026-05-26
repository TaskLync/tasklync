// lib/seo/metadata.ts

import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

// =========================
// TYPES
// =========================

interface MetadataConfig {
  title: string
  description: string
  path: string
  type?: "website" | "article"
  image?: string
  publishedAt?: string
  updatedAt?: string
  authors?: string[]
  noindex?: boolean
  nofollow?: boolean
  keywords?: string[]
}

interface BlogPost {
  title: string
  excerpt: string
  slug: string
  featuredImage?: string
  publishedAt?: string
  updatedAt?: string
  noindex?: boolean
  metaTitle?: string
  metaDescription?: string

  authorData: {
    name: string
  }
}

interface City {
  name: string
  state: string
  slug: string
}

interface Service {
  name: string
  slug: string
}

// =========================
// MAIN METADATA GENERATOR
// =========================

export function generateMetadata(
  config: MetadataConfig
): Metadata {
  const canonicalUrl = `${siteConfig.url}${config.path}`

  const ogImage = config.image
    ? config.image.startsWith("http")
      ? config.image
      : `${siteConfig.url}${config.image}`
    : `${siteConfig.url}/api/og?title=${encodeURIComponent(
        config.title
      )}&path=${encodeURIComponent(config.path)}`

  return {
    title: {
      absolute: `${config.title} | ${siteConfig.name}`,
      template: `%s | ${siteConfig.name}`,
    },

    description: config.description,

    keywords: config.keywords,

    metadataBase: new URL(siteConfig.url),

    // =========================
    // ROBOTS
    // =========================

    robots: {
      index: !config.noindex,
      follow: !config.nofollow,

      googleBot: {
        index: !config.noindex,
        follow: !config.nofollow,

        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // =========================
    // CANONICAL
    // =========================

    alternates: {
      canonical: canonicalUrl,

      types: {
        "application/rss+xml": `${siteConfig.url}/rss.xml`,
      },
    },

    // =========================
    // OPEN GRAPH
    // =========================

    openGraph: {
      type: config.type ?? "website",

      url: canonicalUrl,

      siteName: siteConfig.name,

      title: config.title,

      description: config.description,

      locale: "en_PK",

      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],

      ...(config.publishedAt && {
        publishedTime: config.publishedAt,
      }),

      ...(config.updatedAt && {
        modifiedTime: config.updatedAt,
      }),

      ...(config.authors && {
        authors: config.authors,
      }),
    },

    // =========================
    // TWITTER / X
    // =========================

    twitter: {
      card: "summary_large_image",

      title: config.title,

      description: config.description,

      images: [ogImage],

      site: siteConfig.twitter,

      creator: siteConfig.twitter,
    },

    // =========================
    // EXTRA
    // =========================

    other: {
      "theme-color": "#080B11",
    },
  }
}

// =========================
// BLOG METADATA
// =========================

export function generateBlogMetadata(
  post: BlogPost
): Metadata {
  return generateMetadata({
    title: post.metaTitle ?? post.title,

    description:
      post.metaDescription ?? post.excerpt,

    path: `/blog/${post.slug}`,

    type: "article",

    image: post.featuredImage,

    publishedAt: post.publishedAt,

    updatedAt: post.updatedAt,

    authors: [post.authorData.name],

    noindex: post.noindex ?? false,
  })
}

// =========================
// LOCATION METADATA
// =========================

export function generateLocationMetadata(
  city: City,
  service?: Service
): Metadata {
  const title = service
    ? `${service.name} in ${city.name}, ${city.state}`
    : `Home Services in ${city.name}, ${city.state}`

  const description = service
    ? `Find trusted ${service.name.toLowerCase()} professionals in ${city.name}. Verified, insured, and background-checked pros. Join the waitlist.`
    : `Trusted home service professionals in ${city.name}, ${city.state}. Background-checked, insured, and ready to help. Join the TaskLync waitlist.`

  const path = service
    ? `/${city.slug}/${service.slug}`
    : `/${city.slug}`

  return generateMetadata({
    title,
    description,
    path,
    type: "website",
  })
}