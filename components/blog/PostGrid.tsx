import { Fragment } from 'react'
import type { BlogListItem } from '@/types/blog'
import { PostCard } from './PostCard'
import { NewsletterBlock } from './NewsletterBlock'

interface Props {
  posts: BlogListItem[]
}

const NEWSLETTER_INTERVAL = 6

export function PostGrid({ posts }: Props) {
  return (
    <section className="mx-auto max-w-[1300px] px-6 sm:px-10 lg:px-16">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <Fragment key={post.slug}>
            <PostCard post={post} />
            {(index + 1) % NEWSLETTER_INTERVAL === 0 &&
              index !== posts.length - 1 && (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                  <NewsletterBlock />
                </div>
              )}
          </Fragment>
        ))}
      </div>
      {posts.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-['Poppins'] text-[15px]" style={{ color: 'rgba(13,31,28,0.4)' }}>
            No posts found in this category.
          </p>
        </div>
      )}
    </section>
  )
}