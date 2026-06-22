import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getToolsByCategory, getAllTools, TOOL_CATEGORIES } from '@/lib/tools'
import ToolCard from '@/components/ToolCard'
import AdBanner from '@/components/AdBanner'

export function generateStaticParams() {
  return Object.keys(TOOL_CATEGORIES).map((categoria) => ({ categoria }))
}

type CategoriaParams = { params: Promise<{ categoria: string }> }

export async function generateMetadata({ params }: CategoriaParams): Promise<Metadata> {
  const { categoria } = await params
  const cat = TOOL_CATEGORIES[categoria]
  if (!cat) return { title: 'Categoria não encontrada' }

  return {
    title: `Melhores Ferramentas de ${cat.label} com IA em 2026 — Modo Fluxo`,
    description: `${cat.description}. Reviews completos, preços e comparativos das melhores opções do mercado.`,
  }
}

export default async function CategoriaFerramentasPage({ params }: CategoriaParams) {
  const { categoria } = await params
  const cat = TOOL_CATEGORIES[categoria]
  if (!cat) notFound()

  const tools = getToolsByCategory(categoria)
  const allTools = getAllTools()
  const featured = tools.filter((t) => t.featured)
  const rest = tools.filter((t) => !t.featured)

  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Melhores Ferramentas de ${cat.label} com IA`,
    description: cat.description,
    url: `https://modofluxo.com.br/ferramentas/${categoria}`,
    inLanguage: 'pt-BR',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categorySchema) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#667085] mb-8">
        <Link href="/" className="hover:text-[#131924] transition-colors">Home</Link>
        <span>/</span>
        <Link href="/ferramentas" className="hover:text-[#131924] transition-colors">Ferramentas</Link>
        <span>/</span>
        <span className="text-[#131924]">{cat.label}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full mb-4 ${cat.color}`}>
          <span>{cat.emoji}</span>
          <span>{cat.label}</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold text-[#131924] mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Melhores Ferramentas de {cat.label} com IA
        </h1>
        <p className="text-[#667085] max-w-2xl">
          {cat.description}. Reviews com preços reais, prós e contras e análise de para quem cada ferramenta serve.
        </p>
        <p className="text-sm text-[#667085] mt-2">
          {tools.length} {tools.length === 1 ? 'ferramenta avaliada' : 'ferramentas avaliadas'}
        </p>
      </header>

      {tools.length > 0 ? (
        <>
          {featured.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-base font-semibold text-[#667085] uppercase tracking-wider mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Destaques
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {featured.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} featured />
                ))}
              </div>
            </section>
          )}

          {rest.length > 0 && (
            <>
              <AdBanner format="horizontal" slot="1111111111" className="mb-8" />
              <section>
                <h2
                  className="text-base font-semibold text-[#667085] uppercase tracking-wider mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Todas as opções
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {rest.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              </section>
            </>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">{cat.emoji}</p>
          <p className="text-lg font-medium text-[#131924] mb-2">Nenhuma ferramenta ainda</p>
          <p className="text-sm text-[#667085]">Em breve teremos análises de ferramentas de {cat.label.toLowerCase()}</p>
          <Link
            href="/ferramentas"
            className="inline-block mt-6 px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #0E3A6E, #159BA8)', fontFamily: 'var(--font-heading)' }}
          >
            Ver todas as categorias
          </Link>
        </div>
      )}

      {/* Outras categorias */}
      <section className="mt-14 pt-10 border-t border-[#DDE3EB]">
        <h2
          className="text-sm font-semibold text-[#667085] mb-4 uppercase tracking-wider"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Outras categorias
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(TOOL_CATEGORIES)
            .filter(([s]) => s !== categoria)
            .map(([s, c]) => {
              const count = allTools.filter((t) => t.category === s).length
              return (
                <Link
                  key={s}
                  href={`/ferramentas/${s}`}
                  className={`text-sm font-medium px-4 py-2 rounded-full border border-[#DDE3EB] ${c.color} hover:shadow-sm transition-all`}
                >
                  {c.emoji} {c.label} {count > 0 && <span className="opacity-60">({count})</span>}
                </Link>
              )
            })}
        </div>
      </section>
    </div>
  )
}
