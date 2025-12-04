'use client'

import { useEffect } from 'react'

export default function PerformanceOptimizations() {
  useEffect(() => {
    // Add preconnect links for faster resource loading
    const links = [
      { rel: 'preconnect', href: 'https://st.osamaqaseem.online', crossOrigin: 'anonymous' },
      { rel: 'dns-prefetch', href: 'https://st.osamaqaseem.online' },
      { rel: 'preconnect', href: 'https://clothing-server-cyan.vercel.app', crossOrigin: 'anonymous' },
      { rel: 'dns-prefetch', href: 'https://clothing-server-cyan.vercel.app' },
    ]

    links.forEach(({ rel, href, crossOrigin }) => {
      const link = document.createElement('link')
      link.rel = rel
      link.href = href
      if (crossOrigin) {
        link.crossOrigin = crossOrigin
      }
      document.head.appendChild(link)
    })

    return () => {
      // Cleanup on unmount
      links.forEach(({ rel, href }) => {
        const existingLink = document.querySelector(`link[rel="${rel}"][href="${href}"]`)
        if (existingLink) {
          existingLink.remove()
        }
      })
    }
  }, [])

  return null
}


