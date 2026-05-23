// app/(marketing)/blog/page.tsx

import type { Metadata } from 'next'
import { Suspense } from 'react'

import { getAllPosts, getFeaturedPosts } from '@/lib/content/blog'
import { getAllCategories } from '@/lib/content/categories'

import { BlogHero } from '@/components/blog/BlogHero'
import { FeaturedPost } from '@/components/blog/FeaturedPost'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { PostGrid } from '@/components/blog/PostGrid'

import WaitlistCTA from '@/components/sections/WaitListCTA'
import FAQ from '@/components/sections/FAQ'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Home Services Blog | Tips, Guides & Cost Breakdowns | TaskLync',
  description:
    'Expert guides for homeowners: how to hire the right professional, what home services cost, and how to maintain your home year-round.',
}

interface PageProps {
  searchParams: Promise<{
    category?: string
  }>
}

export default async function BlogIndexPage({
  searchParams,
}: PageProps) {
  // Next.js 16 async search params
  const resolvedSearchParams = await searchParams

  const allPosts = getAllPosts()
  const [featured] = getFeaturedPosts(1)
  const categories = getAllCategories()

  const activeCategory =
    resolvedSearchParams.category

  // Filter posts by selected category
  const filteredPosts = activeCategory
    ? allPosts.filter(
        post => post.category === activeCategory
      )
    : allPosts

  // Always remove featured post from grid
  // because it is already displayed above
  const gridPosts = featured
    ? filteredPosts.filter(
        post => post.slug !== featured.slug
      )
    : filteredPosts

  return (
    <main
      className="pt-27"
      style={{
        background: '#F7F7F2',
        minHeight: '100vh',
      }}
    >
      {/* Hero */}
      <BlogHero />

      {/* Featured Post — always visible */}
      {featured && (
        <FeaturedPost post={featured} />
      )}

      {/* Category Filter */}
      <Suspense fallback={null}>
        <CategoryFilter categories={categories} />
      </Suspense>

      {/* Blog Grid */}
      <PostGrid posts={gridPosts} />

      {/* CTA */}
      <WaitlistCTA />

      {/* FAQ */}
      <FAQ />

      <div className="h-24" />
    </main>
  )
}