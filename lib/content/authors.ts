import fs from 'fs'
import path from 'path'
import type { Author } from '@/types/blog'

const AUTHORS_DIR = path.join(process.cwd(), 'content', 'blog', '_authors')

export function getAuthor(slug: string): Author {
  try {
    const filePath = path.join(AUTHORS_DIR, `${slug}.json`)
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as Author
  } catch {
    return {
      slug: 'tasklync-team',
      name: 'TaskLync Team',
      title: 'Home Services Experts',
    }
  }
}