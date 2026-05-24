// NO 'use client' — server component
import { FAQRow } from './FAQRow'
import type { FAQItem } from './FAQRow'

interface Props {
  items: FAQItem[]
  title?: string
}

export function FAQBlock({ items, title = 'Frequently Asked Questions' }: Props) {
  const safeItems = Array.isArray(items) ? items : []
  if (safeItems.length === 0) return null

  return (
    <aside className="my-6">
      <h3
        className="font-bold tracking-tight mb-5"
        style={{
          fontFamily: 'var(--font-clash)',
          fontSize: '1.25rem',
          color: '#0D1F1C',
        }}
      >
        {title}
      </h3>
      <div
        className="rounded-2xl overflow-hidden border"
        style={{
          background: '#fff',
          borderColor: 'rgba(31,111,95,0.1)',
          boxShadow: '0 4px 24px rgba(13,31,28,0.05)',
        }}
      >
        <div className="px-6 py-1">
          {safeItems.map((item, i) => (
            <FAQRow key={i} item={item} defaultOpen={i === 0} />
          ))}
        </div>
      </div>
    </aside>
  )
}