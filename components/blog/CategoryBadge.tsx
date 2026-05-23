import type { Category } from '@/types/blog'

// All variants stay within the brand green palette
const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  green:   { bg: 'rgba(31,111,95,0.08)',  text: '#1F6F5F', border: 'rgba(31,111,95,0.18)' },
  teal:    { bg: 'rgba(47,160,132,0.08)', text: '#2FA084', border: 'rgba(47,160,132,0.18)' },
  emerald: { bg: 'rgba(111,207,151,0.12)',text: '#3a8f5e', border: 'rgba(111,207,151,0.25)' },
  sage:    { bg: 'rgba(31,111,95,0.06)',  text: '#4a7c6b', border: 'rgba(31,111,95,0.12)' },
  forest:  { bg: 'rgba(13,31,28,0.07)',   text: '#0D1F1C', border: 'rgba(13,31,28,0.12)' },
  lime:    { bg: 'rgba(111,207,151,0.1)', text: '#2e7d52', border: 'rgba(111,207,151,0.2)' },
  olive:   { bg: 'rgba(31,111,95,0.07)',  text: '#3d6b5e', border: 'rgba(31,111,95,0.14)' },
}

interface Props {
  category: Category
  size?: 'sm' | 'md'
}

export function CategoryBadge({ category, size = 'sm' }: Props) {
  const c = colorMap[category.color] ?? colorMap.green
  const sizeClass = size === 'md'
    ? 'px-3 py-1 text-[11px]'
    : 'px-2.5 py-0.5 text-[10px]'

  return (
    <span
      className={`inline-flex items-center rounded-full border font-bold uppercase tracking-widest ${sizeClass}`}
      style={{
        background: c.bg,
        color: c.text,
        borderColor: c.border,
        fontFamily: 'var(--font-body)',
      }}
    >
      {category.name}
    </span>
  )
}