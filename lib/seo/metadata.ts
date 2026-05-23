import { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface MetadataConfig {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  noindex?: boolean;
  publishedAt?: string;
  author?: string;
}

export function generateMetadata(
  config: MetadataConfig
): Metadata {
  const url = `${siteConfig.url}${config.path}`;

  const ogImage =
    config.image ??
    `${siteConfig.url}/api/og?title=${encodeURIComponent(config.title)}`;

  return {
    title: config.title,
    description: config.description,

    metadataBase: new URL(siteConfig.url),

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: config.title,
      description: config.description,
      url,
      siteName: siteConfig.name,

      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],

      type: config.type ?? "website",
      locale: "en_PK",

      ...(config.publishedAt && {
        publishedTime: config.publishedAt,
      }),

      ...(config.author && {
        authors: [config.author],
      }),
    },

    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: [ogImage],
      site: siteConfig.social.xHandle,
    },

    robots: config.noindex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
          },
        },
  };
}

// BLOG SPECIFIC SEO
export function generateBlogMetadata(post: {
  title: string;
  excerpt: string;
  slug: string;
  coverImage?: string;
  publishedAt?: string;
  author?: string;
}): Metadata {
  return generateMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    image: post.coverImage,
    publishedAt: post.publishedAt,
    author: post.author,
  });
}