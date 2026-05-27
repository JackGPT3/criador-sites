# Sites & Landing Pages — Claude Code OS

## O que é esse workspace

Workspace de criação de sites e landing pages. Aqui ficam os projetos de clientes, templates reutilizáveis, componentes prontos e o histórico de entregas.

**Estrutura de pastas:**
- `_contexto/` — memória do sistema (não apagar)
- `clientes/[cliente]/` — projetos do cliente: briefing.md, pasta do projeto, assets
- `templates/landing-pages/` — templates prontos de LP por tipo (vendas, lead-gen, lançamento)
- `templates/componentes/` — blocos HTML reutilizáveis (hero, CTA, formulário, depoimentos, FAQ, rodapé)
- `templates/sites/` — estruturas de sites multi-página (institucional, etc.)
- `templates/skills/` — templates para criar novas skills
- `tarefas.md` — lista de tarefas corrente

## Sobre o trabalho

Criação de sites e landing pages para clientes variados. Stack mista — HTML/CSS/JS puro, Tailwind, React/Next.js conforme o projeto exige. Foco em velocidade de execução e qualidade de entrega.

## Tipos de projeto mais comuns

- Landing page de vendas (produto, serviço, oferta)
- Site institucional (apresentação, portfólio, quem somos)
- Página de captura / lead gen
- Site de infoprodutor ou lançamento digital

## Tom de voz

Direto e técnico. Sem enrolação. Sugere abordagens mas executa sem precisar de aprovação em cada passo.

Evitar: explicações longas sem código, respostas só com sugestões sem implementação, travessões.

## Regras do sistema

- Projetos novos: criar pasta em `clientes/[nome-cliente]/[nome-projeto]/`
- Briefings em `clientes/[nome-cliente]/briefing.md`
- Assets do cliente (logos, fotos, fontes) em `clientes/[nome-cliente]/assets/`
- Código do projeto em `clientes/[nome-cliente]/[nome-projeto]/`
- Ao criar qualquer projeto, sempre registrar em `clientes/[nome-cliente]/historico.md`

### Histórico de projetos (obrigatório por cliente)

Todo cliente com projetos entregues deve ter `clientes/[nome-cliente]/historico.md`.

**O que registrar:**
- Cada projeto criado (data, tipo, stack, status)
- Pedidos de alteração e como foram resolvidos
- Preferências específicas do cliente descobertas durante o projeto
- URL de produção quando disponível

**Formato:**
```
### DATA — Nome do Projeto
**Tipo:** Landing Page de Vendas | Site Institucional | Lead Gen | etc.
**Stack:** HTML/CSS | Tailwind | React | Next.js
**Status:** Em andamento | Entregue | Em revisão
**URL:** (quando disponível)
**Observações:** (o que ficou, o que foi pedido, o que aprendemos sobre o cliente)
```

## Ferramentas conectadas

- [x] Google Drive MCP
- [x] Canva MCP
- [x] Notion MCP
- [ ] Vercel CLI (instalar quando necessário)
- [ ] Netlify CLI (instalar quando necessário)

### Regra: sempre buscar a melhor conexão para o projeto

A cada projeto novo ou tarefa, avaliar se alguma ferramenta disponível pode acelerar ou melhorar o resultado:

- **Google Drive** — o cliente enviou assets? buscar lá antes de pedir
- **Canva** — precisa de imagem, banner ou mockup? gerar ou buscar no Canva
- **Notion** — tem briefing ou documentação do projeto no Notion? puxar de lá
- **Vercel/Netlify** — projeto precisa de deploy? instalar o CLI no momento certo, não antes

Se aparecerem novos MCPs ou ferramentas no ambiente, registrar em `_contexto/memoria.md` e avaliar onde podem ajudar.

---

## Contexto do negócio

No início de toda conversa, ler os seguintes arquivos (se existirem e estiverem configurados):

1. `_contexto/empresa.md` — quem é o usuário, como trabalha, perfil de clientes
2. `_contexto/preferencias.md` — stack preferida, padrões de código, o que evitar
3. `_contexto/estrategia.md` — projetos ativos, prioridades, o que tem deadline
4. `_contexto/memoria.md` — aprendizados acumulados, correções passadas, o que não repetir
5. `_contexto/aprendizados.md` — lições operacionais: erros a evitar, padrões validados, atalhos descobertos

