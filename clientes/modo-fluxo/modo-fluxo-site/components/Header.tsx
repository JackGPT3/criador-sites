'use client'

import Link from 'next/link'
import { useState } from 'react'
import { CATEGORIES } from '@/lib/categories'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[#080E1E]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shrink-0">
              MF
            </div>
            <span className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors">
              Modo Fluxo
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              Home
            </Link>
            <div className="relative group">
              <button className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-1">
                Categorias
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#111827] border border-white/8 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 py-1">
                {Object.entries(CATEGORIES).map(([slug, cat]) => (
                  <Link
                    key={slug}
                    href={`/categoria/${slug}`}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/#newsletter" className="ml-2 px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors">
              Newsletter
            </Link>
          </nav>

          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
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
        <div className="md:hidden border-t border-white/8 bg-[#080E1E] px-4 py-3">
          <Link href="/" className="block px-3 py-2.5 text-sm text-slate-300 hover:text-white" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">Categorias</div>
          {Object.entries(CATEGORIES).map(([slug, cat]) => (
            <Link
              key={slug}
              href={`/categoria/${slug}`}
              className="flex items-center gap-2 px-3 py-2.5 text-sm text-slate-300 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </Link>
          ))}
          <div className="mt-3 pt-3 border-t border-white/8">
            <Link href="/#newsletter" className="block w-full text-center px-4 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg" onClick={() => setMobileOpen(false)}>
              Newsletter
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
