import type { Metadata } from 'next'

export const metadata: Metadata = {
  other: {
    'Mediapartners-Google': 'noindex',
  },
}

export default function FerramentasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
