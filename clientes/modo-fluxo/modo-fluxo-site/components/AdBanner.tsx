'use client'

interface AdBannerProps {
  slot?: string
  format?: 'horizontal' | 'rectangle' | 'square'
  className?: string
}

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID

export default function AdBanner({ slot = '', format = 'horizontal', className = '' }: AdBannerProps) {
  const sizes = {
    horizontal: 'h-24 sm:h-[90px]',
    rectangle: 'h-[250px]',
    square: 'h-[250px] max-w-[300px]',
  }

  // Mostra placeholder em dev OU quando o ID do AdSense ainda não foi configurado
  if (process.env.NODE_ENV === 'development' || !ADSENSE_ID) {
    return (
      <div className={`w-full ${sizes[format]} rounded-lg border border-dashed border-[#DDE3EB] bg-[#F0F3F6] flex items-center justify-center text-[#667085] text-xs gap-2 ${className}`}>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        Espaço para anúncio — AdSense ({format})
      </div>
    )
  }

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        data-ad-format={format === 'horizontal' ? 'auto' : 'rectangle'}
        data-full-width-responsive="true"
      />
    </div>
  )
}
