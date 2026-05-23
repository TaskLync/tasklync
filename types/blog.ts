export interface Author {
  slug: string
  name: string
  title?: string
  bio?: string
  avatar?: string
  twitter?: string
  linkedin?: string
}

export interface Category {
  slug: string
  name: string
  description: string
  color: 'green' | 'teal' | 'emerald' | 'sage' | 'forest' | 'lime' | 'olive'
}

export interface TOCItem {
  id: string
  text: string
  level: 2 | 3
}

export interface BlogPostFrontmatter {
  // Required
  title: string
  slug: string
  excerpt: string
  publishedAt: string       // ISO 8601: "2026-01-15"
  category: string
  author: string

  // SEO
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  noindex?: boolean

  // Content
  featuredImage?: string
  featuredImageAlt?: string
  updatedAt?: string

  // Classification
  tags?: string[]
  relatedPosts?: string[]
  featured?: boolean
  draft?: boolean

  // Schema
  faqItems?: Array<{ question: string; answer: string }>
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string
  readingTime: number
  authorData: Author
  categoryData: Category
}

export type BlogListItem = Omit<BlogPost, 'content'>