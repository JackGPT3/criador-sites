import Link from 'next/link'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer
      className="border-t mt-auto"
      style={{ borderColor: 'var(--divider)' }}
    >
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

        <div className="flex items-center gap-2">
          <Logo size={24} />
          <span className="font-bold text-base" style={{ color: 'var(--fg)' }}>
            Fryer<span style={{ color: 'var(--accent)' }}>Fit</span>
          </span>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm" style={{ color: 'var(--subtle)' }}>
          <Link href="/sobre" className="hover:underline">Sobre</Link>
          <Link href="/contato" className="hover:underline">Contato</Link>
          <Link href="/politica-de-privacidade" className="hover:underline">Privacidade</Link>
          <Link href="/aparelhos/air-fryer" className="hover:underline">Air Fryer</Link>
          <Link href="/objetivos/low-carb" className="hover:underline">Low Carb</Link>
          <Link href="/objetivos/alta-proteina" className="hover:underline">Alta Proteína</Link>
        </nav>

        <p className="text-xs" style={{ color: 'var(--subtle)' }}>
          © {new Date().getFullYear()} FryerFit
        </p>
      </div>
    </footer>
  )
}
