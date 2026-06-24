import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
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
    openGraph: { title: recipe.meta.titulo, description: recipe.meta.descricao },
  }
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

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header da receita */}
        <div className="mb-8">
          <div className="flex gap-2 mb-3 flex-wrap">
            <span
              className="text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded"
              style={{ background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
            >
              {meta.aparelho}
            </span>
            <span
              className="text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded"
              style={{ background: 'var(--divider)', color: 'var(--subtle)' }}
            >
              {meta.objetivo}
            </span>
            <span
              className="text-xs font-medium uppercase tracking-wider px-2.5 py-1 rounded"
              style={{ background: 'var(--divider)', color: 'var(--subtle)' }}
            >
              {meta.tempoPreparo}
            </span>
          </div>

          <h1 className="text-3xl font-bold leading-tight mb-3" style={{ color: 'var(--fg)' }}>
            {meta.titulo}
          </h1>
          <p className="text-base leading-relaxed" style={{ color: 'var(--subtle)' }}>
            {meta.descricao}
          </p>
        </div>

        {/* Tabela de macros */}
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
        <article className="prose" style={{ color: 'var(--fg)' }}>
          <MDXRemote source={content} />
        </article>
      </div>
    </>
  )
}
