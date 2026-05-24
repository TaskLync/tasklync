import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/content/blog'
import { extractTOC } from '@/lib/content/toc'
import { BlogLayout } from '@/components/layout/BlogLayout'
import { ArticleHeader } from '@/components/blog/ArticleHeader'
import { ArticleBody } from '@/components/blog/ArticleBody'
import { AuthorBox } from '@/components/blog/AuthorBox'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { InlineCTA } from '@/components/blog/InlineCTA'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { ArticleSchema } from '@/components/seo/ArticleSchema'
import { FAQSchema } from '@/components/seo/FAQSchema'
import { siteConfig } from '@/config/site'

export const revalidate = 86400
export const dynamicParams = true

export async function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {

  const { slug } = await params

  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.metaTitle ?? `${post.title} | TaskLync Blog`,
    description: post.metaDescription ?? post.excerpt,
    ...(post.noindex && { robots: { index: false } }),
    alternates: {
      canonical: post.canonicalUrl ?? `${siteConfig.url}/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.authorData.name],
      images: [
        {
          url: `${siteConfig.url}/api/og?slug=${post.slug}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle ?? post.title,
      description: post.metaDescription ?? post.excerpt,
      images: [`${siteConfig.url}/api/og?slug=${post.slug}`],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params

  const post = getPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(post.slug)
  const toc = extractTOC(post.content)

  return (
    <>
      <ArticleSchema post={post} />
      {post.faqItems?.length && <FAQSchema items={post.faqItems} />}

      <BlogLayout toc={toc}>
        <ArticleHeader post={post} />

        <ArticleBody content={post.content} />

        <ShareButtons
          title={post.title}
          url={`${siteConfig.url}/blog/${post.slug}`}
        />

        <div className="mt-5">
          <InlineCTA
            headline="Ready to find a vetted professional?"
            body="TaskLync connects homeowners with background-checked, reviewed home service professionals. Get early access when we launch."
            cta="Join the Waitlist"
          />
        </div>

        <AuthorBox author={post.authorData} />

        <RelatedPosts posts={relatedPosts} />
      </BlogLayout>
    </>
  )
}