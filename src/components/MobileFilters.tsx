'use client'

import { useState, useEffect } from 'react'
import { Filter, X, ChevronDown } from 'lucide-react'

interface MobileFiltersProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileFilters({ isOpen, onClose }: MobileFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([])

  // Prevent body scroll when filters are open and reset expanded sections when closed
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // Reset expanded sections when filters close
      setExpandedSections([])
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  const filterSections = [
    {
      id: 'category',
      title: 'Category',
      options: ['Evening Wear', 'Day Dresses', 'Couture', 'Bridal', 'Accessories', 'Jewelry']
    },
    {
      id: 'price',
      title: 'Price Range',
      options: ['Under $500', '$500 - $1000', '$1000 - $2000', '$2000+']
    },
    {
      id: 'size',
      title: 'Size',
      options: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    {
      id: 'color',
      title: 'Color',
      options: ['Black', 'White', 'Red', 'Blue', 'Pink', 'Gold']
    }
  ]

  if (!isOpen) return null

  return (
    <div className="lg:hidden fixed inset-0 z-50 overflow-hidden" style={{ touchAction: 'none' }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Filter Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[90vh] flex flex-col" style={{ touchAction: 'pan-y' }}>
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 active:bg-gray-100 rounded-lg"
            aria-label="Close filters"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          <div className="space-y-4 pb-4">
            {filterSections.map((section) => (
              <div key={section.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full py-2 text-left"
                >
                  <span className="font-medium text-gray-900">{section.title}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform flex-shrink-0 ${
                      expandedSections.includes(section.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedSections.includes(section.id) && (
                  <div className="mt-2 space-y-2 pl-1">
                    {section.options.map((option) => (
                      <label key={option} className="flex items-center space-x-3 py-1 cursor-pointer">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 flex-shrink-0"
                        />
                        <span className="text-sm text-gray-700 break-words">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Apply Button - Fixed at bottom */}
        <div className="border-t border-gray-200 p-4 bg-white flex-shrink-0 safe-area-inset-bottom">
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors active:bg-gray-100"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors active:bg-primary-800"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}