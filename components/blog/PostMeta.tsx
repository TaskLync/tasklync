import { Clock, Calendar } from 'lucide-react'

interface Props {
  publishedAt: string
  readingTime: number
  updatedAt?: string
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function PostMeta({ publishedAt, readingTime, updatedAt }: Props) {
  return (
    <div
      className="font-['Poppins'] flex flex-wrap items-center gap-4 text-[13px]"
      style={{ color: 'rgba(13,31,28,0.4)' }}
    >
      <span className="flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5" />
        {updatedAt ? `Updated ${formatDate(updatedAt)}` : formatDate(publishedAt)}
      </span>
      <span className="flex items-center gap-1.5">
        <Clock className="w-3.5 h-3.5" />
        {readingTime} min read
      </span>
    </div>
  )
}