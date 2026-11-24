import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  serverExternalPackages: ["node:sqlite"],
  turbopack: {
    root: path.resolve(__dirname),
  },
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "127.0.0.1:3000",
    "localhost:3000",
    "nitinagga.c.googlers.com",
    "*.proxy.googlers.com",
  ],
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: false,
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
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: data: https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://viewer.diagrams.net https://accounts.google.com https://apis.google.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https:",
              "frame-src 'self' blob: data: https://embed.diagrams.net https://app.diagrams.net https://viewer.diagrams.net https://docs.google.com https://drive.google.com https://accounts.google.com",
              "frame-ancestors 'self' https://embed.diagrams.net https://app.diagrams.net https://docs.google.com https://drive.google.com https://*.google.com https://*.googleusercontent.com",
              "child-src 'self' blob: data:",
              "worker-src 'self' blob: data:",
              "connect-src 'self' ws: wss: https://*.proxy.googlers.com https://generativelanguage.googleapis.com https://*.googleapis.com https://api.iconify.design https://raw.githubusercontent.com"
            ].join('; ')
          }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/studio',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/canvas',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/workspace',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/history',
        destination: '/library',
        permanent: true,
      },
      {
        source: '/canonical-templates',
        destination: '/canonical',
        permanent: true,
      },
      {
        source: '/blueprints',
        destination: '/canonical',
        permanent: true,
      },
      {
        source: '/templates',
        destination: '/canonical',
        permanent: true,
      },
      {
        source: '/gallery',
        destination: '/canonical',
        permanent: true,
      },
      {
        source: '/compare-diagrams',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/studio2',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/studio3',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/studioprod',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/pv-case-processing',
        destination: '/docgen',
        permanent: true,
      },
      {
        source: '/test-status',
        destination: '/audit?tab=health',
        permanent: true,
      },
    ];
  }
};

export default nextConfig;

