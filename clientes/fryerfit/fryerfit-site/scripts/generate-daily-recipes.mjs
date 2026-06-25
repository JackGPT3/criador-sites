import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const RECIPES_DIR = path.join(ROOT, 'content', 'receitas')
const CACHE_FILE = path.join(ROOT, 'image-cache.json')

const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY

if (!ANTHROPIC_KEY) { console.error('ANTHROPIC_API_KEY não definida.'); process.exit(1) }
if (!UNSPLASH_KEY)  { console.error('UNSPLASH_ACCESS_KEY não definida.'); process.exit(1) }

function loadCache() {
  try { return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8')) } catch { return {} }
}

function existingSlugs() {
  return fs.readdirSync(RECIPES_DIR)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace('.mdx', ''))
}

async function fetchUnsplash(query) {
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape&content_filter=high`
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } })
  if (!res.ok) return null
  const data = await res.json()
  return data.results?.[0]?.urls?.regular ?? null
}

async function generateRecipes(slugsExistentes) {
  const exampleMdx = `---
titulo: "Alcatra Low Carb na Air Fryer"
descricao: "Bife de alcatra com crosta de ervas, dourado por fora e rosado por dentro."
aparelho: "Air Fryer"
objetivo: "Low Carb"
tempoPreparo: "14 min"
porcao: "1 bife (200g)"
calorias: 320
proteina: 40
carbs: 1
gordura: 16
dificuldade: "Médio"
porcoes: 2
tags: ["carne bovina", "alcatra", "air fryer", "low carb", "sem glúten"]
---

Texto introdutório direto, sem rodeios.

## Ingredientes

- ingrediente 1
- ingrediente 2

## Modo de preparo

1. passo 1
2. passo 2

## Dicas de preparo

Dica relevante em markdown.

> Nota nutricional quando necessário.`

  const prompt = `Você é o criador de receitas do FryerFit, site de receitas fitness sem fogão.

Gere EXATAMENTE 2 receitas novas para o site. As receitas devem ser para eletrodomésticos: Air Fryer, Micro-ondas, Panela de Pressão Elétrica, Panela de Arroz ou Grill/Sanduicheira.

Foco em: alto proteico, low carb, ganho de massa ou refeição balanceada.
Público: praticantes de academia e pessoas que querem comer bem sem depender do fogão.

RECEITAS JÁ EXISTENTES (NÃO REPETIR):
${slugsExistentes.join('\n')}

FORMATO OBRIGATÓRIO — retorne um JSON array com exatamente 2 objetos, sem markdown blocks, sem texto fora do JSON:

[
  {
    "slug": "nome-da-receita-kebab-case",
    "unsplashQuery": "english query for unsplash food photo",
    "mdx": "conteúdo completo do arquivo .mdx incluindo o frontmatter"
  }
]

EXEMPLO DE MDX (siga o formato exatamente):
${exampleMdx}

REGRAS:
- slug deve ser único, descritivo e em kebab-case com o aparelho no final (ex: "filé-tilápia-crosta-air-fryer")
- aparelho deve ser um destes valores exatos: "Air Fryer", "Micro-ondas", "Panela de Pressão Elétrica", "Panela de Arroz", "Grill/Sanduicheira"
- objetivo deve ser um destes: "Alto Proteico", "Low Carb", "Ganho de Massa", "Balanceado"
- dificuldade deve ser: "Fácil" ou "Médio"
- unsplashQuery em inglês, descritivo, ex: "grilled salmon fillet healthy food"
- receitas completas e práticas, com ingredientes e passos reais
- valores nutricionais realistas por porção
- escrita direta, sem enrolação, sem advérbios excessivos`

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Claude API erro ${res.status}: ${err}`)
  }

  const data = await res.json()
  const text = data.content?.[0]?.text ?? ''

  // extrai JSON mesmo se vier com ```json ... ```
  const match = text.match(/\[[\s\S]*\]/)
  if (!match) throw new Error(`Resposta inesperada da API:\n${text}`)

  return JSON.parse(match[0])
}

async function main() {
  const slugsExistentes = existingSlugs()
  console.log(`Receitas existentes: ${slugsExistentes.length}`)

  console.log('Gerando 2 receitas via Claude API...')
  const recipes = await generateRecipes(slugsExistentes)
  console.log(`Receitas geradas: ${recipes.map(r => r.slug).join(', ')}`)

  const cache = loadCache()

  for (const recipe of recipes) {
    // verifica se o slug já existe
    if (slugsExistentes.includes(recipe.slug)) {
      console.warn(`  ↩ ${recipe.slug} já existe — pulando`)
      continue
    }

    // escreve o arquivo MDX
    const filePath = path.join(RECIPES_DIR, `${recipe.slug}.mdx`)
    fs.writeFileSync(filePath, recipe.mdx)
    console.log(`  ✓ ${recipe.slug}.mdx criado`)

    // busca imagem no Unsplash
    if (!cache[recipe.slug]) {
      process.stdout.write(`  ↓ imagem para "${recipe.unsplashQuery}"... `)
      const imageUrl = await fetchUnsplash(recipe.unsplashQuery)
      if (imageUrl) {
        cache[recipe.slug] = imageUrl
        console.log('ok')
      } else {
        console.log('sem resultado — usando fallback do aparelho')
      }
      await new Promise(r => setTimeout(r, 400))
    }
  }

  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2))
  console.log(`\n✓ image-cache.json atualizado (${Object.keys(cache).length} entradas)`)
  console.log('Pronto.')
}

main().catch(err => { console.error(err); process.exit(1) })
