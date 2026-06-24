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
  description: 'Receitas fitness para air fryer, micro-ondas e eletrodomésticos. Tabela nutricional completa em cada receita.',
  metadataBase: new URL('https://fryerfit.com.br'),
  openGraph: {
    siteName: 'FryerFit',
    locale: 'pt_BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={nunito.variable} suppressHydrationWarning>
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
