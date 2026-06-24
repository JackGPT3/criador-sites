# Estratégia e Foco Atual

## Modelo de negócio do Modo Fluxo (atualizado 2026-06-22)

O Modo Fluxo deixou de ser só um blog. A estratégia agora é híbrida:

**Blog editorial** (base de autoridade / E-E-A-T)
- Posts sobre IA, automação e produtividade para pequenos negócios
- Frequência: ~1 post a cada 2-3 dias
- Monetização: AdSense (volume) + newsletter

**Diretório pSEO** (escalabilidade e afiliados)
- Reviews de ferramentas SaaS em português com análise editorial real
- Rotas: `/ferramentas/[categoria]/[slug]`
- Monetização primária: afiliados SaaS (20-40% recorrente)
- Monetização secundária: AdSense nas páginas de listagem
- Dados em: `content/ferramentas/tools.json`
- Para adicionar ferramenta: editar o JSON + salvar logo em `public/images/tools/` + deploy

**Por que essa combinação funciona:**
- Blog = E-E-A-T e autoridade de domínio → ajuda o diretório a rankear
- Diretório = tráfego de cauda longa + conversão de afiliados → receita maior que AdSense puro
- Cross-link entre os dois = contexto semântico que o Google favorece

---

## Projetos ativos

| Cliente | Projeto | Tipo | Deadline | Status |
|---|---|---|---|---|
| Professor Alfredo | Site institucional + cursos | Site Institucional / Vendas | — | Em andamento — deploy pendente (conta Vercel separada: oprofessoralfredo@gmail.com) |
| Modo Fluxo (próprio) | Blog + Diretório pSEO | Next.js 16 + MDX + Vercel | — | **No ar.** 40 posts + 10 ferramentas no diretório. |
| FryerFit (próprio) | Blog fitness de receitas | Next.js 16 + MDX + Vercel | — | **No ar.** 20 receitas. SEO completo. Search Console verificado. Aguardando AdSense. |

---

## Próximos passos — Modo Fluxo (ler no início da próxima sessão)

### Prioridade 1 — Validação visual do diretório
- [ ] Abrir [modofluxo.com.br/ferramentas](https://modofluxo.com.br/ferramentas) e conferir como ficaram os logos
- [ ] Conferir página individual: [/ferramentas/automacao/make](https://modofluxo.com.br/ferramentas/automacao/make)
- [ ] Se algum logo ficou ruim (especialmente pabbly-connect.png — era muito pequeno), substituir manualmente com imagem melhor e redeploy

### Prioridade 2 — Afiliados (receita)
- [ ] Cadastrar no programa de afiliados da **n8n**: https://n8n.io/affiliates
- [ ] Cadastrar no programa de afiliados do **HeyGen**: https://www.heygen.com/affiliate
- [ ] Cadastrar no programa de afiliados do **ManyChat**: https://manychat.com/affiliates
- [ ] Quando aprovada, atualizar `affiliateUrl` de cada ferramenta no `tools.json` e redeploy

### Prioridade 3 — Expandir o diretório (mais páginas = mais tráfego)
- [ ] Adicionar 10-20 ferramentas novas ao `tools.json` (próximas categorias a preencher: `analise-dados` e `produtividade` estão com poucas ferramentas)
- [ ] Sugestões de ferramentas para `analise-dados`: Rows, Coefficient, Obviously AI, Equals, Metabase
- [ ] Sugestões para `produtividade`: Reclaim.ai, ClickUp AI, Motion, Sunsama, Taskade
- [ ] Para cada nova ferramenta: baixar logo com `curl -sL "https://www.google.com/s2/favicons?domain=DOMINIO&sz=256" -o public/images/tools/SLUG.png`

### Prioridade 4 — Cross-linking blog ↔ diretório
- [ ] Revisar posts que mencionam ferramentas e adicionar link para a página do diretório correspondente
- [ ] Posts com prioridade: make-vs-zapier (→ /ferramentas/automacao/make e /ferramentas/automacao/zapier), wati-vs-manychat (→ /ferramentas/atendimento/wati e /ferramentas/atendimento/manychat), heygen (→ /ferramentas/criacao-conteudo/heygen)
- [ ] No campo `relatedPosts` de cada ferramenta no JSON, adicionar slugs dos posts relacionados

### Prioridade 5 — Google Search Console
- [ ] Verificar se o sitemap já inclui as URLs do diretório (já deveria, pois o sitemap.xml existente usa generateStaticParams)
- [ ] Submeter sitemap no Search Console e pedir indexação das novas rotas /ferramentas/

### Pendências antigas (não urgentes)
- [ ] AdSense: quando aprovada, adicionar `NEXT_PUBLIC_ADSENSE_ID=ca-pub-6429977563082146` nas env vars do Vercel
- [ ] Author box nos posts (nome + mini bio ao final)
- [ ] Dropdown "Categorias" no header para limpar a nav
- [ ] Cancelar Hostgator (DNS já migrado, não precisa mais do plano)
- [ ] 7 posts marcados para reescrita de qualidade

---

## Prioridades gerais do workspace

1. Atender os projetos que chegarem com agilidade
2. Usar templates e componentes reutilizáveis para acelerar entregas
3. Crescer o Modo Fluxo como ativo próprio (blog + diretório)

## Objetivos de médio prazo

- Diretório com 50+ ferramentas indexadas (MVP validado no Google)
- Pelo menos 3 programas de afiliado ativos com link no diretório
- AdSense aprovado e ativo nas páginas do site
- Acumular componentes prontos para reutilizar entre projetos de clientes
