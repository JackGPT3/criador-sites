import Link from 'next/link'

export type RecipeMeta = {
  slug: string
  titulo: string
  aparelho: string
  objetivo: string
  tempoPreparo: string
  calorias: number
  proteina: number
  carbs: number
  gordura: number
  porcao?: string
  descricao: string
  imagem?: string
  dificuldade?: string
  porcoes?: number
}

export function RecipeCard({ recipe }: { recipe: RecipeMeta }) {
  return (
    <Link
      href={`/receitas/${recipe.slug}`}
      className="group block rounded-xl border p-4 no-underline transition-shadow hover:shadow-md"
      style={{ borderColor: 'var(--divider)', background: 'var(--surface)' }}
    >
      {/* Tags */}
      <div className="flex gap-2 mb-3 flex-wrap">
        <span
          className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded"
          style={{ background: 'color-mix(in srgb, var(--accent) 12%, transparent)', color: 'var(--accent)' }}
        >
          {recipe.aparelho}
        </span>
        <span
          className="text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded"
          style={{ background: 'var(--divider)', color: 'var(--subtle)' }}
        >
          {recipe.objetivo}
        </span>
      </div>

      {/* Título */}
      <h3
        className="font-bold text-base leading-snug mb-1.5 group-hover:underline"
        style={{ color: 'var(--fg)' }}
      >
        {recipe.titulo}
      </h3>

      {/* Descrição */}
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--subtle)' }}>
        {recipe.descricao}
      </p>

      {/* Dados rápidos */}
      <div className="flex gap-4 border-t pt-3" style={{ borderColor: 'var(--divider)' }}>
        <div className="flex flex-col">
          <span className="text-base font-bold tabular-nums" style={{ color: 'var(--accent)' }}>
            {recipe.calorias} kcal
          </span>
          <span className="text-xs" style={{ color: 'var(--subtle)' }}>calorias</span>
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold tabular-nums" style={{ color: 'var(--accent)' }}>
            {recipe.proteina}g
          </span>
          <span className="text-xs" style={{ color: 'var(--subtle)' }}>proteína</span>
        </div>
        <div className="flex flex-col ml-auto">
          <span className="text-base font-bold" style={{ color: 'var(--subtle)' }}>
            {recipe.tempoPreparo}
          </span>
          <span className="text-xs" style={{ color: 'var(--subtle)' }}>preparo</span>
        </div>
      </div>
    </Link>
  )
}
