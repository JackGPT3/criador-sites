# Histórico — Professor Alfredo

### 2026-05-26 — Site Institucional + Cursos

**Tipo:** Site Institucional + Vendas de Cursos
**Stack:** HTML/CSS/JS puro
**Status:** Em andamento — aguardando deploy no Vercel
**URL:** (a definir após deploy)

**O que foi feito:**
- Migração do site WordPress para HTML/CSS/JS puro
- Seções: Header fixo, Hero, Depoimentos (3), Cursos (5 cards), FAQ accordion, Footer, WhatsApp flutuante
- Design azul escuro (#1a3a6b) com dourado (#c8a84b) — tom institucional/prestígio
- 100% responsivo (mobile, tablet, desktop)
- Configurado para deploy no Vercel (vercel.json incluso)

**Pendências:**
- Confirmar número de WhatsApp do professor
- Adicionar foto/imagem do professor (hero ou seção dedicada)

**Preferências do cliente:**
- Quer manter controle pelo Claude Code (não quer mexer no WordPress)
- Hospedagem gratuita preferida

---

### 2026-06-08 — Adição de 3 novos cursos (Sistemas)

**Tipo:** Atualização de conteúdo
**Status:** Código pronto, deploy pendente na conta correta

**O que foi feito:**
- Adicionados 3 cards de cursos na Linha 3 da seção de produtos:
  - SISTEMA CIRCULATÓRIO — R$450,00 — 6 aulas — Hotmart: /anatomia-geral-do-sistema-circulatorio/R105987238I
  - SISTEMA DIGESTÓRIO — R$450,00 — 6 aulas — Hotmart: /anatomia-geral-do-sistema-digestorio/M106035788T
  - SISTEMA RESPIRATÓRIO — R$300,00 — 4 aulas — Hotmart: /anatomia-geral-do-sistema-respiratorio/A106035808A
- Imagens adicionadas em images/ (sistema-circulatorio.jpg, sistema-digestorio.jpg, sistema-respiratorio.jpg)

**ATENÇÃO — Deploy:**
- O domínio oprofessoralfredo.com está em uma conta Vercel DIFERENTE da conta do Modo Fluxo
- NUNCA usar `vercel --prod` nesta pasta sem antes confirmar que o CLI está autenticado na conta correta
- Verificar conta ativa com `vercel whoami` antes de qualquer deploy
- A conta correta é a que tem o projeto vinculado a oprofessoralfredo.com
