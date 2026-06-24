import { getAllRecipesWithImages } from '@/lib/recipes'
import { RecipeCard } from '@/components/RecipeCard'
import { AdBanner } from '@/components/AdBanner'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const OBJETIVOS: Record<string, string> = {
  'alta-proteina': 'Alta Proteína (Hipertrofia)',
  'low-carb':      'Low Carb',
  'snacks':        'Snacks Rápidos',
  'meal-prep':     'Marmitas da Semana (Meal Prep)',
}

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.keys(OBJETIVOS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const nome = OBJETIVOS[slug]
  if (!nome) return {}
  return {
    title: `Receitas ${nome}`,
    description: `Receitas fitness ${nome} para eletrodomésticos. Tabela nutricional em cada receita.`,
  }
}

export default async function ObjetivosPage({ params }: Props) {
  const { slug } = await params
  const nome = OBJETIVOS[slug]
  if (!nome) notFound()

  const all = await getAllRecipesWithImages()
  const recipes = all.filter(
    (r) => r.objetivo.toLowerCase().includes(slug.split('-')[0])
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
          Objetivo
        </p>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--fg)' }}>{nome}</h1>
        <p className="mt-2 text-base" style={{ color: 'var(--subtle)' }}>
          Receitas com foco em {nome.toLowerCase()}, com tabela nutricional completa por porção.
        </p>
      </div>

      <AdBanner slot="5555555555" format="auto" className="mb-8" />

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((r) => <RecipeCard key={r.slug} recipe={r} />)}
        </div>
      ) : (
        <p style={{ color: 'var(--subtle)' }}>Receitas em breve para este objetivo.</p>
      )}
    </div>
  )
}
