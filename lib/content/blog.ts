import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { BlogPost, BlogListItem, BlogPostFrontmatter } from '@/types/blog'
import { getAuthor } from './authors'
import { getCategory } from './categories'

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog')

function findPostFile(slug: string): string | null {
  const walk = (dir: string): string | null => {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('_')) {
        const result = walk(path.join(dir, entry.name))
        if (result) return result
      } else if (entry.isFile() && entry.name === `${slug}.mdx`) {
        return path.join(dir, entry.name)
      }
    }
    return null
  }
  return walk(CONTENT_DIR)
}

function getAllMdxFiles(dir: string): string[] {
  const results: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('_')) {
      results.push(...getAllMdxFiles(path.join(dir, entry.name)))
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      results.push(path.join(dir, entry.name))
    }
  }
  return results
}

export function getAllPostSlugs(): string[] {
  return getAllMdxFiles(CONTENT_DIR).map(f => path.basename(f, '.mdx'))
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = findPostFile(slug)
  if (!filePath) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const frontmatter = data as BlogPostFrontmatter

  if (frontmatter.draft) return null

  return {
    ...frontmatter,
    content,
    readingTime: Math.ceil(readingTime(content).minutes),
    authorData: getAuthor(frontmatter.author),
    categoryData: getCategory(frontmatter.category),
  }
}

export function getAllPosts(): BlogListItem[] {
  return getAllMdxFiles(CONTENT_DIR)
    .map(filePath => {
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)
      const frontmatter = data as BlogPostFrontmatter

      if (frontmatter.draft) return null

      return {
        ...frontmatter,
        readingTime: Math.ceil(readingTime(content).minutes),
        authorData: getAuthor(frontmatter.author),
        categoryData: getCategory(frontmatter.category),
      } as BlogListItem
    })
    .filter((p): p is BlogListItem => p !== null)
    .sort((a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
}

export function getPostsByCategory(categorySlug: string): BlogListItem[] {
  return getAllPosts().filter(p => p.category === categorySlug)
}

export function getFeaturedPosts(limit = 1): BlogListItem[] {
  return getAllPosts().filter(p => p.featured).slice(0, limit)
}

export function getRelatedPosts(slug: string, limit = 3): BlogListItem[] {
  const post = getPostBySlug(slug)
  if (!post) return []

  if (post.relatedPosts?.length) {
    const all = getAllPosts()
    return post.relatedPosts
      .map(s => all.find(p => p.slug === s))
      .filter((p): p is BlogListItem => p !== null)
      .slice(0, limit)
  }

  return getPostsByCategory(post.category)
    .filter(p => p.slug !== slug)
    .slice(0, limit)
}

export function getPaginatedPosts(page: number, perPage = 12) {
  const all = getAllPosts()
  const totalPages = Math.ceil(all.length / perPage)
  const posts = all.slice((page - 1) * perPage, page * perPage)
  return { posts, totalPages, totalPosts: all.length, currentPage: page }
}