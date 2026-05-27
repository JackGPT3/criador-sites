import Link from 'next/link'
import { CATEGORIES, formatDate } from '@/lib/posts'
import type { Post } from '@/lib/types'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const { frontmatter, slug, readingTime } = post
  const category = CATEGORIES[frontmatter.category]
  const placeholderGradient = category?.gradient ?? 'linear-gradient(135deg, #0E3A6E, #159BA8)'

  if (featured) {
    return (
      <Link href={`/blog/${slug}`} className="group block">
        <article className="bg-white rounded-xl border border-[#DDE3EB] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full">
          <div className="aspect-video overflow-hidden relative">
            {frontmatter.image ? (
              <img
                src={frontmatter.image}
                alt={frontmatter.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-2"
                style={{ background: placeholderGradient }}
              >
                <span className="text-6xl">{category?.emoji ?? '📄'}</span>
                <span className="text-white/80 text-sm font-medium tracking-wide uppercase">
                  {category?.label ?? 'Artigo'}
                </span>
              </div>
            )}
          </div>
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-3">
              {category && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${category.color}`}>
                  {category.emoji} {category.label}
                </span>
              )}
              {frontmatter.featured && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full text-amber-700 bg-amber-50">
                  ⭐ Destaque
                </span>
              )}
            </div>
            <h2
              className="text-base font-semibold text-[#131924] group-hover:text-[#0E3A6E] transition-colors mb-2 line-clamp-2 leading-snug"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {frontmatter.title}
            </h2>
            <p className="text-sm text-[#667085] line-clamp-2 mb-4 flex-1">{frontmatter.description}</p>
            <div className="flex items-center gap-2 text-xs text-[#667085]">
              <span>{formatDate(frontmatter.date)}</span>
              <span>·</span>
              <span>{readingTime}</span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="flex gap-4 p-4 bg-white rounded-xl border border-[#DDE3EB] shadow-sm hover:shadow-md transition-all duration-200">
        <div className="shrink-0 w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center">
          {frontmatter.image ? (
            <img src={frontmatter.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: placeholderGradient }}
            >
              <span className="text-2xl">{category?.emoji ?? '📄'}</span>
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          {category && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${category.color}`}>
              {category.label}
            </span>
          )}
          <h3
            className="text-sm font-semibold text-[#131924] group-hover:text-[#0E3A6E] transition-colors mt-1 mb-1 line-clamp-2 leading-snug"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {frontmatter.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-[#667085]">
            <span>{formatDate(frontmatter.date)}</span>
            <span>·</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
