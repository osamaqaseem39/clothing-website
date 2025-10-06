'use client'

import { useState } from 'react'
import { Filter, X, ChevronDown } from 'lucide-react'

interface MobileFiltersProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileFilters({ isOpen, onClose }: MobileFiltersProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['category'])

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
    },
    {
      id: 'brand',
      title: 'Brand',
      options: ['Élégance', 'Luxury Line', 'Couture Collection', 'Premium']
    }
  ]

  if (!isOpen) return null

  return (
    <div className="lg:hidden fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Filter Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Filter Sections */}
          <div className="space-y-4">
            {filterSections.map((section) => (
              <div key={section.id} className="border-b border-gray-200 pb-4">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex items-center justify-between w-full py-2"
                >
                  <span className="font-medium text-gray-900">{section.title}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      expandedSections.includes(section.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {expandedSections.includes(section.id) && (
                  <div className="mt-2 space-y-2">
                    {section.options.map((option) => (
                      <label key={option} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Apply Button */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 px-4 bg-rose-600 text-white rounded-lg font-medium hover:bg-rose-700 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}