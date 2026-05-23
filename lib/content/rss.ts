// lib/content/rss.ts
import { getAllPosts } from './blog'
import { siteConfig } from '@/config/site'

export function generateRSSFeed(): string {
  const posts = getAllPosts().slice(0, 20)

  const items = posts.map(post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteConfig.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${siteConfig.url}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <category>${post.category}</category>
      <author>${post.authorData.name}</author>
    </item>
  `).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>${siteConfig.name} Blog</title>
        <link>${siteConfig.url}/blog</link>
        <description>Home services guides, cost breakdowns, and hiring advice for homeowners.</description>
        <language>en-US</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        <atom:link href="${siteConfig.url}/rss.xml" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>`
}