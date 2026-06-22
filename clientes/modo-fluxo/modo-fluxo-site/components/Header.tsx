'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CATEGORIES } from '@/lib/categories'
import NewsletterModal from './NewsletterModal'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#DDE3EB] bg-white/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-1 shrink-0">
              <span
                className="font-bold text-xl bg-gradient-to-r from-[#0E3A6E] to-[#159BA8] bg-clip-text text-transparent"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Modo
              </span>
              <span
                className="font-bold text-xl text-[#131924]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {' '}Fluxo
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-0.5">
              {Object.entries(CATEGORIES).map(([slug, cat]) => (
                <Link
                  key={slug}
                  href={`/categoria/${slug}`}
                  className="px-3 py-2 text-sm font-medium text-[#667085] hover:text-[#131924] hover:bg-[#E6EBF0] rounded-lg transition-colors"
                >
                  {cat.label}
                </Link>
              ))}
              <Link
                href="/ferramentas"
                className="px-3 py-2 text-sm font-medium text-[#667085] hover:text-[#131924] hover:bg-[#E6EBF0] rounded-lg transition-colors"
              >
                Diretório
              </Link>
              <button
                onClick={() => setModalOpen(true)}
                className="ml-3 px-4 py-2 text-sm font-semibold bg-gradient-to-r from-[#0E3A6E] to-[#159BA8] text-white rounded-lg hover:opacity-90 transition-opacity"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Newsletter
              </button>
            </nav>

            <button
              className="md:hidden p-2 rounded-lg text-[#667085] hover:text-[#131924] hover:bg-[#E6EBF0] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-[#DDE3EB] bg-white px-4 py-3">
            <div className="text-xs font-semibold text-[#667085] uppercase tracking-wider px-3 py-2">Categorias</div>
            {Object.entries(CATEGORIES).map(([slug, cat]) => (
              <Link
                key={slug}
                href={`/categoria/${slug}`}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-[#667085] hover:text-[#131924]"
                onClick={() => setMobileOpen(false)}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
              </Link>
            ))}
            <Link
              href="/ferramentas"
              className="flex items-center gap-2 px-3 py-2.5 text-sm text-[#667085] hover:text-[#131924]"
              onClick={() => setMobileOpen(false)}
            >
              <span>🛠️</span>
              <span>Diretório de Ferramentas</span>
            </Link>
            <div className="mt-3 pt-3 border-t border-[#DDE3EB]">
              <button
                onClick={() => { setMobileOpen(false); setModalOpen(true) }}
                className="block w-full text-center px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#0E3A6E] to-[#159BA8] text-white rounded-lg"
              >
                Newsletter
              </button>
            </div>
          </div>
        )}
      </header>

      {modalOpen && <NewsletterModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
