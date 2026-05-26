# Skill: Nova Landing Page

Executar ao receber `/nova-lp`, "cria uma landing page", "faz uma LP", "preciso de uma página de vendas", "faz uma página pra [produto/cliente]".

## O que essa skill faz

Cria uma landing page completa a partir de um briefing. Escolhe o template correto, adapta ao cliente, gera o código pronto.

---

## Passo 1 — Definir o tipo de LP

Identificar o objetivo principal:

| Objetivo | Template a usar |
|---|---|
| Vender produto/serviço (com preço e CTA de compra) | `templates/landing-pages/vendas/` |
| Capturar lead (e-mail, WhatsApp, telefone) | `templates/landing-pages/lead-gen/` |
| Lançamento de curso, mentoria, evento | `templates/landing-pages/lancamento/` |

Se não estiver claro, perguntar:
> "Essa LP é pra vender diretamente, capturar contato ou lançar algo?"

---

## Passo 2 — Coletar o que falta

Se já existe briefing em `clientes/[nome-cliente]/briefing.md`, ler primeiro e usar. Perguntar só o que faltar.

Se não houver briefing, pedir as informações essenciais de uma vez:

> "Me passa:
> - Produto/serviço que vai ser apresentado
> - Headline principal (ou ideia central — eu crio se quiser)
> - CTA: WhatsApp, formulário, botão de compra?
> - Quem é o público (para calibrar o texto)
> - Identidade visual: cores, fontes, logo?
> - Tem fotos/imagens ou uso banco de imagens?"

---

## Passo 3 — Definir a stack

Se não estiver definida no briefing, perguntar:
> "Essa LP vai ser HTML/CSS puro, com Tailwind ou React?"

Usar a resposta para escolher a abordagem de código.

**Padrão quando não especificado:** HTML/CSS puro com CSS custom properties. Funciona em qualquer hospedagem sem build.

---

## Passo 4 — Criar o projeto

### Estrutura de arquivos

```
clientes/[nome-cliente]/[nome-projeto]/
├── index.html
├── style.css          ← (se HTML puro ou Tailwind CDN)
├── script.js          ← (interatividade: form, menu mobile, etc.)
├── assets/
│   ├── images/        ← imagens do projeto
│   └── fonts/         ← fontes locais (se houver)
└── README.md          ← instruções de uso e edição
```

Para projetos React/Next.js, adaptar a estrutura conforme o framework.

### Construção da LP

Ler o template correspondente em `templates/landing-pages/[tipo]/index.html`.

Adaptar com os dados do briefing:
1. Substituir textos placeholder pelo conteúdo real
2. Aplicar cores e fontes da identidade visual do cliente
3. Configurar o CTA (link de WhatsApp, formulário, botão de checkout)
4. Adicionar scripts de rastreamento se solicitado (Pixel Meta, GTM)
5. Preencher SEO básico (title, description, og:image)

### Seções obrigatórias por tipo

**LP de Vendas:**
- Hero (headline + subheadline + CTA)
- Benefícios ou diferenciais (3-6 itens)
- Prova social (depoimentos ou números)
- O que está incluído / features
- Garantia (se houver)
- FAQ (3-5 perguntas comuns)
- CTA final
- Rodapé

**LP de Lead Gen:**
- Hero com formulário inline ou botão que abre form
- Benefícios de se cadastrar
- Prova social (opcional)
- Rodapé simples

**LP de Lançamento:**
- Countdown timer
- Hero com proposta de valor forte
- Para quem é / não é
- O que vai aprender/receber
- Bônus
- Depoimentos
- FAQ
- CTA com urgência

---

## Passo 5 — Gerar o código

Gerar os arquivos completos e funcionais. Não gerar código incompleto ou com `// TODO`.

Prioridades de código:
- Responsivo (mobile-first)
- Carregamento rápido (sem dependências desnecessárias)
- Formulários com validação básica
- Links de WhatsApp no formato: `https://wa.me/55XXXXXXXXXXX?text=Mensagem+aqui`
- Comentários marcando onde o cliente pode editar textos e imagens

---

## Passo 6 — Registrar no histórico

Adicionar ou atualizar `clientes/[nome-cliente]/historico.md`:

```
### [DATA] — [Nome da LP]
**Tipo:** Landing Page de [Vendas | Lead Gen | Lançamento]
**Stack:** [stack usada]
**Status:** Em andamento
**URL:** —
**Observações:** LP criada com skill /nova-lp.
```

---

## Passo 7 — Confirmar e entregar

```
LP criada em clientes/[nome-cliente]/[nome-projeto]/:

- index.html ✓
- style.css ✓
- script.js ✓
- README.md ✓

Próximos passos:
- [ ] Revisar textos e adaptar ao tom da marca
- [ ] Substituir imagens placeholder pelas reais
- [ ] Testar formulário/CTA
- [ ] Deploy: [sugerir opção com base na stack e no que foi dito]

Quer que eu abra o preview ou ajuste alguma seção?
```

---

## Observações

- Sempre gerar código completo e funcional, não esqueletos
- Se o cliente não tem identidade visual definida, sugerir uma paleta e tipografia condizentes com o segmento
- Para CTAs de WhatsApp, sempre usar o formato `wa.me/55...` com mensagem pré-preenchida
- Pixel Meta e GTM: deixar os scripts comentados no `<head>` prontos para ativar, mesmo que não tenha os IDs ainda
