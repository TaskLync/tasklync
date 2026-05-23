'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { Category } from '@/types/blog'

interface Props {
  categories: Category[]
}

export function CategoryFilter({ categories }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('category') ?? 'all'

  function select(slug: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') params.delete('category')
    else params.set('category', slug)
    router.push(`/blog?${params.toString()}`, { scroll: false })
  }

  return (
    <section className="w-full mx-auto px-6 sm:px-10 lg:px-16 mb-10">
      <div className="flex flex-wrap gap-2">
        {/* All button */}
        <button
          onClick={() => select('all')}
          className="px-4 py-2 rounded-full text-[13px] font-semibold border transition-all duration-200 cursor-pointer"
          style={{
            fontFamily: 'var(--font-body)',
            background: active === 'all'
              ? 'linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)'
              : 'transparent',
            color: active === 'all' ? '#fff' : 'rgba(13,31,28,0.45)',
            borderColor: active === 'all' ? 'transparent' : 'rgba(31,111,95,0.18)',
            boxShadow: active === 'all' ? '0 2px 12px rgba(47,160,132,0.22)' : 'none',
          }}
        >
          All Posts
        </button>

        {categories.map(cat => {
          const isActive = active === cat.slug
          return (
            <button
              key={cat.slug}
              onClick={() => select(cat.slug)}
              className="px-4 py-2 rounded-full text-[13px] font-semibold border transition-all duration-200 cursor-pointer"
              style={{
                fontFamily: 'var(--font-body)',
                background: isActive
                  ? 'linear-gradient(135deg,#1F6F5F 0%,#2FA084 100%)'
                  : 'transparent',
                color: isActive ? '#fff' : 'rgba(13,31,28,0.45)',
                borderColor: isActive ? 'transparent' : 'rgba(31,111,95,0.18)',
                boxShadow: isActive ? '0 2px 12px rgba(47,160,132,0.22)' : 'none',
              }}
            >
              {cat.name}
            </button>
          )
        })}
      </div>
    </section>
  )
}