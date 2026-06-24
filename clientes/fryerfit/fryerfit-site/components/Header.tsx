'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Logo } from './Logo'

const NAV = [
  { href: '/aparelhos/air-fryer',     label: 'Air Fryer' },
  { href: '/aparelhos/micro-ondas',   label: 'Micro-ondas' },
  { href: '/objetivos/low-carb',      label: 'Low Carb' },
  { href: '/objetivos/alta-proteina', label: 'Alta Proteína' },
  { href: '/sobre',                   label: 'Sobre' },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ background: 'var(--surface)', borderColor: 'var(--divider)' }}
    >
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

        {/* Logo + wordmark */}
        <Link href="/" className="flex items-center gap-2 no-underline hover:no-underline">
          <Logo size={28} />
          <span className="font-bold text-lg leading-none" style={{ color: 'var(--fg)' }}>
            Fryer<span style={{ color: 'var(--accent)' }}>Fit</span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-5">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium no-underline hover:underline"
              style={{ color: 'var(--subtle)' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Ações */}
        <div className="flex items-center gap-2">
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
            onClick={() => setOpen(!open)}
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
