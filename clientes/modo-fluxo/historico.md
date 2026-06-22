# Histórico — Modo Fluxo

Registro de todos os projetos, alterações e aprendizados desse cliente.

---

### 2026-05-27 — Modo Fluxo Site (Migração WordPress → Next.js)
**Tipo:** Site Publisher / Blog
**Stack:** Next.js 16 + Tailwind CSS v4 + MDX + Vercel
**Status:** Deployed — visual alinhado ao original, pendências de DNS e integrações
**URL prod:** https://modofluxo.com.br (DNS pendente — ainda aponta pro Hostgator)
**URL Vercel:** https://modo-fluxo-site-seven.vercel.app
**Conta Vercel:** modofluxo-6433
**Observações:** Projeto próprio da Jacqueline. Migração do WordPress (Hostgator) para Next.js 16 + Tailwind v4 + MDX. 27 posts migrados (3 descartados — apostas esportivas fora do nicho). Monetização via AdSense + afiliados + newsletter. Gestão 100% via Claude Code — posts em content/posts/*.mdx.

**Sessão 2026-05-27 — Ajustes visuais e segurança:**
- Tema visual migrado do WP original: Space Grotesk + Inter, cores #0E3A6E/#159BA8, tema claro
- Hero com gradiente + SVG pattern de rede/circuito (public/hero-pattern.svg)
- 27 imagens extraídas do XML do WordPress e adicionadas ao frontmatter dos posts
- Páginas /sobre e /politica-de-privacidade criadas (obrigatórias para AdSense)
- og:image dinâmica via next/og (app/opengraph-image.tsx)
- CTA de newsletter compacto adicionado ao final de cada post
- Placeholders coloridos por categoria nos cards (gradiente da cor da categoria)
- Auditoria de segurança: XML removido do git, security headers adicionados, AdSense movido para NEXT_PUBLIC_ADSENSE_ID

**Sessão 2026-05-28 — DNS, imagens, e-mail e newsletter:**
- 27 imagens de capa + 23 imagens do corpo dos posts baixadas do Hostgator e re-hosteadas em public/images/posts/
- Links internos dos posts corrigidos: formato WordPress → /blog/slug e /categoria/slug
- Link de sitemap removido do rodapé (invisível para usuários)
- DNS migrado: nameservers RegistroBR → ns1/ns2.vercel-dns.com. A record 76.76.21.21 adicionado via Vercel CLI
- E-mail contato@modofluxo.com.br configurado via ImprovMX → encaminha para modofluxo@gmail.com. MX records no Vercel DNS
- Newsletter integrada ao MailerLite (API v3): API route /api/subscribe, variáveis MAILERLITE_API_KEY + MAILERLITE_GROUP_ID no Vercel
- Modal de newsletter no header: abre ao clicar no botão, fecha com Esc/backdrop/X
- Pasta clientes/modo-fluxo/_privado/ criada com credenciais.md (fora do git)

**Sessão 2026-06-10 — Organização editorial e sistema de imagens:**
- Criada pasta `clientes/modo-fluxo/conteudo/` com calendário completo e processo documentado
- Script de imagem Pexels recriado em `modo-fluxo-site/scripts/pexels-image.mjs`
- Processo: buscar imagem com script → criar MDX → atualizar calendario.md → deploy
- API Key Pexels em `_privado/credenciais.md` (variável local PEXELS_API_KEY, não vai pro Vercel)
- Post criado: NotebookLM (12/06) — imagem baixada via Pexels
- ads.txt confirmado no ar desde 03/06 — AdSense não recrawleou ainda, status "Preparando"

**Pendências:**
- AdSense: quando aprovada, adicionar NEXT_PUBLIC_ADSENSE_ID=ca-pub-6429977563082146 nas env vars do Vercel
- Forçar re-crawl do ads.txt no painel AdSense (Conteúdo > ads.txt > Atualizar)
- Author box nos posts com nome e foto (melhoria UX pendente)
- Dropdown "Categorias" no header em vez de links diretos
- 7 posts marcados para reescrita de qualidade
- Cancelar plano Hostgator após confirmar migração 100% completa

---

### 2026-06-22 — Pivot estratégico + Diretório de Ferramentas (pSEO)
**Tipo:** Expansão de produto — blog + diretório pSEO
**Stack:** mesma (Next.js 16 + Vercel), novo módulo em JSON
**Status:** No ar em produção

**Decisão estratégica:**
Modelo híbrido: blog editorial (autoridade/E-E-A-T) + diretório de ferramentas SaaS em português (pSEO + afiliados). O diretório escala via JSON — cada ferramenta é uma entrada de dados que gera páginas estáticas automaticamente no build. Sem banco de dados, sem CMS.

**O que foi construído:**
- `content/ferramentas/tools.json` — banco de dados com 10 ferramentas seed (Make, n8n, Zapier, Activepieces, Pabbly, ManyChat, WATI, Notion AI, Jasper, HeyGen)
- `lib/tools.ts` — funções de leitura + `TOOL_CATEGORIES` (5 categorias: automacao, criacao-conteudo, atendimento, produtividade, analise-dados)
- `lib/types.ts` — interfaces `Tool` e `ToolPricing` adicionadas
- `components/ToolCard.tsx` — card com variante featured e compacta, logo com fallback em emoji
- `app/ferramentas/page.tsx` — home do diretório
- `app/ferramentas/[categoria]/page.tsx` — listagem por categoria
- `app/ferramentas/[categoria]/[slug]/page.tsx` — página individual com pros/cons, casos de uso, para quem é, preços, schema.org SoftwareApplication, posts relacionados, ferramentas similares
- `public/images/tools/` — logos locais baixados via Google favicon service (curl)
- Header: link "Diretório" adicionado (desktop e mobile)

**Afiliados ativos:**
- Make: https://www.make.com/en/register?pc=modofluxo (campo `affiliateUrl` no JSON)

**Para adicionar nova ferramenta:**
1. Adicionar objeto no `tools.json` seguindo o schema existente
2. Baixar logo: `curl -sL "https://www.google.com/s2/favicons?domain=DOMINIO&sz=256" -o public/images/tools/SLUG.png`
3. `vercel --prod` na pasta do projeto

**Pendências do diretório:**
- Validar visualmente os logos no ar (especialmente pabbly-connect)
- Cadastrar afiliados: n8n, HeyGen, ManyChat
- Expandir para 30-50 ferramentas (analise-dados e produtividade estão vazias)
- Cross-links blog → diretório nos posts que citam ferramentas
- Preencher campo `relatedPosts` nas entradas do JSON
- Monitorar indexação no Search Console
