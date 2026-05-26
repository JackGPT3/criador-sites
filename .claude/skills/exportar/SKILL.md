# Skill: Exportar

Executar ao receber `/exportar [cliente/projeto]`, "prepara pra entregar", "vou subir o site", "como faço o deploy", "prepara o ZIP".

## O que essa skill faz

Prepara um projeto finalizado para entrega ou deploy. Verifica qualidade, gera README do projeto, sugere opção de deploy e orienta os próximos passos.

---

## Passo 1 — Identificar o projeto

Se o usuário especificou o projeto (`/exportar nome-cliente/nome-projeto`), usar esse caminho.
Se não especificou, perguntar: "Qual projeto você quer exportar? (`clientes/[cliente]/[projeto]`)"

---

## Passo 2 — Checklist de qualidade

Verificar o projeto antes de exportar:

**HTML:**
- [ ] Todos os arquivos HTML têm `<title>` único e descritivo
- [ ] Todos os arquivos HTML têm `<meta name="description">` preenchido
- [ ] `<meta charset="UTF-8">` presente
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1.0">` presente
- [ ] Links internos todos funcionando (sem `href="#"` vazios)
- [ ] Imagens com atributo `alt` descritivo
- [ ] Não tem `<!-- TODO -->` ou placeholders não preenchidos

**CSS:**
- [ ] Arquivo de estilos sem regras duplicadas óbvias
- [ ] Responsividade (verificar se tem media queries)

**JS:**
- [ ] Sem `console.log()` esquecidos
- [ ] Formulários com validação básica funcionando

**Performance:**
- [ ] Imagens referenciadas existem na pasta `assets/`
- [ ] Sem dependências de CDN desnecessárias

**Rastreamento:**
- [ ] Scripts de Pixel Meta / GTM: comentados (se não configurados) ou ativos (se configurados)

Reportar o que encontrou:

```
Checklist do projeto [nome]:

✓ HTML básico OK
✗ Imagens: 2 arquivos referenciados não encontrados em assets/
✗ Meta description faltando em sobre.html
⚠ 3 console.log() encontrados em script.js

Corrigir antes de continuar? (recomendado)
```

---

## Passo 3 — Gerar README do projeto

Criar ou atualizar `clientes/[nome-cliente]/[nome-projeto]/README.md`:

```markdown
# [Nome do Projeto] — [Nome do Cliente]

## Sobre o projeto

[Descrição breve do que é a página/site]

## Como editar

### Textos
Todos os textos estão diretamente no HTML. Para editar:
- Abra o arquivo `index.html` (ou a página correspondente) em qualquer editor de texto
- Os textos estão marcados com comentários `<!-- EDITAR: descrição -->`
- Salve e recarregue no navegador para ver as mudanças

### Imagens
As imagens ficam na pasta `assets/images/`. Para trocar:
1. Coloque a nova imagem na pasta `assets/images/`
2. No HTML, procure o `<img src="assets/images/nome-antigo.jpg">` e troque o nome do arquivo

### Cores
As cores principais estão no topo do arquivo `style.css`:
```css
:root {
  --cor-primaria: #XXXXXX;    /* cor principal da marca */
  --cor-secundaria: #XXXXXX;  /* cor de destaque */
  --cor-texto: #XXXXXX;       /* cor do texto */
}
```

### CTA / Links
- **Botão de WhatsApp:** procure por `wa.me/` no HTML e troque o número
- **Formulário:** [instrução específica do projeto]

## Como publicar

### Opção 1: Vercel (recomendado para sites estáticos)
1. Acesse [vercel.com](https://vercel.com) e crie uma conta
2. Clique em "Add New Project"
3. Arraste a pasta do projeto ou conecte ao repositório Git
4. Clique em "Deploy"

### Opção 2: Netlify
1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta do projeto para a área de deploy
3. A URL estará disponível em instantes

### Opção 3: Hospedagem tradicional (cPanel/FTP)
1. Compacte todos os arquivos em um ZIP
2. Acesse o cPanel e vá em File Manager
3. Faça upload do ZIP para a pasta `public_html`
4. Extraia e acesse pelo domínio configurado

## Estrutura de arquivos

[listar arquivos do projeto]

## Integrações ativas

- [ ] Pixel Meta: [status]
- [ ] Google Analytics: [status]
- [ ] Formulário: [ferramenta e status]

## Desenvolvido por

[Seu nome / empresa]
Data: [data]
```

---

## Passo 4 — Atualizar histórico do cliente

Atualizar `clientes/[nome-cliente]/historico.md`:

```
**Status:** Entregue
**Data de entrega:** [data]
**URL:** [se já tiver]
```

---

## Passo 5 — Sugerir deploy

Com base na stack do projeto:

**HTML/CSS/JS puro:**
> "Projeto estático. Recomendo Vercel ou Netlify — arrastar a pasta e está no ar em segundos. Quer que eu te guie no processo?"

**React/Next.js:**
> "Projeto Next.js. Recomendo Vercel — é a opção nativa. Quer que eu gere as instruções de deploy?"

**WordPress/PHP:**
> "Precisa de hosting com PHP. Recomendo Hostinger, Locaweb ou SiteGround para projetos nacionais."

---

## Passo 6 — Confirmar

```
Pronto para entrega: clientes/[nome-cliente]/[nome-projeto]/

- README.md atualizado ✓
- Histórico do cliente atualizado ✓
- Checklist: [X/Y itens OK]

[Se houver problemas encontrados:]
Pendências antes do deploy:
- [lista de ajustes recomendados]

Deploy sugerido: [opção]
Quer ajuda com o processo de publicação?
```

---

## Observações

- Se encontrar problemas graves no checklist, resolver antes de prosseguir (a menos que o usuário peça para ignorar)
- Não deletar arquivos de desenvolvimento (o ZIP é da pasta como está)
- Para ZIP: documentar no README que o usuário deve extrair antes de subir no FTP
