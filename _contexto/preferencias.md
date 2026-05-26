# Preferências de Trabalho

<!-- NOT CONFIGURED — rode /setup para preencher -->

## Stack e tecnologia

- **HTML/CSS/JS puro:** para projetos simples, entregas rápidas, clientes sem servidor Node
- **Tailwind CSS:** preferir via CDN quando não há build step; via npm para projetos maiores
- **React/Next.js:** para projetos com interatividade complexa ou SEO avançado
- **Decisão de stack:** perguntar ao usuário se não estiver especificada no briefing

## Padrões de código

- Arquivos HTML com indentação de 2 espaços
- CSS organizado por seções: reset → variáveis → base → layout → componentes → utilitários
- Usar CSS custom properties (variáveis) para cores, fontes e espaçamentos
- Sempre incluir meta tags básicas de SEO (title, description, og:image)
- Sempre incluir meta viewport para responsividade
- Comentários em português nos templates

## Design e layout

- (Preencher: preferência de paleta de cores padrão, tipografia favorita, estilo visual)
- Mobile-first por padrão
- Seções com padding generoso (mínimo 60px vertical)
- CTAs bem visíveis e contrastantes

## Formulários e conversão

- Formulários sempre com validação básica (campos obrigatórios, formato de e-mail)
- Botão de WhatsApp como CTA principal quando o cliente usa WhatsApp para vendas
- UTMs nos links de CTA quando o cliente usa rastreamento de anúncios
- Pixel do Meta e Google Tag por padrão (scripts comentados prontos para ativar)

## O que evitar

- Animações excessivas que travam em mobile
- Carregamento de muitas fontes externas (máximo 2 famílias por página)
- Dependências desnecessárias (manter simples quando possível)
- (Adicionar outras preferências)

## Entrega

- Sempre gerar um `README.md` dentro da pasta do projeto com instruções de uso
- Código comentado o suficiente para o cliente entender onde alterar textos e imagens
- (Adicionar: preferência de empacotamento — ZIP, Git repo, etc.)
