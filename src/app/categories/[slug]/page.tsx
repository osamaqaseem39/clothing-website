'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import LoadingSpinner from '@/components/LoadingSpinner'

export default function CategoryDetailPage() {
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    // Redirect to shop page with category filter
    if (params.slug) {
      router.replace(`/shop?category=${params.slug}`)
    }
  }, [params.slug, router])

  // Show loading while redirecting
  return <LoadingSpinner />
}
