import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["node:sqlite"],
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: https:",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: data: https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://viewer.diagrams.net https://*",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*",
              "font-src 'self' https://fonts.gstatic.com data: https://*",
              "img-src 'self' data: blob: https:",
              "frame-src 'self' blob: data: https://embed.diagrams.net https://app.diagrams.net https://viewer.diagrams.net https://*",
              "child-src 'self' blob: data:",
              "worker-src 'self' blob: data:",
              "connect-src 'self' ws: wss: https://*.proxy.googlers.com https://generativelanguage.googleapis.com https://api.iconify.design https://raw.githubusercontent.com https://*"
            ].join('; ')
          }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/canonical-templates',
        destination: '/diablueprint',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;