Usar essas informações como base pra qualquer resposta. Ao sugerir abordagens ou templates, considerar as preferências registradas.

Não é necessário listar o que foi lido nem confirmar a leitura. Apenas usar o contexto naturalmente.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe uma skill relevante em `.claude/skills/` ou `.claude/commands/`.
Se encontrar, seguir as instruções da skill.
Se não encontrar, executar a tarefa normalmente.

### Skills principais do dia a dia

| Skill | Quando usar |
|---|---|
| `/nova-lp [cliente]` | Criar uma landing page nova a partir de briefing |
| `/novo-site [cliente]` | Criar um site multi-página a partir de briefing |
| `/novo-projeto [cliente]` | Onboarding completo de um novo cliente/projeto |
| `/componente [tipo]` | Gerar um bloco de componente isolado (hero, CTA, form, etc.) |
| `/exportar [cliente/projeto]` | Preparar o projeto para entrega ou deploy |
| `/atualizar` | Revisar e sincronizar workspace, contexto, projetos e ferramentas |

Ao concluir uma tarefa que não tinha skill mas parece repetível, perguntar:

> "Isso pode virar uma skill pra próxima vez. Quer que eu crie?"

Não perguntar pra tarefas pontuais ou perguntas simples. Só quando o padrão de repetição for claro.

---

## Aprender com correções

Quando o usuário corrigir algo ou dar uma instrução que parece permanente (frases como "sempre usa", "não faça mais isso", "prefiro assim", "da próxima vez..."), perguntar:

> "Quer que eu salve isso pra não precisar repetir?"

Se sim, identificar onde faz mais sentido salvar:

- **Sobre o trabalho/clientes** → `_contexto/empresa.md`
- **Sobre stack e código** → `_contexto/preferencias.md`
- **Sobre prioridades atuais** → `_contexto/estrategia.md`
- **Regra de comportamento nessa pasta** → `CLAUDE.md`
- **Correção técnica ou solução descoberta** → `_contexto/memoria.md` (seção "Correções e aprendizados técnicos")
- **Preferência de cliente específico** → `_contexto/memoria.md` (seção "Clientes — notas específicas")

Salvar com uma linha nova clara, sem reformatar o arquivo inteiro. Confirmar o que foi salvo mostrando a linha adicionada.

Quando um erro for cometido e corrigido, registrar em `_contexto/memoria.md` **sem perguntar** — no formato:
`DATA — [o que aconteceu] → [como fazer corretamente]`

### Registro proativo em aprendizados.md

Salvar em `_contexto/aprendizados.md` **sem esperar ser pedido** sempre que:
- Um erro for cometido e corrigido
- Uma abordagem funcionar melhor do que o esperado
- Um atalho ou padrão novo for descoberto durante o trabalho
- Jacqueline validar explicitamente uma forma de fazer

Antes de salvar, avisar em uma linha: "Vou registrar isso em aprendizados.md — [motivo breve]."
Depois salvar e mostrar a linha adicionada. Não perguntar permissão.

---

## Manter contexto atualizado

Ao terminar uma tarefa que mudou algo relevante (novo cliente, nova skill, mudança de stack, novo processo), perguntar:

> "Isso mudou algo no teu contexto. Quer que eu atualize os arquivos de memória?"

Se sim, mostrar o que vai mudar antes de salvar.

---

## Criação de skills

Quando o usuário pedir pra criar uma nova skill:

1. Verificar se existe um template relevante em `templates/skills/`
2. Perguntar: "Essa skill é específica pra esse projeto ou vale pra qualquer workspace?"
   - Específica → `.claude/skills/nome-da-skill/SKILL.md`
   - Universal → `~/.claude/skills/nome-da-skill/SKILL.md`
3. Ler `_contexto/preferencias.md` pra calibrar o conteúdo
4. Se precisar de arquivos de apoio, criar dentro da pasta da skill
