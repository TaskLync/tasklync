import { siteConfig } from "@/config/site";

/* ----------------------------- GRAPH WRAPPER ---------------------------- */
export function buildSchemaGraph(schemas: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.filter(Boolean),
  };
}

/* ---------------------------- ORGANIZATION ----------------------------- */
export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}${siteConfig.branding.logo}`,
    },
    sameAs: [
      siteConfig.social.twitter,
      siteConfig.social.linkedin,
      siteConfig.social.instagram,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteConfig.contact.email.support,
      availableLanguage: "English",
    },
  };
}

/* ------------------------------- WEBSITE ------------------------------- */
export function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* -------------------------------- ARTICLE ------------------------------ */
export function buildArticleSchema(post: any) {
  return {
    "@type": "Article",
    "@id": `${siteConfig.url}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage
      ? {
          "@type": "ImageObject",
          url: `${siteConfig.url}${post.featuredImage}`,
        }
      : undefined,

    author: {
      "@type": "Person",
      name: post.authorData?.name,
    },

    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },

    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },

    wordCount: post.content
      ? post.content.split(/\s+/).length
      : undefined,
  };
}

/* --------------------------- LOCAL BUSINESS ---------------------------- */
export function buildLocalBusinessSchema(city: any, service?: any) {
  const path = service
    ? `/${city.slug}/${service.slug}`
    : `/${city.slug}`;

  return {
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}${path}#local-business`,
    name: service
      ? `${siteConfig.name} ${service.name} in ${city.name}`
      : `${siteConfig.name} ${city.name}`,

    url: `${siteConfig.url}${path}`,

    areaServed: {
      "@type": "City",
      name: city.name,
    },
  };
}

/* ------------------------------ BREADCRUMB ----------------------------- */
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

/* -------------------------------- FAQ ---------------------------------- */
export function buildFAQSchema(
  items: { question: string; answer: string }[]
) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}