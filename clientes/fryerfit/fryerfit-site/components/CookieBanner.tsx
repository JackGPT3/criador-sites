'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) setVisible(true)
  }, [])

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted')
    setVisible(false)
  }

  function reject() {
    localStorage.setItem('cookie_consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 py-4"
      style={{ backgroundColor: 'var(--surface)', borderTop: '1px solid var(--divider)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-sm" style={{ color: 'var(--fg)', opacity: 0.85 }}>
          Usamos cookies para melhorar a experiência e exibir anúncios personalizados.{' '}
          <Link href="/politica-de-privacidade" className="underline" style={{ color: 'var(--accent)' }}>
            Saiba mais
          </Link>
          .
        </p>

        <div className="flex gap-2 shrink-0">
          <button
            onClick={reject}
            className="text-sm px-4 py-2 rounded-lg border cursor-pointer"
            style={{
              borderColor: 'var(--divider)',
              color: 'var(--subtle)',
              backgroundColor: 'transparent',
            }}
          >
            Rejeitar
          </button>
          <button
            onClick={accept}
            className="text-sm px-4 py-2 rounded-lg font-semibold cursor-pointer"
            style={{
              backgroundColor: 'var(--accent)',
              color: '#fff',
            }}
          >
            Aceitar cookies
          </button>
        </div>
      </div>
    </div>
  )
}
