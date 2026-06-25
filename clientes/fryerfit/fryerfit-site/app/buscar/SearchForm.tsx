'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

export function SearchForm({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    router.push(`/buscar?q=${encodeURIComponent(q)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md">
      <div
        className="flex items-center gap-2 flex-1 rounded-lg px-4 py-2.5 border"
        style={{ borderColor: 'var(--divider)', background: 'var(--bg)' }}
      >
        <span style={{ color: 'var(--subtle)' }}>
          <SearchIcon />
        </span>
        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ex: frango, batata-doce, atum..."
          className="flex-1 bg-transparent text-sm outline-none"
          style={{ color: 'var(--fg)' }}
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="text-xs cursor-pointer"
            style={{ color: 'var(--subtle)' }}
            aria-label="Limpar"
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer"
        style={{ background: 'var(--accent)', color: 'white' }}
      >
        Buscar
      </button>
    </form>
  )
}
