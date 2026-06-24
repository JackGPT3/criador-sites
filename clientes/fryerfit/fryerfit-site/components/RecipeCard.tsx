import Link from 'next/link'
import Image from 'next/image'

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
      className="group block rounded-xl border overflow-hidden no-underline transition-shadow hover:shadow-md"
      style={{ borderColor: 'var(--divider)', background: 'var(--surface)' }}
    >
      {/* Thumbnail */}
      <div className="relative w-full" style={{ height: '160px' }}>
        {recipe.imagem ? (
          <Image
            src={recipe.imagem}
            alt={recipe.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, #1C2B1E 0%, #3A7D44 100%)' }}
          />
        )}
        {/* Tag badge sobre a imagem */}
        <div className="absolute top-2 left-2">
          <span
            className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded"
            style={{ background: 'rgba(15,20,16,0.7)', color: '#A8E0B0', backdropFilter: 'blur(4px)' }}
          >
            {recipe.aparelho}
          </span>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        <span
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: 'var(--accent)' }}
        >
          {recipe.objetivo}
        </span>

        <h3
          className="font-bold text-base leading-snug mt-1 mb-1.5 group-hover:underline"
          style={{ color: 'var(--fg)' }}
        >
          {recipe.titulo}
        </h3>

        <p className="text-sm leading-relaxed mb-4 line-clamp-2" style={{ color: 'var(--subtle)' }}>
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
      </div>
    </Link>
  )
}
