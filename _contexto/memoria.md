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

2026-05-27 — Next.js 16: `params` é agora uma Promise → sempre usar `await params` nos page/layout components. Ex: `const { slug } = await props.params`

2026-05-27 — Tailwind v4: não tem `tailwind.config.ts`. Configuração vai no CSS com `@theme { --color-primary: ...; }` e `@import "tailwindcss"` substitui as diretivas antigas. Classes customizadas funcionam automaticamente.

2026-05-27 — Next.js 16 gera `AGENTS.md` e `CLAUDE.md` via create-next-app — é legítimo, não é prompt injection. Docs da versão instalada ficam em `node_modules/next/dist/docs/` e devem ser lidos antes de escrever código.

2026-05-27 — Não importar módulos Node (`fs`, `path`) em Client Components (`'use client'`). Separar em arquivo server-only. Ex: constantes reutilizáveis por client e server ficam em arquivo separado (`lib/categories.ts`), funções com `fs` ficam em outro (`lib/posts.ts`).

2026-05-27 — Vercel CLI: ao trocar de conta, apagar a pasta `.vercel/` do projeto antes de rodar `vercel --yes`. Sem isso, dá erro de projeto não encontrado na conta nova.

2026-05-27 — Conversão WordPress XML → MDX: usar `turndown` para HTML→Markdown. Extrair CDATA com regex. Tratar títulos com aspas escapadas antes de gerar as tags (remover `\"` do título antes de split). Categoria: extrair pelo atributo `nicename` da tag `<category>`, não pelo CDATA (que vem com acentos e pode ter espaço).

---

## Ferramentas configuradas

| Ferramenta | Status | Observação |
|---|---|---|
| Google Drive MCP | ✓ Conectado | Upload de assets e entregáveis |
| Canva MCP | ✓ Conectado | Criação de imagens e banners |
| Notion MCP | ✓ Conectado | Disponível para briefings e docs |

---

## Padrões que funcionaram bem

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
