import { getAllRecipes } from '@/lib/recipes'
import { RecipeCard } from '@/components/RecipeCard'
import { Logo } from '@/components/Logo'

const APARELHOS = [
  { slug: 'air-fryer',               label: 'Air Fryer' },
  { slug: 'micro-ondas',             label: 'Micro-ondas' },
  { slug: 'panela-pressao-eletrica', label: 'Panela de Pressão' },
  { slug: 'panela-arroz',            label: 'Panela de Arroz' },
  { slug: 'grill-sanduicheira',      label: 'Grill / Sanduicheira' },
]

const OBJETIVOS = [
  { slug: 'alta-proteina', label: 'Alta Proteína' },
  { slug: 'low-carb',      label: 'Low Carb' },
  { slug: 'snacks',        label: 'Snacks Rápidos' },
  { slug: 'meal-prep',     label: 'Meal Prep' },
]

export default function Home() {
  const recipes = getAllRecipes()

  return (
    <div className="max-w-5xl mx-auto px-4">

      {/* Hero */}
      <section className="py-16 flex flex-col items-center text-center gap-5">
        <Logo size={56} />
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight" style={{ color: 'var(--fg)' }}>
          Receitas fitness<br />
          <span style={{ color: 'var(--accent)' }}>sem fogão</span>
        </h1>
        <p className="text-lg max-w-xl leading-relaxed" style={{ color: 'var(--subtle)' }}>
          Air fryer, micro-ondas, panela elétrica. Toda receita com tabela nutricional completa — calorias, proteínas, carbs e gorduras.
        </p>
      </section>

      {/* Por aparelho */}
      <section className="py-8 border-t" style={{ borderColor: 'var(--divider)' }}>
        <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--subtle)' }}>
          Por aparelho
        </h2>
        <div className="flex flex-wrap gap-2">
          {APARELHOS.map((a) => (
            <a
              key={a.slug}
              href={`/aparelhos/${a.slug}`}
              className="px-4 py-2 rounded-full text-sm font-medium no-underline transition-opacity hover:opacity-70"
              style={{ background: 'var(--surface)', border: '1px solid var(--divider)', color: 'var(--fg)' }}
            >
              {a.label}
            </a>
          ))}
        </div>
      </section>

      {/* Por objetivo */}
      <section className="py-8 border-t" style={{ borderColor: 'var(--divider)' }}>
        <h2 className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--subtle)' }}>
          Por objetivo
        </h2>
        <div className="flex flex-wrap gap-2">
          {OBJETIVOS.map((o) => (
            <a
              key={o.slug}
              href={`/objetivos/${o.slug}`}
              className="px-4 py-2 rounded-full text-sm font-medium no-underline transition-opacity hover:opacity-70"
              style={{
                background: 'color-mix(in srgb, var(--accent) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                color: 'var(--accent)',
              }}
            >
              {o.label}
            </a>
          ))}
        </div>
      </section>

      {/* Receitas */}
      <section className="py-8 border-t pb-16" style={{ borderColor: 'var(--divider)' }}>
        <h2 className="text-sm font-semibold uppercase tracking-widest mb-6" style={{ color: 'var(--subtle)' }}>
          Receitas recentes
        </h2>
        {recipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recipes.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        ) : (
          <p className="text-sm" style={{ color: 'var(--subtle)' }}>Nenhuma receita ainda.</p>
        )}
      </section>

    </div>
  )
}
