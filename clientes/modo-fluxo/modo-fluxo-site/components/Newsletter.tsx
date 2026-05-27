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
    // Por enquanto simula sucesso após 1s
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus('success')
    setEmail('')
  }

  return (
    <section id="newsletter" className="relative rounded-2xl overflow-hidden border border-white/8">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-[#111827] to-purple-900/20" />
      <div className="relative px-6 py-10 sm:px-10 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-400/10 px-3 py-1.5 rounded-full mb-4">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          Newsletter gratuita
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          IA na prática, direto no seu email
        </h2>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Receba os melhores artigos, ferramentas e automações da semana. Sem spam, só o que vale a pena.
        </p>

        {status === 'success' ? (
          <div className="inline-flex items-center gap-2 text-green-400 bg-green-400/10 px-6 py-3 rounded-xl border border-green-400/20">
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
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold rounded-xl transition-colors text-sm whitespace-nowrap"
            >
              {status === 'loading' ? 'Enviando...' : 'Quero receber'}
            </button>
          </form>
        )}

        <p className="text-xs text-slate-600 mt-4">
          Cancele quando quiser. Sem spam.
        </p>
      </div>
    </section>
  )
}
