import type { MetadataRoute } from 'next'
import { getAllSlugs } from '@/lib/recipes'
import { APARELHOS, OBJETIVOS } from '@/lib/categories'

const BASE = 'https://fryerfit.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs()

  const receitas: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/receitas/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const aparelhos: MetadataRoute.Sitemap = Object.keys(APARELHOS).map((slug) => ({
    url: `${BASE}/aparelhos/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const objetivos: MetadataRoute.Sitemap = Object.keys(OBJETIVOS).map((slug) => ({
    url: `${BASE}/objetivos/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    { url: BASE, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/sobre`, changeFrequency: 'monthly', priority: 0.5 },
    ...receitas,
    ...aparelhos,
    ...objetivos,
  ]
}
