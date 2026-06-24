import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getRecipeBySlug, getAllSlugs } from '@/lib/recipes'
import { MacroTable } from '@/components/MacroTable'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const recipe = getRecipeBySlug(slug)
  if (!recipe) return {}
  return {
    title: recipe.meta.titulo,
    description: recipe.meta.descricao,
    openGraph: {
      title: recipe.meta.titulo,
      description: recipe.meta.descricao,
      images: recipe.meta.imagem ? [recipe.meta.imagem] : [],
    },
  }
}

const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
}

export default async function RecipePage({ params }: Props) {
  const { slug } = await params
  const recipe = getRecipeBySlug(slug)
  if (!recipe) notFound()

  const { meta, content } = recipe

  const recipeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: meta.titulo,
    description: meta.descricao,
    recipeCategory: meta.objetivo,
    cookingMethod: meta.aparelho,
    totalTime: `PT${meta.tempoPreparo.replace(' min', 'M')}`,
    ...(meta.imagem && { image: meta.imagem }),
    nutrition: {
      '@type': 'NutritionInformation',
      calories: `${meta.calorias} calories`,
      proteinContent: `${meta.proteina} g`,
      carbohydrateContent: `${meta.carbs} g`,
      fatContent: `${meta.gordura} g`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recipeSchema) }}
      />

      {/* Hero */}
      <div
        className="w-full"
        style={{
          height: '320px',
          background: meta.imagem
            ? `url(${meta.imagem}) center/cover no-repeat`
            : 'linear-gradient(135deg, #1C2B1E 0%, #3A7D44 60%, #5C9E67 100%)',
          position: 'relative',
        }}
      >
        {!meta.imagem && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: 'rgba(15,20,16,0.45)' }}
          >
            <svg width="52" height="52" viewBox="0 0 90 90" fill="none" aria-hidden="true">
              <path d="M18 62 Q45 72 72 62" stroke="white" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.7"/>
              <line x1="18" y1="62" x2="72" y2="62" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
              <path d="M 51 44 L 40 22 L 48 22 L 36 4 L 56 26 L 47 26 Z" fill="#5C9E67"/>
            </svg>
            <p className="text-sm font-medium uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Foto em breve
            </p>
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Tags */}
        <div className="flex gap-2 mb-5 flex-wrap">
          <span
            className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
            style={{ background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
          >
            {meta.aparelho}
          </span>
          <span
            className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
            style={{ background: 'var(--divider)', color: 'var(--subtle)' }}
          >
            {meta.objetivo}
          </span>
          {meta.dificuldade && (
            <span
              className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ background: 'var(--divider)', color: 'var(--subtle)' }}
            >
              {meta.dificuldade}
            </span>
          )}
        </div>

        {/* Título */}
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight mb-3" style={{ color: 'var(--fg)' }}>
          {meta.titulo}
        </h1>
        <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--subtle)' }}>
          {meta.descricao}
        </p>

        {/* Info row */}
        <div
          className="flex flex-wrap gap-6 py-4 border-y mb-8"
          style={{ borderColor: 'var(--divider)' }}
        >
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--subtle)' }}>Tempo</span>
            <span className="text-base font-semibold" style={{ color: 'var(--fg)' }}>{meta.tempoPreparo}</span>
          </div>
          {meta.porcoes && (
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--subtle)' }}>Porções</span>
              <span className="text-base font-semibold" style={{ color: 'var(--fg)' }}>{meta.porcoes}</span>
            </div>
          )}
          {meta.dificuldade && (
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wider mb-0.5" style={{ color: 'var(--subtle)' }}>Dificuldade</span>
              <span className="text-base font-semibold" style={{ color: 'var(--fg)' }}>{meta.dificuldade}</span>
            </div>
          )}
        </div>

        {/* Tabela nutricional */}
        <MacroTable
          macros={{
            calorias: meta.calorias,
            proteina: meta.proteina,
            carbs: meta.carbs,
            gordura: meta.gordura,
            porcao: meta.porcao,
          }}
        />

        {/* Conteúdo MDX */}
        <article className="recipe-content">
          <MDXRemote source={content} options={mdxOptions} />
        </article>

      </div>
    </>
  )
}
