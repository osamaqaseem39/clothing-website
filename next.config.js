/** @type {import('next').NextConfig} */
const backendBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

// Extract domain from backend URL if it's a full URL
const getImageDomains = () => {
  const domains = ['images.unsplash.com', 'via.placeholder.com', 'st.osamaqaseem.online']
  
  // If backend URL is a full URL, extract the domain
  if (backendBase.startsWith('http')) {
    try {
      const url = new URL(backendBase)
      const hostname = url.hostname
      // Remove 'api' suffix if present
      const domain = hostname.replace(/\.api$/, '')
      if (!domains.includes(domain) && !domains.includes(hostname)) {
        domains.push(hostname)
        domains.push(domain)
      }
    } catch (e) {
      // Invalid URL, ignore
    }
  }
  
  return domains
}

const nextConfig = {
  images: {
    domains: getImageDomains(),
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  async rewrites() {
    // Proxy frontend calls like /api/... to the backend API
    return [
      {
        source: '/api/:path*',
        destination: `${backendBase.replace(/\/$/, '')}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig