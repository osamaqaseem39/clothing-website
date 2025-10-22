'use client'

import React, { useState } from 'react'
import { useAnalytics } from '@/contexts/AnalyticsContext'

interface UserProfileInsightsProps {
  showDetails?: boolean
  className?: string
}

const UserProfileInsights: React.FC<UserProfileInsightsProps> = ({
  showDetails = false,
  className = ''
}) => {
  const { userProfile, isTrackingEnabled } = useAnalytics()
  const [showFullProfile, setShowFullProfile] = useState(showDetails)

  if (!userProfile || !isTrackingEnabled) {
    return null
  }

  const getPersonalizationScore = () => {
    let score = 0
    const maxScore = 100

    // Based on preferences
    score += userProfile.preferences.favoriteCategories.length * 10
    score += userProfile.preferences.favoriteColors.length * 5
    score += userProfile.preferences.favoriteBrands.length * 5
    score += userProfile.preferences.sizePreferences.length * 3

    // Based on behavior
    score += Math.min(userProfile.behavior.totalVisits * 2, 20)
    score += Math.min(userProfile.behavior.searchHistory.length * 2, 10)
    score += Math.min(userProfile.behavior.clickPatterns.productClicks * 1, 10)

    return Math.min(score, maxScore)
  }

  const getPersonalizationLevel = (score: number) => {
    if (score >= 80) return { level: 'Expert', color: 'text-green-600', bg: 'bg-green-100' }
    if (score >= 60) return { level: 'Advanced', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (score >= 40) return { level: 'Intermediate', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (score >= 20) return { level: 'Beginner', color: 'text-orange-600', bg: 'bg-orange-100' }
    return { level: 'New User', color: 'text-gray-600', bg: 'bg-gray-100' }
  }

  const personalizationScore = getPersonalizationScore()
  const personalizationLevel = getPersonalizationLevel(personalizationScore)

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Your Style Profile
          </h3>
          <button
            onClick={() => setShowFullProfile(!showFullProfile)}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            {showFullProfile ? 'Show Less' : 'Show Details'}
          </button>
        </div>

        {/* Personalization Score */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Personalization Level</span>
            <span className={`text-sm font-medium ${personalizationLevel.color}`}>
              {personalizationLevel.level}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${personalizationLevel.bg.replace('bg-', 'bg-').replace('-100', '-500')}`}
              style={{ width: `${personalizationScore}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {personalizationScore}% personalized based on your preferences and behavior
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {userProfile.behavior.totalVisits}
            </div>
            <div className="text-xs text-gray-500">Visits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {userProfile.preferences.favoriteCategories.length}
            </div>
            <div className="text-xs text-gray-500">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {userProfile.behavior.searchHistory.length}
            </div>
            <div className="text-xs text-gray-500">Searches</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {userProfile.behavior.clickPatterns.productClicks}
            </div>
            <div className="text-xs text-gray-500">Products Viewed</div>
          </div>
        </div>

        {showFullProfile && (
          <div className="space-y-4">
            {/* Location */}
            {userProfile.location && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Location</h4>
                <p className="text-sm text-gray-600">
                  {userProfile.location.city}, {userProfile.location.region}, {userProfile.location.country}
                </p>
              </div>
            )}

            {/* Favorite Categories */}
            {userProfile.preferences.favoriteCategories.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Favorite Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.preferences.favoriteCategories.map((category, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Favorite Colors */}
            {userProfile.preferences.favoriteColors.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Favorite Colors</h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.preferences.favoriteColors.map((color, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Favorite Brands */}
            {userProfile.preferences.favoriteBrands.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Favorite Brands</h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.preferences.favoriteBrands.map((brand, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Size Preferences */}
            {userProfile.preferences.sizePreferences.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Size Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.preferences.sizePreferences.map((size, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pakistani Clothing Preferences */}
            {userProfile.preferences.bodyType.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Body Type Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.preferences.bodyType.map((bodyType, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                      {bodyType}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Occasion Preferences */}
            {userProfile.preferences.occasion.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Occasion Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.preferences.occasion.map((occasion, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                    >
                      {occasion}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Purchase History */}
            {userProfile.behavior.purchaseHistory.totalPurchases > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Purchase History</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Total Purchases:</span>
                    <span className="ml-2 font-medium">{userProfile.behavior.purchaseHistory.totalPurchases}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Total Spent:</span>
                    <span className="ml-2 font-medium">${userProfile.behavior.purchaseHistory.totalSpent}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Average Order:</span>
                    <span className="ml-2 font-medium">${userProfile.behavior.purchaseHistory.averageOrderValue.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Purchase:</span>
                    <span className="ml-2 font-medium">
                      {new Date(userProfile.behavior.purchaseHistory.lastPurchase).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Recent Searches */}
            {userProfile.behavior.searchHistory.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Searches</h4>
                <div className="flex flex-wrap gap-2">
                  {userProfile.behavior.searchHistory.slice(-5).map((search, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {search}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserProfileInsights
