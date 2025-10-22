'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Award, Crown } from 'lucide-react'

interface Brand {
  id: number
  name: string
  logo: string
  rating: number
  products: number
  description: string
  isPremium?: boolean
  isTopRated?: boolean
}

const brands: Brand[] = [
  {
    id: 1,
    name: 'Élégance Couture',
    logo: '/images/logo.png',
    rating: 4.9,
    products: 156,
    description: 'Luxury fashion and couture pieces',
    isPremium: true,
    isTopRated: true
  },
  {
    id: 2,
    name: 'Luxury Line',
    logo: '/images/logo.png',
    rating: 4.8,
    products: 89,
    description: 'High-end designer collections',
    isPremium: true,
    isTopRated: true
  },
  {
    id: 3,
    name: 'Couture Collection',
    logo: '/images/logo.png',
    rating: 4.7,
    products: 124,
    description: 'Contemporary fashion designs',
    isPremium: false,
    isTopRated: true
  },
  {
    id: 4,
    name: 'Premium',
    logo: '/images/logo.png',
    rating: 4.6,
    products: 67,
    description: 'Luxury accessories and jewelry',
    isPremium: true,
    isTopRated: false
  },
  {
    id: 5,
    name: 'Fashion House',
    logo: '/images/logo.png',
    rating: 4.5,
    products: 98,
    description: 'Trendy and affordable fashion',
    isPremium: false,
    isTopRated: false
  },
  {
    id: 6,
    name: 'Style Studio',
    logo: '/images/logo.png',
    rating: 4.4,
    products: 76,
    description: 'Modern and chic designs',
    isPremium: false,
    isTopRated: false
  }
]

export default function Brands() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Crown className="h-8 w-8 text-primary-600" />
            Our Brands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of premium fashion brands, each offering unique styles and exceptional quality.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 p-6"
            >
              <Link href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, '-')}`}>
                <div className="text-center">
                  {/* Brand Logo */}
                  <div className="relative w-20 h-20 mx-auto mb-4">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Brand Name */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {brand.name}
                  </h3>

                  {/* Badges */}
                  <div className="flex justify-center gap-2 mb-3">
                    {brand.isPremium && (
                      <span className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                        <Crown className="h-3 w-3" />
                        Premium
                      </span>
                    )}
                    {brand.isTopRated && (
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        Top Rated
                      </span>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{brand.rating}</span>
                    <span className="text-sm text-gray-500">({brand.products} products)</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {brand.description}
                  </p>

                  {/* View Brand Button */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center text-primary-600 text-sm font-medium hover:text-primary-700">
                      View Brand
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/brands" className="btn-secondary">
            View All Brands
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
