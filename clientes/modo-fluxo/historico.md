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

**Pendências:**
- AdSense: quando aprovada, adicionar NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXX nas env vars do Vercel
- Author box nos posts com nome e foto (melhoria UX pendente)
- Dropdown "Categorias" no header em vez de links diretos
- 7 posts marcados para reescrita de qualidade
- Cancelar plano Hostgator após confirmar migração 100% completa
