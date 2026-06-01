# Skill: /publicar

Executar ao receber `/publicar`, "publica o modo fluxo", "faz o deploy", "publica os posts de hoje", "sobe o site".

## O que essa skill faz

Verifica o calendário de posts do Modo Fluxo, garante que cada post novo tem imagem própria do Pexels e faz o deploy no Vercel. Mostra o que vai ao ar e o que ainda está agendado.

---

## Passo 1 — Mapear o estado atual

Ler todos os arquivos `.mdx` em `clientes/modo-fluxo/modo-fluxo-site/content/posts/`.

Para cada post, extrair:
- `slug` (nome do arquivo sem `.mdx`)
- `date` (frontmatter)
- `image` (frontmatter)

Separar em dois grupos com base na data de hoje:

**Prontos para publicar** — data ≤ hoje e ainda não estavam no ar antes desta sessão  
**Agendados** — data > hoje (ficam em standby, não sobem ainda)

Mostrar tabela resumida:

```
POSTS PRONTOS PARA PUBLICAR HOJE:
  ✓ 2026-06-02 | make-vs-zapier-qual-automacao-vale-mais...
  ✓ 2026-06-04 | 20-prompts-prontos-para-o-whatsapp...

AGENDADOS (não sobem agora):
  → 2026-06-06 | como-criar-um-funil-de-vendas-automatico...
  → 2026-06-09 | 5-melhores-ferramentas-de-ia...
  → [etc.]
```

---

## Passo 2 — Verificar imagens dos posts prontos

Para cada post do grupo "prontos para publicar", verificar se o campo `image` do frontmatter aponta para um arquivo nomeado com o slug do próprio post:

- **OK:** `image: "/images/posts/make-vs-zapier-qual-automacao-vale-mais-para-pequeno-negocio-em-2026.webp"` → arquivo existe em `public/images/posts/`
- **Pendente:** imagem genérica, reutilizada ou com nome diferente do slug

Para posts com imagem pendente, rodar o script de busca automaticamente:

```
cd clientes/modo-fluxo/modo-fluxo-site
$env:PEXELS_API_KEY = [ler de .env.local]
node scripts/fetch-image.mjs <slug> <keywords-do-titulo>
```

As keywords devem ser derivadas do título do post — remover palavras comuns em português (`como`, `para`, `que`, `de`, `do`, `da`, `com`, `seu`, `sua`, `o`, `a`, `e`, `em`, `no`, `na`, `um`, `uma`) e usar as 3-5 palavras mais descritivas + "business" se o tema for empresarial.

Após buscar, atualizar o frontmatter do post com o novo caminho da imagem.

Reportar o que foi feito:

```
IMAGENS:
  ✓ make-vs-zapier → já tinha imagem própria
  ⚡ 20-prompts-prontos → buscada no Pexels: "whatsapp business prompts"
```

---

## Passo 3 — Deploy

Com tudo verificado, rodar o deploy:

```
cd clientes/modo-fluxo/modo-fluxo-site
vercel --prod
```

Aguardar a conclusão e confirmar que o build foi bem-sucedido.

Se o build falhar: reportar o erro e não tentar segundo deploy sem investigar.

---

## Passo 4 — Confirmar o que foi ao ar

Após deploy bem-sucedido, mostrar resumo final:

```
✓ Deploy concluído — modofluxo.com.br

PUBLICADOS HOJE:
  • make-vs-zapier-qual-automacao... (02/06)
  • 20-prompts-prontos-para-o-whatsapp... (04/06)

PRÓXIMA PUBLICAÇÃO:
  → 06/06 | como-criar-um-funil-de-vendas-automatico-no-manychat-do-zero
```

---

## Observações

- A chave da API do Pexels está em `clientes/modo-fluxo/modo-fluxo-site/.env.local` como `PEXELS_API_KEY`
- O script de imagens está em `clientes/modo-fluxo/modo-fluxo-site/scripts/fetch-image.mjs`
- O filtro de data está em `clientes/modo-fluxo/modo-fluxo-site/lib/posts.ts` — posts com `date > hoje` nunca aparecem no site independente de terem sido deployados
- Se vários posts do mesmo tema forem publicados no mesmo dia, controlar duplicatas de imagem usando índices diferentes (não pegar sempre a primeira foto do Pexels)
- Nunca fazer deploy automático sem mostrar primeiro o resumo do Passo 1
