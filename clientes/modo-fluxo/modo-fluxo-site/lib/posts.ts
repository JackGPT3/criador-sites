import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import type { Post, PostWithContent, PostFrontmatter } from './types'
export { CATEGORIES } from './categories'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const filePath = path.join(POSTS_DIR, filename)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    const rt = readingTime(content)

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      readingTime: rt.text,
    }
  })

  const today = new Date()
  today.setHours(23, 59, 59, 999)

  const parseLocalDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split('-').map(Number)
    return new Date(y, m - 1, d)
  }

  return posts
    .filter((post) => parseLocalDate(post.frontmatter.date) <= today)
    .sort(
      (a, b) =>
        parseLocalDate(b.frontmatter.date).getTime() - parseLocalDate(a.frontmatter.date).getTime()
    )
}

export function getPostBySlug(slug: string): PostWithContent {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  const rt = readingTime(content)

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    readingTime: rt.text,
    content,
  }
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) => post.frontmatter.category === category)
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return getAllPosts().map((p) => p.slug)
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
