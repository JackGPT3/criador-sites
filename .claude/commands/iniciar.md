---
name: iniciar
description: Inicia a sessão de trabalho lendo o contexto e mostrando projetos ativos. Usar no começo de cada sessão do Claude Code.
---

# Skill: /iniciar

Use essa skill no começo de cada sessão de trabalho.

## O que fazer

1. Verificar se `_contexto/empresa.md` está configurado (sem `<!-- NOT CONFIGURED -->`)
2. Verificar se `_contexto/preferencias.md` está configurado
3. Verificar se `_contexto/estrategia.md` está configurado
4. Ler `CLAUDE.md`
5. Apresentar um resumo de contexto e perguntar o que o usuário quer fazer

## Fluxo

### Se os arquivos de memória existem e estão configurados

Ler `_contexto/empresa.md`, `_contexto/preferencias.md` e `_contexto/estrategia.md`.

Apresentar resumo curto no formato:

```
Contexto carregado.

**Trabalho:** [o que faz, em uma linha]
**Foco agora:** [prioridade principal de estrategia.md]
**Projetos ativos:** [listar do estrategia.md, se houver]
**Lembretes:** [qualquer preferência importante de preferencias.md]

O que você quer fazer hoje?
```

Máximo 6 linhas. Não reescrever tudo — só o essencial.

### Se os arquivos têm `<!-- NOT CONFIGURED -->`

Avisar:

```
O workspace ainda não está configurado.
Rode /setup para eu aprender sobre como você trabalha — leva uns 5 minutos.
Depois de configurado, o /iniciar vai funcionar completo.
```

## Comportamento

- Tom direto, sem saudações
- Não listar os arquivos lidos
- Se houver itens em `tarefas.md`, mencionar até 3 no resumo
- Verificar se há projetos com deadline próximo em `estrategia.md` — se houver, destacar
