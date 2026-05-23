import type { BlogListItem } from '@/types/blog'
import { PostCard } from './PostCard'

interface Props {
  posts: (BlogListItem | null | undefined)[]
}

export function RelatedPosts({ posts }: Props) {
  const safePosts = posts.filter(
    (post): post is BlogListItem => !!post && typeof post.slug === 'string'
  )

  if (!safePosts.length) return null

  return (
    <section
      className="mt-16 pt-12"
      style={{ borderTop: '1px solid rgba(31,111,95,0.1)' }}
    >
      <h2
        className="font-bold tracking-tight mb-8"
        style={{
          fontFamily: 'var(--font-clash)',
          fontSize: '1.5rem',
          color: '#0D1F1C',
        }}
      >
        Continue Reading
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {safePosts.map(post => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}