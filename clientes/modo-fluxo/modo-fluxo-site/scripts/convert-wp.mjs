/**
 * Converte posts do WordPress XML para arquivos MDX.
 * Uso: node scripts/convert-wp.mjs
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import TurndownService from 'turndown'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const XML_FILE = path.join(ROOT, 'modofluxo.WordPress.2026-05-27.xml')
const OUTPUT_DIR = path.join(ROOT, 'content', 'posts')

// Posts para DESCARTAR (slugs do WordPress)
const DISCARD_SLUGS = new Set([
  // Apostas esportivas — fora do nicho
  'a-logica-contra-a-emocao-como-a-ia-esta-mudando-o-jogo-nas-apostas-da-libertadores',
  'as-5-melhores-ferramentas-de-ia-e-dados-para-analisar-apostas-esportivas',
  'a-primeira-copa-da-ia-como-lucrar-com-o-maior-evento-de-2026-usando-automacao',
  // Duplicatas e conteúdo fraco
  'plantao-ia-atualizacoes-tecnologicas',
  'chatgpt-para-mensagens-de-atendimento-no-whatsapp',
  'fim-das-planilhas-confusas',
  'gestao-de-crise-e-sac-com-ia',
])

// Mapeamento de categorias WP → slugs do projeto
const CATEGORY_MAP = {
  'automacao': 'automacao',
  'automação': 'automacao',
  'ferramentas': 'ferramentas',
  'inteligencia-artificial': 'inteligencia-artificial',
  'inteligência artificial': 'inteligencia-artificial',
  'noticias': 'noticias',
  'notícias': 'noticias',
  'tutoriais': 'tutoriais',
}

const td = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
})

// Remove shortcodes do WordPress
function cleanContent(html) {
  return html
    .replace(/\[[\w_-]+[^\]]*\]/g, '') // remove [shortcodes]
    .replace(/<!--[\s\S]*?-->/g, '')    // remove HTML comments
    .trim()
}

// Extrai texto de CDATA
function extractCDATA(str, tag) {
  const regex = new RegExp(`<${tag}(?:[^>]*)><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\/${tag}>`, 'i')
  const match = str.match(regex)
  return match ? match[1].trim() : ''
}

function extractTag(str, tag) {
  const cdataMatch = str.match(new RegExp(`<${tag}(?:[^>]*)><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'))
  if (cdataMatch) return cdataMatch[1].trim()
  const plainMatch = str.match(new RegExp(`<${tag}(?:[^>]*)>([^<]*)<\\/${tag}>`, 'i'))
  return plainMatch ? plainMatch[1].trim() : ''
}

// Gera slug MDX a partir do slug WP
function toMdxSlug(wpSlug) {
  return wpSlug
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Gera tags a partir do título
function generateTags(title, category) {
  const words = title.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 4 && !['como', 'para', 'mais', 'seus', 'suas', 'essa', 'este', 'este', 'com', 'que', 'por', 'uma', 'dos', 'das', 'nos', 'nas'].includes(w))
    .slice(0, 4)
  return [category, ...words].slice(0, 5)
}

// Extrai categoria do bloco de item
function extractCategory(itemStr) {
  const catMatch = itemStr.match(/<category domain="category"[^>]*><!\[CDATA\[([^\]]+)\]\]><\/category>/i)
  if (catMatch) {
    const raw = catMatch[1].toLowerCase()
    return CATEGORY_MAP[raw] || raw
  }
  return 'inteligencia-artificial'
}

// Lê e divide o XML em itens
const xml = fs.readFileSync(XML_FILE, 'utf8')

// Divide em blocos <item>...</item>
const itemBlocks = xml.match(/<item>([\s\S]*?)<\/item>/g) || []

let converted = 0
let skipped = 0
let discarded = 0

for (const block of itemBlocks) {
  // Só processar posts publicados
  const postType = extractTag(block, 'wp:post_type')
  const status = extractTag(block, 'wp:status')

  if (postType !== 'post' || status !== 'publish') continue

  const wpSlug = extractTag(block, 'wp:post_name')
  const title = extractTag(block, 'title')

  // Verifica se deve descartar
  if (DISCARD_SLUGS.has(wpSlug)) {
    console.log(`⛔ Descartado: ${title}`)
    discarded++
    continue
  }

  const htmlContent = extractCDATA(block, 'content:encoded')
  const excerpt = extractCDATA(block, 'excerpt:encoded')
  const rawDate = extractTag(block, 'wp:post_date')
  const category = extractCategory(block)
  const mdxSlug = toMdxSlug(wpSlug || title)

  // Converte HTML para Markdown
  const cleaned = cleanContent(htmlContent)
  let markdown = ''
  try {
    markdown = cleaned ? td.turndown(cleaned) : ''
  } catch {
    markdown = cleaned
  }

  // Usa excerpt como description, ou gera um fallback
  const description = excerpt || `${title} — leia no Modo Fluxo.`

  // Formata data
  const date = rawDate ? rawDate.split(' ')[0] : new Date().toISOString().split('T')[0]

  // Gera tags
  const tags = generateTags(title, category)

  // Monta frontmatter MDX
  const frontmatter = [
    '---',
    `title: "${title.replace(/"/g, '\\"')}"`,
    `description: "${description.replace(/"/g, '\\"').slice(0, 160)}"`,
    `date: "${date}"`,
    `category: "${category}"`,
    `tags: [${tags.map(t => `"${t}"`).join(', ')}]`,
    `author: "Modo Fluxo"`,
    '---',
    '',
  ].join('\n')

  const mdxContent = frontmatter + markdown

  // Salva arquivo (não sobrescreve se já existe — protege edições manuais)
  const outputPath = path.join(OUTPUT_DIR, `${mdxSlug}.mdx`)
  if (fs.existsSync(outputPath)) {
    console.log(`⚠️  Já existe (ignorado): ${mdxSlug}.mdx`)
    skipped++
    continue
  }

  fs.writeFileSync(outputPath, mdxContent, 'utf8')
  console.log(`✅ Criado: ${mdxSlug}.mdx  [${category}]`)
  converted++
}

console.log(`\n📊 Resultado: ${converted} criados | ${skipped} ignorados | ${discarded} descartados`)
