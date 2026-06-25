import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre o FryerFit',
  description: 'O FryerFit é um blog de receitas fitness para air fryer, micro-ondas e eletrodomésticos. Toda receita tem tabela nutricional completa com calorias, proteínas, carboidratos e gorduras.',
  keywords: ['sobre fryerfit', 'blog receitas fitness', 'receitas air fryer tabela nutricional', 'quem faz fryerfit'],
  authors: [{ name: 'Jacqueline da Silva Paes', url: 'https://fryerfit.com.br/sobre' }],
  alternates: { canonical: 'https://fryerfit.com.br/sobre' },
  openGraph: {
    title: 'Sobre o FryerFit',
    description: 'O FryerFit é um blog de receitas fitness para air fryer, micro-ondas e eletrodomésticos. Toda receita tem tabela nutricional completa.',
    url: 'https://fryerfit.com.br/sobre',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'FryerFit',
  url: 'https://fryerfit.com.br',
  logo: 'https://fryerfit.com.br/icon.png',
  description: 'Blog de receitas fitness para eletrodomésticos com tabela nutricional completa em cada receita.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contato@fryerfit.com.br',
    contactType: 'customer support',
    availableLanguage: 'Portuguese',
  },
}

export default function SobrePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <h1 className="text-3xl font-bold mb-6" style={{ color: 'var(--fg)' }}>Sobre o FryerFit</h1>

      <div className="prose" style={{ color: 'var(--fg)' }}>
        <p>
          O FryerFit nasceu de uma necessidade real: comer bem, controlar macros e não depender do fogão.
          Air fryer, micro-ondas, panela elétrica — esses aparelhos já estão na maioria das casas. O que faltava era um lugar com receitas testadas, com tabela nutricional de verdade em cada uma.
        </p>

        <h2>O que você encontra aqui</h2>
        <p>
          Toda receita do FryerFit tem tabela nutricional completa — calorias, proteínas, carboidratos e gorduras por porção. Nada estimado no olho: os valores são calculados com base nos ingredientes usados.
        </p>
        <p>
          Cada receita também traz dicas reais de preparo — variações de tempo por marca de aparelho, substituições de ingredientes e truques que só aparecem depois de testar várias vezes.
        </p>

        <h2>Aparelhos que usamos</h2>
        <ul>
          <li>Air Fryer (carro-chefe do FryerFit)</li>
          <li>Micro-ondas</li>
          <li>Panela de Pressão Elétrica</li>
          <li>Panela Elétrica de Arroz</li>
          <li>Grill / Sanduicheira Elétrica</li>
        </ul>

        <h2>Objetivos que atendemos</h2>
        <ul>
          <li><strong>Alta Proteína</strong> — receitas para quem está em fase de hipertrofia ou quer preservar massa magra</li>
          <li><strong>Low Carb</strong> — para quem controla a ingestão de carboidratos</li>
          <li><strong>Snacks Rápidos</strong> — lanches e petiscos prontos em menos de 15 minutos</li>
          <li><strong>Meal Prep</strong> — receitas que rendem bem e guardam bem na geladeira</li>
        </ul>

        <h2>Quem escreve</h2>
        <p>
          As receitas do FryerFit são criadas e testadas por <strong>Jacqueline da Silva Paes</strong>, Personal Trainer com foco em nutrição prática para o dia a dia. Cada receita passa por testes reais antes de entrar no site — tempo de preparo, textura, sabor e os valores nutricionais conferidos ingrediente a ingrediente.
        </p>

        <h2>Contato</h2>
        <p>
          Dúvidas, sugestões de receita ou feedback? Manda um e-mail para{' '}
          <a href="mailto:contato@fryerfit.com.br">contato@fryerfit.com.br</a>.
        </p>
      </div>
    </div>
  )
}
