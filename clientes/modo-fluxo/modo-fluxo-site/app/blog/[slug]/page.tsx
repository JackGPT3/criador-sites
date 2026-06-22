import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { getPostBySlug, getAllSlugs, getAllPosts, CATEGORIES, formatDate } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import AdBanner from '@/components/AdBanner'
import Newsletter from '@/components/Newsletter'
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

  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    dateModified: frontmatter.date,
    url: `https://modofluxo.com.br/blog/${slug}`,
    inLanguage: 'pt-BR',
    author: {
      '@type': 'Person',
      name: frontmatter.author ?? 'Modo Fluxo',
      url: 'https://modofluxo.com.br/sobre',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Modo Fluxo',
      url: 'https://modofluxo.com.br',
    },
    ...(frontmatter.image && { image: `https://modofluxo.com.br${frontmatter.image}` }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://modofluxo.com.br/blog/${slug}`,
    },
  }

  const allPosts = getAllPosts()
  const related = allPosts
    .filter((p) => p.slug !== slug && p.frontmatter.category === frontmatter.category)
    .slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />

      <div className="max-w-3xl mx-auto">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#667085] mb-8">
          <Link href="/" className="hover:text-[#131924] transition-colors">Home</Link>
          <span>/</span>
          {category && (
            <>
              <Link href={`/categoria/${frontmatter.category}`} className="hover:text-[#131924] transition-colors">
                {category.label}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#667085] truncate max-w-[200px]">{frontmatter.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            {category && (
              <Link
                href={`/categoria/${frontmatter.category}`}
                className={`text-xs font-medium px-2.5 py-1 rounded-full ${category.color} hover:opacity-80 transition-opacity`}
              >
                {category.emoji} {category.label}
              </Link>
            )}
          </div>
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#131924] leading-tight mb-4"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {frontmatter.title}
          </h1>
          <p className="text-[#667085] text-lg leading-relaxed mb-6">
            {frontmatter.description}
          </p>
          <div className="flex items-center gap-3 text-sm text-[#667085] pb-6 border-b border-[#DDE3EB]">
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
          <div className="mb-8 rounded-xl overflow-hidden border border-[#DDE3EB]">
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              width={1200}
              height={630}
              sizes="(min-width: 1024px) 768px, 100vw"
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        {/* Content */}
        <article className="prose max-w-none mb-8">
          <MDXRemote source={content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
        </article>

        {/* CTA Newsletter inline */}
        <div className="mb-8">
          <Newsletter compact />
        </div>

        {/* Mid-article ad */}
        <AdBanner format="rectangle" slot="0987654321" className="mb-10" />

        {/* Tags */}
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10 pt-6 border-t border-[#DDE3EB]">
            {frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-[#667085] bg-[#F0F3F6] border border-[#DDE3EB] px-3 py-1.5 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="mt-12 border-t border-[#DDE3EB] pt-10">
          <h2
            className="text-lg font-bold text-[#131924] mb-5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Leia também
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
