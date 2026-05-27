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

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
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
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}
