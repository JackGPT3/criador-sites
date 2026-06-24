import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CACHE_FILE = path.join(__dirname, '..', 'image-cache.json')
const KEY = process.env.UNSPLASH_ACCESS_KEY

if (!KEY) { console.error('UNSPLASH_ACCESS_KEY não definida.'); process.exit(1) }

const RETRIES = {
  'alcatra-low-carb-air-fryer':      'grilled beef steak herbs plate food',
  'arroz-legumes-panela-eletrica':   'rice bowl vegetables healthy meal',
  'batata-doce-assada-air-fryer':    'roasted sweet potato food plate',
  'brigadeiro-proteico-micro-ondas': 'chocolate dessert bowl spoon sweet',
  'chips-abobrinha-air-fryer':       'baked zucchini chips snack green',
  'mingau-aveia-panela-arroz':       'oatmeal porridge breakfast bowl warm',
  'omelete-proteico-micro-ondas':    'omelette eggs breakfast healthy protein',
  'peixe-limao-air-fryer':           'grilled fish lemon herbs plate seafood',
}

async function fetchImage(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=3&order_by=relevant&orientation=landscape&content_filter=high`
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${KEY}` } })
  if (!res.ok) { console.warn(`  HTTP ${res.status}`); return null }
  const data = await res.json()
  return data.results?.[0]?.urls?.regular ?? null
}

const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'))

for (const [slug, query] of Object.entries(RETRIES)) {
  if (cache[slug]) { console.log(`↩ ${slug} (já existe)`); continue }
  process.stdout.write(`↓ ${slug}... `)
  const url = await fetchImage(query)
  if (url) { cache[slug] = url; console.log('ok') }
  else { console.log('sem resultado') }
  await new Promise(r => setTimeout(r, 500))
}

fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
console.log(`\n✓ Cache: ${Object.keys(cache).length} entradas`)
