/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Define page extensions to prioritize .js over .tsx
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  // Explicitly exclude .tsx files for the problematic routes
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configure images for Vercel
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    dangerouslyAllowSVG: true,
    domains: ['localhost'],
  },
  // Production-optimized experimental features
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
  },
}

export default nextConfig
