import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { RecipeMeta } from '@/components/RecipeCard'
import { getRecipeImage } from './images'

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

export async function getAllRecipesWithImages(): Promise<RecipeMeta[]> {
  const recipes = getAllRecipes()
  return Promise.all(
    recipes.map(async (recipe) => {
      if (recipe.imagem) return recipe
      const query = `${recipe.titulo} ${recipe.aparelho} food recipe`
      const imagem = await getRecipeImage(recipe.slug, query)
      return { ...recipe, imagem: imagem ?? undefined }
    })
  )
}

export async function getRecipeBySlugWithImage(
  slug: string
): Promise<{ meta: RecipeMeta; content: string } | null> {
  const recipe = getRecipeBySlug(slug)
  if (!recipe) return null
  if (recipe.meta.imagem) return recipe

  const query = `${recipe.meta.titulo} ${recipe.meta.aparelho} food recipe`
  const imagem = await getRecipeImage(slug, query)
  return {
    ...recipe,
    meta: { ...recipe.meta, imagem: imagem ?? undefined },
  }
}
