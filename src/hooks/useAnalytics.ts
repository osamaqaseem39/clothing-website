'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { analytics } from '@/lib/analytics'

export const useAnalytics = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Track page views
  useEffect(() => {
    const page = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    analytics.trackPageView(page)
  }, [pathname, searchParams])

  const trackSearch = (query: string) => {
    analytics.trackSearch(query)
  }

  const trackProductView = (productId: string, category: string, brand: string) => {
    analytics.trackProductView(productId, category, brand)
  }

  const trackCartAction = (productId: string, action: 'add' | 'remove' | 'view') => {
    analytics.trackCartAction(productId, action)
  }

  const updatePreferences = (preferences: {
    priceRange?: [number, number]
    preferredCategories?: string[]
    preferredBrands?: string[]
    preferredColors?: string[]
    preferredSizes?: string[]
  }) => {
    analytics.updatePreferences(preferences)
  }

  const getRecommendations = () => {
    return analytics.getRecommendations()
  }

  const getAnalyticsSummary = () => {
    return analytics.getAnalyticsSummary()
  }

  const getUserBehavior = () => {
    return analytics.getUserBehavior()
  }

  const clearUserData = () => {
    analytics.clearUserData()
  }

  return {
    trackSearch,
    trackProductView,
    trackCartAction,
    updatePreferences,
    getRecommendations,
    getAnalyticsSummary,
    getUserBehavior,
    clearUserData
  }
}
