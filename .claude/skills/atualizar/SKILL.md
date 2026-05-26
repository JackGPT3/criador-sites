# Skill: /atualizar

Executar ao receber `/atualizar`, "atualiza o workspace", "revisa o contexto", "verifica ferramentas", "sincroniza memória".

## O que essa skill faz

Faz uma varredura completa do workspace, atualiza o que ficou para trás, registra o que foi aprendido e verifica se há novas ferramentas ou conexões úteis disponíveis.

---

## Passo 1 — Ler o estado atual

Ler os arquivos de contexto:
- `_contexto/empresa.md`
- `_contexto/preferencias.md`
- `_contexto/estrategia.md`
- `_contexto/memoria.md`

Identificar o que está desatualizado, vazio ou marcado com `(preencher)` / `(atualizar)`.

---

## Passo 2 — Revisar projetos ativos

Varrer `clientes/` e comparar com `_contexto/estrategia.md`:

- Há pastas de projetos que não estão na tabela de projetos ativos?
- Há projetos marcados como "Em andamento" que parecem finalizados (pasta completa, sem tarefas abertas)?
- Algum cliente novo não tem `historico.md`?

Atualizar `_contexto/estrategia.md` com o estado real encontrado.

---

## Passo 3 — Revisar biblioteca de componentes

Listar arquivos em `templates/componentes/`. Para cada componente:
- Está documentado corretamente? (comentário no topo com nome e instruções)
- Está responsivo?
- Usa padrões atuais do workspace?

Se encontrar componente desatualizado ou mal documentado, perguntar se quer corrigir.

---

## Passo 4 — Verificar ferramentas disponíveis

Verificar quais MCPs estão conectados e funcionando. Comparar com o que o projeto atual pode precisar:

**MCPs disponíveis (verificar status):**
- Google Drive — upload de assets, compartilhamento de entregáveis
- Canva — criação de imagens, banners, mockups
- Notion — briefings, documentação de projeto
- Outros MCPs que estiverem listados no ambiente

Para cada projeto ativo, pensar:
- Faz sentido conectar o projeto a alguma ferramenta?
- Tem asset no Google Drive que devia estar em `clientes/[cliente]/assets/`?
- O cliente usa alguma plataforma que tem MCP disponível?

Registrar sugestões de conexão em `_contexto/memoria.md` se ainda não estiverem lá.

---

## Passo 5 — Revisar memória e aprendizados

Ler `_contexto/memoria.md` e verificar:
- Há aprendizados pendentes de aplicar?
- Algo foi resolvido de forma diferente do que estava registrado?
- Há padrões novos que deveriam ser registrados?

Propor adições à memória se algo importante não estiver registrado.

---

## Passo 6 — Revisar skills

Listar skills em `.claude/skills/`. Para cada uma:
- A skill reflete o jeito atual de trabalhar?
- Houve alguma mudança de processo que invalida alguma instrução?

Se encontrar inconsistência, perguntar se quer atualizar a skill.

---

## Passo 7 — Relatório final

Mostrar resumo do que foi atualizado:

```
Workspace atualizado.

CONTEXTO:
- empresa.md: [ok / atualizado]
- preferencias.md: [ok / atualizado]
- estrategia.md: [ok / atualizado]
- memoria.md: [ok / X novos registros]

PROJETOS:
- [lista de projetos e status]

FERRAMENTAS:
- [MCPs conectados e status]
- [sugestões de conexão para projetos ativos]

COMPONENTES: [X na biblioteca]

[o que foi alterado]
```

---

## Quando usar automaticamente

Sugerir `/atualizar` quando:
- Início de sessão com muitos projetos abertos
- Após entregar um projeto (para fechar status)
- Quando o usuário mencionar "não lembro como estava", "o que tá aberto", "cadê o projeto X"
- Quando uma nova ferramenta/MCP for conectada ao workspace
