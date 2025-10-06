'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'

const trendingProducts = [
  {
    id: '1',
    name: 'Designer Blazer',
    price: 899,
    image: '/images/7.png',
    category: 'Day Dresses',
    isNew: true
  },
  {
    id: '2',
    name: 'Silk Evening Gown',
    price: 1299,
    originalPrice: 1599,
    image: '/images/8.png',
    category: 'Evening Wear',
    isOnSale: true
  },
  {
    id: '3',
    name: 'Pearl Necklace',
    price: 599,
    image: '/images/9.png',
    category: 'Jewelry'
  },
  {
    id: '4',
    name: 'Couture Cocktail Dress',
    price: 899,
    image: '/images/7 (2).png',
    category: 'Couture'
  },
  {
    id: '5',
    name: 'Luxury Handbag',
    price: 1299,
    image: '/images/1.png',
    category: 'Accessories',
    isNew: true
  },
  {
    id: '6',
    name: 'Cashmere Wrap',
    price: 699,
    originalPrice: 899,
    image: '/images/2.png',
    category: 'Accessories',
    isOnSale: true
  },
  {
    id: '7',
    name: 'Diamond Earrings',
    price: 1999,
    image: '/images/3.png',
    category: 'Jewelry'
  },
  {
    id: '8',
    name: 'Bridal Gown',
    price: 2499,
    image: '/images/4.png',
    category: 'Bridal'
  }
]

export default function TrendingProducts() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-4">
            Featured Collections
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular couture pieces
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard {...product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-secondary"
          >
            View All Collections
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}