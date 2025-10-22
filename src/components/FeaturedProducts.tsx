'use client'

import { motion } from 'framer-motion'
import { Star, Heart, ShoppingBag, Eye, TrendingUp, Award } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { apiClient, Product } from '@/lib/api'

// Featured/Top Seller products data
const featuredProducts = [
  {
    id: 1,
    name: 'Elegant Evening Gown',
    price: 1299,
    originalPrice: 1599,
    image: '/images/1.png',
    category: 'Evening Wear',
    brand: 'Élégance Couture',
    rating: 4.8,
    reviews: 24,
    isNew: true,
    isSale: true,
    isTopSeller: true,
    slug: 'elegant-evening-gown'
  },
  {
    id: 17,
    name: 'Luxury Couture Piece',
    price: 3500,
    originalPrice: null,
    image: '/images/2.png',
    category: 'Couture',
    brand: 'Luxury Line',
    rating: 4.9,
    reviews: 12,
    isNew: true,
    isSale: false,
    isTopSeller: false,
    slug: 'luxury-couture-piece'
  },
  {
    id: 9,
    name: 'Summer Day Dress',
    price: 599,
    originalPrice: null,
    image: '/images/3.png',
    category: 'Day Dresses',
    brand: 'Couture Collection',
    rating: 4.6,
    reviews: 18,
    isNew: false,
    isSale: false,
    isTopSeller: true,
    slug: 'summer-day-dress'
  },
  {
    id: 43,
    name: 'Luxury Jewelry Set',
    price: 1500,
    originalPrice: 2000,
    image: '/images/4.png',
    category: 'Jewelry',
    brand: 'Premium',
    rating: 4.8,
    reviews: 6,
    isNew: true,
    isSale: true,
    isTopSeller: true,
    slug: 'luxury-jewelry-set'
  },
  {
    id: 39,
    name: 'Designer Handbag',
    price: 899,
    originalPrice: 1199,
    image: '/images/5.png',
    category: 'Accessories',
    brand: 'Élégance Couture',
    rating: 4.5,
    reviews: 15,
    isNew: true,
    isSale: true,
    isTopSeller: false,
    slug: 'designer-handbag'
  },
  {
    id: 23,
    name: 'Bridal Collection Dress',
    price: 2500,
    originalPrice: null,
    image: '/images/6.png',
    category: 'Bridal',
    brand: 'Luxury Line',
    rating: 4.7,
    reviews: 8,
    isNew: false,
    isSale: false,
    isTopSeller: true,
    slug: 'bridal-collection-dress'
  }
]

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getFeaturedProducts()
        setProducts(response.slice(0, 6)) // Show only 6 products
      } catch (error) {
        console.error('Error fetching featured products:', error)
        // Fallback to empty array if API fails
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="h-6 w-6 text-primary-600" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              Featured Products
            </h2>
            <TrendingUp className="h-6 w-6 text-secondary-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and trending pieces, carefully curated for the sophisticated woman.
          </p>
        </motion.div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No featured products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative">
                <Link href={`/products/${product.slug}`}>
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={product.images[0] || '/images/placeholder.png'}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                          New
                        </span>
                      )}
                      {product.isSale && (
                        <span className="bg-secondary-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                          Sale
                        </span>
                      )}
                      {product.rating >= 4.5 && (
                        <span className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          Top Seller
                        </span>
                      )}
                    </div>

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
                        {product.name}
                      </h3>
                    </div>

                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600 font-medium">{product.rating}</span>
                                <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
                              </div>
                              <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded">
                                {product.brand}
                              </span>
                            </div>

                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl font-bold text-primary-600">
                        ₨{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ₨{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                      {product.isSale && (
                        <span className="text-sm text-secondary-600 font-medium">
                          Save ₨{(product.originalPrice! - product.price).toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {product.categories[0] || 'General'}
                      </span>
                      {product.rating >= 4.5 && (
                        <div className="flex items-center gap-1 text-xs text-primary-600 font-medium">
                          <TrendingUp className="h-3 w-3" />
                          Bestseller
                        </div>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Quick Actions - Outside of Link to prevent navigation */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                    <Eye className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-primary-600 text-white rounded-full shadow-md hover:bg-primary-700 transition-colors">
                    <ShoppingBag className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/shop"
            className="btn-primary inline-flex items-center gap-2"
          >
            <Award className="h-5 w-5" />
            View All Featured Products
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
