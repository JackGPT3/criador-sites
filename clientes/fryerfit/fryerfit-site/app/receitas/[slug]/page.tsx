import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getRecipeBySlugWithImage, getAllSlugs } from '@/lib/recipes'
import { MacroTable } from '@/components/MacroTable'
import { AdBanner } from '@/components/AdBanner'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const recipe = await getRecipeBySlugWithImage(slug)
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
  const recipe = await getRecipeBySlugWithImage(slug)
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
      <div className="w-full relative" style={{ height: '360px' }}>
        {meta.imagem ? (
          <Image
            src={meta.imagem}
            alt={meta.titulo}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #1C2B1E 0%, #3A7D44 60%, #5C9E67 100%)' }}
          />
        )}
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(15,20,16,0.85) 0%, rgba(15,20,16,0.2) 60%, transparent 100%)' }}
        />
        {/* Título sobre hero */}
        <div className="absolute bottom-0 left-0 right-0 max-w-3xl mx-auto px-4 pb-8">
          <div className="flex gap-2 mb-3 flex-wrap">
            <span
              className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ background: 'rgba(90,180,100,0.25)', color: '#A8E0B0', backdropFilter: 'blur(4px)' }}
            >
              {meta.aparelho}
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(4px)' }}
            >
              {meta.objetivo}
            </span>
            {meta.dificuldade && (
              <span
                className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
                style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.75)', backdropFilter: 'blur(4px)' }}
              >
                {meta.dificuldade}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-white drop-shadow-sm">
            {meta.titulo}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Descrição */}
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

        {/* Anúncio após tabela nutricional */}
        <AdBanner slot="1111111111" format="auto" className="my-2" />

        {/* Conteúdo MDX */}
        <article className="recipe-content mt-8">
          <MDXRemote source={content} options={mdxOptions} />
        </article>

        {/* Anúncio ao final da receita */}
        <AdBanner slot="2222222222" format="auto" className="mt-8" />

      </div>
    </>
  )
}
