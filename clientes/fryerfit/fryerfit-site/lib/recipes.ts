import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { RecipeMeta } from '@/components/RecipeCard'

const RECIPES_DIR = path.join(process.cwd(), 'content/receitas')

export function getAllRecipes(): RecipeMeta[] {
  if (!fs.existsSync(RECIPES_DIR)) return []
  const files = fs.readdirSync(RECIPES_DIR).filter((f) => f.endsWith('.mdx'))
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(RECIPES_DIR, file), 'utf-8')
    const { data } = matter(raw)
    return { ...(data as Omit<RecipeMeta, 'slug'>), slug: file.replace('.mdx', '') }
  })
}

export function getRecipeBySlug(slug: string): { meta: RecipeMeta; content: string } | null {
  const filePath = path.join(RECIPES_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    meta: { ...(data as Omit<RecipeMeta, 'slug'>), slug },
    content,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(RECIPES_DIR)) return []
  return fs
    .readdirSync(RECIPES_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}
