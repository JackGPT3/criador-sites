import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getToolBySlug, getToolsByCategory, TOOL_CATEGORIES, formatToolDate } from '@/lib/tools'
import { getAllPosts } from '@/lib/posts'
import ToolCard from '@/components/ToolCard'
import PostCard from '@/components/PostCard'
import AdBanner from '@/components/AdBanner'
import Newsletter from '@/components/Newsletter'

export async function generateStaticParams() {
  const { getAllTools } = await import('@/lib/tools')
  return getAllTools().map((t) => ({ categoria: t.category, slug: t.slug }))
}

type ToolParams = { params: Promise<{ categoria: string; slug: string }> }

export async function generateMetadata({ params }: ToolParams): Promise<Metadata> {
  const { categoria, slug } = await params
  const tool = getToolBySlug(categoria, slug)
  if (!tool) return { title: 'Ferramenta não encontrada' }

  return {
    title: `${tool.name}: Review Completo, Preços e Alternativas [2026] — Modo Fluxo`,
    description: tool.tagline,
    openGraph: {
      title: `${tool.name}: Review Completo [2026]`,
      description: tool.tagline,
      type: 'article',
    },
  }
}

export default async function ToolPage({ params }: ToolParams) {
  const { categoria, slug } = await params
  const tool = getToolBySlug(categoria, slug)
  if (!tool) notFound()

  const cat = TOOL_CATEGORIES[tool.category]
  const related = getToolsByCategory(categoria).filter((t) => t.slug !== slug).slice(0, 3)

  const allPosts = getAllPosts()
  const relatedPosts = tool.relatedPosts?.length
    ? allPosts.filter((p) => tool.relatedPosts!.includes(p.slug)).slice(0, 3)
    : allPosts.filter((p) => p.frontmatter.category === 'ferramentas' || p.frontmatter.category === 'automacao').slice(0, 3)

  const toolSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.tagline,
    applicationCategory: cat?.label ?? 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'pt-BR',
    url: tool.websiteUrl,
    offers: tool.pricing.hasFree
      ? {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'BRL',
          description: tool.pricing.freeTier ?? 'Plano gratuito disponível',
        }
      : {
          '@type': 'Offer',
          description: tool.pricing.startingPrice ?? 'Plano pago',
        },
    publisher: {
      '@type': 'Organization',
      name: 'Modo Fluxo',
      url: 'https://modofluxo.com.br',
    },
  }

  const ctaUrl = tool.affiliateUrl || tool.websiteUrl

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#667085] mb-8 flex-wrap">
          <Link href="/" className="hover:text-[#131924] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/ferramentas" className="hover:text-[#131924] transition-colors">Ferramentas</Link>
          <span>/</span>
          {cat && (
            <>
              <Link href={`/ferramentas/${tool.category}`} className="hover:text-[#131924] transition-colors">
                {cat.label}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#131924]">{tool.name}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            {cat && (
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cat.color}`}>
                {cat.emoji} {cat.label}
              </span>
            )}
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              tool.pricing.hasFree ? 'text-green-700 bg-green-50' : 'text-slate-600 bg-slate-100'
            }`}>
              {tool.pricing.hasFree ? 'Tem plano grátis' : 'Pago'}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-4xl font-bold text-[#131924] mb-3 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {tool.name}: Review Completo
          </h1>
          <p className="text-[#667085] text-lg leading-relaxed mb-6">
            {tool.tagline}
          </p>

          {/* CTA principal */}
          <div className="flex items-center gap-3 flex-wrap">
            <a
              href={ctaUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, #0E3A6E, #159BA8)', fontFamily: 'var(--font-heading)' }}
            >
              Acessar {tool.name} →
              {tool.affiliateUrl && (
                <span className="text-white/60 text-xs font-normal">(link afiliado)</span>
              )}
            </a>
            {tool.pricing.startingPrice && (
              <span className="text-sm text-[#667085]">{tool.pricing.startingPrice}</span>
            )}
          </div>

          {tool.pricing.hasFree && tool.pricing.freeTier && (
            <p className="text-sm text-green-700 mt-2">
              Plano gratuito: {tool.pricing.freeTier}
            </p>
          )}
        </header>

        {/* Descrição */}
        <section className="mb-8">
          <p className="text-[#131924] leading-relaxed text-base">
            {tool.description}
          </p>
        </section>

        {/* Prós e Contras */}
        <section className="mb-8">
          <h2
            className="text-xl font-bold text-[#131924] mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Prós e Contras
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-green-800 uppercase tracking-wider mb-3">Pontos positivos</h3>
              <ul className="space-y-2">
                {tool.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-900">
                    <span className="shrink-0 mt-0.5 text-green-600">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-100 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-red-800 uppercase tracking-wider mb-3">Pontos negativos</h3>
              <ul className="space-y-2">
                {tool.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-900">
                    <span className="shrink-0 mt-0.5 text-red-500">✗</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Casos de uso */}
        <section className="mb-8">
          <h2
            className="text-xl font-bold text-[#131924] mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Casos de uso
          </h2>
          <ul className="space-y-3">
            {tool.useCases.map((uc, i) => (
              <li key={i} className="flex items-start gap-3 p-4 bg-white border border-[#DDE3EB] rounded-xl text-sm text-[#131924]">
                <span className="shrink-0 w-6 h-6 rounded-full bg-[#F0F3F6] flex items-center justify-center text-xs font-bold text-[#667085]">
                  {i + 1}
                </span>
                <span>{uc}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Para quem é */}
        <section className="mb-8">
          <h2
            className="text-xl font-bold text-[#131924] mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Para quem é (e para quem não é)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 bg-[#F0F3F6] rounded-xl">
              <p className="text-xs font-semibold text-[#667085] uppercase tracking-wider mb-2">Recomendado para</p>
              <p className="text-sm text-[#131924] leading-relaxed">{tool.whoFor}</p>
            </div>
            <div className="p-5 bg-[#FFF8F0] rounded-xl border border-orange-100">
              <p className="text-xs font-semibold text-orange-600 uppercase tracking-wider mb-2">Não recomendado para</p>
              <p className="text-sm text-[#131924] leading-relaxed">{tool.whoNotFor}</p>
            </div>
          </div>
        </section>

        {/* Preços */}
        <section className="mb-8 p-5 bg-white border border-[#DDE3EB] rounded-xl">
          <h2
            className="text-base font-bold text-[#131924] mb-3"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Preços
          </h2>
          <div className="space-y-2 text-sm text-[#667085]">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                tool.pricing.hasFree ? 'text-green-700 bg-green-50' : 'text-slate-600 bg-slate-100'
              }`}>
                {tool.pricing.hasFree ? 'Freemium' : 'Pago'}
              </span>
              {tool.pricing.model === 'freemium' && <span>Tem plano gratuito</span>}
              {tool.pricing.model === 'subscription' && <span>Assinatura mensal</span>}
              {tool.pricing.model === 'usage-based' && <span>Cobrança por uso</span>}
              {tool.pricing.model === 'one-time' && <span>Pagamento único</span>}
            </div>
            {tool.pricing.freeTier && (
              <p>Grátis: {tool.pricing.freeTier}</p>
            )}
            {tool.pricing.startingPrice && (
              <p>Plano pago: {tool.pricing.startingPrice}</p>
            )}
          </div>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 text-white text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(135deg, #0E3A6E, #159BA8)', fontFamily: 'var(--font-heading)' }}
          >
            Ver preços no site oficial →
          </a>
        </section>

        {/* Newsletter */}
        <div className="mb-8">
          <Newsletter compact />
        </div>

        <AdBanner format="rectangle" slot="0987654321" className="mb-8" />

        {/* Tags */}
        {tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8 pt-6 border-t border-[#DDE3EB]">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#667085] bg-[#F0F3F6] border border-[#DDE3EB] px-3 py-1.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Atualizado em */}
        <p className="text-xs text-[#667085] mb-10">
          Atualizado em {formatToolDate(tool.lastUpdated)}
        </p>
      </div>

      {/* Ferramentas similares */}
      {related.length > 0 && (
        <section className="mt-4 border-t border-[#DDE3EB] pt-10 max-w-3xl mx-auto">
          <h2
            className="text-lg font-bold text-[#131924] mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ferramentas similares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} />
            ))}
          </div>
        </section>
      )}

      {/* Posts do blog relacionados */}
      {relatedPosts.length > 0 && (
        <section className="mt-10 border-t border-[#DDE3EB] pt-10 max-w-3xl mx-auto">
          <h2
            className="text-lg font-bold text-[#131924] mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Artigos relacionados
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedPosts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
