import Link from 'next/link'
import { getAllPosts, CATEGORIES } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import Newsletter from '@/components/Newsletter'
import AdBanner from '@/components/AdBanner'

export default function HomePage() {
  const allPosts = getAllPosts()
  const featuredPosts = allPosts.slice(0, 3)
  const recentPosts = allPosts.slice(3, 9)
  const morePosts = allPosts.slice(9)

  return (
    <div>
      {/* Hero — full width com gradiente do tema original */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0E3A6E] to-[#159BA8]" />
        <div className="relative px-4 py-20 sm:py-28 text-center max-w-4xl mx-auto">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Domine a Inteligência Artificial<br className="hidden sm:block" />
            {' '}e Automatize sua Produtividade
          </h1>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Artigos, tutoriais e reviews sobre as melhores ferramentas de IA, automação e produtividade.
          </p>
          <Link
            href="#artigos"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0E3A6E] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Explorar Artigos →
          </Link>
        </div>
      </section>

      {/* Conteúdo principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="artigos">

        {/* Categorias em cards brancos */}
        <section className="mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {Object.entries(CATEGORIES).map(([slug, cat]) => (
              <Link
                key={slug}
                href={`/categoria/${slug}`}
                className="bg-white rounded-xl p-4 text-center shadow-sm border border-[#DDE3EB] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
              >
                <span className="text-2xl block mb-1.5">{cat.emoji}</span>
                <span className="text-sm font-medium text-[#131924]">{cat.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Posts em destaque */}
        {featuredPosts.length > 0 && (
          <section className="mb-10">
            <h2
              className="text-xl font-bold text-[#131924] mb-5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Últimos artigos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featuredPosts.map((post) => (
                <PostCard key={post.slug} post={post} featured />
              ))}
            </div>
          </section>
        )}

        {/* Ad banner */}
        <AdBanner format="horizontal" slot="1234567890" className="mb-10" />

        {/* Mais artigos */}
        {recentPosts.length > 0 && (
          <section className="mb-10">
            <h2
              className="text-xl font-bold text-[#131924] mb-5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Mais artigos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {/* Newsletter */}
        <section className="mb-10">
          <Newsletter />
        </section>

        {/* Arquivo */}
        {morePosts.length > 0 && (
          <section className="mb-10">
            <h2
              className="text-xl font-bold text-[#131924] mb-5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Arquivo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {morePosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {allPosts.length === 0 && (
          <div className="text-center py-20 text-[#667085]">
            <p className="text-4xl mb-4">📝</p>
            <p className="text-lg font-medium text-[#131924] mb-2">Nenhum post ainda</p>
            <p className="text-sm">Adicione arquivos .mdx em <code className="text-[#0E3A6E]">content/posts/</code></p>
          </div>
        )}
      </div>
    </div>
  )
}
