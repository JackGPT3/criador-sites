import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: {
    default: 'FryerFit — Receitas fitness sem fogão',
    template: '%s | FryerFit',
  },
  description: 'Receitas fitness para air fryer, micro-ondas, panela de pressão elétrica e sanduicheira. Tabela nutricional completa com calorias, proteínas, carboidratos e gorduras em cada receita.',
  metadataBase: new URL('https://fryerfit.com.br'),
  keywords: [
    'receitas air fryer',
    'receitas fitness',
    'receitas air fryer saudáveis',
    'receitas sem fogão',
    'receitas eletrodomésticos',
    'tabela nutricional receitas',
    'meal prep receitas',
    'receitas low carb',
    'receitas alta proteína',
    'receitas micro-ondas fitness',
    'receitas panela de pressão elétrica',
    'air fryer receitas saudáveis',
    'receitas hipertrofia',
  ],
  authors: [{ name: 'FryerFit', url: 'https://fryerfit.com.br' }],
  creator: 'FryerFit',
  publisher: 'FryerFit',
  openGraph: {
    siteName: 'FryerFit',
    locale: 'pt_BR',
    type: 'website',
    url: 'https://fryerfit.com.br',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FryerFit — Receitas fitness sem fogão',
    description: 'Receitas fitness para air fryer, micro-ondas e eletrodomésticos. Tabela nutricional completa em cada receita.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  alternates: {
    canonical: 'https://fryerfit.com.br',
  },
  verification: {
    google: '0aExRk7Ila8bHDWUlrg61zC9dVqoNYgF625LzpOKrwU',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={nunito.variable} suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
