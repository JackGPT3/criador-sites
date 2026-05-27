import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade do Modo Fluxo — como coletamos, usamos e protegemos seus dados.',
}

export default function PoliticaPrivacidadePage() {
  const updated = '27 de maio de 2026'

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#667085] mb-10">
        <Link href="/" className="hover:text-[#131924] transition-colors">Home</Link>
        <span>/</span>
        <span className="text-[#131924]">Política de Privacidade</span>
      </nav>

      <h1
        className="text-3xl sm:text-4xl font-bold text-[#131924] mb-3"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        Política de Privacidade
      </h1>
      <p className="text-sm text-[#667085] mb-10">Última atualização: {updated}</p>

      <div className="prose max-w-none">

        <p>
          O <strong>Modo Fluxo</strong> (modofluxo.com.br) leva a privacidade dos seus visitantes a sério.
          Esta política explica quais dados coletamos, como os utilizamos e quais são seus direitos,
          em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
        </p>

        <h2>1. Dados coletados</h2>
        <p>Podemos coletar as seguintes informações:</p>
        <ul>
          <li><strong>Endereço de email</strong> — quando você se inscreve na newsletter voluntariamente.</li>
          <li><strong>Dados de navegação</strong> — via Google Analytics e Google AdSense (páginas visitadas, tempo de visita, origem do tráfego). Esses dados são anonimizados e agregados.</li>
          <li><strong>Cookies</strong> — utilizados por serviços de publicidade (Google AdSense) e análise (Google Analytics) para personalização e medição de audiência.</li>
        </ul>

        <h2>2. Como usamos seus dados</h2>
        <ul>
          <li>Envio da newsletter, quando solicitado por você</li>
          <li>Melhoria do conteúdo e da experiência do site</li>
          <li>Exibição de anúncios relevantes via Google AdSense</li>
          <li>Análise de desempenho do site via Google Analytics</li>
        </ul>

        <h2>3. Cookies e tecnologias de rastreamento</h2>
        <p>
          Este site utiliza cookies de terceiros. Os principais são:
        </p>
        <ul>
          <li><strong>Google Analytics</strong> — rastreia o comportamento de navegação de forma anonimizada para fins estatísticos.</li>
          <li><strong>Google AdSense</strong> — exibe anúncios com base em interesses e comportamento de navegação. Para mais informações, consulte a <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Política de Privacidade do Google</a>.</li>
        </ul>
        <p>
          Você pode desativar os cookies nas configurações do seu navegador, mas isso pode afetar a
          funcionalidade de algumas partes do site.
        </p>

        <h2>4. Compartilhamento de dados</h2>
        <p>
          Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto
          quando necessário para operar os serviços descritos acima (Google Analytics, Google AdSense,
          serviço de newsletter).
        </p>

        <h2>5. Seus direitos (LGPD)</h2>
        <p>Com base na LGPD, você tem direito a:</p>
        <ul>
          <li>Confirmar a existência de tratamento de seus dados</li>
          <li>Acessar seus dados</li>
          <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
          <li>Solicitar a exclusão dos seus dados</li>
          <li>Revogar o consentimento a qualquer momento</li>
        </ul>
        <p>
          Para exercer qualquer desses direitos, entre em contato pelo email{' '}
          <a href="mailto:contato@modofluxo.com.br">contato@modofluxo.com.br</a>.
        </p>

        <h2>6. Newsletter</h2>
        <p>
          Ao se inscrever na newsletter, você consente com o recebimento de emails sobre conteúdos,
          ferramentas e novidades relacionados a IA e automação. Você pode cancelar a inscrição a
          qualquer momento clicando no link de descadastro presente em todo email enviado.
        </p>

        <h2>7. Links externos</h2>
        <p>
          Este site pode conter links para sites de terceiros. Não nos responsabilizamos pelas
          práticas de privacidade desses sites. Recomendamos que você leia as políticas de
          privacidade de cada site que visitar.
        </p>

        <h2>8. Alterações nesta política</h2>
        <p>
          Esta política pode ser atualizada periodicamente. Alterações significativas serão
          comunicadas no próprio site. O uso continuado do site após as alterações implica
          concordância com a política atualizada.
        </p>

        <h2>9. Contato</h2>
        <p>
          Dúvidas sobre esta política? Entre em contato:{' '}
          <a href="mailto:contato@modofluxo.com.br">contato@modofluxo.com.br</a>
        </p>

      </div>
    </div>
  )
}
