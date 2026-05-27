import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const POSTS_DIR = join(ROOT, 'content', 'posts')
const XML_FILE = join(ROOT, 'modofluxo.WordPress.2026-05-27.xml')

const xml = readFileSync(XML_FILE, 'utf-8')

// 1. Mapear attachment_id → URL da imagem
const attachmentMap = {}
const attachmentRegex = /<wp:post_id>(\d+)<\/wp:post_id>[\s\S]*?<wp:post_type><!\[CDATA\[attachment\]\]><\/wp:post_type>[\s\S]*?<wp:attachment_url><!\[CDATA\[(.*?)\]\]><\/wp:attachment_url>/g
let m
while ((m = attachmentRegex.exec(xml)) !== null) {
  attachmentMap[m[1]] = m[2]
}
console.log(`Attachments encontrados: ${Object.keys(attachmentMap).length}`)

// 2. Mapear post_slug → thumbnail URL
const slugImageMap = {}

// Encontrar todos os items de post
const itemRegex = /<item>([\s\S]*?)<\/item>/g
while ((m = itemRegex.exec(xml)) !== null) {
  const item = m[1]

  // Só posts publicados
  if (!/<wp:post_type><!\[CDATA\[post\]\]>/.test(item)) continue
  if (!/<wp:status><!\[CDATA\[publish\]\]>/.test(item)) continue

  const slugMatch = item.match(/<wp:post_name><!\[CDATA\[(.*?)\]\]>/)
  const thumbMatch = item.match(/<wp:meta_key><!\[CDATA\[_thumbnail_id\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[(\d+)\]\]>/)

  if (slugMatch && thumbMatch) {
    const slug = slugMatch[1]
    const thumbId = thumbMatch[1]
    const imageUrl = attachmentMap[thumbId]
    if (imageUrl) {
      slugImageMap[slug] = imageUrl
      console.log(`  ${slug} → ${imageUrl}`)
    }
  }
}
console.log(`\nPosts com imagem: ${Object.keys(slugImageMap).length}`)

// 3. Atualizar cada arquivo MDX com o campo image
const mdxFiles = readdirSync(POSTS_DIR).filter(f => f.endsWith('.mdx'))
let updated = 0
let skipped = 0

for (const file of mdxFiles) {
  const slug = file.replace('.mdx', '')
  const imageUrl = slugImageMap[slug]

  if (!imageUrl) {
    console.log(`  SKIP (sem imagem): ${slug}`)
    skipped++
    continue
  }

  const filePath = join(POSTS_DIR, file)
  let content = readFileSync(filePath, 'utf-8')

  // Verifica se já tem campo image
  if (/^image:/m.test(content)) {
    console.log(`  JÁ TEM imagem: ${slug}`)
    continue
  }

  // Insere image: após o campo date:
  content = content.replace(
    /^(date: ".*?")/m,
    `$1\nimage: "${imageUrl}"`
  )

  writeFileSync(filePath, content, 'utf-8')
  console.log(`  ✓ Atualizado: ${slug}`)
  updated++
}

console.log(`\nResultado: ${updated} atualizados, ${skipped} sem imagem no WP.`)
