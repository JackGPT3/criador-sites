import Link from 'next/link'
import { TOOL_CATEGORIES } from '@/lib/tools'
import type { Tool } from '@/lib/types'

interface ToolCardProps {
  tool: Tool
  featured?: boolean
}

function LogoArea({ tool, size }: { tool: Tool; size: 'lg' | 'sm' }) {
  const cat = TOOL_CATEGORIES[tool.category]
  const gradient = cat?.gradient ?? 'linear-gradient(135deg, #0E3A6E, #159BA8)'
  const emoji = cat?.emoji ?? '🛠️'

  if (size === 'lg') {
    return (
      <div
        className="h-28 relative flex items-center justify-center"
        style={{ background: gradient }}
      >
        <span className="text-5xl select-none">{emoji}</span>
        {tool.logoUrl && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center p-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tool.logoUrl}
                alt={tool.name}
                width={56}
                height={56}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="shrink-0 w-14 h-14 rounded-xl relative overflow-hidden flex items-center justify-center"
      style={{ background: gradient }}
    >
      <span className="text-2xl select-none">{emoji}</span>
      {tool.logoUrl && (
        <div className="absolute inset-0 bg-white flex items-center justify-center p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tool.logoUrl}
            alt={tool.name}
            width={40}
            height={40}
            className="w-full h-full object-contain"
          />
        </div>
      )}
    </div>
  )
}

function PricingBadge({ tool }: { tool: Tool }) {
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
      tool.pricing.hasFree ? 'text-green-700 bg-green-50' : 'text-slate-600 bg-slate-100'
    }`}>
      {tool.pricing.hasFree ? 'Tem plano grátis' : 'Pago'}
    </span>
  )
}

export default function ToolCard({ tool, featured = false }: ToolCardProps) {
  const cat = TOOL_CATEGORIES[tool.category]
  const href = `/ferramentas/${tool.category}/${tool.slug}`

  if (featured) {
    return (
      <Link href={href} className="group block">
        <article className="bg-white rounded-xl border border-[#DDE3EB] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full">
          <LogoArea tool={tool} size="lg" />
          <div className="p-5 flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {cat && (
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${cat.color}`}>
                  {cat.emoji} {cat.label}
                </span>
              )}
              <PricingBadge tool={tool} />
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
        <LogoArea tool={tool} size="sm" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            {cat && (
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cat.color}`}>
                {cat.label}
              </span>
            )}
            <PricingBadge tool={tool} />
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
