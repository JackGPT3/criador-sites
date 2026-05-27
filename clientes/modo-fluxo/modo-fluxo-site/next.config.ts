import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Evita que o browser "adivinhe" o tipo MIME
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Impede o site de ser embutido em iframes (clickjacking)
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Força HTTPS por 1 ano
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          // Controla quais informações de referência são enviadas
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Desativa acesso a câmera, microfone e geolocalização
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
};

export default nextConfig;
