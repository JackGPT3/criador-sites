# Processo de Criação de Post — Modo Fluxo

## Fluxo completo em 4 passos

### 1. Escolher tema e data

- Abrir `conteudo/calendario.md`
- Pegar a última data agendada + 2 dias para a próxima
- Escolher tema da seção "Ideias" ou propor novo — focar em: ferramentas práticas, tutoriais, comparativos, notícias de IA
- Público: empreendedores e profissionais que querem resultado com IA, não teoria

### 2. Buscar imagem no Pexels

Rodar o script de imagem **antes** de escrever o post, para já ter o arquivo disponível:

```bash
cd clientes/modo-fluxo/modo-fluxo-site
node scripts/pexels-image.mjs "termo de busca em inglês" "slug-do-post"
```

Exemplos:
```bash
node scripts/pexels-image.mjs "artificial intelligence business" "notebooklm-o-que-e-e-como-usar-no-seu-negocio"
node scripts/pexels-image.mjs "email marketing automation" "brevo-vs-mailchimp-qual-plataforma-escolher"
```

O script:
- Busca foto no Pexels com o termo dado
- Baixa a imagem de melhor resolução
- Converte para `.webp` e salva em `public/images/posts/[slug].webp`
- Imprime o caminho final para copiar no frontmatter

**API Key:** em `clientes/modo-fluxo/_privado/credenciais.md` (seção Pexels)
**Variável local:** `PEXELS_API_KEY` (não vai pro Vercel — script roda só localmente)

### 3. Criar o arquivo MDX

Caminho: `clientes/modo-fluxo/modo-fluxo-site/content/posts/[slug].mdx`

**Frontmatter obrigatório:**
```yaml
---
title: "Título do Post"
description: "Descrição de 150-160 caracteres para SEO. Deve resumir o benefício principal."
date: "AAAA-MM-DD"
image: "/images/posts/[slug].webp"
category: "automacao" | "ferramentas" | "inteligencia-artificial" | "noticias" | "tutoriais"
tags: ["tag seo 1", "tag seo 2", "tag seo 3", "tag seo 4", "tag seo 5"]
author: "Modo Fluxo"
---
```

**Estrutura do conteúdo:**
- Parágrafo de abertura sem heading (gancho direto — 2-3 linhas)
- Seções com `### Heading` (H3)
- **Negrito** para pontos de destaque dentro das seções
- Link interno quando relevante: `[texto](/blog/slug-do-post)`
- Sem "Conclusão" — terminar com próximo passo prático ou call to action
- Tom: direto, prático, sem enrolação, focado em resultado

**Tamanho:** 600-900 palavras. Suficiente para SEO, sem enrolar.

### 4. Atualizar o calendário e fazer deploy

1. Adicionar o post na tabela do mês correto em `conteudo/calendario.md`
2. Commit e deploy:

```powershell
cd "c:\Users\noteb\Projetos\Sites e landingpages"
git add clientes/modo-fluxo/modo-fluxo-site/content/posts/[slug].mdx
git add clientes/modo-fluxo/modo-fluxo-site/public/images/posts/[slug].webp
git add clientes/modo-fluxo/conteudo/calendario.md
git commit -m "post: [título curto]"
```

```powershell
cd "clientes/modo-fluxo/modo-fluxo-site"
.\deploy.ps1
```

---

## Checklist rápido por post

- [ ] Data escolhida (último slot + 2 dias)
- [ ] Imagem baixada do Pexels via script
- [ ] MDX criado com frontmatter completo
- [ ] Descrição com 150-160 chars para SEO
- [ ] 4-5 tags focadas em busca
- [ ] Link interno para pelo menos 1 post relacionado
- [ ] Calendário atualizado
- [ ] Deploy feito

---

## Pexels — dicas de busca

- Buscar sempre em **inglês** (mais resultados de qualidade)
- Termos que funcionam bem: "small business", "entrepreneur", "automation", "artificial intelligence", "digital marketing", "laptop work"
- Evitar termos muito genéricos ("technology", "business") — resultados ficam sem personalidade
- Preferir fotos com pessoas em contexto de trabalho ou telas com interfaces

---

_Script de imagem: `clientes/modo-fluxo/modo-fluxo-site/scripts/pexels-image.mjs`_
