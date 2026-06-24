# Histórico — FryerFit

Registro de todos os projetos, alterações e aprendizados desse projeto.

---

### 2026-06-24 — FryerFit Site (fryerfit.com.br)
**Tipo:** Blog de conteúdo + SEO Programático (pSEO)
**Stack:** Next.js + Tailwind CSS + MDX
**Status:** Em andamento — estrutura Next.js completa, aguardando deploy
**URL:** fryerfit.com.br (domínio comprado, sem deploy ainda)
**Observações:** Projeto próprio. Briefing completo em clientes/fryerfit/briefing.md. Estratégia: blog editorial com E-E-A-T + pSEO por [ingrediente]+[aparelho]. Monetização via AdSense. Produção com Human-in-the-Loop (n8n/Make + curadoria humana).

**Estrutura criada (2026-06-24):**
- Identidade visual aprovada: paleta Estufa Digital, fonte Nunito 700, logo Tigela + Raio
- Next.js 16 + Tailwind v4 + MDX via next-mdx-remote/rsc
- Dark mode via next-themes + CSS custom properties
- Componentes: Header, Footer, Logo (SVG), MacroTable, RecipeCard, ThemeProvider
- Páginas: / (home), /receitas/[slug], /aparelhos/[slug], /objetivos/[slug], /sobre, /politica-de-privacidade
- Schema.org/Recipe JSON-LD em cada página de receita (rich results)
- 1 receita exemplo: frango-crocante-air-fryer.mdx
- Próximos passos: deploy Vercel, adicionar mais receitas, configurar AdSense
