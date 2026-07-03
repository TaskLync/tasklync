"use client"
import Link from 'next/link'
import Image from 'next/image'
import type { BlogListItem } from '@/types/blog'
import { CategoryBadge } from './CategoryBadge'
import { PostMeta } from './PostMeta'

interface Props {
  post: BlogListItem
  variant?: 'default' | 'compact'
}

export function PostCard({ post, variant = 'default' }: Props) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border"
      style={{
        background: '#fff',
        borderColor: 'rgba(31,111,95,0.1)',
        boxShadow: '0 2px 16px rgba(13,31,28,0.04)',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(31,111,95,0.22)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 6px 32px rgba(13,31,28,0.08)'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(31,111,95,0.1)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 16px rgba(13,31,28,0.04)'
        ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative w-full aspect-video overflow-hidden"
        style={{ background: 'rgba(31,111,95,0.06)' }}
      >
        {post.featuredImage ? (
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt ?? post.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, rgba(31,111,95,0.1) 0%, rgba(111,207,151,0.06) 100%)',
            }}
          />
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <CategoryBadge category={post.categoryData} />
        <h2
          className={`font-['Fredoka'] font-semibold leading-snug tracking-[-0.02em] line-clamp-2 ${
            variant === 'compact' ? 'text-[15px]' : 'text-[16.5px]'
          }`}
          style={{ color: '#0D1F1C' }}
        >
          {post.title}
        </h2>
        {variant !== 'compact' && (
          <p
            className="font-['Poppins'] text-[13.5px] leading-[1.7] line-clamp-2 flex-1"
            style={{ color: 'rgba(13,31,28,0.5)' }}
          >
            {post.excerpt}
          </p>
        )}
        <div
          className="mt-auto pt-3"
          style={{ borderTop: '1px solid rgba(31,111,95,0.08)' }}
        >
          <PostMeta
            publishedAt={post.publishedAt}
            readingTime={post.readingTime}
          />
        </div>
      </div>
    </Link>
  )
}