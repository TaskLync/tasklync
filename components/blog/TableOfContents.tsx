'use client'

import { useEffect, useRef, useState } from 'react'
import type { TOCItem } from '@/types/blog'

interface Props {
  items: TOCItem[]
}

export function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (!items.length) return

    observerRef.current = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    )

    items.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [items])

  if (!items.length) return null

  return (
    <nav aria-label="Table of contents">
      <p
        className="text-[11px] font-bold tracking-[0.12em] uppercase mb-4"
        style={{ fontFamily: 'var(--font-poppins)', color: '#1F6F5F' }}
      >
        On this page
      </p>
      <ul className="space-y-1">
        {items.map(item => {
          const isActive = activeId === item.id
          return (
            <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
              <a
                href={`#${item.id}`}
                onClick={e => {
                  e.preventDefault()
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="block text-[13px] py-1 leading-snug transition-colors duration-150"
                style={{
                  fontFamily: 'var(--font-poppins)',
                  color: isActive ? '#1F6F5F' : 'rgba(13,31,28,0.38)',
                  fontWeight: isActive ? '600' : '400',
                  paddingLeft: isActive ? '10px' : '0',
                  borderLeft: isActive
                    ? '2px solid #1F6F5F'
                    : '2px solid transparent',
                  transition: 'color 0.15s ease, padding-left 0.15s ease, border-color 0.15s ease',
                }}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}