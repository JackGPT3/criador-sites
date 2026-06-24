# Histórico — FryerFit

Registro de todos os projetos, alterações e aprendizados desse projeto.

---

### 2026-06-24 — FryerFit Site (fryerfit.com.br)
**Tipo:** Blog de conteúdo + SEO Programático (pSEO)
**Stack:** Next.js + Tailwind CSS + MDX
**Status:** No ar
**URL:** https://fryerfit.com.br (DNS propagado em 2026-06-24 — IP Vercel 76.76.21.21)
**Observações:** Projeto próprio. Briefing completo em clientes/fryerfit/briefing.md. Estratégia: blog editorial com E-E-A-T + pSEO por [ingrediente]+[aparelho]. Monetização via AdSense. Produção com Human-in-the-Loop (n8n/Make + curadoria humana).

**Estrutura criada (2026-06-24):**
- Identidade visual aprovada: paleta Estufa Digital, fonte Nunito 700, logo Tigela + Raio
- Next.js 16 + Tailwind v4 + MDX via next-mdx-remote/rsc
- Dark mode via next-themes + CSS custom properties
- Componentes: Header, Footer, Logo (SVG), MacroTable, RecipeCard, ThemeProvider
- Páginas: / (home), /receitas/[slug], /aparelhos/[slug], /objetivos/[slug], /sobre, /politica-de-privacidade
- Schema.org/Recipe JSON-LD em cada página de receita (rich results)
- 1 receita exemplo: frango-crocante-air-fryer.mdx
- Deploy realizado no Vercel (conta própria — projeto de uso pessoal, não comercial)
- Unsplash API integrada com cache committable em image-cache.json
- AdSense spaces criados (slots placeholder: 1111111111 a 5555555555)
- Favicon programático via app/icon.tsx (ImageResponse)
- Páginas /sobre e /politica-de-privacidade criadas (E-E-A-T + AdSense compliance)

**Expansão de conteúdo (2026-06-24):**
- 19 receitas novas adicionadas → total: 20 receitas em content/receitas/
- Aparelhos cobertos: Air Fryer, Micro-ondas, Panela de Pressão Elétrica, Panela Elétrica de Arroz, Grill/Sanduicheira
- Objetivos cobertos: Alta Proteína, Low Carb, Snacks, Meal Prep
- Todas as receitas com imagens Unsplash via image-cache.json (committable)

**SEO completo (2026-06-24):**
- sitemap.xml e robots.txt via MetadataRoute
- OG image programático via app/opengraph-image.tsx (edge runtime)
- Metadata enriquecida: keywords por página, canonical, openGraph, twitter card
- Schema.org/Recipe JSON-LD em cada receita, Organization na /sobre
- Google Search Console verificado (tag HTML adicionada ao layout.tsx)
- Sitemap submetido: https://fryerfit.com.br/sitemap.xml

**Próximos passos:**
- Adicionar record www A → 76.76.21.21 no Registro.br (Modo Avançado)
- Solicitar aprovação no AdSense em adsense.google.com com fryerfit.com.br
- Após aprovação: adicionar NEXT_PUBLIC_ADSENSE_PUBLISHER_ID no Vercel e substituir slots placeholder
- Continuar adicionando receitas em content/receitas/
