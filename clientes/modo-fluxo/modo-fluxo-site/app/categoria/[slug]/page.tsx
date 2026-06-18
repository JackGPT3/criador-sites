import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsByCategory, CATEGORIES } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import AdBanner from '@/components/AdBanner'
import Link from 'next/link'

export const revalidate = 86400

export function generateStaticParams() {
  return Object.keys(CATEGORIES).map((slug) => ({ slug }))
}

export async function generateMetadata(props: PageProps<'/categoria/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params
  const category = CATEGORIES[slug]

  if (!category) return { title: 'Categoria não encontrada' }

  return {
    title: `${category.label} — Artigos e tutoriais`,
    description: `Todos os artigos sobre ${category.label} no Modo Fluxo. Ferramentas, automações e tutoriais práticos de IA.`,
  }
}

export default async function CategoriaPage(props: PageProps<'/categoria/[slug]'>) {
  const { slug } = await props.params
  const category = CATEGORIES[slug]

  if (!category) notFound()

  const posts = getPostsByCategory(slug)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#667085] mb-8">
        <Link href="/" className="hover:text-[#131924] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#131924]">{category.label}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full mb-4 ${category.color}`}>
          <span>{category.emoji}</span>
          <span>{category.label}</span>
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold text-[#131924] mb-3"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {category.label}
        </h1>
        <p className="text-[#667085]">
          {posts.length} {posts.length === 1 ? 'artigo' : 'artigos'} sobre {category.label.toLowerCase()}
        </p>
      </header>

      {/* Posts grid */}
      {posts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} featured />
            ))}
          </div>

          {posts.length > 3 && (
            <>
              <AdBanner format="horizontal" slot="1111111111" className="mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.slice(3).map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">{category.emoji}</p>
          <p className="text-lg font-medium text-[#131924] mb-2">Nenhum artigo ainda</p>
          <p className="text-sm text-[#667085]">Em breve teremos conteúdo sobre {category.label.toLowerCase()}</p>
          <Link
            href="/"
            className="inline-block mt-6 px-5 py-2.5 text-white text-sm font-semibold rounded-lg transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #0E3A6E, #159BA8)', fontFamily: 'var(--font-heading)' }}
          >
            Ver todos os artigos
          </Link>
        </div>
      )}

      {/* Other categories */}
      <section className="mt-14 pt-10 border-t border-[#DDE3EB]">
        <h2
          className="text-sm font-semibold text-[#667085] mb-4 uppercase tracking-wider"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Outras categorias
        </h2>
        <div className="flex flex-wrap gap-2">
          {Object.entries(CATEGORIES)
            .filter(([s]) => s !== slug)
            .map(([s, cat]) => (
              <Link
                key={s}
                href={`/categoria/${s}`}
                className={`text-sm font-medium px-4 py-2 rounded-full border border-[#DDE3EB] ${cat.color} hover:shadow-sm transition-all`}
              >
                {cat.emoji} {cat.label}
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
