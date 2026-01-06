'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { apiClient, Category } from '@/lib/api'

interface MobileCategoryGridProps {
  showHeader?: boolean
}

export default function MobileCategoryGrid({ showHeader = true }: MobileCategoryGridProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getCategories()
        
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
          transition={{ duration: 0.4 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
            Our Collections
          </h2>
          <p className="text-sm text-gray-600 px-4">
            Exquisite couture pieces crafted for the sophisticated woman.
          </p>
        </motion.div>
      )}

      {loading ? (
        <div className="grid grid-cols-3 gap-3">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-white border border-gray-200 rounded-lg p-3">
                <div className="w-12 h-12 mx-auto mb-2 bg-gray-200 rounded-full"></div>
                <div className="h-3 w-16 mx-auto bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8">
          <h3 className="text-base font-semibold text-gray-900 mb-2">No Categories Available</h3>
          <p className="text-sm text-gray-600">Categories will appear here when available</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category, index) => (
            <Link
              key={category._id || category.slug || String(index)}
              href={`/shop?category=${category.slug || category.name || category._id}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group relative bg-white border border-gray-200 rounded-lg p-3 active:border-primary-500 active:shadow-md transition-all duration-200"
              >
                <div className="text-center">
                  <div className="relative w-12 h-12 mx-auto mb-2">
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover rounded-full group-active:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-gray-400">
                          {category.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-[11px] font-medium text-gray-900 group-active:text-primary-600 transition-colors line-clamp-2 capitalize-first">
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

  if (!showHeader) {
    return content
  }

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {content}
      </div>
    </section>
  )
}

