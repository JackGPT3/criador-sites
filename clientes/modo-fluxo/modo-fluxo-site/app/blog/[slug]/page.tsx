import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllSlugs, getAllPosts, CATEGORIES, formatDate } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import AdBanner from '@/components/AdBanner'
import Link from 'next/link'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(props: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await props.params

  try {
    const post = getPostBySlug(slug)
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        type: 'article',
        publishedTime: post.frontmatter.date,
        ...(post.frontmatter.image && { images: [post.frontmatter.image] }),
      },
    }
  } catch {
    return { title: 'Post não encontrado' }
  }
}

export default async function BlogPostPage(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params

  let post
  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }

  const { frontmatter, content, readingTime } = post
  const category = CATEGORIES[frontmatter.category]

  const allPosts = getAllPosts()
  const related = allPosts
    .filter((p) => p.slug !== slug && p.frontmatter.category === frontmatter.category)
    .slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/categoria/${frontmatter.category}`} className="hover:text-white transition-colors">
                {category.label}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-slate-400 truncate max-w-[200px]">{frontmatter.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {category && (
              <Link
                href={`/categoria/${frontmatter.category}`}
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${category.color} hover:opacity-80 transition-opacity`}
              >
                {category.emoji} {category.label}
              </Link>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
            {frontmatter.title}
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            {frontmatter.description}
          </p>
          <div className="flex items-center gap-3 text-sm text-slate-500 pb-6 border-b border-white/8">
            <span>{formatDate(frontmatter.date)}</span>
            <span>·</span>
            <span>{readingTime}</span>
            {frontmatter.author && (
              <>
                <span>·</span>
                <span>{frontmatter.author}</span>
              </>
            )}
          </div>
        </header>

        {/* Featured image */}
        {frontmatter.image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={frontmatter.image}
              alt={frontmatter.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Content */}
        <article className="prose max-w-none mb-8">
          <MDXRemote source={content} />
        </article>

        {/* Mid-article ad */}
        <AdBanner format="rectangle" slot="0987654321" className="mb-10" />

        {/* Tags */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10 pt-6 border-t border-white/8">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-slate-400 bg-white/5 border border-white/8 px-3 py-1.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mt-12 border-t border-white/8 pt-10">
          <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-blue-500 rounded-full" />
            Leia também
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
