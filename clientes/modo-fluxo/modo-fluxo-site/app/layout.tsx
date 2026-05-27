import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const spaceGrotesk = Space_Grotesk({
  variable: '--font-sg',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'Modo Fluxo — IA aplicada na prática',
    template: '%s | Modo Fluxo',
  },
  description:
    'Artigos, tutoriais e reviews sobre as melhores ferramentas de IA, automação e produtividade.',
  metadataBase: new URL('https://modofluxo.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://modofluxo.com.br',
    siteName: 'Modo Fluxo',
    title: 'Modo Fluxo — IA aplicada na prática',
    description:
      'Artigos, tutoriais e reviews sobre as melhores ferramentas de IA, automação e produtividade.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modo Fluxo — IA aplicada na prática',
    description:
      'Artigos, tutoriais e reviews sobre as melhores ferramentas de IA, automação e produtividade.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${inter.variable} h-full`}>
      <head>
        {/* Google AdSense — adicionar NEXT_PUBLIC_ADSENSE_ID nas variáveis de ambiente do Vercel para ativar */}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`} crossOrigin="anonymous" />
        )}
      </head>
      <body className="min-h-full flex flex-col bg-[#F7F9FB] text-[#131924] antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
