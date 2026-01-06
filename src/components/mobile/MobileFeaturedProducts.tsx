'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { useProducts } from '@/contexts/ProductsContext'
import MobileProductCard from './MobileProductCard'

interface MobileFeaturedProductsProps {
  showHeader?: boolean
}

export default function MobileFeaturedProducts({ showHeader = true }: MobileFeaturedProductsProps) {
  const { products: allProducts, loading } = useProducts()
  
  const featuredProducts = allProducts
    .filter(product => {
      return (product.rating && product.rating >= 4.5) || 
             (product.reviews && product.reviews >= 10) ||
             product.isNew === true
    })
    .slice(0, 6)

  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {showHeader && (
            <div className="text-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-sm text-gray-600">Loading...</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (featuredProducts.length === 0) {
    return null
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {showHeader && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Award className="h-5 w-5 text-primary-600" />
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Featured Products
              </h2>
            </div>
            <p className="text-sm text-gray-600 px-4">
              Discover our most popular and trending pieces.
            </p>
          </motion.div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <MobileProductCard
                id={product._id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.images[0] || '/images/1.png'}
                category={product.categories?.[0] || 'General'}
                brand={product.brand}
                isNew={product.isNew}
                isOnSale={product.isSale}
                slug={product.slug}
                rating={product.rating}
                reviews={product.reviews}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

