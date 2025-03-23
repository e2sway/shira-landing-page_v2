/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
  },
  // Improve optimization for static assets
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion'],
  },
  // Ensure proper Vercel deployment
  output: 'standalone',
  // Disable source maps in production for better performance
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig 