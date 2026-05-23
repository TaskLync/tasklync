// app/rss.xml/route.ts
import { generateRSSFeed } from '@/lib/content/rss'

export async function GET() {
  const feed = generateRSSFeed()
  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    }
  })
}