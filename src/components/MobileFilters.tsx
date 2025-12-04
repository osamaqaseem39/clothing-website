'use client'

import { useState, useEffect } from 'react'
import { Filter, X, ChevronDown, Search } from 'lucide-react'

interface MobileFiltersProps {
  isOpen: boolean
  onClose: () => void
  categories?: string[]
  selectedCategory?: string
  onCategoryChange?: (category: string) => void
  priceRange?: number[]
  onPriceRangeChange?: (range: number[]) => void
  colors?: string[]
  selectedColors?: string[]
  onColorToggle?: (color: string) => void
  sizes?: string[]
  selectedSizes?: string[]
  onSizeToggle?: (size: string) => void
  selectedFilters?: string[]
  onFilterToggle?: (filter: string) => void
  sortBy?: string
  onSortChange?: (sort: string) => void
  sortOptions?: string[]
  searchQuery?: string
  onSearchChange?: (query: string) => void
  onClearFilters?: () => void
}

export default function MobileFilters({ 
  isOpen, 
  onClose,
  categories = [],
  selectedCategory = 'All',
  onCategoryChange,
  priceRange = [0, 1000],
  onPriceRangeChange,
  colors = [],
  selectedColors = [],
  onColorToggle,
  sizes = [],
  selectedSizes = [],
  onSizeToggle,
  selectedFilters = [],
  onFilterToggle,
  sortBy = 'Featured',
  onSortChange,
  sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Newest', 'Best Rated'],
  searchQuery = '',
  onSearchChange,
  onClearFilters
}: MobileFiltersProps) {
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

  // Build filter sections dynamically based on props
  const filterSections = [
    {
      id: 'search',
      title: 'Search',
      type: 'search' as const,
      value: searchQuery || '',
      onChange: (value: string) => onSearchChange?.(value)
    },
    {
      id: 'sort',
      title: 'Sort By',
      type: 'select' as const,
      options: sortOptions,
      value: sortBy || 'Featured',
      onChange: (value: string) => onSortChange?.(value)
    },
    {
      id: 'category',
      title: 'Category',
      type: 'radio' as const,
      options: categories.length > 0 ? categories : ['All'],
      selected: selectedCategory || 'All',
      onChange: (value: string) => onCategoryChange?.(value)
    },
    {
      id: 'price',
      title: 'Price Range',
      type: 'price' as const,
      range: priceRange,
      onChange: (range: number[]) => onPriceRangeChange?.(range)
    },
    {
      id: 'size',
      title: 'Size',
      type: 'checkbox' as const,
      options: sizes.length > 0 ? sizes : [],
      selected: selectedSizes || [],
      onChange: (value: string) => onSizeToggle?.(value)
    },
    {
      id: 'color',
      title: 'Color',
      type: 'checkbox' as const,
      options: colors.length > 0 ? colors : [],
      selected: selectedColors || [],
      onChange: (value: string) => onColorToggle?.(value)
    },
    {
      id: 'filters',
      title: 'Special Filters',
      type: 'checkbox' as const,
      options: [
        { value: 'sale', label: 'On Sale' },
        { value: 'new', label: 'New Arrivals' },
        { value: 'featured', label: 'Featured' }
      ],
      selected: selectedFilters || [],
      onChange: (value: string) => onFilterToggle?.(value)
    }
  ].filter(section => {
    // Hide empty sections
    if (section.type === 'checkbox' && section.options.length === 0) return false
    return true
  })

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
            {filterSections.map((section) => {
              // Search section - always visible
              if (section.type === 'search') {
                return (
                  <div key={section.id} className="border-b border-gray-200 pb-4">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {section.title}
                    </label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={section.value}
                        onChange={(e) => section.onChange?.(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                )
              }

              // Sort section - always visible
              if (section.type === 'select') {
                return (
                  <div key={section.id} className="border-b border-gray-200 pb-4">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      {section.title}
                    </label>
                    <select
                      value={section.value}
                      onChange={(e) => section.onChange?.(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    >
                      {section.options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                )
              }

              // Price range section
              if (section.type === 'price') {
                const isExpanded = expandedSections.includes(section.id)
                return (
                  <div key={section.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between w-full py-2 text-left"
                    >
                      <span className="font-medium text-gray-900">{section.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-500 transition-transform flex-shrink-0 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="mt-2 space-y-3">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            placeholder="Min"
                            value={section.range?.[0] || 0}
                            onChange={(e) => {
                              const newRange = [Number(e.target.value), section.range?.[1] || 1000]
                              section.onChange?.(newRange)
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                          />
                          <span className="text-gray-500">-</span>
                          <input
                            type="number"
                            placeholder="Max"
                            value={section.range?.[1] || 1000}
                            onChange={(e) => {
                              const newRange = [section.range?.[0] || 0, Number(e.target.value)]
                              section.onChange?.(newRange)
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )
              }

              // Radio sections (single select like category)
              if (section.type === 'radio') {
                const isExpanded = expandedSections.includes(section.id)
                const options = section.options || []
                return (
                  <div key={section.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between w-full py-2 text-left"
                    >
                      <span className="font-medium text-gray-900">{section.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-500 transition-transform flex-shrink-0 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="mt-2 space-y-2 pl-1">
                        {options.map((option: any) => {
                          const optionValue = typeof option === 'string' ? option : (option?.value || option)
                          const optionLabel = typeof option === 'string' ? option : (option?.label || option?.value || option)
                          const isChecked = section.selected === optionValue
                          return (
                            <label key={optionValue} className="flex items-center space-x-3 py-1 cursor-pointer">
                              <input
                                type="radio"
                                name={section.id}
                                checked={isChecked}
                                onChange={() => section.onChange?.(optionValue)}
                                className="border-gray-300 text-primary-600 focus:ring-primary-500 flex-shrink-0"
                              />
                              <span className="text-sm text-gray-700 break-words">{optionLabel}</span>
                            </label>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }

              // Checkbox sections
              if (section.type === 'checkbox') {
                const isExpanded = expandedSections.includes(section.id)
                const options = section.options || []
                return (
                  <div key={section.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between w-full py-2 text-left"
                    >
                      <span className="font-medium text-gray-900">{section.title}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-gray-500 transition-transform flex-shrink-0 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isExpanded && (
                      <div className="mt-2 space-y-2 pl-1">
                        {options.map((option: any) => {
                          const optionValue = typeof option === 'string' ? option : (option?.value || option)
                          const optionLabel = typeof option === 'string' ? option : (option?.label || option?.value || option)
                          const isChecked = Array.isArray(section.selected) && section.selected.includes(optionValue)
                          return (
                            <label key={optionValue} className="flex items-center space-x-3 py-1 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => section.onChange?.(optionValue)}
                                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500 flex-shrink-0"
                              />
                              <span className="text-sm text-gray-700 break-words">{optionLabel}</span>
                            </label>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }

              return null
            })}
          </div>
        </div>

        {/* Apply Button - Fixed at bottom */}
        <div className="border-t border-gray-200 p-4 bg-white flex-shrink-0 safe-area-inset-bottom">
          <div className="flex space-x-3">
            <button
              onClick={() => {
                onClearFilters?.()
                onClose()
              }}
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