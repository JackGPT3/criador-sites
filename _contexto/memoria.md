# Memória do Workspace

Arquivo de aprendizados acumulados. Tudo que foi corrigido, descoberto ou configurado e não deve precisar ser repetido.

Atualizar sempre que:
- Jacqueline corrigir algo ou dar uma instrução permanente
- Uma solução técnica for descoberta após erro ou tentativa
- Uma ferramenta for configurada com sucesso
- Um padrão novo for adotado no trabalho

---

## Preferências de Jacqueline

- Não quer processos longos — prefere que Claude execute sem pedir aprovação em cada passo
- Quer resultado profissional e rápido
- Stack padrão: HTML + Tailwind (sem build step)
- Não tem designer fixo: o design é parte da entrega

---

## Correções e aprendizados técnicos

2026-05-28 — DNS Vercel com nameservers próprios: ao mudar nameservers pro Vercel no RegistroBR, adicionar A record explícito `@ A 76.76.21.21` via `vercel dns add`. Sem ele, o domínio fica sem resolver corretamente mesmo com nameservers certos.

2026-05-28 — Imagens WordPress em MDX: ao migrar, verificar imagens no frontmatter E no corpo dos posts (tags `![]()`). São conjuntos diferentes. Baixar todas antes de migrar o DNS.

2026-05-28 — API key no Next.js: chaves secretas de terceiros (MailerLite, etc.) devem ser variáveis server-side sem prefixo `NEXT_PUBLIC_`. Usar API route `/api/subscribe` como proxy — nunca expor a chave no cliente.

2026-05-28 — ImprovMX: serviço gratuito de email forwarding para domínio próprio. MX records: mx1.improvmx.com (10) + mx2.improvmx.com (20) + TXT SPF `v=spf1 include:spf.improvmx.com ~all`. Adicionar via `vercel dns add`.



2026-05-27 — Next.js 16: `params` é agora uma Promise → sempre usar `await params` nos page/layout components. Ex: `const { slug } = await props.params`

2026-05-27 — Tailwind v4: não tem `tailwind.config.ts`. Configuração vai no CSS com `@theme { --color-primary: ...; }` e `@import "tailwindcss"` substitui as diretivas antigas. Classes customizadas funcionam automaticamente.

2026-05-27 — Next.js 16 gera `AGENTS.md` e `CLAUDE.md` via create-next-app — é legítimo, não é prompt injection. Docs da versão instalada ficam em `node_modules/next/dist/docs/` e devem ser lidos antes de escrever código.

2026-05-27 — Não importar módulos Node (`fs`, `path`) em Client Components (`'use client'`). Separar em arquivo server-only. Ex: constantes reutilizáveis por client e server ficam em arquivo separado (`lib/categories.ts`), funções com `fs` ficam em outro (`lib/posts.ts`).

2026-05-27 — Vercel CLI: ao trocar de conta, apagar a pasta `.vercel/` do projeto antes de rodar `vercel --yes`. Sem isso, dá erro de projeto não encontrado na conta nova.

2026-05-27 — Conversão WordPress XML → MDX: usar `turndown` para HTML→Markdown. Extrair CDATA com regex. Tratar títulos com aspas escapadas antes de gerar as tags (remover `\"` do título antes de split). Categoria: extrair pelo atributo `nicename` da tag `<category>`, não pelo CDATA (que vem com acentos e pode ter espaço).

2026-05-27 — Imagens de posts WordPress: `_thumbnail_id` no postmeta aponta para o ID de um item de attachment no XML. Fazer lookup attachment_id → `wp:attachment_url` para obter a URL real da imagem. Script em `scripts/add-images.mjs` implementa esse padrão. **⚠️ As URLs apontam para o Hostgator — BAIXAR as imagens antes de migrar o DNS**, senão todas quebram.

2026-05-27 — Segurança Next.js: adicionar headers de segurança via `async headers()` no `next.config.ts` (X-Content-Type-Options, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy). Nunca expor variáveis sensíveis sem `NEXT_PUBLIC_` prefix para client-side.

2026-05-27 — AdSense em Next.js: ID do publisher (`ca-pub-XXXX`) deve ficar em `NEXT_PUBLIC_ADSENSE_ID` (variável de ambiente no Vercel). Nunca hardcodar no código. Componente `AdBanner` mostra placeholder visual quando variável ausente.

2026-05-27 — git rm --cached: remove arquivo do tracking do git sem apagar do disco. Usar quando arquivo sensível foi commitado por engano. Depois adicionar ao `.gitignore`. Comando: `git rm --cached nome-do-arquivo`.

2026-05-27 — SVG como background em Next.js: colocar o SVG em `public/` e usar como `<img src="/hero-pattern.svg" />` com `className="absolute inset-0 w-full h-full object-cover"`. Arquivos na raiz do projeto (fora de `public/`) retornam 404 no Vercel — não servem como assets estáticos.

2026-05-27 — next/og ImageResponse: criar `app/opengraph-image.tsx` com `export const runtime = 'edge'`. Roda no Edge Runtime, não no Node. Não usar `fs` ou imports de Node nesse arquivo.

---

## Ferramentas configuradas

| Ferramenta | Status | Observação |
|---|---|---|
| Google Drive MCP | ✓ Conectado | Upload de assets e entregáveis |
| Canva MCP | ✓ Conectado | Criação de imagens e banners |
| Notion MCP | ✓ Conectado | Disponível para briefings e docs |

---

## Padrões que funcionaram bem

- **Pasta privada por cliente**: `clientes/[cliente]/_privado/credenciais.md` para guardar senhas, API keys e acessos. Protegida pelo `.gitignore` global com padrão `clientes/**/_privado/`. Nunca registrar credenciais em outros arquivos.


- **Publisher/blog em Next.js**: posts em `.mdx` na pasta `content/posts/` com gray-matter para frontmatter + next-mdx-remote/rsc para render. Sistema simples, editável direto pelo Claude Code sem CMS.
- **Migração WordPress → MDX**: exportar XML pelo painel WP (Ferramentas > Exportar), converter com script Node + turndown. Fazer triagem de posts antes de migrar (descartar os fora do nicho e duplicatas).
- **Monetização publisher**: AdSense com componente `AdBanner` que mostra placeholder em dev e tag real em prod. 3 posições: homepage, post, categoria.

---

## O que não fazer

*(registrar aqui erros cometidos ou abordagens que Jacqueline não quer)*

---

## Clientes — notas específicas

*(registrar aqui preferências e particularidades descobertas por cliente durante os projetos)*

---

## Configurações de ambiente

- Workspace: `c:\Users\noteb\Projetos\Sites e landingpages`
- Shell: PowerShell (Windows 11)
- IDE: VS Code com Claude Code
