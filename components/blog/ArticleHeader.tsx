import Image from 'next/image'
import type { BlogPost } from '@/types/blog'
import { CategoryBadge } from './CategoryBadge'
import { PostMeta } from './PostMeta'

interface Props {
  post: BlogPost
}

export function ArticleHeader({ post }: Props) {
  return (
    <header className="mb-10">
      {/* Category */}
      <div className="mb-5">
        <CategoryBadge category={post.categoryData} size="md" />
      </div>

      {/* Title */}
      <h1
        className="font-bold leading-[1.07] tracking-[-0.03em] mb-5"
        style={{
          fontFamily: 'var(--font-clash)',
          fontSize: 'clamp(1.9rem, 3.5vw, 3rem)',
          color: '#0D1F1C',
        }}
      >
        {post.title}
      </h1>

      {/* Excerpt */}
      <p
        className="leading-[1.72] mb-7 italic"
        style={{
          fontFamily: 'var(--font-serif-italic)',
          fontSize: '1.1rem',
          color: 'rgba(13,31,28,0.5)',
          maxWidth: '34rem',
        }}
      >
        {post.excerpt}
      </p>

      {/* Meta row */}
      <div
        className="flex flex-wrap items-center gap-4 pb-6"
        style={{ borderBottom: '1px solid rgba(31,111,95,0.1)' }}
      >
        {/* Author */}
        <div className="flex items-center gap-3">
          {post.authorData.avatar && (
            <div
              className="relative w-9 h-9 rounded-full overflow-hidden"
              style={{ border: '1.5px solid rgba(31,111,95,0.2)' }}
            >
              <Image
                src={post.authorData.avatar}
                alt={post.authorData.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <p
              className="text-[13.5px] font-semibold leading-none"
              style={{ fontFamily: 'var(--font-body)', color: '#0D1F1C' }}
            >
              {post.authorData.name}
            </p>
            {post.authorData.title && (
              <p
                className="text-[12px] mt-0.5"
                style={{ fontFamily: 'var(--font-body)', color: '#1F6F5F' }}
              >
                {post.authorData.title}
              </p>
            )}
          </div>
        </div>

        <span style={{ color: 'rgba(31,111,95,0.2)' }}>·</span>

        <PostMeta
          publishedAt={post.publishedAt}
          readingTime={post.readingTime}
          updatedAt={post.updatedAt}
        />
      </div>

      {/* Featured image */}
      {post.featuredImage && (
        <figure className="mt-8">
          <div
            className="relative w-full rounded-2xl overflow-hidden aspect-video"
            style={{ background: 'rgba(31,111,95,0.06)' }}
          >
            <Image
              src={post.featuredImage}
              alt={post.featuredImageAlt ?? post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {post.featuredImageAlt && (
            <figcaption
              className="text-center text-[12px] mt-3"
              style={{ fontFamily: 'var(--font-body)', color: 'rgba(13,31,28,0.35)' }}
            >
              {post.featuredImageAlt}
            </figcaption>
          )}
        </figure>
      )}
    </header>
  )
}