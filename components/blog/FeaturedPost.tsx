"use client"
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { BlogListItem } from '@/types/blog'
import { CategoryBadge } from './CategoryBadge'
import { PostMeta } from './PostMeta'

interface Props {
  post: BlogListItem
}

export function FeaturedPost({ post }: Props) {
  return (
    <section className="w-full mx-auto px-6 sm:px-10 lg:px-16 mb-12">
      <Link
        href={`/blog/${post.slug}`}
        className="group relative flex flex-col lg:flex-row rounded-3xl overflow-hidden border transition-all duration-300"
        style={{
          background: '#fff',
          borderColor: 'rgba(31,111,95,0.12)',
          boxShadow: '0 4px 32px rgba(13,31,28,0.06)',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(31,111,95,0.28)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 8px 48px rgba(13,31,28,0.1)'
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(31,111,95,0.12)'
          ;(e.currentTarget as HTMLElement).style.boxShadow = '0 4px 32px rgba(13,31,28,0.06)'
        }}
      >
        {/* Featured pill */}
        <div className="absolute top-5 left-5 z-10">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white"
            style={{
              background: 'linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)',
              boxShadow: '0 2px 12px rgba(47,160,132,0.3)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Featured
          </span>
        </div>

        {/* Image */}
        <div className="relative w-full lg:w-3/5 h-60 sm:h-80 lg:h-auto min-h-80 bg-[#e8f0ec] overflow-hidden">
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt ?? post.title}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              priority
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(31,111,95,0.12) 0%, rgba(47,160,132,0.08) 100%)',
              }}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col justify-center p-8 lg:p-12 lg:w-2/5 gap-4">
          <CategoryBadge category={post.categoryData} size="sm" />

          <h2
            className="font-bold leading-[1.1] tracking-tight"
            style={{
              fontFamily: 'var(--font-clash)',
              fontSize: 'clamp(1.4rem, 2vw, 1.9rem)',
              color: '#0D1F1C',
            }}
          >
            {post.title}
          </h2>

          <p
            className="leading-[1.7] line-clamp-3"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9375rem',
              color: 'rgba(13,31,28,0.52)',
            }}
          >
            {post.excerpt}
          </p>

          <PostMeta
            publishedAt={post.publishedAt}
            readingTime={post.readingTime}
            updatedAt={post.updatedAt}
          />

          <div
            className="flex items-center gap-2 text-[13.5px] font-semibold group-hover:gap-3 transition-all duration-200"
            style={{ color: '#1F6F5F', fontFamily: 'var(--font-body)' }}
          >
            Read article <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </Link>
    </section>
  )
}