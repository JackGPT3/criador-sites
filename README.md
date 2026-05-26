# Sites & Landing Pages — Workspace

Workspace de criação de sites e landing pages. Gerenciado com Claude Code.

## Como começar

1. Abra essa pasta no Claude Code
2. Rode `/setup` para configurar o workspace com seus dados
3. Use `/iniciar` no começo de cada sessão
4. Para novo projeto: `/novo-projeto [cliente]`

## Skills disponíveis

| Comando | O que faz |
|---|---|
| `/iniciar` | Carrega o contexto e mostra projetos ativos |
| `/setup` | Configura o workspace pela primeira vez |
| `/nova-lp [cliente]` | Cria uma landing page completa |
| `/novo-site [cliente]` | Cria um site multi-página |
| `/novo-projeto [cliente]` | Onboarding de novo cliente/projeto |
| `/componente [tipo]` | Gera um bloco HTML isolado (hero, CTA, form...) |
| `/exportar [projeto]` | Prepara o projeto para entrega ou deploy |

## Estrutura

```
.claude/
  commands/     ← /iniciar e /setup
  skills/       ← skills de trabalho
_contexto/      ← memória do sistema (não apagar)
clientes/       ← projetos por cliente
templates/
  landing-pages/
    vendas/     ← LP de vendas completa
    lead-gen/   ← LP de captura de leads
    lancamento/ ← LP de lançamento com countdown
  sites/
    institucional/ ← site multi-página
  componentes/  ← blocos HTML reutilizáveis
tarefas.md      ← lista de tarefas corrente
```
