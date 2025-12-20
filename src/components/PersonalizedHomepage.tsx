'use client'

import React, { useState, useEffect } from 'react'
import { Award, Grid3X3 } from 'lucide-react'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import Hero from './Hero'
import PersonalizedRecommendations from './PersonalizedRecommendations'
import FeaturedProducts from './FeaturedProducts'
import CategoryGrid from './CategoryGrid'
import Brands from './Brands'
import OurProducts from './OurProducts'
import { useProducts } from '@/contexts/ProductsContext'

const PersonalizedHomepage: React.FC = () => {
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

  // Check if there are featured products
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
        // Default content for new users
        setPersonalizedContent({
          heroMessage: 'Discover Your Perfect Style',
          recommendedCategories: ['evening-wear', 'day-dresses', 'couture'],
          personalizedOffers: ['Welcome Offer: 10% off your first order'],
          showCategories: true,
          showRecommendations: true
        })
        return
      }

      // Generate personalized content based on user profile
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


      {/* Personalized Recommendations */}
      {personalizedContent.showRecommendations && (
        <PersonalizedRecommendations 
          title={"Trending Now"}
          maxItems={8}
          showPersonalizedMessage={false}
        />
      )}

      

      {/* Featured Products */}
      {hasFeaturedProducts && (
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
                <Award className="h-7 w-7 text-secondary-500" />
                {"Featured Products"}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Handpicked bestsellers and trending pieces our customers love.
              </p>
            </div>
            <FeaturedProducts showHeader={false} />
          </div>
        </div>
      )}

      {/* Our Products - Category wise in carousel */}
      <OurProducts />

{/* Categories */}
<div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
              <Grid3X3 className="h-7 w-7 text-primary-600" />
              {"Shop by Category"}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore curated collections tailored to every style and occasion.
            </p>
          </div>
          <CategoryGrid showHeader={false} />
        </div>
      </div>
      {/* Brands */}
      <Brands />

      {/* User Profile Insights removed per request */}
    </div>
  )
}

export default PersonalizedHomepage
