import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        background: '#1C2B1E',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '7px',
      }}
    >
      <svg viewBox="0 0 90 90" width="22" height="22">
        <path
          d="M 8 46 Q 8 78 45 78 Q 82 78 82 46"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <line x1="3" y1="46" x2="87" y2="46" stroke="white" strokeWidth="7" strokeLinecap="round" />
        <path d="M 51 44 L 40 22 L 48 22 L 36 4 L 56 26 L 47 26 Z" fill="#5C9E67" />
      </svg>
    </div>,
    { ...size }
  )
}
