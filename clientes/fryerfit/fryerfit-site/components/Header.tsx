'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Logo } from './Logo'

const NAV = [
  { href: '/aparelhos/air-fryer',     label: 'Air Fryer' },
  { href: '/aparelhos/micro-ondas',   label: 'Micro-ondas' },
  { href: '/objetivos/low-carb',      label: 'Low Carb' },
  { href: '/objetivos/alta-proteina', label: 'Alta Proteína' },
  { href: '/sobre',                   label: 'Sobre' },
]

function SearchIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const mobileSearchRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus()
  }, [searchOpen])

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) return
    router.push(`/buscar?q=${encodeURIComponent(q)}`)
    setSearchOpen(false)
    setOpen(false)
    setSearchQuery('')
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: 'var(--surface)', borderColor: 'var(--divider)' }}
    >
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* Logo + wordmark */}
        <Link href="/" className="flex items-center gap-2 no-underline hover:no-underline shrink-0">
          <Logo size={28} />
          <span className="font-bold text-lg leading-none" style={{ color: 'var(--fg)' }}>
            Fryer<span style={{ color: 'var(--accent)' }}>Fit</span>
          </span>
        </Link>

        {/* Nav desktop ou busca expandida */}
        {searchOpen ? (
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-sm mx-auto">
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 border"
              style={{ borderColor: 'var(--accent)', background: 'var(--bg)' }}
            >
              <span style={{ color: 'var(--subtle)' }}>
                <SearchIcon size={15} />
              </span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar por ingrediente..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: 'var(--fg)' }}
              />
              <button
                type="button"
                onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                className="text-xs cursor-pointer"
                style={{ color: 'var(--subtle)' }}
                aria-label="Fechar busca"
              >
                ✕
              </button>
            </div>
          </form>
        ) : (
          <nav className="hidden md:flex items-center gap-5">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium no-underline hover:underline"
                style={{ color: 'var(--fg)' }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Ações */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Lupa de busca */}
          <button
            onClick={() => { setSearchOpen(!searchOpen); setOpen(false) }}
            className="w-8 h-8 rounded flex items-center justify-center cursor-pointer"
            style={{ color: searchOpen ? 'var(--accent)' : 'var(--subtle)' }}
            aria-label="Buscar receitas por ingrediente"
          >
            <SearchIcon size={17} />
          </button>

          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-8 h-8 rounded flex items-center justify-center text-sm cursor-pointer"
              style={{ color: 'var(--subtle)' }}
              aria-label="Alternar modo escuro"
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
          )}

          {/* Mobile menu */}
          <button
            className="md:hidden w-8 h-8 flex items-center justify-center cursor-pointer"
            style={{ color: 'var(--subtle)' }}
            onClick={() => { setOpen(!open); setSearchOpen(false) }}
            aria-label="Menu"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav
          className="md:hidden px-4 pb-4 flex flex-col gap-3 border-t"
          style={{ borderColor: 'var(--divider)' }}
        >
          {/* Campo de busca mobile */}
          <form onSubmit={handleSearchSubmit} className="pt-3">
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2 border"
              style={{ borderColor: 'var(--divider)', background: 'var(--bg)' }}
            >
              <span style={{ color: 'var(--subtle)' }}>
                <SearchIcon size={15} />
              </span>
              <input
                ref={mobileSearchRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por ingrediente..."
                className="flex-1 bg-transparent text-sm outline-none"
                style={{ color: 'var(--fg)' }}
              />
            </div>
          </form>

          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium py-1 no-underline"
              style={{ color: 'var(--subtle)' }}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
