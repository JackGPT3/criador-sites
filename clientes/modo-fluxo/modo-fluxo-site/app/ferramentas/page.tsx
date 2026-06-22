import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllTools, getFeaturedTools, TOOL_CATEGORIES } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'
import AdBanner from '@/components/AdBanner'

export const metadata: Metadata = {
  title: 'Diretório de Ferramentas de IA e Automação — Modo Fluxo',
  description: 'Reviews completos, preços e comparativos das melhores ferramentas de IA, automação e produtividade para o seu negócio.',
}

const directorySchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Diretório de Ferramentas de IA e Automação',
  description: 'Reviews completos e comparativos das melhores ferramentas de IA, automação e produtividade.',
  url: 'https://modofluxo.com.br/ferramentas',
  inLanguage: 'pt-BR',
  publisher: {
    '@type': 'Organization',
    name: 'Modo Fluxo',
    url: 'https://modofluxo.com.br',
  },
}

export default function FerramentasPage() {
  const featured = getFeaturedTools()
  const allTools = getAllTools()

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E3A6E] to-[#159BA8]" />
        <img
          src="/hero-pattern.svg"
          alt=""
          aria-hidden="true"
          fetchPriority="low"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none opacity-60"
        />
        <div className="relative px-4 py-14 sm:py-20 text-center max-w-3xl mx-auto">
          <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-3">Diretório</p>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ferramentas de IA e Automação
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Reviews completos, preços reais e análises honestas das melhores ferramentas para o seu negócio.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Categorias */}
        <section className="mb-10">
          <h2
            className="text-lg font-bold text-[#131924] mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Explorar por categoria
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Object.entries(TOOL_CATEGORIES).map(([slug, cat]) => {
              const count = allTools.filter((t) => t.category === slug).length
              return (
                <Link
                  key={slug}
                  href={`/ferramentas/${slug}`}
                  className="bg-white rounded-xl p-4 text-center shadow-sm border border-[#DDE3EB] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="text-2xl block mb-1.5">{cat.emoji}</span>
                  <span className="text-sm font-medium text-[#131924] block">{cat.label}</span>
                  {count > 0 && (
                    <span className="text-xs text-[#667085] mt-1 block">{count} {count === 1 ? 'ferramenta' : 'ferramentas'}</span>
                  )}
                </Link>
              )
            })}
          </div>
        </section>

        {/* Destaques */}
        {featured.length > 0 && (
          <section className="mb-10">
            <h2
              className="text-lg font-bold text-[#131924] mb-5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Ferramentas em destaque
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featured.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} featured />
              ))}
            </div>
          </section>
        )}

        <AdBanner format="horizontal" slot="1234567890" className="mb-10" />

        {/* Todas as ferramentas por categoria */}
        {Object.entries(TOOL_CATEGORIES).map(([catSlug, cat]) => {
          const tools = allTools.filter((t) => t.category === catSlug)
          if (tools.length === 0) return null
          return (
            <section key={catSlug} className="mb-10">
              <div className="flex items-center justify-between mb-5">
                <h2
                  className="text-lg font-bold text-[#131924] flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </h2>
                <Link
                  href={`/ferramentas/${catSlug}`}
                  className="text-sm text-[#0E3A6E] hover:underline font-medium"
                >
                  Ver todas →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
