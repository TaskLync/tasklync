import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
} from "@/lib/content/blog";
import { extractTOC } from "@/lib/content/toc";

import { BlogLayout } from "@/components/layout/BlogLayout";
import { ArticleHeader } from "@/components/blog/ArticleHeader";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { InlineCTA } from "@/components/blog/InlineCTA";
import { ShareButtons } from "@/components/blog/ShareButtons";

import { siteConfig } from "@/config/site";

import { buildSchemaGraph, buildBreadcrumbSchema } from "@/lib/seo/schemas";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.metaTitle ?? `${post.title} | TaskLync Blog`,
    description: post.metaDescription ?? post.excerpt,

    alternates: {
      canonical:
        post.canonicalUrl ??
        `${siteConfig.url}/blog/${post.slug}`,
    },

    robots: post.noindex
      ? { index: false }
      : { index: true, follow: true },

    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
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
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [
        `${siteConfig.url}/api/og?slug=${post.slug}`,
      ],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post.slug);
  const toc = extractTOC(post.content);

  const schema = buildSchemaGraph([
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      {
        name: post.title,
        url: `/blog/${post.slug}`,
      },
    ]),
  ]);

  return (
    <>
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <BlogLayout toc={toc}>
        <ArticleHeader post={post} />

        <ArticleBody
          content={post.content}
          faqItems={post.faqItems}
        />

        <ShareButtons
          title={post.title}
          url={`${siteConfig.url}/blog/${post.slug}`}
        />

        <InlineCTA
          headline="Ready to find a vetted professional?"
          body="TaskLync connects homeowners with background-checked, reviewed home service professionals. Get early access when we launch."
          cta="Join the Waitlist"
        />

        <AuthorBox author={post.authorData} />

        <RelatedPosts posts={relatedPosts} />
      </BlogLayout>
    </>
  );
}