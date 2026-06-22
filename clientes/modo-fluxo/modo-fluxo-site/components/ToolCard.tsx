import Link from 'next/link'
import { TOOL_CATEGORIES } from '@/lib/tools'
import type { Tool } from '@/lib/types'

interface ToolCardProps {
  tool: Tool
  featured?: boolean
}

export default function ToolCard({ tool, featured = false }: ToolCardProps) {
  const cat = TOOL_CATEGORIES[tool.category]
  const href = `/ferramentas/${tool.category}/${tool.slug}`

  const PricingBadge = () => (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
      tool.pricing.hasFree
        ? 'text-green-700 bg-green-50'
        : 'text-slate-600 bg-slate-100'
    }`}>
      {tool.pricing.hasFree ? 'Tem plano grátis' : 'Pago'}
    </span>
  )

  if (featured) {
    return (
      <Link href={href} className="group block">
        <article className="bg-white rounded-xl border border-[#DDE3EB] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full">
          <div
            className="h-24 flex items-center justify-center"
            style={{ background: cat?.gradient ?? 'linear-gradient(135deg, #0E3A6E, #159BA8)' }}
          >
            <span className="text-5xl">{cat?.emoji ?? '🛠️'}</span>
          </div>
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {cat && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cat.color}`}>
                  {cat.emoji} {cat.label}
                </span>
              )}
              <PricingBadge />
            </div>
            <h2
              className="text-base font-semibold text-[#131924] group-hover:text-[#0E3A6E] transition-colors mb-2 leading-snug"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {tool.name}
            </h2>
            <p className="text-sm text-[#667085] line-clamp-2 mb-4 flex-1">{tool.tagline}</p>
            {tool.pricing.startingPrice && (
              <p className="text-xs text-[#667085]">{tool.pricing.startingPrice}</p>
            )}
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={href} className="group block">
      <article className="flex gap-4 p-4 bg-white rounded-xl border border-[#DDE3EB] shadow-sm hover:shadow-md transition-all duration-200">
        <div
          className="shrink-0 w-14 h-14 rounded-lg flex items-center justify-center"
          style={{ background: cat?.gradient ?? 'linear-gradient(135deg, #0E3A6E, #159BA8)' }}
        >
          <span className="text-2xl">{cat?.emoji ?? '🛠️'}</span>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {cat && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cat.color}`}>
                {cat.label}
              </span>
            )}
            <PricingBadge />
          </div>
          <h3
            className="text-sm font-semibold text-[#131924] group-hover:text-[#0E3A6E] transition-colors mb-1 line-clamp-1 leading-snug"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {tool.name}
          </h3>
          <p className="text-xs text-[#667085] line-clamp-2">{tool.tagline}</p>
        </div>
      </article>
    </Link>
  )
}
