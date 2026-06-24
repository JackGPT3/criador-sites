import Link from 'next/link'
import { getAllRecipesWithImages } from '@/lib/recipes'
import { APARELHOS, OBJETIVOS } from '@/lib/categories'
import { RecipeCard } from '@/components/RecipeCard'
import { Logo } from '@/components/Logo'

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'FryerFit',
  url: 'https://fryerfit.com.br',
  description: 'Receitas fitness sem fogão. Air fryer, micro-ondas e panelas elétricas com tabela nutricional completa.',
  inLanguage: 'pt-BR',
}

export default async function Home() {
  const recipes = await getAllRecipesWithImages()

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #0F1410 0%, #1C2B1E 50%, #2D4A32 100%)' }}
        />
        {/* Padrão decorativo */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, #3A7D44 0%, transparent 50%),
                              radial-gradient(circle at 75% 20%, #5C9E67 0%, transparent 40%)`,
          }}
        />
        <div className="relative px-4 py-16 sm:py-24 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <Logo size={52} />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Receitas fitness{' '}
            <span style={{ color: '#5C9E67' }}>sem fogão</span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Air fryer, micro-ondas e panelas elétricas. Toda receita com tabela nutricional completa — calorias, proteínas, carbs e gorduras.
          </p>
          <Link
            href="#receitas"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-80"
            style={{ background: '#3A7D44' }}
          >
            Ver receitas
          </Link>
        </div>
      </section>

      {/* Conteúdo */}
      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Aparelhos */}
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--subtle)' }}>
            Por aparelho
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Object.entries(APARELHOS).map(([slug, cat]) => (
              <Link
                key={slug}
                href={`/aparelhos/${slug}`}
                className="rounded-xl p-4 text-center border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 no-underline"
                style={{ background: 'var(--surface)', borderColor: 'var(--divider)' }}
              >
                <span className="text-3xl block mb-2">{cat.emoji}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--fg)' }}>{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Objetivos */}
        <section className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--subtle)' }}>
            Por objetivo
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(OBJETIVOS).map(([slug, obj]) => (
              <Link
                key={slug}
                href={`/objetivos/${slug}`}
                className="rounded-xl p-4 border transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 no-underline"
                style={{
                  background: 'color-mix(in srgb, var(--accent) 6%, var(--surface))',
                  borderColor: 'color-mix(in srgb, var(--accent) 20%, transparent)',
                }}
              >
                <span className="text-2xl block mb-1.5">{obj.emoji}</span>
                <span className="text-sm font-semibold block mb-0.5" style={{ color: 'var(--fg)' }}>
                  {obj.label}
                </span>
                <span className="text-xs leading-snug" style={{ color: 'var(--subtle)' }}>
                  {obj.descricao}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Receitas */}
        <section id="receitas">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-6" style={{ color: 'var(--subtle)' }}>
            Receitas recentes
          </h2>
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">🍳</p>
              <p className="text-base font-medium mb-1" style={{ color: 'var(--fg)' }}>Nenhuma receita ainda</p>
              <p className="text-sm" style={{ color: 'var(--subtle)' }}>
                Adicione arquivos .mdx em <code>content/receitas/</code>
              </p>
            </div>
          )}
        </section>

      </div>
    </div>
  )
}
