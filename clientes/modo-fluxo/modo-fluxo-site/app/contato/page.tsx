import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com o Modo Fluxo. Sugestões de pauta, parcerias ou dúvidas sobre os conteúdos.',
}

const topics = [
  { icon: '✍️', title: 'Sugestão de pauta', desc: 'Tem um tema sobre IA ou automação que quer ver coberto aqui?' },
  { icon: '🤝', title: 'Parcerias e patrocínios', desc: 'Quer divulgar uma ferramenta ou serviço para o nosso público?' },
  { icon: '🐛', title: 'Erro ou conteúdo desatualizado', desc: 'Encontrou algo errado em algum artigo? Avisa que a gente corrige.' },
  { icon: '💬', title: 'Qualquer outra coisa', desc: 'Quer trocar ideia? Fique à vontade para escrever.' },
]

export default function ContatoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#667085] mb-10">
        <Link href="/" className="hover:text-[#131924] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#131924]">Contato</span>
      </nav>

      {/* Hero */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full text-teal-700 bg-teal-50 mb-4">
          ✉️ Fale com a gente
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold text-[#131924] mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Contato
        </h1>
        <p className="text-lg text-[#667085] leading-relaxed">
          A melhor forma de entrar em contato é pelo email abaixo. Respondo em até 2 dias úteis.
        </p>
      </div>

      <div className="w-16 h-1 rounded-full mb-12" style={{ background: 'linear-gradient(135deg, #0E3A6E, #159BA8)' }} />

      {/* Email CTA */}
      <div
        className="rounded-xl p-8 mb-12 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #0E3A6E, #159BA8)' }}
      >
        <p className="text-white/80 text-sm mb-3">Email de contato</p>
        <a
          href="mailto:contato@modofluxo.com.br"
          className="text-xl font-bold hover:underline break-all"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          contato@modofluxo.com.br
        </a>
      </div>

      {/* Tópicos */}
      <h2
        className="text-xl font-bold text-[#131924] mb-6"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Para que você pode escrever
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {topics.map((t) => (
          <div key={t.title} className="border border-[#DDE3EB] rounded-xl p-5 bg-white">
            <div className="text-2xl mb-3">{t.icon}</div>
            <h3 className="font-semibold text-[#131924] mb-1 text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
              {t.title}
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* Nota */}
      <p className="text-sm text-[#667085]">
        Não respondemos solicitações de troca de links ou guest posts não solicitados.{' '}
        Para parcerias editoriais legítimas, apresente o contexto no email.
      </p>

    </div>
  )
}
