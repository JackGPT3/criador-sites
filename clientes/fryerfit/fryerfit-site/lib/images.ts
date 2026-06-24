import fs from 'fs'
import path from 'path'

// Cache commitável — fica no repo para persistir entre builds no Vercel
const CACHE_FILE = path.join(process.cwd(), 'image-cache.json')

function loadCache(): Record<string, string> {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'))
    }
  } catch {}
  return {}
}

function saveCache(cache: Record<string, string>) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
}

export async function getImage(
  cacheKey: string,
  query: string
): Promise<string | null> {
  const cache = loadCache()
  if (cache[cacheKey]) return cache[cacheKey]

  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  if (!accessKey) return null

  try {
    // Search endpoint com order_by=relevant — mais estável que random
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&order_by=relevant&orientation=landscape&content_filter=high`,
      { headers: { Authorization: `Client-ID ${accessKey}` } }
    )
    if (!res.ok) return null

    const data = await res.json()
    const imageUrl: string | null = data.results?.[0]?.urls?.regular ?? null

    if (imageUrl) {
      cache[cacheKey] = imageUrl
      saveCache(cache)
    }
    return imageUrl
  } catch {
    return null
  }
}

export async function getRecipeImage(
  cacheKey: string,
  query: string
): Promise<string | null> {
  return getImage(cacheKey, query)
}
