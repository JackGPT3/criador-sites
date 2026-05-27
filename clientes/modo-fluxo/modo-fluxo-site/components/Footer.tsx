import Link from 'next/link'
import { CATEGORIES } from '@/lib/categories'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/8 bg-[#080E1E] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm">
                MF
              </div>
              <span className="font-bold text-xl text-white">Modo Fluxo</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              IA aplicada na prática: agentes, automações e ferramentas para transformar produtividade e escalar negócios.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Categorias</h3>
            <ul className="space-y-2.5">
              {Object.entries(CATEGORIES).map(([slug, cat]) => (
                <li key={slug}>
                  <Link
                    href={`/categoria/${slug}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                  >
                    <span>{cat.emoji}</span>
                    <span>{cat.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Links</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-slate-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#newsletter" className="text-sm text-slate-400 hover:text-white transition-colors">Newsletter</Link>
              </li>
              <li>
                <Link href="/sitemap.xml" className="text-sm text-slate-400 hover:text-white transition-colors">Sitemap</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © {year} Modo Fluxo. Todos os direitos reservados.
          </p>
          <p className="text-xs text-slate-600">
            Feito com Next.js + Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}
