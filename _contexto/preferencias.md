# Preferências de Trabalho

## Stack e tecnologia

- **Padrão:** HTML + Tailwind CSS via CDN — entrega rápida, sem build step, funciona em qualquer hospedagem
- **Quando usar React/Next.js:** projetos com interatividade complexa, blog, e-commerce, ou quando o cliente já tem servidor Node
- **Decisão de stack:** se não estiver especificada no briefing, usar HTML + Tailwind por padrão

## Padrões de código

- Arquivos HTML com indentação de 2 espaços
- CSS via Tailwind (classes utilitárias), variáveis CSS para cores e tipografia da identidade do cliente
- Sempre incluir meta tags básicas de SEO (title, description, og:image)
- Sempre incluir meta viewport para responsividade
- Mobile-first por padrão

## Design e layout

- Design profissional incluído na entrega — não depende de designer externo
- Paleta de cores definida a partir do briefing ou identidade do cliente
- Tipografia: Google Fonts, máximo 2 famílias por projeto
- Seções com espaçamento generoso, hierarquia visual clara
- CTAs bem visíveis e contrastantes

## Formulários e conversão

- Botão de WhatsApp como CTA principal quando o cliente usa WhatsApp para vendas
- UTMs nos links de CTA quando o cliente usa rastreamento de anúncios
- Pixel do Meta e Google Tag: scripts comentados prontos para ativar

## O que evitar

- Animações pesadas que travam em mobile
- Dependências desnecessárias
- Build steps complexos sem necessidade real
- Processos lentos — o objetivo é entregar rápido e bem

## Entrega

- Código comentado onde o cliente pode alterar textos e imagens
- `README.md` dentro da pasta do projeto com instruções de uso
- Empacotamento: ZIP ou pasta pronta para upload em hospedagem compartilhada, salvo indicação contrária
