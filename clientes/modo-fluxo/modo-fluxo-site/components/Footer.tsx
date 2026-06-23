import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#DDE3EB] bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <Link href="/" className="flex items-center gap-1 mb-4">
              <span
                className="font-bold text-xl bg-gradient-to-r from-[#0E3A6E] to-[#159BA8] bg-clip-text text-transparent"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Modo
              </span>
              <span
                className="font-bold text-xl text-[#131924]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {' '}Fluxo
              </span>
            </Link>
            <p className="text-sm text-[#667085] leading-relaxed">
              IA aplicada na prática: agentes, automações e ferramentas para transformar produtividade e escalar negócios.
            </p>
          </div>

          <div>
            <h3
              className="text-sm font-semibold text-[#131924] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Categorias
            </h3>
            <ul className="space-y-2.5">
              {Object.entries(CATEGORIES).map(([slug, cat]) => (
                <li key={slug}>
                  <Link
                    href={`/categoria/${slug}`}
                    className="text-sm text-[#667085] hover:text-[#131924] transition-colors flex items-center gap-2"
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-sm font-semibold text-[#131924] mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-[#667085] hover:text-[#131924] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/sobre" className="text-sm text-[#667085] hover:text-[#131924] transition-colors">Sobre</Link>
              </li>
              <li>
                <Link href="/#newsletter" className="text-sm text-[#667085] hover:text-[#131924] transition-colors">Newsletter</Link>
              </li>
              <li>
                <Link href="/contato" className="text-sm text-[#667085] hover:text-[#131924] transition-colors">Contato</Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="text-sm text-[#667085] hover:text-[#131924] transition-colors">Política de Privacidade</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#DDE3EB] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#667085]">
            © {year} Modo Fluxo. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/sobre" className="text-xs text-[#667085] hover:text-[#131924] transition-colors">Sobre</Link>
            <Link href="/contato" className="text-xs text-[#667085] hover:text-[#131924] transition-colors">Contato</Link>
            <Link href="/politica-de-privacidade" className="text-xs text-[#667085] hover:text-[#131924] transition-colors">Privacidade</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
