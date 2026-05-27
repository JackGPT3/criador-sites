# Briefing — Modo Fluxo

**Negócio:** Modo Fluxo
**Segmento:** Publisher digital / Conteúdo sobre IA, automação e produtividade
**Site atual:** https://modofluxo.com.br (WordPress, Hostgator)
**Instagram/Redes:** —
**Responsável (contato):** Jacqueline (projeto próprio)

## Projeto solicitado

**Tipo:** Site publisher / Blog multi-categoria
**Objetivo:** Migrar o WordPress para Next.js — site editável via Claude Code, profissional, otimizado para monetização
**CTA principal:** Conteúdo + monetização (AdSense, afiliados, newsletter, posts patrocinados)

## Sobre o negócio

Portal de conteúdo sobre inteligência artificial aplicada: agentes, automações, ferramentas e produtividade. Tagline atual: "IA aplicada na prática: agentes, automações e ferramentas para transformar produtividade e escalar negócios."

Foco em audiência que quer resultados práticos com IA — não teoria.

## Público-alvo

- Perfil: Profissionais, empreendedores e curiosos que usam ou querem usar IA no trabalho
- Dores principais: Perder tempo, não saber quais ferramentas usar, ficar por fora das novidades
- Objeções: "Isso funciona mesmo?" / "É muito técnico pra mim?"
- Região: Brasil

## Produto / Serviço apresentado

Conteúdo editorial: artigos, tutoriais e reviews sobre ferramentas de IA, automação e produtividade.

**Modelo de monetização:**
- Google AdSense (display ads)
- Links de afiliados (ferramentas de IA, SaaS)
- Newsletter (captura de leads)
- Posts patrocinados (quando tiver audiência)

## Categorias existentes

- Automação
- Ferramentas
- Inteligência Artificial
- Notícias
- Tutoriais

## Tom de voz e estilo

Prático, direto, sem enrolação. Fala com quem quer resultado, não com quem quer teoria. Referência: newsletters e blogs de tech BR como Runrun.it, Saturno, etc.

## Identidade visual

- Cores aparentes no WP: azul + laranja (vibrante, tech)
- Logo: existente no site atual (precisa extrair)
- Fontes: a definir no projeto Next.js
- Referências: site atual em modofluxo.com.br

## Stack e entrega

- **Stack:** Next.js 14+ (App Router) + Tailwind CSS + MDX
- **Posts:** Arquivos `.mdx` na pasta `content/posts/` — editáveis direto via Claude Code
- **Deploy:** Vercel (plano gratuito)
- **DNS:** Atualmente aponta para Hostgator — vai migrar para Vercel
- **Deadline:** —

## Migração do WordPress

- Posts existentes: ~30 publicados
- Exportar via: WordPress Admin > Ferramentas > Exportar (XML)
- Avaliação dos posts: fazer triagem antes de migrar — decidir o que manter, reescrever ou descartar
- Critério de triagem: relevância atual, qualidade do conteúdo, potencial de tráfego orgânico

## Integrações necessárias

- [ ] Google AdSense (ID: a preencher)
- [ ] Google Analytics / GTM (ID: a preencher)
- [ ] Newsletter (ferramenta: a definir — MailerLite, Brevo, ConvertKit)
- [ ] Sitemap XML automático (Next.js nativo)
- [ ] RSS Feed (para indexação e distribuição)
- [ ] Open Graph / SEO meta tags por post

## Conteúdo disponível

- [x] 30 posts existentes no WordPress (a exportar)
- [ ] Logo a extrair do site atual
- [x] Claude vai criar/reescrever posts conforme necessário
- [ ] Imagens: a definir (banco de imagens / IA / existentes no WP)

## Observações e restrições

- Gestão 100% via Claude Code: posts novos, edições, ajustes de layout — tudo feito em arquivo
- Sem CMS externo, sem dashboard WordPress — o código é o CMS
- Prioridade pós-lançamento: SEO e monetização com AdSense
