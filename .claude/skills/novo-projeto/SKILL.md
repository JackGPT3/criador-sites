# Skill: Novo Projeto

Executar ao receber `/novo-projeto`, "novo cliente", "entra um cliente novo", "começa um projeto novo", "vou criar pra [nome]".

## O que essa skill faz

Onboarding completo de um novo cliente/projeto. Cria a estrutura de pastas, preenche o briefing e deixa tudo pronto para começar a construir.

---

## Passo 1 — Coletar informações

Se o usuário não passou as informações, perguntar de uma vez:

> "Me manda o que tiver sobre o projeto — pode ser texto, PDF, print de conversa, ou me conta aqui mesmo:
> 
> - Nome do cliente e do negócio
> - O que precisa: site, landing page, página de captura?
> - Objetivo: gerar leads, vender produto, apresentar a empresa, lançamento?
> - Público-alvo: quem vai ver essa página?
> - Produto/serviço que vai ser apresentado
> - CTA principal: WhatsApp, formulário, link de checkout?
> - Tem identidade visual? (logo, cores, fontes)
> - Deadline e stack preferida (se souber)"

Aceitar qualquer combinação. Campos desconhecidos ficam como "—" no briefing.

---

## Passo 2 — Criar estrutura de pastas

```
clientes/[nome-cliente]/briefing.md
clientes/[nome-cliente]/historico.md
clientes/[nome-cliente]/assets/     ← logos, imagens, fontes do cliente
```

Usar nome em kebab-case minúsculo (ex: `studio-bella`, `dr-marcos`, `tech-shop`).

Se já tiver o nome do projeto:
```
clientes/[nome-cliente]/[nome-projeto]/
```

---

## Passo 3 — Preencher o briefing

```markdown
# Briefing — [Nome do Cliente]

**Negócio:** 
**Segmento:** 
**Site atual:** 
**Instagram/Redes:** 
**Responsável (contato):** 

## Projeto solicitado

**Tipo:** Landing Page | Site Institucional | Página de Captura | Outro
**Objetivo:** (o que a página precisa fazer — vender, capturar lead, apresentar, lançar)
**CTA principal:** WhatsApp | Formulário | Checkout | Email | Outro

## Sobre o negócio

(o que a empresa faz, diferencial, posicionamento, o que vendem)

## Público-alvo

- Perfil:
- Dores principais:
- Objeções comuns:
- Região:

## Produto / Serviço apresentado

(descrever o que vai ser vendido/apresentado na página)

**Preço:** (se for LP de vendas)
**Garantia/bônus:** (se houver)

## Tom de voz e estilo

(como a marca se comunica, referências visuais, o que evitar)

## Identidade visual

- Logo: (tem? onde está?)
- Cores: (primária, secundária, acento)
- Fontes: (se especificou)
- Referências: (sites ou páginas que o cliente gostou)

## Stack e entrega

- Stack: HTML/CSS | Tailwind | React | Next.js | A definir
- Entrega: ZIP | Repositório | Deploy no Vercel | Deploy no servidor
- Hospedagem: (se já souber)
- Deadline: 

## Integrações necessárias

- [ ] Pixel Meta (ID: )
- [ ] Google Analytics / GTM (ID: )
- [ ] Formulário (ferramenta: MailChimp | ActiveCampaign | RD Station | Outro)
- [ ] WhatsApp Business (número: )
- [ ] Checkout (plataforma: Hotmart | Kiwify | Shopify | WooCommerce | Outro)

## Conteúdo disponível

- [ ] Textos fornecidos pelo cliente
- [ ] Fotos fornecidas pelo cliente
- [ ] Logo fornecida
- [ ] Claude vai criar os textos
- [ ] Claude vai sugerir imagens (banco de imagens / IA)

## Observações e restrições

(informações legais, restrições de conteúdo, sazonalidade, pendências)
```

---

## Passo 4 — Registrar no histórico

Adicionar entrada em `clientes/[nome-cliente]/historico.md`:

```markdown
### [DATA] — [Nome do Projeto]
**Tipo:** [tipo do projeto]
**Stack:** [a definir / stack escolhida]
**Status:** Em andamento
**URL:** —
**Observações:** Projeto iniciado. Briefing em clientes/[nome-cliente]/briefing.md.
```

Se o arquivo não existir, criar com cabeçalho:
```markdown
# Histórico — [Nome do Cliente]

Registro de todos os projetos, alterações e aprendizados desse cliente.
```

---

## Passo 5 — Confirmar e perguntar próximo passo

```
Feito. Estrutura criada para [Nome do Cliente]:

- clientes/[nome]/briefing.md ✓
- clientes/[nome]/historico.md ✓
- clientes/[nome]/assets/ ✓

Pendências no briefing:
- [listar campos que ficaram em branco]

Quer que eu já comece a construir o projeto? 
Se sim, me diz: landing page, site ou página de captura?
```

---

## Observações

- Não pedir informações uma a uma. Pedir tudo de uma vez.
- Se o usuário trouxer documento ou print de conversa, extrair diretamente.
- Não inventar dados — deixar "—" e listar nas pendências.
- Se a stack não foi definida, perguntar antes de criar o projeto: "Esse projeto vai ser HTML puro, Tailwind ou React?"
