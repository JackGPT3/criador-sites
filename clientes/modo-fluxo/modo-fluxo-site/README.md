# Modo Fluxo — Site

Publisher de conteúdo sobre IA, automações e produtividade. Gerenciado via Claude Code.

## Stack

- Next.js 16 (App Router, SSG)
- Tailwind CSS v4
- MDX (via next-mdx-remote)
- Deploy: Vercel

---

## Como gerenciar

### Adicionar um novo post

Crie um arquivo `.mdx` em `content/posts/`:

```
content/posts/nome-do-post.mdx
```

Template de frontmatter:

```yaml
---
title: "Título do Post"
description: "Descrição curta para SEO (max 160 caracteres)"
date: "2026-05-27"
category: "ferramentas"
tags: ["ia", "automacao", "ferramenta"]
author: "Modo Fluxo"
featured: false
---

Conteúdo em Markdown aqui...
```

**Categorias disponíveis:**
- `automacao`
- `ferramentas`
- `inteligencia-artificial`
- `noticias`
- `tutoriais`

---

### Rodar localmente

```bash
npm run dev
# http://localhost:3000
```

---

### Deploy

```bash
npm i -g vercel   # instalar CLI (uma vez)
vercel --prod     # publicar
```

---

## Monetização

### Google AdSense

1. Obtenha seu Publisher ID em [adsense.google.com](https://adsense.google.com)
2. Em `app/layout.tsx`, descomente e atualize a linha do script AdSense
3. Em `components/AdBanner.tsx`, substitua `ca-pub-XXXXXXXXXXXXXXXXX`
4. Atualize os `data-ad-slot` nas páginas

**Posições atuais:** homepage (horizontal), post (retangular), categoria (horizontal)

### Newsletter

Em `components/Newsletter.tsx`, o `handleSubmit` tem um `TODO`.
Conectar ao MailerLite, Brevo ou ConvertKit quando escolher.

---

## Estrutura

```
content/posts/          — arquivos .mdx dos posts
app/layout.tsx          — layout global (AdSense aqui)
app/page.tsx            — homepage
app/blog/[slug]/        — post individual
app/categoria/[slug]/   — listagem por categoria
components/AdBanner.tsx — espaço de anúncio
components/Newsletter.tsx — captura de email
lib/posts.ts            — leitura de posts (server only)
lib/categories.ts       — categorias (client-safe)
```
