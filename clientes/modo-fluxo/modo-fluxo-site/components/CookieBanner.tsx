'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem('cookie-consent', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#DDE3EB] bg-white px-4 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-sm text-[#667085] text-center sm:text-left">
          Usamos cookies para melhorar sua experiência.{' '}
          <Link href="/politica-de-privacidade" className="text-[#0E3A6E] underline underline-offset-2 hover:text-[#159BA8] transition-colors">
            Saiba mais
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="shrink-0 rounded-lg bg-[#0E3A6E] px-5 py-2 text-sm font-medium text-white hover:bg-[#159BA8] transition-colors cursor-pointer"
        >
          Aceitar
        </button>
      </div>
    </div>
  )
}
