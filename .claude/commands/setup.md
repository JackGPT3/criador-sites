---
name: setup
description: Configuração inicial do workspace. Faz perguntas sobre o negócio e preenche os arquivos de contexto. Rodar uma vez na primeira sessão.
---

# Skill: /setup

Executar quando o usuário rodar `/setup` ou quando os arquivos de `_contexto/` tiverem `<!-- NOT CONFIGURED -->`.

## O que essa skill faz

Coleta informações sobre quem é o usuário e como trabalha, e preenche os três arquivos de contexto:
- `_contexto/empresa.md`
- `_contexto/preferencias.md`
- `_contexto/estrategia.md`

---

## Passo 1 — Coletar informações

Fazer as perguntas em blocos (não uma a uma). Perguntar:

```
Vou configurar o workspace. Me conta:

**Sobre você:**
1. Como você se chama e como trabalha? (freelancer, agência, in-house?)
2. Que tipo de cliente você atende mais? (nicho, porte, segmento)
3. Qual é o seu volume de projetos por mês, em média?

**Sobre como você trabalha:**
4. Quando usa HTML/CSS puro vs. Tailwind vs. React — tem alguma regra?
5. Como entrega os projetos pro cliente? (ZIP, repositório Git, deploy direto, hospedagem gerenciada?)
6. Trabalha com designer ou faz o design você mesmo?

**Sobre agora:**
7. Tem algum projeto ativo no momento? (nome do cliente, tipo, deadline)
8. Qual é o maior gargalo no seu processo hoje?
```

Aceitar qualquer formato de resposta. O que não souber, deixar como estava no template.

---

## Passo 2 — Preencher os arquivos de contexto

Com base nas respostas, preencher os três arquivos **sem o marcador `<!-- NOT CONFIGURED -->`**.

### empresa.md
Preencher com: nome, perfil (freelancer/agência/in-house), tipo de cliente, ferramentas, volume de trabalho.

### preferencias.md
Preencher com: regras de stack (quando usar cada tecnologia), forma de entrega, se trabalha com designer, padrões visuais que mencionou.

### estrategia.md
Preencher com: projetos ativos (tabela), prioridades da semana, objetivos de médio prazo que mencionou.

---

## Passo 3 — Confirmar

Mostrar o que foi configurado:

```
Setup concluído. Configurei:

- _contexto/empresa.md ✓
- _contexto/preferencias.md ✓
- _contexto/estrategia.md ✓

[resumo em 3 linhas do que foi configurado]

Agora você pode usar /iniciar pra começar cada sessão.
Quer criar alguma coisa ou tem um projeto pra começar?
```

---

## Observações

- Não reformatar os arquivos existentes — só substituir os placeholders
- Se o usuário já tiver passado algumas informações antes de rodar /setup, usar essas informações
- Salvar os arquivos um de cada vez e confirmar cada um
