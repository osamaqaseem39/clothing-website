'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { apiClient, Category } from '@/lib/api'

interface CategoryGridProps {
  showHeader?: boolean
}

// No hardcoded data - fetch from API

export default function CategoryGrid({ showHeader = true }: CategoryGridProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        // Use default /categories endpoint to get all categories
        const data = await apiClient.getCategories()
        
        // Filter out any invalid categories (show all valid categories)
        if (Array.isArray(data) && data.length > 0) {
          const validCategories = data.filter(cat => 
            cat && 
            (cat._id || cat.slug) && 
            cat.name
          )
          setCategories(validCategories)
        } else {
          setCategories([])
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])
  const content = (
    <>
      {showHeader && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Our Collections
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Exquisite couture pieces crafted for the sophisticated woman. 
            Each collection tells a story of elegance and style.
          </p>
        </motion.div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="w-16 h-16 mx-auto mb-3 bg-gray-200 rounded-full"></div>
                <div className="h-4 w-20 mx-auto bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <ArrowRight className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Categories Available</h3>
          <p className="text-gray-600 mb-4">Categories will appear here when available</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category._id || category.slug || String(index)}
              href={`/shop?category=${category.slug || category.name || category._id}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-white border border-gray-200 rounded-lg p-4 hover:border-primary-500 hover:shadow-md transition-all duration-200 cursor-pointer"
              >
                <div className="text-center">
                  <div className="relative w-16 h-16 mx-auto mb-3">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-semibold text-gray-400">
                          {category.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 capitalize-first">
                    {category.name}
                  </h3>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      )}
    </>
  )

  // If showHeader is false, we're being used as a child component, so don't wrap in section
  if (!showHeader) {
    return content
  }

  // Otherwise, wrap in section for standalone use
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {content}
      </div>
    </section>
  )
}