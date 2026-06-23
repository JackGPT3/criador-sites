import type { MetadataRoute } from 'next'
import { getAllPosts, CATEGORIES } from '@/lib/posts'
import tools from '@/content/ferramentas/tools.json'

const BASE_URL = 'https://modofluxo.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const postEntries = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const categoryEntries = Object.keys(CATEGORIES).map((slug) => ({
    url: `${BASE_URL}/categoria/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const toolCategories = [...new Set(tools.map((t) => t.category))]

  const toolCategoryEntries = toolCategories.map((slug) => ({
    url: `${BASE_URL}/ferramentas/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const toolEntries = tools.map((tool) => ({
    url: `${BASE_URL}/ferramentas/${tool.category}/${tool.slug}`,
    lastModified: new Date(tool.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/ferramentas`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...categoryEntries,
    ...toolCategoryEntries,
    ...toolEntries,
    ...postEntries,
  ]
}
