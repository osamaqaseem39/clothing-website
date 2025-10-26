'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FiltersSidebarProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: number[]
  onPriceRangeChange: (range: number[]) => void
  selectedColors: string[]
  onColorToggle: (color: string) => void
  selectedSizes: string[]
  onSizeToggle: (size: string) => void
  onClearFilters: () => void
}

const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Pink', 'Purple', 'Orange', 'Brown', 'Gray', 'Navy']
const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

export default function FiltersSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  selectedColors,
  onColorToggle,
  selectedSizes,
  onSizeToggle,
  onClearFilters
}: FiltersSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['category', 'price', 'color', 'size'])

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Clear all
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('category')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Category
          {expandedSections.includes('category') ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.includes('category') && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={selectedCategory === category}
                  onChange={() => onCategoryChange(category)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Price Range
          {expandedSections.includes('price') ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.includes('price') && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value) || 1000])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('color')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Colors
          {expandedSections.includes('color') ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.includes('color') && (
          <div className="space-y-2">
            {colors.map((color) => (
              <label key={color} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(color)}
                  onChange={() => onColorToggle(color)}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">{color}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('size')}
          className="flex items-center justify-between w-full text-left font-medium text-gray-900 mb-3"
        >
          Sizes
          {expandedSections.includes('size') ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSections.includes('size') && (
          <div className="grid grid-cols-3 gap-2">
            {sizes.map((size) => (
              <label key={size} className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => onSizeToggle(size)}
                  className="sr-only"
                />
                <div
                  className={`w-full py-2 px-3 text-center text-sm border rounded-md cursor-pointer transition-colors ${
                    selectedSizes.includes(size)
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => onSizeToggle(size)}
                >
                  {size}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
