'use client'

import React, { useState, useEffect } from 'react'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { Product } from '@/lib/api'
import { apiClient } from '@/lib/api'
import Hero from './Hero'
import PersonalizedRecommendations from './PersonalizedRecommendations'
import FeaturedProducts from './FeaturedProducts'
import CategoryGrid from './CategoryGrid'
import SmartSearch from './SmartSearch'
import Brands from './Brands'

const PersonalizedHomepage: React.FC = () => {
  const { userProfile, trackEvent } = useAnalytics()
  const [personalizedContent, setPersonalizedContent] = useState({
    heroMessage: '',
    recommendedCategories: [] as string[],
    trendingProducts: [] as Product[],
    personalizedOffers: [] as string[],
    showSearch: true,
    showCategories: true,
    showRecommendations: true
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadPersonalizedContent()
  }, [userProfile])

  const loadPersonalizedContent = async () => {
    try {
      setLoading(true)

      if (!userProfile) {
        // Default content for new users
        setPersonalizedContent({
          heroMessage: 'Discover Your Perfect Style',
          recommendedCategories: ['evening-wear', 'day-dresses', 'couture'],
          trendingProducts: [],
          personalizedOffers: ['Welcome Offer: 10% off your first order'],
          showSearch: true,
          showCategories: true,
          showRecommendations: true
        })
        return
      }

      // Generate personalized content based on user profile
      const content = await generatePersonalizedContent()
      setPersonalizedContent(content)

    } catch (error) {
      console.error('Error loading personalized content:', error)
    } finally {
      setLoading(false)
    }
  }

  const generatePersonalizedContent = async () => {
    if (!userProfile) return {
      heroMessage: 'Discover Your Perfect Style',
      recommendedCategories: [],
      trendingProducts: [],
      personalizedOffers: [],
      showSearch: true,
      showCategories: true,
      showRecommendations: true
    }

    const content = {
      heroMessage: generateHeroMessage(),
      recommendedCategories: userProfile.preferences.favoriteCategories,
      trendingProducts: [] as Product[],
      personalizedOffers: userProfile.recommendations.personalizedOffers,
      showSearch: true,
      showCategories: userProfile.behavior.totalVisits > 1,
      showRecommendations: userProfile.behavior.totalVisits > 0
    }

    // Load trending products based on user preferences
    try {
      const trendingResponse = await apiClient.getTrendingProducts()
      content.trendingProducts = (trendingResponse as any).data.slice(0, 4)
    } catch (error) {
      console.error('Error loading trending products:', error)
    }

    return content
  }

  const generateHeroMessage = (): string => {
    if (!userProfile) return 'Discover Your Perfect Style'

    const messages = []

    // Based on visit frequency
    if (userProfile.behavior.totalVisits > 10) {
      messages.push('Welcome back!')
    } else if (userProfile.behavior.totalVisits > 3) {
      messages.push('We\'re getting to know your style!')
    } else {
      messages.push('Discover your perfect style!')
    }

    // Based on preferences
    if (userProfile.preferences.favoriteCategories.length > 0) {
      const category = userProfile.preferences.favoriteCategories[0]
      messages.push(`Curated ${category} pieces for you`)
    }

    // Based on location
    if (userProfile.location) {
      messages.push(`Perfect for ${userProfile.location.city}`)
    }

    // Based on purchase history
    if (userProfile.behavior.purchaseHistory.totalPurchases > 0) {
      messages.push('Based on your previous purchases')
    }

    return messages.join(' • ')
  }

  const handleSearch = (query: string, results: Product[]) => {
    // Track search event
    trackEvent({
      type: 'search',
      data: { query },
      timestamp: new Date().toISOString(),
      sessionId: ''
    })
  }

  const handleProductClick = (product: Product) => {
    trackEvent({
      type: 'product_view',
      data: { product },
      timestamp: new Date().toISOString(),
      sessionId: ''
    })
  }

  const handleCategoryClick = (category: string) => {
    trackEvent({
      type: 'category_click',
      data: { category },
      timestamp: new Date().toISOString(),
      sessionId: ''
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <Hero />

      {/* Personalized Offers */}
      {personalizedContent.personalizedOffers.length > 0 && (
        <div className="bg-primary-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-lg font-medium">
                {personalizedContent.personalizedOffers[0]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Smart Search */}
      {personalizedContent.showSearch && (
        <div className="py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Find Your Perfect Style
              </h2>
              <p className="text-gray-600">
                {userProfile ? 'Search powered by your preferences' : 'Discover our curated collection'}
              </p>
            </div>
            <SmartSearch onSearch={handleSearch} />
          </div>
        </div>
      )}

      {/* Personalized Recommendations */}
      {personalizedContent.showRecommendations && (
        <PersonalizedRecommendations 
          title={userProfile ? "Recommended for You" : "Trending Now"}
          maxItems={8}
          showPersonalizedMessage={!!userProfile}
        />
      )}

      {/* Categories */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {userProfile ? "Your Favorite Categories" : "Shop by Category"}
            </h2>
          </div>
          <CategoryGrid showHeader={false} />
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {userProfile ? "Trending in Your Style" : "Featured Products"}
            </h2>
          </div>
          <FeaturedProducts showHeader={false} />
        </div>
      </div>

      {/* Brands */}
      <Brands />

      {/* User Profile Insights */}
      {userProfile && (
        <div className="py-8 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-lg font-medium text-primary-900 mb-2">
                Your Style Profile
              </h3>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-primary-700">
                {userProfile.preferences.favoriteCategories.length > 0 && (
                  <span className="bg-primary-100 px-3 py-1 rounded-full">
                    {userProfile.preferences.favoriteCategories.length} Favorite Categories
                  </span>
                )}
                {userProfile.preferences.favoriteColors.length > 0 && (
                  <span className="bg-primary-100 px-3 py-1 rounded-full">
                    {userProfile.preferences.favoriteColors.length} Favorite Colors
                  </span>
                )}
                {userProfile.behavior.totalVisits > 0 && (
                  <span className="bg-primary-100 px-3 py-1 rounded-full">
                    {userProfile.behavior.totalVisits} Visits
                  </span>
                )}
                {userProfile.location && (
                  <span className="bg-primary-100 px-3 py-1 rounded-full">
                    From {userProfile.location.city}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PersonalizedHomepage
