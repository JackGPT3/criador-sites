import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    default: 'Modo Fluxo — IA aplicada na prática',
    template: '%s | Modo Fluxo',
  },
  description:
    'Agentes, automações e ferramentas de IA para transformar sua produtividade e escalar negócios. Artigos, tutoriais e reviews práticos.',
  metadataBase: new URL('https://modofluxo.com.br'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://modofluxo.com.br',
    siteName: 'Modo Fluxo',
    title: 'Modo Fluxo — IA aplicada na prática',
    description:
      'Agentes, automações e ferramentas de IA para transformar sua produtividade e escalar negócios.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modo Fluxo — IA aplicada na prática',
    description:
      'Agentes, automações e ferramentas de IA para transformar sua produtividade e escalar negócios.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geist.variable} h-full antialiased`}>
      <head>
        {/* Google AdSense — substituir XXXXXXXXXXXXXXXXX pelo seu publisher ID */}
        {/* <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX" crossOrigin="anonymous" /> */}
      </head>
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
