'use client'

import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    // TODO: conectar ao MailerLite/Brevo/ConvertKit
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus('success')
    setEmail('')
  }

  return (
    <section id="newsletter" className="rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0E3A6E, #159BA8)' }}>
      <div className="px-8 py-10 sm:px-12 text-center">
        <h2
          className="text-2xl sm:text-3xl font-bold text-white mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          IA na prática, direto no seu email
        </h2>
        <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">
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
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
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
        )}

        <p className="text-xs text-white/50 mt-4">
          Cancele quando quiser. Sem spam.
        </p>
      </div>
    </section>
  )
}
