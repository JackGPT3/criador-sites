# Briefing — FryerFit

**Negócio:** FryerFit
**Segmento:** Blog de receitas fitness / culinária saudável sem fogão
**Site:** fryerfit.com.br (domínio comprado)
**Instagram/Redes:** —
**Responsável:** Jacqueline (projeto próprio)

---

## Projeto solicitado

**Tipo:** Blog de conteúdo + pSEO
**Objetivo:** Gerar tráfego orgânico via SEO, escalar conteúdo com pSEO e monetizar via Google AdSense
**CTA principal:** AdSense (monetização por tráfego)

---

## Sobre o negócio

Blog de receitas fitness focado em cozinha sem gás/fogão. Todos os conteúdos são preparados em aparelhos elétricos: Air Fryer (carro-chefe), Micro-ondas, Panela de Pressão Elétrica, Panela Elétrica de Arroz e Grill/Sanduicheira Elétrica.

**Conceito central:** "Cozinha inteligente, eficiente e moderna — mas também acessível."

Cada receita inclui obrigatoriamente tabela nutricional completa (Carboidratos, Proteínas, Gorduras, Calorias por porção) para elevar o valor percebido do conteúdo e garantir aprovação do AdSense via critério E-E-A-T.

---

## Público-alvo

- **Perfil:** Pessoas que querem comer saudável e praticidade — moradores de republica, universitários, quem mora sozinho, atletas amadores, pessoas em dieta
- **Dores:** Não tem fogão, não sabe cozinhar, não tem tempo, quer controlar macros
- **Região:** Brasil

---

## Estratégia de conteúdo

### Categorias por aparelho
- Na Air Fryer
- No Micro-ondas
- Na Panela de Pressão Elétrica
- Na Panela Elétrica de Arroz
- No Grill / Sanduicheira Elétrica

### Categorias por objetivo
- Alta Proteína (Hipertrofia)
- Low Carb
- Snacks Rápidos
- Marmitas da Semana (Meal Prep)

### Estrutura pSEO
Páginas geradas combinando: `[Ingrediente] + [Aparelho]`
Exemplo: "Frango na Air Fryer", "Ovo no Micro-ondas", "Batata Doce na Panela Elétrica"

### Modelo de produção (Human-in-the-Loop)
1. IA (n8n/Make) gera esqueleto estruturado: ingredientes (JSON), tabela nutricional, passo a passo
2. Revisão humana adiciona toques de experiência real: "Dicas de preparo", "Variações por marca de aparelho"
3. Resultado: conteúdo que parece testado e autêntico, aprovado pelo filtro anti-spam do Google

---

## Identidade Visual

**Direcionamento:** Tech Premium / Minimalista
- Visual limpo, tipografia moderna
- Suporte nativo a dark mode
- Passa a ideia de: cozinha inteligente, eficiente e moderna, mas acessível

**Logo:** Definido — Tigela + Raio. Tigela = refeição. Raio verde sobe onde sairia a chama do fogão (sem gás = elétrico). Arquivo: fryerfit-logo.html
**Cores:** A definir (referência: paleta clean com acento vibrante — sugestão: verde musgo ou laranja queimado sobre fundo neutro escuro/claro)
**Fontes:** A definir (2 famílias máximo — 1 serifada moderna para títulos + 1 sans-serif clean para corpo)
**Referências visuais:** —

---

## Stack e entrega

- **Stack:** Next.js + Tailwind CSS + MDX (mesma base do Modo Fluxo)
- **Razão:** pSEO exige velocidade (Core Web Vitals 100/100), componentização para blocos de anúncios e tabelas de macros
- **Hospedagem:** Vercel Hobby (projeto próprio, sem restrição comercial)
- **Deadline:** —

---

## Integrações necessárias

- [ ] Google AdSense (ID: a obter após aprovação)
- [ ] Google Analytics 4 / Search Console
- [ ] Google Tag Manager
- [ ] Schema Markup (Recipe schema para SEO de receitas)

---

## Estrutura de páginas planejada

- `/` — Home (featured recipes + categories)
- `/receitas/[slug]` — Página individual de receita (MDX)
- `/aparelhos/[slug]` — Hub por aparelho
- `/objetivos/[slug]` — Hub por objetivo nutricional
- `/sobre` — Sobre o FryerFit (E-E-A-T: quem está por trás)
- `/politica-de-privacidade` — Obrigatória para AdSense
- `/sitemap.xml` — Gerado automaticamente pelo Next.js

---

## Requisitos AdSense (checklist)

- [ ] Política de privacidade publicada
- [ ] Página "Sobre" com identidade do autor
- [ ] Conteúdo original com valor real (tabela nutricional, dicas exclusivas)
- [ ] Mobile-first com Core Web Vitals excelentes
- [ ] Navegação clara e estrutura semântica
- [ ] Sem conteúdo duplicado ou gerado em massa sem curadoria

---

## Observações e restrições

- Projeto próprio — sem cliente externo para aprovar
- Foco em AdSense: evitar conteúdo que viole políticas (sem dietas extremas sem embasamento, sem alegações médicas)
- Recipe Schema (schema.org/Recipe) em todas as páginas de receita para rich results no Google
