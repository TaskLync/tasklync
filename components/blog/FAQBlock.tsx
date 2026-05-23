'use client'

import { useEffect, useRef, useState } from 'react'
import { Plus, Minus } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface Props {
  items?: FAQItem[]   // 👈 FIX: make optional
  title?: string
}

const EXPO_OUT = '0.16,1,0.3,1'

function FAQRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  const answerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (answerRef.current) {
      setHeight(isOpen ? answerRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  return (
    <div style={{ borderBottom: '1px solid rgba(31,111,95,0.1)' }} className="last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-6 py-5 text-left"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <span
          className="text-[15px] font-semibold leading-snug tracking-[-0.01em]"
          style={{
            fontFamily: 'var(--font-clash)',
            color: isOpen ? '#1F6F5F' : '#0D1F1C',
          }}
        >
          {item.question}
        </span>

        <span
          className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: isOpen ? '#1F6F5F' : 'rgba(31,111,95,0.08)',
            border: `1px solid ${isOpen ? '#1F6F5F' : 'rgba(31,111,95,0.15)'}`,
            transition: 'background 0.2s ease, border-color 0.2s ease',
          }}
        >
          {isOpen ? (
            <Minus size={14} strokeWidth={2.5} color="#fff" />
          ) : (
            <Plus size={14} strokeWidth={2.5} color="#1F6F5F" />
          )}
        </span>
      </button>

      <div
        style={{
          height,
          overflow: 'hidden',
          transition: `height 0.35s cubic-bezier(${EXPO_OUT})`,
        }}
      >
        <div ref={answerRef} className="pb-5 pr-14">
          <p
            className="text-[14px] leading-[1.75]"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'rgba(13,31,28,0.55)',
            }}
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FAQBlock({
  items,
  title = 'Frequently Asked Questions',
}: Props) {

  // ✅ SAFE GUARD (this fixes your crash)
  const safeItems = Array.isArray(items) ? items : []

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  if (safeItems.length === 0) return null   // optional but recommended

  return (
    <aside className="my-10">
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
            <FAQRow
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() =>
                setOpenIndex(openIndex === i ? null : i)
              }
            />
          ))}
        </div>
      </div>
    </aside>
  )
}