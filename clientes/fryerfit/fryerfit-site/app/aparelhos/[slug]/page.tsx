import { getAllRecipesWithImages } from '@/lib/recipes'
import { RecipeCard } from '@/components/RecipeCard'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

const APARELHOS: Record<string, string> = {
  'air-fryer':               'Air Fryer',
  'micro-ondas':             'Micro-ondas',
  'panela-pressao-eletrica': 'Panela de Pressão Elétrica',
  'panela-arroz':            'Panela Elétrica de Arroz',
  'grill-sanduicheira':      'Grill / Sanduicheira Elétrica',
}

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return Object.keys(APARELHOS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const nome = APARELHOS[slug]
  if (!nome) return {}
  return {
    title: `Receitas para ${nome}`,
    description: `Receitas fitness feitas no ${nome}. Tabela nutricional em cada receita.`,
  }
}

export default async function AparelhosPage({ params }: Props) {
  const { slug } = await params
  const nome = APARELHOS[slug]
  if (!nome) notFound()

  const all = await getAllRecipesWithImages()
  const recipes = all.filter(
    (r) => r.aparelho.toLowerCase().includes(slug.replace(/-/g, ' ').split(' ')[0])
  )

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: 'var(--subtle)' }}>
          Aparelho
        </p>
        <h1 className="text-3xl font-bold" style={{ color: 'var(--fg)' }}>{nome}</h1>
        <p className="mt-2 text-base" style={{ color: 'var(--subtle)' }}>
          Receitas fitness feitas no {nome}, com tabela nutricional completa.
        </p>
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((r) => <RecipeCard key={r.slug} recipe={r} />)}
        </div>
      ) : (
        <p style={{ color: 'var(--subtle)' }}>Receitas em breve para este aparelho.</p>
      )}
    </div>
  )
}
