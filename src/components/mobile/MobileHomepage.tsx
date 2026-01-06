'use client'

import React, { useState, useEffect } from 'react'
import { Award, Grid3X3 } from 'lucide-react'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import MobileHero from './MobileHero'
import MobileFeaturedProducts from './MobileFeaturedProducts'
import MobileCategoryGrid from './MobileCategoryGrid'
import { useProducts } from '@/contexts/ProductsContext'
import PersonalizedRecommendations from '../PersonalizedRecommendations'
import Brands from '../Brands'
import OurProducts from '../OurProducts'

const MobileHomepage: React.FC = () => {
  const { userProfile, trackEvent } = useAnalytics()
  const { products: allProducts } = useProducts()
  const [personalizedContent, setPersonalizedContent] = useState({
    heroMessage: '',
    recommendedCategories: [] as string[],
    personalizedOffers: [] as string[],
    showCategories: true,
    showRecommendations: true
  })
  const [loading, setLoading] = useState(true)

  const hasFeaturedProducts = allProducts.some(product => {
    return (product.rating && product.rating >= 4.5) || 
           (product.reviews && product.reviews >= 10) ||
           product.isNew === true
  })

  useEffect(() => {
    loadPersonalizedContent()
  }, [userProfile])

  const loadPersonalizedContent = async () => {
    try {
      setLoading(true)

      if (!userProfile) {
        setPersonalizedContent({
          heroMessage: 'Discover Your Perfect Style',
          recommendedCategories: ['evening-wear', 'day-dresses', 'couture'],
          personalizedOffers: ['Welcome Offer: 10% off your first order'],
          showCategories: true,
          showRecommendations: true
        })
        return
      }

      const content = generatePersonalizedContent()
      setPersonalizedContent(content)

    } catch (error) {
      console.error('Error loading personalized content:', error)
    } finally {
      setLoading(false)
    }
  }

  const generatePersonalizedContent = () => {
    if (!userProfile) return {
      heroMessage: 'Discover Your Perfect Style',
      recommendedCategories: [],
      personalizedOffers: [],
      showCategories: true,
      showRecommendations: true
    }

    return {
      heroMessage: generateHeroMessage(),
      recommendedCategories: userProfile.preferences.favoriteCategories,
      personalizedOffers: userProfile.recommendations.personalizedOffers,
      showCategories: userProfile.behavior.totalVisits > 1,
      showRecommendations: userProfile.behavior.totalVisits > 0
    }
  }

  const generateHeroMessage = (): string => {
    if (!userProfile) return 'Discover Your Perfect Style'

    const messages = []

    if (userProfile.behavior.totalVisits > 10) {
      messages.push('Welcome back!')
    } else if (userProfile.behavior.totalVisits > 3) {
      messages.push('We\'re getting to know your style!')
    } else {
      messages.push('Discover your perfect style!')
    }

    if (userProfile.preferences.favoriteCategories.length > 0) {
      const category = userProfile.preferences.favoriteCategories[0]
      messages.push(`Curated ${category} pieces for you`)
    }

    if (userProfile.location) {
      messages.push(`Perfect for ${userProfile.location.city}`)
    }

    if (userProfile.behavior.purchaseHistory.totalPurchases > 0) {
      messages.push('Based on your previous purchases')
    }

    return messages.join(' • ')
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
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
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
      <MobileHero />

      {/* Personalized Offers */}
      {personalizedContent.personalizedOffers.length > 0 && (
        <div className="bg-primary-600 text-white py-3">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <p className="text-sm font-medium">
                {personalizedContent.personalizedOffers[0]}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Personalized Recommendations */}
      {personalizedContent.showRecommendations && (
        <div className="py-6 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <PersonalizedRecommendations 
              title={"Trending Now"}
              maxItems={4}
              showPersonalizedMessage={false}
            />
          </div>
        </div>
      )}

      {/* Featured Products */}
      {hasFeaturedProducts && (
        <MobileFeaturedProducts showHeader={true} />
      )}

      {/* Our Products - Category wise in carousel */}
      <div className="py-6 bg-gray-50">
        <OurProducts />
      </div>

      {/* Categories */}
      <div className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
              <Grid3X3 className="h-6 w-6 text-primary-600" />
              Shop by Category
            </h2>
            <p className="text-sm text-gray-600 px-4">
              Explore curated collections tailored to every style and occasion.
            </p>
          </div>
          <MobileCategoryGrid showHeader={false} />
        </div>
      </div>

      {/* Brands */}
      <div className="py-6 bg-gray-50">
        <Brands />
      </div>
    </div>
  )
}

export default MobileHomepage

