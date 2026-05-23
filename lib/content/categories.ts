import categoriesData from '@/content/blog/_categories/categories.json'
import type { Category } from '@/types/blog'

export function getCategory(slug: string): Category {
  const found = (categoriesData as Category[]).find(c => c.slug === slug)
  return found ?? {
    slug: 'uncategorized',
    name: 'Uncategorized',
    description: '',
    color: 'green',
  }
}

export function getAllCategories(): Category[] {
  return categoriesData as Category[]
}