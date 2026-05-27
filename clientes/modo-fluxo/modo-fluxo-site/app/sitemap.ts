import type { MetadataRoute } from 'next'
import { getAllPosts, CATEGORIES } from '@/lib/posts'

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

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...categoryEntries,
    ...postEntries,
  ]
}
