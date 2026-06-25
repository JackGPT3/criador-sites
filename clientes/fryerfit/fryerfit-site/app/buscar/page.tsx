import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllRecipes } from '@/lib/recipes'
import { RecipeCard } from '@/components/RecipeCard'
import { SearchForm } from './SearchForm'

type Props = { searchParams: Promise<{ q?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams
  return {
    title: q ? `"${q}" — Busca de Receitas | FryerFit` : 'Buscar Receitas | FryerFit',
    robots: { index: false },
  }
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams
  const query = q?.trim().toLowerCase() ?? ''

  const allRecipes = getAllRecipes()

  const results = query
    ? allRecipes.filter((recipe) => {
        const haystack = [
          recipe.titulo,
          recipe.descricao,
          recipe.aparelho,
          recipe.objetivo,
          ...(recipe.tags ?? []),
        ]
          .join(' ')
          .toLowerCase()
        return haystack.includes(query)
      })
    : []

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Cabeçalho */}
      <div className="mb-8">
        <h1 className="text-xl font-bold mb-4" style={{ color: 'var(--fg)' }}>
          Buscar receita por ingrediente
        </h1>
        <SearchForm initialQuery={q ?? ''} />
      </div>

      {/* Resultados */}
      {query && (
        <p className="text-sm mb-6" style={{ color: 'var(--subtle)' }}>
          {results.length === 0
            ? `Nenhuma receita encontrada para "${q}"`
            : `${results.length} ${results.length === 1 ? 'receita encontrada' : 'receitas encontradas'} para "${q}"`}
        </p>
      )}

      {results.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      )}

      {query && results.length === 0 && (
        <div className="text-center py-20">
          <p className="text-base font-medium mb-2" style={{ color: 'var(--fg)' }}>
            Nenhuma receita com &ldquo;{q}&rdquo;
          </p>
          <p className="text-sm mb-6" style={{ color: 'var(--subtle)' }}>
            Tente outro ingrediente ou confira as categorias abaixo.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {['frango', 'atum', 'batata-doce', 'ovo', 'aveia'].map((sugestao) => (
              <Link
                key={sugestao}
                href={`/buscar?q=${sugestao}`}
                className="text-sm px-4 py-2 rounded-full no-underline"
                style={{
                  background: 'color-mix(in srgb, var(--accent) 10%, var(--surface))',
                  border: '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
                  color: 'var(--accent)',
                }}
              >
                {sugestao}
              </Link>
            ))}
          </div>
        </div>
      )}

      {!query && (
        <div className="text-center py-16">
          <p className="text-base" style={{ color: 'var(--subtle)' }}>
            Digite um ingrediente no campo acima para encontrar receitas.
          </p>
        </div>
      )}

    </div>
  )
}
