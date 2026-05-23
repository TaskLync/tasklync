// lib/seo/schemas.ts

import { siteConfig } from "@/config/site";
import type { BlogPost } from "@/types/blog";
/**
 * Wraps multiple schema objects into a single JSON-LD graph
 */
export function buildSchemaGraph(schemas: any[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}

/**
 * Article schema for blog posts
 */
export function buildArticleSchema(post: BlogPost) {
  return {
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage
      ? `${siteConfig.url}${post.featuredImage}`
      : undefined,

    author: {
      "@type": "Person",
      name: post.authorData.name,
    },

    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

/**
 * Breadcrumb schema for navigation
 */
export function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}