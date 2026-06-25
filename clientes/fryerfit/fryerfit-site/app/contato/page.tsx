import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com o FryerFit. Dúvidas, sugestões de receita ou feedback.',
  alternates: { canonical: 'https://fryerfit.com.br/contato' },
  openGraph: {
    title: 'Contato | FryerFit',
    description: 'Entre em contato com o FryerFit.',
    url: 'https://fryerfit.com.br/contato',
  },
}

export default function ContatoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--fg)' }}>Contato</h1>

      <p className="leading-relaxed mb-8" style={{ color: 'var(--fg)' }}>
        Tem uma sugestão de receita, encontrou algum erro ou quer dar feedback? Manda uma mensagem.
      </p>

      <div className="mb-4" style={{ color: 'var(--fg)' }}>
        <p className="font-semibold mb-1">E-mail</p>
        <a
          href="mailto:contato@fryerfit.com.br"
          className="text-lg"
          style={{ color: 'var(--accent)' }}
        >
          contato@fryerfit.com.br
        </a>
      </div>

      <p className="text-sm mt-10" style={{ color: 'var(--subtle)' }}>
        Respondemos em até 48 horas.
      </p>
    </div>
  )
}
