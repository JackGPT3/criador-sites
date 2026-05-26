# Skill: Novo Site

Executar ao receber `/novo-site`, "cria um site", "faz um site pra [cliente]", "preciso de um site institucional".

## O que essa skill faz

Cria a estrutura completa de um site multi-página a partir de um briefing. Planeja as páginas, gera os arquivos e deixa o projeto pronto para desenvolvimento.

---

## Passo 1 — Entender o escopo

Se já houver briefing em `clientes/[nome-cliente]/briefing.md`, ler e extrair as informações. Perguntar só o que faltar.

Se não houver, perguntar de uma vez:

> "Me conta sobre o site:
> - Nome e segmento do negócio
> - Objetivo do site: apresentar a empresa, capturar clientes, mostrar portfólio, e-commerce?
> - Quais páginas precisam existir? (home, sobre, serviços, portfólio, contato, blog?)
> - CTA principal: WhatsApp, formulário, ligação, e-mail?
> - Tem identidade visual? (cores, fontes, logo)
> - Stack: HTML, Tailwind, React/Next.js?
> - Tem prazo ou deadline?"

---

## Passo 2 — Planejar as páginas

Com base no briefing, definir o mapa de páginas:

**Site institucional padrão:**
- `index.html` — Home (hero, resumo dos serviços, CTA, depoimentos, contato rápido)
- `sobre.html` — Sobre a empresa / equipe
- `servicos.html` — Serviços ou produtos oferecidos
- `contato.html` — Formulário + mapa + redes sociais
- `404.html` — Página de erro personalizada

**Com portfólio:**
- Adicionar `portfolio.html` ou `projetos.html`

**Com blog:**
- Adicionar `blog/index.html` e `blog/post.html` como template de artigo

Apresentar o mapa de páginas antes de criar:

```
Vou criar um site com as seguintes páginas:
- / (Home)
- /sobre
- /servicos
- /contato

Stack: [escolhida]
Confirmado? Posso começar?
```

---

## Passo 3 — Estrutura de arquivos

```
clientes/[nome-cliente]/[nome-projeto]/
├── index.html
├── sobre.html
├── servicos.html
├── contato.html
├── 404.html
├── css/
│   ├── style.css        ← estilos globais
│   └── components.css   ← componentes reutilizáveis
├── js/
│   ├── main.js          ← scripts globais (menu mobile, etc.)
│   └── forms.js         ← validação de formulários
├── assets/
│   ├── images/
│   │   ├── logo.svg
│   │   └── og-image.jpg ← imagem para redes sociais (1200x630)
│   └── fonts/
├── components/          ← partials reutilizáveis (se usar SSG ou build)
│   ├── header.html
│   ├── footer.html
│   └── nav.html
└── README.md
```

Para React/Next.js, adaptar para a estrutura do framework com `pages/` ou `app/`.

---

## Passo 4 — Construção

### Elementos globais (presentes em todas as páginas)

**Header/Nav:**
- Logo à esquerda
- Links de navegação
- CTA no header (WhatsApp, contato, etc.)
- Menu hamburger no mobile

**Footer:**
- Logo
- Links úteis
- Redes sociais
- Créditos / Copyright

### Padrões de código

- CSS custom properties para cores e fontes (definidas no `:root` de `style.css`)
- Classes CSS reutilizáveis para botões, cards, seções
- Cada página com seu próprio `<title>` e `<meta description>`
- `og:image` e `og:title` para compartilhamento em redes sociais
- `<link rel="canonical">` em cada página
- Google Analytics / GTM em comentário pronto para ativar

### Responsividade

- Mobile-first (min 320px)
- Breakpoints: 768px (tablet), 1024px (desktop), 1280px (wide)
- Testar mentalmente os breakpoints principais antes de entregar

---

## Passo 5 — Registrar no histórico

Adicionar em `clientes/[nome-cliente]/historico.md`:

```
### [DATA] — Site [Nome do Cliente]
**Tipo:** Site Institucional
**Páginas:** home, sobre, serviços, contato [ajustar conforme criado]
**Stack:** [stack usada]
**Status:** Em andamento
**URL:** —
**Observações:** Site criado com skill /novo-site. Mapa de páginas: [listar].
```

---

## Passo 6 — Confirmar e entregar

```
Site criado em clientes/[nome-cliente]/[nome-projeto]/:

Páginas:
- index.html ✓ (Home)
- sobre.html ✓
- servicos.html ✓
- contato.html ✓
- 404.html ✓

Arquivos de suporte:
- css/style.css ✓
- js/main.js ✓
- README.md ✓

Próximos passos:
- [ ] Revisar textos em cada página
- [ ] Substituir imagens placeholder
- [ ] Testar formulário de contato
- [ ] Configurar domínio / hospedagem
- [ ] Deploy: [sugerir baseado na stack]

Quer que eu abra alguma página específica ou ajuste alguma seção?
```

---

## Observações

- Sempre gerar código completo em todas as páginas — não esqueletos
- O header e footer devem ser idênticos em todas as páginas (copiar o HTML, ou usar includes se o projeto suportar)
- Formulário de contato: por padrão usar mailto: ou link de WhatsApp. Se o cliente tiver Formspree, RD Station ou similar, configurar o endpoint
- Para sites React/Next.js: criar com `npx create-next-app` e documentar o processo no README.md
