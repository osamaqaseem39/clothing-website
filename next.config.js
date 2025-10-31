/** @type {import('next').NextConfig} */
const backendBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'st.osamaqaseem.online'],
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