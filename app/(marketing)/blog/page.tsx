import { Suspense } from "react";

import { getAllPosts, getFeaturedPosts } from "@/lib/content/blog";
import { getAllCategories } from "@/lib/content/categories";

import { BlogHero } from "@/components/blog/BlogHero";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { PostGrid } from "@/components/blog/PostGrid";

import WaitlistCTA from "@/components/sections/WaitListCTA";
import FAQ from "@/components/sections/FAQ";

import { generateMetadata } from "@/lib/seo/metadata";
import {
  buildSchemaGraph,
  buildBreadcrumbSchema,
} from "@/lib/seo/schemas";

export const revalidate = 3600;

export const metadata = generateMetadata({
  title: "Home Services Blog | Tips, Guides & Cost Breakdowns",
  description:
    "Expert guides for homeowners: how to hire the right professional, what home services cost, and how to maintain your home year-round.",
  path: "/blog",
});

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function BlogIndexPage({
  searchParams,
}: PageProps) {
  const resolvedSearchParams = await searchParams;

  const allPosts = getAllPosts();
  const [featured] = getFeaturedPosts(1);
  const categories = getAllCategories();

  const activeCategory = resolvedSearchParams.category;

  const filteredPosts = activeCategory
    ? allPosts.filter((post) => post.category === activeCategory)
    : allPosts;

  const gridPosts = featured
    ? filteredPosts.filter((post) => post.slug !== featured.slug)
    : filteredPosts;

  const schema = buildSchemaGraph([
    buildBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
    ]),
    {
      "@type": "ItemList",
      itemListElement: gridPosts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  ]);

  return (
    <main
      className="pt-27"
      style={{ background: "#F7F7F2", minHeight: "100vh" }}
    >
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />

      <BlogHero />

      {featured && <FeaturedPost post={featured} />}

      <Suspense fallback={null}>
        <CategoryFilter categories={categories} />
      </Suspense>

      <PostGrid posts={gridPosts} />

      <WaitlistCTA />
      <FAQ />

      <div className="h-24" />
    </main>
  );
}