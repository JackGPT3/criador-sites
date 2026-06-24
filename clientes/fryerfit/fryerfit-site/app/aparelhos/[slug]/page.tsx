import { getAllRecipesWithImages } from '@/lib/recipes'
import { RecipeCard } from '@/components/RecipeCard'
import { AdBanner } from '@/components/AdBanner'
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

const META: Record<string, { title: string; description: string; keywords: string[] }> = {
  'air-fryer': {
    title: 'Receitas para Air Fryer',
    description: 'Receitas fitness feitas na air fryer com tabela nutricional completa. Frango, peixe, vegetais e snacks crocantes sem óleo. Calorias, proteínas e macros em cada receita.',
    keywords: ['receitas air fryer', 'air fryer fitness', 'receitas air fryer saudáveis', 'air fryer sem óleo', 'receitas air fryer com tabela nutricional'],
  },
  'micro-ondas': {
    title: 'Receitas fitness para Micro-ondas',
    description: 'Receitas fitness rápidas feitas no micro-ondas com tabela nutricional. Omelete proteico, mug cake, batata doce e mais — prontas em menos de 10 minutos.',
    keywords: ['receitas micro-ondas fitness', 'micro-ondas receitas saudáveis', 'receitas rápidas fitness', 'micro-ondas tabela nutricional'],
  },
  'panela-pressao-eletrica': {
    title: 'Receitas para Panela de Pressão Elétrica',
    description: 'Receitas fitness na panela de pressão elétrica — frango desfiado, feijão, carne e meal prep em menos de 40 minutos. Com tabela nutricional completa em cada receita.',
    keywords: ['receitas panela de pressão elétrica', 'panela elétrica fitness', 'meal prep panela de pressão', 'frango panela de pressão elétrica'],
  },
  'panela-arroz': {
    title: 'Receitas para Panela Elétrica de Arroz',
    description: 'Receitas fitness feitas na panela elétrica de arroz. Arroz com legumes, mingau proteico e meal prep fácil. Tabela nutricional completa por porção.',
    keywords: ['receitas panela elétrica arroz', 'panela de arroz fitness', 'arroz fitness nutricional', 'mingau proteico panela elétrica'],
  },
  'grill-sanduicheira': {
    title: 'Receitas para Grill e Sanduicheira Elétrica',
    description: 'Receitas fitness no grill e sanduicheira elétrica — wraps, sanduíches proteicos, legumes grelhados e tapioca. Com tabela nutricional completa.',
    keywords: ['receitas grill elétrico', 'sanduicheira fitness', 'wrap proteico grill', 'receitas grill saudáveis'],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const nome = APARELHOS[slug]
  if (!nome) return {}
  const m = META[slug] ?? {
    title: `Receitas para ${nome}`,
    description: `Receitas fitness feitas no ${nome} com tabela nutricional completa — calorias, proteínas, carboidratos e gorduras por porção.`,
    keywords: [`receitas ${nome.toLowerCase()}`, 'receitas fitness', 'tabela nutricional'],
  }
  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    openGraph: {
      title: m.title,
      description: m.description,
      url: `https://fryerfit.com.br/aparelhos/${slug}`,
    },
    alternates: { canonical: `https://fryerfit.com.br/aparelhos/${slug}` },
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

      <AdBanner slot="4444444444" format="auto" className="mb-8" />

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
