import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre o Modo Fluxo',
  description: 'Conheça o Modo Fluxo — o projeto que transforma conhecimento sobre IA e automação em resultados práticos.',
}

export default function SobrePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#667085] mb-10">
        <Link href="/" className="hover:text-[#131924] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#131924]">Sobre</span>
      </nav>

      {/* Hero da página */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full text-teal-700 bg-teal-50 mb-4">
          👋 Olá
        </div>
        <h1
          className="text-3xl sm:text-4xl font-bold text-[#131924] mb-4 leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Sobre o Modo Fluxo
        </h1>
        <p className="text-lg text-[#667085] leading-relaxed">
          Um projeto dedicado a transformar o conhecimento sobre Inteligência Artificial
          e automação em resultados práticos — sem enrolação, sem teoria pelo amor da teoria.
        </p>
      </div>

      {/* Divisor decorativo */}
      <div className="w-16 h-1 rounded-full mb-12" style={{ background: 'linear-gradient(135deg, #0E3A6E, #159BA8)' }} />

      {/* Conteúdo */}
      <div className="prose max-w-none">

        <h2>O que é o Modo Fluxo?</h2>
        <p>
          O Modo Fluxo é um blog sobre IA aplicada, automação e produtividade. Aqui você encontra
          artigos, tutoriais e reviews sobre as ferramentas que realmente fazem diferença no dia a dia
          — seja para profissionais, empreendedores ou qualquer pessoa que queira trabalhar de forma
          mais inteligente.
        </p>

        <h2>Sobre quem escreve aqui</h2>
        <p>
          Sou apaixonada por tecnologia e por tornar coisas complexas acessíveis. Trabalho com IA e
          automação há anos e criei o Modo Fluxo para compartilhar o que aprendo na prática — não o
          que os press releases dizem, mas o que de fato funciona.
        </p>
        <p>
          Se você quer saber como usar ChatGPT, Claude, Make, Zapier ou qualquer outra ferramenta de
          forma estratégica e produtiva, você está no lugar certo.
        </p>

        <h2>O que você vai encontrar aqui</h2>
        <ul>
          <li><strong>Tutoriais práticos</strong> — passo a passo real, sem pular etapas</li>
          <li><strong>Reviews honestas</strong> — pontos positivos e negativos das ferramentas</li>
          <li><strong>Notícias filtradas</strong> — só o que importa de verdade no universo de IA</li>
          <li><strong>Automação acessível</strong> — para quem não é desenvolvedor, mas quer resultado</li>
        </ul>

        <h2>Contato</h2>
        <p>
          Tem sugestão de pauta, quer uma parceria ou simplesmente quer trocar ideia?
          Me escreve em <a href="mailto:contato@modofluxo.com.br">contato@modofluxo.com.br</a>.
        </p>

      </div>

      {/* CTA Newsletter */}
      <div
        className="mt-12 rounded-xl p-8 text-center text-white"
        style={{ background: 'linear-gradient(135deg, #0E3A6E, #159BA8)' }}
      >
        <h3
          className="text-xl font-bold mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Receba os melhores artigos
        </h3>
        <p className="text-white/80 text-sm mb-5">
          Toda semana, o melhor sobre IA e automação direto no seu email.
        </p>
        <Link
          href="/#newsletter"
          className="inline-block px-6 py-2.5 bg-white text-[#131924] font-semibold text-sm rounded-lg hover:bg-[#E6EBF0] transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Quero me inscrever
        </Link>
      </div>

    </div>
  )
}
