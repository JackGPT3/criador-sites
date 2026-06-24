import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const CACHE_FILE = path.join(ROOT, 'image-cache.json')
const RECIPES_DIR = path.join(ROOT, 'content', 'receitas')
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY

if (!ACCESS_KEY) {
  console.error('UNSPLASH_ACCESS_KEY não definida.')
  process.exit(1)
}

function loadCache() {
  try { return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8')) } catch { return {} }
}

function saveCache(cache) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
  console.log(`\n✓ image-cache.json salvo com ${Object.keys(cache).length} entradas.`)
}

async function fetchImage(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&order_by=relevant&orientation=landscape&content_filter=high`
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${ACCESS_KEY}` } })
  if (!res.ok) { console.warn(`  Erro HTTP ${res.status} para: ${query}`); return null }
  const data = await res.json()
  return data.results?.[0]?.urls?.regular ?? null
}

// Recipes: extrair titulo e aparelho do frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const fm = {}
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) fm[key.trim()] = rest.join(':').trim().replace(/^"|"$/g, '')
  }
  return fm
}

const cache = loadCache()
const skipped = []
const fetched = []

// 1. Receitas
console.log('Buscando imagens das receitas...\n')
const files = fs.readdirSync(RECIPES_DIR).filter(f => f.endsWith('.mdx'))

for (const file of files) {
  const slug = file.replace('.mdx', '')
  if (cache[slug]) { console.log(`  ↩ ${slug} (cache)`) ; skipped.push(slug) ; continue }
  const content = fs.readFileSync(path.join(RECIPES_DIR, file), 'utf-8')
  const fm = parseFrontmatter(content)
  const query = `${fm.titulo} ${fm.aparelho} food recipe`
  process.stdout.write(`  ↓ ${slug}... `)
  const url = await fetchImage(query)
  if (url) { cache[slug] = url ; fetched.push(slug) ; console.log('ok') }
  else { console.log('sem resultado') }
  await new Promise(r => setTimeout(r, 350)) // evitar rate limit
}

// 2. Imagens das categorias de aparelhos
const APARELHOS = {
  'air-fryer':               'crispy golden chicken wings fried food',
  'micro-ondas':             'steaming hot soup bowl food cozy',
  'panela-pressao-eletrica': 'beef stew slow cooked tender meat vegetables',
  'panela-arroz':            'white rice bowl steam chopsticks',
  'grill-sanduicheira':      'grilled sandwich toasted melted cheese panini',
}

console.log('\nBuscando imagens das categorias de aparelhos...\n')
for (const [slug, query] of Object.entries(APARELHOS)) {
  const key = `aparelho-${slug}`
  if (cache[key]) { console.log(`  ↩ ${key} (cache)`) ; skipped.push(key) ; continue }
  process.stdout.write(`  ↓ ${key}... `)
  const url = await fetchImage(query)
  if (url) { cache[key] = url ; fetched.push(key) ; console.log('ok') }
  else { console.log('sem resultado') }
  await new Promise(r => setTimeout(r, 350))
}

saveCache(cache)
console.log(`\nFetched: ${fetched.length}  |  Do cache: ${skipped.length}`)
