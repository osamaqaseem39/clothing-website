'use client'

import { useEffect, useCallback } from 'react'
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

  const trackSearch = useCallback((query: string) => {
    analytics.trackSearch(query)
  }, [])

  const trackProductView = useCallback((productId: string, category: string, brand: string) => {
    analytics.trackProductView(productId, category, brand)
  }, [])

  const trackCartAction = useCallback((productId: string, action: 'add' | 'remove' | 'view') => {
    analytics.trackCartAction(productId, action)
  }, [])

  const updatePreferences = useCallback((preferences: {
    priceRange?: [number, number]
    preferredCategories?: string[]
    preferredBrands?: string[]
    preferredColors?: string[]
    preferredSizes?: string[]
  }) => {
    analytics.updatePreferences(preferences)
  }, [])

  const getRecommendations = useCallback(() => {
    return analytics.getRecommendations()
  }, [])

  const getAnalyticsSummary = useCallback(() => {
    return analytics.getAnalyticsSummary()
  }, [])

  const getUserBehavior = useCallback(() => {
    return analytics.getUserBehavior()
  }, [])

  const clearUserData = useCallback(() => {
    analytics.clearUserData()
  }, [])

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
