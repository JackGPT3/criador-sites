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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Hero */}
      <section className="mb-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            IA aplicada na prática
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Domine a IA antes que ela{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              mude tudo
            </span>
          </h1>
          <p className="text-slate-400 text-lg">
            Ferramentas, automações e tutoriais práticos para quem quer resultado, não teoria.
          </p>
        </div>

        {/* Categories nav */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Object.entries(CATEGORIES).map(([slug, cat]) => (
            <Link
              key={slug}
              href={`/categoria/${slug}`}
              className={`text-sm font-medium px-4 py-2 rounded-full border border-white/8 ${cat.color} hover:border-current transition-colors`}
            >
              {cat.emoji} {cat.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured posts */}
      {featuredPosts.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-500 rounded-full" />
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

      {/* Recent posts */}
      {recentPosts.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-orange-500 rounded-full" />
            Mais artigos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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

      {/* More posts */}
      {morePosts.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-purple-500 rounded-full" />
            Arquivo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {morePosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {allPosts.length === 0 && (
        <div className="text-center py-20 text-slate-500">
          <p className="text-4xl mb-4">📝</p>
          <p className="text-lg font-medium text-slate-400 mb-2">Nenhum post ainda</p>
          <p className="text-sm">Adicione arquivos .mdx em <code className="text-blue-400">content/posts/</code></p>
        </div>
      )}
    </div>
  )
}
