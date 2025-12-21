'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { apiClient, Product, Category } from '@/lib/api'

interface CategoryWithProducts {
  category: Category
  products: Product[]
}

export default function OurProducts() {
  const [categoriesWithProducts, setCategoriesWithProducts] = useState<CategoryWithProducts[]>([])
  const [loading, setLoading] = useState(true)
  const [carouselIndices, setCarouselIndices] = useState<Record<string, number>>({})
  const itemsPerView = 4 // Number of products visible at once

  useEffect(() => {
    loadProductsByCategory()
  }, [])

  const loadProductsByCategory = async () => {
    try {
      setLoading(true)

      // Fetch all active categories (including subcategories)
      const categories = await apiClient.getCategories()
      const activeCategories = categories
        .filter(cat => cat.isActive !== false)
        .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))

      // Fetch products for each category
      const categoryProductsPromises = activeCategories.map(async (category) => {
        try {
          const response = await apiClient.getProductsByCategory(category._id, {
            page: 1,
            limit: 12 // Fetch more products for carousel
          })
          return {
            category,
            products: response.data || []
          }
        } catch (err) {
          console.error(`Error fetching products for category ${category.name}:`, err)
          return {
            category,
            products: []
          }
        }
      })

      const results = await Promise.all(categoryProductsPromises)
      
      // Filter out categories with no products
      const categoriesWithProducts = results.filter(item => item.products.length > 0)
      
      // Initialize carousel indices
      const indices: Record<string, number> = {}
      categoriesWithProducts.forEach(item => {
        indices[item.category._id] = 0
      })
      setCarouselIndices(indices)
      
      setCategoriesWithProducts(categoriesWithProducts)
    } catch (err) {
      console.error('Error loading products by category:', err)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = (categoryId: string, totalProducts: number) => {
    setCarouselIndices(prev => {
      const maxIndex = Math.max(0, Math.ceil(totalProducts / itemsPerView) - 1)
      const currentIndex = prev[categoryId] || 0
      return {
        ...prev,
        [categoryId]: currentIndex + 1 > maxIndex ? 0 : currentIndex + 1
      }
    })
  }

  const prevSlide = (categoryId: string, totalProducts: number) => {
    setCarouselIndices(prev => {
      const maxIndex = Math.max(0, Math.ceil(totalProducts / itemsPerView) - 1)
      const currentIndex = prev[categoryId] || 0
      return {
        ...prev,
        [categoryId]: currentIndex === 0 ? maxIndex : currentIndex - 1
      }
    })
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="space-y-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="bg-gray-200 rounded-lg h-80"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (categoriesWithProducts.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection organized by category. Browse through our finest selections.
          </p>
        </motion.div>

        <div className="space-y-16">
          {categoriesWithProducts.map((item, categoryIndex) => {
            const currentIndex = carouselIndices[item.category._id] || 0
            const canNavigate = item.products.length > itemsPerView

            return (
              <motion.div
                key={item.category._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="category-section"
              >
                {/* Category Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {item.category.icon && (
                      <div className="w-10 h-10 flex items-center justify-center text-primary-600">
                        <span className="text-2xl">{item.category.icon}</span>
                      </div>
                    )}
                    {item.category.image && !item.category.icon && (
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={item.category.image}
                          alt={item.category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-gray-900">
                        {item.category.name}
                      </h3>
                    </div>
                  </div>
                  <Link
                    href={`/categories/${item.category.slug || item.category._id}`}
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Products Carousel */}
                <div className="relative">
                  {canNavigate && (
                    <>
                      <button
                        onClick={() => prevSlide(item.category._id, item.products.length)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:bg-white"
                        aria-label="Previous products"
                      >
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                      </button>
                      
                      <button
                        onClick={() => nextSlide(item.category._id, item.products.length)}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:bg-white"
                        aria-label="Next products"
                      >
                        <ChevronRight className="h-5 w-5 text-gray-600" />
                      </button>
                    </>
                  )}

                  {/* Carousel Container */}
                  <div className="overflow-hidden">
                    <motion.div
                      animate={{ x: -currentIndex * (100 / itemsPerView) + '%' }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="flex gap-4 sm:gap-6"
                    >
                      {item.products.map((product) => {
                        const productImage = Array.isArray(product.images) && product.images.length > 0
                          ? product.images[0]
                          : '/images/logo.png'

                        return (
                          <div
                            key={product._id}
                            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
                          >
                            <Link href={`/products/${product.slug || product._id}`}>
                              <motion.div
                                whileHover={{ y: -4 }}
                                className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                              >
                                {/* Product Image */}
                                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                  {productImage.startsWith('http') ? (
                                    <Image
                                      src={productImage}
                                      alt={product.name}
                                      fill
                                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                                      loading="lazy"
                                      quality={80}
                                    />
                                  ) : (
                                    <img
                                      src={productImage}
                                      alt={product.name}
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                      loading="lazy"
                                    />
                                  )}

                                  {/* Badges */}
                                  {(product.isNew || product.isSale) && (
                                    <div className="absolute top-2 left-2 flex gap-1">
                                      {product.isNew && (
                                        <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded font-medium">
                                          New
                                        </span>
                                      )}
                                      {product.isSale && (
                                        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-medium">
                                          Sale
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  {/* Quick Add Button */}
                                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault()
                                        // Add to cart logic here
                                      }}
                                      className="p-2 bg-white rounded-full shadow-md hover:bg-primary-600 hover:text-white transition-colors"
                                      aria-label="Add to cart"
                                    >
                                      <ShoppingBag className="h-4 w-4" />
                                    </button>
                                  </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                  <h4 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                    {product.name}
                                  </h4>
                                  {product.brand && (
                                    <p className="text-xs text-gray-500 mb-2">{product.brand}</p>
                                  )}
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <span className="text-base font-semibold text-primary-600">
                                        ₨{typeof product.price === 'number' ? product.price.toLocaleString() : '0'}
                                      </span>
                                      {product.originalPrice && 
                                       typeof product.originalPrice === 'number' && 
                                       product.originalPrice > product.price && (
                                        <span className="text-xs text-gray-400 line-through">
                                          ₨{product.originalPrice.toLocaleString()}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </Link>
                          </div>
                        )
                      })}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
