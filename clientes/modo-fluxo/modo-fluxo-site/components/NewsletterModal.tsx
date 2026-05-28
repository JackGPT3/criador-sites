'use client'

import { useState, useEffect } from 'react'

interface NewsletterModalProps {
  onClose: () => void
}

export default function NewsletterModal({ onClose }: NewsletterModalProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: 'linear-gradient(135deg, #0E3A6E, #159BA8)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="px-8 py-10 text-center">
          <div className="text-4xl mb-4">📩</div>
          <h2
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            IA na prática, direto no seu email
          </h2>
          <p className="text-white/80 text-sm mb-6">
            Receba os melhores artigos, ferramentas e automações da semana. Sem spam, só o que vale a pena.
          </p>

          {status === 'success' ? (
            <div className="inline-flex items-center gap-2 text-white bg-white/20 px-6 py-3 rounded-lg">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Inscrição feita! Obrigado 🎉
            </div>
          ) : (
            <>
              {status === 'error' && (
                <p className="text-xs text-red-300 mb-3">Erro ao inscrever. Tente novamente.</p>
              )}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  autoFocus
                  className="flex-1 px-4 py-2.5 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/50 text-sm"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-2.5 bg-white text-[#131924] font-semibold rounded-lg hover:bg-[#E6EBF0] disabled:opacity-60 transition-colors text-sm whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {status === 'loading' ? 'Enviando...' : 'Quero receber'}
                </button>
              </form>
            </>
          )}

          <p className="text-xs text-white/50 mt-4">Cancele quando quiser. Sem spam.</p>
        </div>
      </div>
    </div>
  )
}
