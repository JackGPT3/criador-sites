import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'FryerFit — Receitas fitness sem fogão'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0F1410 0%, #1C2B1E 50%, #2D4A32 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo mark */}
        <div style={{ display: 'flex', marginBottom: 32 }}>
          <svg width="80" height="80" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="22" r="11" stroke="white" strokeWidth="2.5" fill="none" />
            <path d="M10 22 Q18 14 26 22" stroke="white" strokeWidth="2" fill="none" />
            <line x1="18" y1="3" x2="18" y2="11" stroke="#7DC98A" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="14,11 22,11 18,18" fill="#7DC98A" />
          </svg>
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-2px',
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          FryerFit
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.65)',
            fontWeight: 400,
            textAlign: 'center',
            maxWidth: 700,
            lineHeight: 1.4,
          }}
        >
          Receitas fitness para air fryer, micro-ondas e eletrodomésticos.
        </div>

        {/* Accent line */}
        <div
          style={{
            marginTop: 36,
            width: 80,
            height: 4,
            background: '#5C9E67',
            borderRadius: 2,
          }}
        />
      </div>
    ),
    { ...size }
  )
}
