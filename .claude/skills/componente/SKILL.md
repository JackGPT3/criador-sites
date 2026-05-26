# Skill: Componente

Executar ao receber `/componente [tipo]`, "cria um hero", "faz um rodapé", "preciso de um formulário", "adiciona uma seção de depoimentos", "gera um CTA".

## O que essa skill faz

Gera um bloco de componente HTML/CSS isolado, pronto para colar em qualquer projeto. Usa os padrões de código do workspace e adapta ao estilo especificado.

---

## Componentes disponíveis

| Comando | Componente |
|---|---|
| `/componente hero` | Seção hero (headline + sub + CTA) |
| `/componente header` | Cabeçalho com nav e logo |
| `/componente cta` | Seção CTA (chamada para ação isolada) |
| `/componente formulario` | Formulário (lead gen ou contato) |
| `/componente depoimentos` | Grid de depoimentos/testemunhos |
| `/componente faq` | Accordion de FAQ |
| `/componente beneficios` | Grid de benefícios/features |
| `/componente rodape` | Rodapé completo |
| `/componente preco` | Tabela ou card de preço |
| `/componente contador` | Countdown timer |
| `/componente numeros` | Seção de números/estatísticas |
| `/componente video` | Embed de vídeo (YouTube/Vimeo) |

Se o tipo não estiver listado, criar mesmo assim com base na descrição.

---

## Passo 1 — Identificar o contexto

Verificar se há um projeto ativo no contexto:
- Se o usuário mencionou um cliente/projeto, usar a identidade visual do briefing
- Se não houver contexto, perguntar: "Esse componente é pra qual projeto? Ou mando genérico?"

Para componente genérico, usar CSS custom properties com `--cor-primaria`, `--cor-texto`, etc. — fácil de personalizar depois.

---

## Passo 2 — Coletar especificações

Perguntar apenas o necessário (não perguntar o que dá para inferir):

**Para hero:**
- Headline (ou "cria você")
- CTA: qual texto e para onde vai (WhatsApp/link/formulário)
- Tem imagem de fundo ou background colorido?

**Para formulário:**
- Quais campos: nome, e-mail, telefone, mensagem, outro?
- Para onde vai (mailto:, WhatsApp, ferramenta de CRM)?
- Estilo: inline na página, popup ou standalone?

**Para depoimentos:**
- Quantos depoimentos? (usar placeholders se não souber)
- Tem foto dos clientes ou só texto?

**Para FAQ:**
- Quantas perguntas? (usar perguntas genéricas do segmento se não informar)

**Para countdown:**
- Data e hora do encerramento? (formato: 2024-12-31T23:59:59)

---

## Passo 3 — Gerar o componente

Gerar HTML + CSS completo e autocontido. O componente deve:

1. Funcionar colando diretamente num `<body>` existente
2. Usar CSS com escopo (classe única para o componente, ex: `.hero`, `.faq-section`)
3. Não depender de bibliotecas externas (exceto se explicitamente pedido)
4. Ser responsivo por padrão (mobile-first)
5. Incluir comentários onde o usuário vai editar textos, imagens e links

**Formato de entrega:**

```html
<!-- ========================================
     COMPONENTE: [NOME]
     Como usar: cole esse bloco dentro do <body>
     CSS: copie o <style> para o seu style.css
     ======================================== -->

<style>
  /* Estilos do componente */
</style>

<section class="...">
  <!-- HTML do componente -->
</section>
```

---

## Passo 4 — Salvar (opcional)

Se o usuário quiser salvar o componente na biblioteca:

```
templates/componentes/[nome-componente].html
```

Perguntar: "Quer salvar esse componente em `templates/componentes/` pra usar em outros projetos?"

---

## Observações

- Gerar sempre o componente completo com HTML + CSS inline — não gerar só o HTML sem estilo
- Se for componente com JavaScript (accordion, countdown, slider), incluir o `<script>` junto
- Para WhatsApp links: `https://wa.me/55XXXXXXXXXXX?text=Mensagem+aqui`
- Para formulários sem backend: usar `action="https://formspree.io/f/[ID]"` como padrão e documentar como trocar
- Componentes de countdown: usar JavaScript puro, sem bibliotecas
