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

  if (featured) {
    return (
      <Link href={`/blog/${slug}`} className="group block">
        <article className="relative rounded-2xl border border-white/8 bg-[#111827] hover:border-blue-500/30 hover:bg-[#131d35] transition-all duration-200 overflow-hidden">
          {frontmatter.image && (
            <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
              <img
                src={frontmatter.image}
                alt={frontmatter.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
            </div>
          )}
          {!frontmatter.image && (
            <div className="aspect-video bg-gradient-to-br from-blue-900/30 via-slate-800 to-purple-900/20 flex items-center justify-center">
              <span className="text-5xl opacity-30">{category?.emoji ?? '📄'}</span>
            </div>
          )}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-3">
              {category && (
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${category.color}`}>
                  {category.emoji} {category.label}
                </span>
              )}
              {frontmatter.featured && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-amber-400 bg-amber-400/10">
                  ⭐ Destaque
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
              {frontmatter.title}
            </h2>
            <p className="text-sm text-slate-400 line-clamp-2 mb-4">{frontmatter.description}</p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
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
      <article className="flex gap-4 p-4 rounded-xl border border-white/8 bg-[#111827] hover:border-blue-500/30 hover:bg-[#131d35] transition-all duration-200">
        <div className="shrink-0 w-16 h-16 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-2xl overflow-hidden">
          {frontmatter.image ? (
            <img src={frontmatter.image} alt="" className="w-full h-full object-cover" />
          ) : (
            <span className="opacity-60">{category?.emoji ?? '📄'}</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          {category && (
            <span className={`text-xs font-semibold ${category.color.split(' ')[0]}`}>
              {category.label}
            </span>
          )}
          <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors mt-0.5 mb-1 line-clamp-2 leading-snug">
            {frontmatter.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>{formatDate(frontmatter.date)}</span>
            <span>·</span>
            <span>{readingTime}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
