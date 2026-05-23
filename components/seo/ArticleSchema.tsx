import { JsonLd } from './JsonLd'
import type { BlogPost } from '@/types/blog'
import { siteConfig } from '@/config/site'

export function ArticleSchema({ post }: { post: BlogPost }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt ?? post.publishedAt,
        author: { '@type': 'Person', name: post.authorData.name },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo: { '@type': 'ImageObject', url: `${siteConfig.url}/images/logo.png` },
        },
        image: post.featuredImage
          ? `${siteConfig.url}${post.featuredImage}`
          : `${siteConfig.url}/api/og?slug=${post.slug}`,
        url: `${siteConfig.url}/blog/${post.slug}`,
      }}
    />
  )
}