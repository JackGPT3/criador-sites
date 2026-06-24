import fs from 'fs'
import path from 'path'

const CACHE_FILE = path.join(process.cwd(), '.cache/images.json')

function loadCache(): Record<string, string> {
  try {
    if (fs.existsSync(CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'))
    }
  } catch {}
  return {}
}

function saveCache(cache: Record<string, string>) {
  const dir = path.dirname(CACHE_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
}

export async function getRecipeImage(
  cacheKey: string,
  query: string
): Promise<string | null> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY
  if (!accessKey) return null

  const cache = loadCache()
  if (cache[cacheKey]) return cache[cacheKey]

  try {
    const res = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high`,
      { headers: { Authorization: `Client-ID ${accessKey}` } }
    )
    if (!res.ok) return null

    const data = await res.json()
    const imageUrl: string | null = data.urls?.regular ?? null

    if (imageUrl) {
      cache[cacheKey] = imageUrl
      saveCache(cache)
    }
    return imageUrl
  } catch {
    return null
  }
}
