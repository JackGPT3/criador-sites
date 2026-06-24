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

const META: Record<string, { title: string; description: string; keywords: string[] }> = {
  'alta-proteina': {
    title: 'Receitas Alta Proteína para Eletrodomésticos',
    description: 'Receitas fitness de alta proteína feitas em air fryer, micro-ondas e panela elétrica. Ideais para hipertrofia e manutenção de massa magra. Tabela nutricional completa em cada receita.',
    keywords: ['receitas alta proteína', 'receitas hipertrofia', 'receitas proteicas fitness', 'air fryer alta proteína', 'receitas musculação'],
  },
  'low-carb': {
    title: 'Receitas Low Carb para Eletrodomésticos',
    description: 'Receitas low carb e cetogênicas feitas em air fryer, grill e panela de pressão elétrica. Poucas calorias, poucos carboidratos, sabor de verdade. Macros completos por porção.',
    keywords: ['receitas low carb', 'receitas keto fitness', 'low carb eletrodomésticos', 'receitas sem carboidrato', 'dieta low carb receitas'],
  },
  'snacks': {
    title: 'Snacks Fitness Rápidos para Eletrodomésticos',
    description: 'Snacks e lanches fitness prontos em menos de 15 minutos no micro-ondas, air fryer e grill elétrico. Tabela nutricional completa para cada lanche.',
    keywords: ['snacks fitness', 'lanches saudáveis', 'snacks air fryer', 'lanche proteico rápido', 'snack fitness receitas'],
  },
  'meal-prep': {
    title: 'Receitas de Meal Prep para Eletrodomésticos',
    description: 'Receitas de meal prep feitas em air fryer, panela de pressão elétrica e panela de arroz. Cozinhe uma vez, coma a semana toda. Porções calculadas com tabela nutricional.',
    keywords: ['meal prep receitas', 'marmita fitness', 'meal prep eletrodomésticos', 'marmita saudável', 'meal prep panela elétrica'],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const nome = OBJETIVOS[slug]
  if (!nome) return {}
  const m = META[slug] ?? {
    title: `Receitas ${nome}`,
    description: `Receitas fitness ${nome} para eletrodomésticos com tabela nutricional completa — calorias, proteínas, carboidratos e gorduras por porção.`,
    keywords: [`receitas ${nome.toLowerCase()}`, 'receitas fitness', 'tabela nutricional'],
  }
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://fryerfit.com.br/objetivos/${slug}`,
    },
    alternates: { canonical: `https://fryerfit.com.br/objetivos/${slug}` },
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
