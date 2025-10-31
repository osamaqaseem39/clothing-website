'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
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
        const data = await apiClient.getCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              Each collection tells a story of elegance and luxury.
            </p>
          </motion.div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-2xl"></div>
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <ArrowRight className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Categories Available</h3>
            <p className="text-gray-600">Categories will appear here when available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category._id || category.slug || String(index)}
                href={`/categories/${category.slug || category._id}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl card-hover"
                >
                  <div className="aspect-square relative">
                    <img
                      src={category.image || '/images/banner1.png'}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/50 group-hover:via-black/10 transition-all duration-300" />
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <h3 className="text-2xl font-serif font-bold mb-2">{category.name}</h3>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex items-center justify-center gap-2 text-sm font-medium"
                        >
                          Explore
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}