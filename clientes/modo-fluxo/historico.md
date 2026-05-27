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

**Pendências:**
- ⚠️ URGENTE antes do DNS: baixar as 27 imagens dos posts (atualmente em modofluxo.com.br/wp-content/uploads/) — vão quebrar quando DNS mudar para Vercel
- DNS modofluxo.com.br → Vercel (A: 76.76.21.21 + CNAME www → cname.vercel-dns.com no RegistroBR)
- Newsletter: conectar plataforma (MailerLite recomendado — variável NEXT_PUBLIC_MAILERLITE_KEY)
- AdSense: quando aprovada, adicionar NEXT_PUBLIC_ADSENSE_ID no painel Vercel → Environment Variables
- Author box nos posts com nome e foto (melhoria UX pendente)
- Dropdown "Categorias" no header em vez de links diretos
- 7 posts marcados para reescrita de qualidade
