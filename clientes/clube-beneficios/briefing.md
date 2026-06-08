# Clube de Benefícios — Briefing

**Contato:** Mariana Bassi
**Status:** Proposta enviada — aguardando fechamento
**Proposta:** `_propostas/clube-beneficios/proposta.pdf`

---

## O que é

Plataforma white-label de clube de benefícios. A empresa da Mariana tem acordos com marcas parceiras (Stanley, Domino's, Integralmédica etc.) e quer vender o acesso ao clube para empresas contratantes (RH), cada uma com a identidade visual dela.

**Não é transacional:** a plataforma exibe o cupom e redireciona o usuário ao site da marca. Sem carrinho, sem checkout.

---

## Modelo de negócio

- **Mariana** → detém os acordos com as marcas e vende o clube para empresas
- **Empresa contratante (RH)** → recebe a plataforma com a própria logo/cores/URL
- **Funcionário** → loga, copia o cupom, vai direto ao site da marca

---

## Stack definida

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js + Tailwind CSS (tema por variáveis CSS) |
| Auth & banco | Supabase (login, DB, storage) |
| Deploy/infra | Vercel (um projeto por cliente contratante) |

**Modelo de deploy:** um codebase, um deploy por empresa contratante. Branding via variáveis de ambiente (logo, cores, nome do clube, URL).

---

## Escopo da plataforma base

- Sistema de login por empresa (email/CPF, controle por grupo)
- Home com banners rotativos
- Grid de marcas com filtro por categoria
- Busca de parceiros
- Página da marca: banner + descrição + cupom + redirect
- Pop-up de cupom ao clicar na oferta
- Painel admin: gerenciar parceiros, cupons, banners, usuários
- Design responsivo (mobile, tablet, desktop)
- White-label: logo, cores, nome e URL por cliente

---

## Investimento acordado na proposta

| Item | Valor |
|---|---|
| Desenvolvimento da plataforma base | R$ 10.000 |
| Configuração por novo cliente (a partir do 2º) | R$ 1.500 |

- Pagamento: 50% entrada + 50% na entrega
- Hospedagem e domínio: R$ 50–150/mês + R$ 60/ano (por cliente, não incluso)

---

## Prazo estimado

6–7 semanas a partir da aprovação + 50% de entrada:

1. **Semana 1–2:** briefing, identidade visual, wireframes
2. **Semana 3–4:** desenvolvimento (login, painel admin, parceiros)
3. **Semana 5–6:** conteúdo real, testes mobile/desktop
4. **Semana 7:** deploy, DNS, entrega do 1º cliente configurado

---

## O que precisamos quando fechar

- [ ] Logo da empresa (SVG ou PNG com fundo transparente)
- [ ] Paleta de cores (hex)
- [ ] Nome do clube
- [ ] Domínio pretendido
- [ ] Lista de marcas parceiras iniciais com cupons/links
- [ ] Definição de categorias
- [ ] Dados do primeiro cliente contratante (se já tiver)
