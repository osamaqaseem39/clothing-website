'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAnalytics } from '@/contexts/AnalyticsContext'
import { apiClient } from '@/lib/api'
import { Product } from '../../../shared-types/product'

interface SmartSearchProps {
  placeholder?: string
  onSearch?: (query: string, results: Product[]) => void
  showSuggestions?: boolean
  maxSuggestions?: number
}

const SmartSearch: React.FC<SmartSearchProps> = ({
  placeholder = "Search for your perfect style...",
  onSearch,
  showSuggestions = true,
  maxSuggestions = 5
}) => {
  const { userProfile, trackEvent } = useAnalytics()
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [trendingSearches, setTrendingSearches] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    loadSearchData()
  }, [])

  useEffect(() => {
    if (query.length > 2) {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
      
      searchTimeoutRef.current = setTimeout(() => {
        generateSuggestions()
      }, 300)
    } else {
      setSuggestions([])
    }
  }, [query])

  const loadSearchData = () => {
    // Load recent searches from user profile
    if (userProfile?.behavior.searchHistory) {
      setRecentSearches(userProfile.behavior.searchHistory.slice(-5).reverse())
    }

    // Load trending searches (this would typically come from an API)
    setTrendingSearches([
      'Evening Gowns',
      'Pakistani Dresses',
      'Wedding Collection',
      'Summer Lawn',
      'Formal Wear'
    ])
  }

  const generateSuggestions = async () => {
    if (!query || query.length < 2) return

    try {
      setLoading(true)
      
      // Get search suggestions based on query
      const searchSuggestions = await getSearchSuggestions(query)
      setSuggestions(searchSuggestions.slice(0, maxSuggestions))
      
    } catch (error) {
      console.error('Error generating suggestions:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSearchSuggestions = async (searchQuery: string): Promise<string[]> => {
    // This would typically call an API for search suggestions
    // For now, we'll generate suggestions based on common patterns
    
    const commonTerms = [
      'dress', 'gown', 'kurta', 'shalwar', 'kameez', 'saree',
      'evening', 'wedding', 'party', 'formal', 'casual',
      'silk', 'cotton', 'lawn', 'chiffon', 'georgette',
      'embroidery', 'zari', 'sequins', 'beadwork',
      'red', 'blue', 'green', 'black', 'white', 'gold',
      'long', 'short', 'floor length', 'knee length',
      'sleeveless', 'long sleeve', 'short sleeve'
    ]

    const suggestions = commonTerms
      .filter(term => term.toLowerCase().includes(searchQuery.toLowerCase()))
      .map(term => term.charAt(0).toUpperCase() + term.slice(1))

    // Add personalized suggestions based on user profile
    if (userProfile) {
      const personalizedSuggestions = getPersonalizedSuggestions(searchQuery)
      suggestions.unshift(...personalizedSuggestions)
    }

    return Array.from(new Set(suggestions)) // Remove duplicates
  }

  const getPersonalizedSuggestions = (searchQuery: string): string[] => {
    if (!userProfile) return []

    const suggestions: string[] = []

    // Suggest based on favorite categories
    userProfile.preferences.favoriteCategories.forEach(category => {
      if (category.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.push(category)
      }
    })

    // Suggest based on favorite colors
    userProfile.preferences.favoriteColors.forEach(color => {
      if (color.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.push(color)
      }
    })

    // Suggest based on favorite brands
    userProfile.preferences.favoriteBrands.forEach(brand => {
      if (brand.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.push(brand)
      }
    })

    // Suggest based on occasion
    userProfile.preferences.occasion.forEach(occasion => {
      if (occasion.toLowerCase().includes(searchQuery.toLowerCase())) {
        suggestions.push(occasion)
      }
    })

    return suggestions
  }

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return

    try {
      setLoading(true)
      setIsOpen(false)

      // Track search event
      trackEvent({
        type: 'search',
        data: { query: searchQuery },
        timestamp: new Date().toISOString(),
        sessionId: ''
      })

      // Perform search
      const results = await apiClient.searchProducts(searchQuery)
      
      // Call onSearch callback if provided
      if (onSearch) {
        onSearch(searchQuery, results.data)
      }

    } catch (error) {
      console.error('Error performing search:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
    handleSearch(suggestion)
  }

  const handleRecentSearchClick = (recentSearch: string) => {
    setQuery(recentSearch)
    handleSearch(recentSearch)
  }

  const handleTrendingSearchClick = (trendingSearch: string) => {
    setQuery(trendingSearch)
    handleSearch(trendingSearch)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const handleInputBlur = () => {
    // Delay closing to allow clicking on suggestions
    setTimeout(() => setIsOpen(false), 200)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
        
        <button
          onClick={() => handleSearch()}
          disabled={loading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-500"></div>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Recent Searches</h4>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-3 border-b border-gray-100">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Suggestions</h4>
              <div className="space-y-1">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending Searches */}
          {trendingSearches.length > 0 && query.length === 0 && (
            <div className="p-3">
              <h4 className="text-sm font-medium text-gray-500 mb-2">Trending Searches</h4>
              <div className="space-y-1">
                {trendingSearches.map((trending, index) => (
                  <button
                    key={index}
                    onClick={() => handleTrendingSearchClick(trending)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded"
                  >
                    {trending}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Personalized Message */}
          {userProfile && (
            <div className="p-3 bg-primary-50 border-t border-gray-100">
              <p className="text-xs text-primary-600">
                Search powered by your preferences and browsing history
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SmartSearch
