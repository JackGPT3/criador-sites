# Aprendizados Operacionais

Arquivo de lições práticas acumuladas. Ler antes de executar qualquer tarefa relevante.

Formato de cada entrada:
`DATA — CONTEXTO — LIÇÃO / COMO FAZER CERTO`

---

## Erros a não repetir

2026-06-24 — FryerFit (Next.js) — Unsplash `photos/random` retorna imagens irrelevantes para queries de comida. Usar `search/photos?query=...&per_page=1&order_by=relevant&orientation=landscape` — muito mais preciso.

2026-06-24 — FryerFit (Next.js) — Cache de imagens em `.cache/` não sobrevive ao build do Vercel (filesystem efêmero). Mover cache para `image-cache.json` na raiz do projeto, commitar no git — ele persiste entre builds.

2026-06-24 — FryerFit (Next.js) — Logo desapareceu no hero escuro porque o componente usava `currentColor` por padrão (herda cor do texto que era invisível). Solução: adicionar props `color` e `boltColor` no componente Logo e passar explicitamente `color="white"` no contexto escuro.

2026-06-24 — FryerFit (Next.js) — `vercel` sem `--prod` cria preview, não atualiza produção. Sempre usar `vercel --prod` para atualizar o site no ar.

2026-06-24 — MDX — Comparações com `<` seguidas de número (ex: `<1,5cm`) são interpretadas como tag JSX pelo compilador MDX e causam erro de build. Substituir por texto descritivo: "menos de 1,5cm". Verificar com `grep -rn "<[0-9]"` antes de fazer deploy.



2026-06-22 — Modo Fluxo (posts MDX) — Tabelas Markdown não renderizavam porque `remark-gfm` não estava configurado no `MDXRemote`. Solução: instalar `remark-gfm` e passar `options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}` no componente MDXRemote de `app/blog/[slug]/page.tsx`. Sempre verificar isso ao adicionar tabelas nos posts.

2026-06-22 — Modo Fluxo (posts MDX) — Posts acumularam linguagem de IA e excesso de travessões (47 removidos em 11 arquivos). Regras editoriais completas salvas em `clientes/modo-fluxo/conteudo/processo.md` na seção "Qualidade do texto". Ler antes de escrever qualquer post. Checklist de revisão adicionado ao final do processo.

2026-06-10 — Modo Fluxo — `new Date("AAAA-MM-DD")` em JavaScript interpreta a string como UTC meia-noite. No fuso GMT-3, isso vira o dia anterior às 21h, causando datas erradas na exibição e posts aparecendo cedo demais no filtro. Sempre parsear datas de frontmatter MDX manualmente: `const [y, m, d] = dateStr.split('-').map(Number); new Date(y, m-1, d)` — isso cria uma data local sem ajuste de timezone.

2026-06-22 — Diretório pSEO — Clearbit Logo API não funciona mais (descontinuada após aquisição pela HubSpot). Usar `curl -sL "https://www.google.com/s2/favicons?domain=DOMINIO&sz=256"` para baixar logos e hospedar em `public/images/tools/`. Arquivos ficam pequenos (1-6KB) mas suficientes para exibição em cards de até 56px.

2026-06-22 — Diretório pSEO — PowerShell falha ao baixar PNGs binários com `Invoke-WebRequest` (trata binário como texto). Para download de imagens, sempre usar Bash com `curl -sL -A "Mozilla/5.0"`.

---

## Caminhos que funcionam

2026-06-24 — FryerFit — Padrão de imagens automáticas validado: `lib/images.ts` com Unsplash search + cache committable em `image-cache.json`. Funciona em dev e no Vercel SSG. Replicável em próximos blogs/sites de conteúdo.

2026-06-24 — FryerFit — Favicon programático via `app/icon.tsx` com `ImageResponse` (Next.js 16). Evita arquivo PNG manual. Replicável em qualquer projeto Next.js que precise de favicon personalizado.

2026-06-24 — FryerFit — AdSense spaces sem texto visível: componente `AdBanner` retorna `null` quando `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` não está definido. Zero impacto visual em dev/staging, espaços ativos em prod após configurar a var.

---

## Atalhos descobertos

*(ferramentas, comandos, combinações que economizam tempo)*

---

## Comportamentos validados por Jacqueline

*(coisas que ela aprovou explicitamente — não mudar sem ela pedir)*

---

## Por projeto / cliente

*(aprendizados específicos de contexto que mudam como agir)*

---

*Atualizar sempre que: um erro for corrigido, um padrão novo for adotado, algo funcionar melhor do que o esperado, ou Jacqueline validar uma abordagem.*
