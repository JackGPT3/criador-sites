import Link from 'next/link'
import Image from 'next/image'
import { getAllRecipesWithImages } from '@/lib/recipes'
import { APARELHOS, OBJETIVOS } from '@/lib/categories'
import { getImage } from '@/lib/images'
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

async function getCategoryImages() {
  const aparelhoImages: Record<string, string | null> = {}
  await Promise.all(
    Object.entries(APARELHOS).map(async ([slug, cat]) => {
      aparelhoImages[slug] = await getImage(`aparelho-${slug}`, cat.imageQuery)
    })
  )
  return aparelhoImages
}

export default async function Home() {
  const [recipes, aparelhoImages] = await Promise.all([
    getAllRecipesWithImages(),
    getCategoryImages(),
  ])

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
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 50%, #3A7D44 0%, transparent 50%),
                              radial-gradient(circle at 75% 20%, #5C9E67 0%, transparent 40%)`,
          }}
        />
        <div className="relative px-4 py-14 sm:py-20 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-5">
            <Logo size={48} />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            Receitas fitness{' '}
            <span style={{ color: '#5C9E67' }}>sem fogão</span>
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Air fryer, micro-ondas e panelas elétricas. Toda receita com tabela nutricional completa.
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

      <div className="max-w-5xl mx-auto px-4 py-10">

        {/* Aparelhos — cards compactos */}
        <section className="mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--subtle)' }}>
            Por aparelho
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Object.entries(APARELHOS).map(([slug, cat]) => {
              const img = aparelhoImages[slug]
              return (
                <Link
                  key={slug}
                  href={`/aparelhos/${slug}`}
                  className="group relative rounded-xl overflow-hidden no-underline block"
                  style={{ height: '90px' }}
                >
                  {img ? (
                    <Image
                      src={img}
                      alt={cat.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(min-width: 768px) 20vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0" style={{ background: cat.gradient }} />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(15,20,16,0.82) 0%, rgba(15,20,16,0.2) 60%, transparent 100%)' }}
                  />
                  <span className="absolute bottom-0 left-0 right-0 px-3 pb-2.5 text-xs font-semibold text-white leading-tight">
                    {cat.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Receitas com filtro por objetivo */}
        <section id="receitas">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--subtle)' }}>
              Receitas recentes
            </h2>
            {/* Chips de objetivo */}
            <div className="flex flex-wrap gap-2">
              {Object.entries(OBJETIVOS).map(([slug, obj]) => (
                <Link
                  key={slug}
                  href={`/objetivos/${slug}`}
                  className="text-xs font-medium px-3 py-1.5 rounded-full no-underline transition-all hover:opacity-80"
                  style={{
                    background: 'color-mix(in srgb, var(--accent) 10%, var(--surface))',
                    border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                    color: 'var(--accent)',
                  }}
                >
                  {obj.label}
                </Link>
              ))}
            </div>
          </div>

          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recipes.map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
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
