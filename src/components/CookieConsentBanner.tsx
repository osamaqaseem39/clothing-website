'use client'

import React, { useState, useEffect } from 'react'
import { useAnalytics } from '@/contexts/AnalyticsContext'

const CookieConsentBanner: React.FC = () => {
  const { enableTracking, disableTracking } = useAnalytics()
  const [showBanner, setShowBanner] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('analytics-consent')
    if (consent === null) {
      setShowBanner(true)
      // Show banner with animation
      setTimeout(() => setIsVisible(true), 100)
    }
  }, [])

  const handleAccept = () => {
    enableTracking()
    setShowBanner(false)
    setIsVisible(false)
  }

  const handleDecline = () => {
    disableTracking()
    setShowBanner(false)
    setIsVisible(false)
  }

  const handleCustomize = () => {
    // This would open a detailed cookie preferences modal
    // For now, we'll just accept all
    handleAccept()
  }

  if (!showBanner) return null

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                We Value Your Privacy
              </h3>
              <p className="text-sm text-gray-600 mb-4 sm:mb-0">
                We use cookies and similar technologies to provide personalized experiences, 
                analyze site traffic, and improve our services. By continuing to use our site, 
                you consent to our use of cookies. You can manage your preferences at any time.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleDecline}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Decline
              </button>
              
              <button
                onClick={handleCustomize}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Customize
              </button>
              
              <button
                onClick={handleAccept}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Accept All
              </button>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
              <span>Essential Cookies</span>
              <span>•</span>
              <span>Analytics Cookies</span>
              <span>•</span>
              <span>Personalization Cookies</span>
              <span>•</span>
              <span>Marketing Cookies</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CookieConsentBanner
