import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Modo Fluxo — IA aplicada na prática'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0E3A6E 0%, #159BA8 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Grid decorativo de fundo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 700,
              color: 'white',
            }}
          >
            MF
          </div>
          <span
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: 'white',
              letterSpacing: '-0.5px',
            }}
          >
            Modo Fluxo
          </span>
        </div>

        {/* Título */}
        <div
          style={{
            fontSize: '60px',
            fontWeight: 700,
            color: 'white',
            textAlign: 'center',
            lineHeight: 1.15,
            marginBottom: '24px',
            maxWidth: '900px',
          }}
        >
          Domine a IA e Automatize sua Produtividade
        </div>

        {/* Subtítulo */}
        <div
          style={{
            fontSize: '26px',
            color: 'rgba(255,255,255,0.75)',
            textAlign: 'center',
            maxWidth: '700px',
          }}
        >
          Artigos, tutoriais e reviews sobre IA e automação
        </div>

        {/* Tag */}
        <div
          style={{
            marginTop: '40px',
            padding: '10px 28px',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: 'white',
            fontSize: '20px',
            fontWeight: 600,
          }}
        >
          modofluxo.com.br
        </div>
      </div>
    ),
    { ...size }
  )
}
