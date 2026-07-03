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
    <section className="w-full mb-10">
      <div className="mx-auto max-w-[1300px] px-6 sm:px-10 lg:px-16">
        {/* Scrollable row on mobile, wrap on desktop */}
        <div
          className="
            flex gap-2
            overflow-x-auto md:flex-wrap
            [-webkit-overflow-scrolling:touch]
            [scrollbar-width:thin]
            [scrollbar-color:#1F6F5F_rgba(31,111,95,0.1)]
            [&::-webkit-scrollbar]:h-[3px]
            [&::-webkit-scrollbar-track]:bg-[rgba(31,111,95,0.08)]
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-[#1F6F5F]
            [&::-webkit-scrollbar-thumb]:rounded-full
            pb-3 md:pb-0
          "
        >
          {/* All button */}
          <button
            onClick={() => select('all')}
            className="font-['Poppins'] shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold border cursor-pointer"
            style={{
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
                className="font-['Poppins'] shrink-0 px-4 py-2 rounded-full text-[13px] font-semibold border cursor-pointer"
                style={{
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
      </div>
    </section>
  )
}