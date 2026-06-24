import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Como o FryerFit coleta, usa e protege suas informações pessoais.',
  robots: { index: false, follow: false },
}

export default function PoliticaPrivacidadePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--fg)' }}>Política de Privacidade</h1>
      <p className="text-sm mb-8" style={{ color: 'var(--subtle)' }}>Última atualização: junho de 2026</p>

      <div style={{ color: 'var(--fg)' }}>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">1. Quem somos</h2>
          <p className="leading-relaxed">
            O FryerFit (fryerfit.com.br) é um blog de receitas fitness focado em eletrodomésticos. Não coletamos dados pessoais de forma ativa — você pode navegar, ler receitas e usar o site sem se cadastrar em nada.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">2. Cookies e publicidade</h2>
          <p className="leading-relaxed mb-3">
            Usamos o Google AdSense para exibir anúncios. O Google pode usar cookies para personalizar os anúncios que você vê com base no seu histórico de navegação.
          </p>
          <p className="leading-relaxed">
            Para saber mais sobre como o Google usa os dados coletados via AdSense, acesse a{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)' }}
            >
              Política de Privacidade do Google
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">3. Google Analytics</h2>
          <p className="leading-relaxed">
            Usamos o Google Analytics para entender como os visitantes navegam no site — páginas mais acessadas, tempo médio de visita, origem do tráfego. Os dados são anonimizados e usados apenas para melhorar o conteúdo. Você pode optar por não ser rastreado instalando o{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)' }}
            >
              complemento de desativação do Google Analytics
            </a>
            .
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">4. Dados que não coletamos</h2>
          <p className="leading-relaxed">
            O FryerFit não tem formulários de cadastro, área de membros ou coleta de e-mail. Não armazenamos dados pessoais identificáveis dos visitantes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">5. Links externos</h2>
          <p className="leading-relaxed">
            Algumas receitas ou conteúdos podem conter links para sites externos (como fabricantes de eletrodomésticos, lojas ou referências de produtos). Não somos responsáveis pelas políticas de privacidade desses sites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">6. Seus direitos (LGPD)</h2>
          <p className="leading-relaxed">
            Como não coletamos dados pessoais identificáveis, não há dados seus para acessar, corrigir ou excluir. Se você tiver dúvidas sobre o uso de cookies pelo Google, consulte as configurações de anúncios do seu perfil do Google.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">7. Contato</h2>
          <p className="leading-relaxed">
            Dúvidas sobre esta política:{' '}
            <a href="mailto:contato@fryerfit.com.br" style={{ color: 'var(--accent)' }}>
              contato@fryerfit.com.br
            </a>
          </p>
        </section>

      </div>
    </div>
  )
}
