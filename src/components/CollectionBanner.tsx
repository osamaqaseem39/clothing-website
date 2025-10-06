'use client'

import { motion } from 'framer-motion'

export default function CollectionBanner() {
  return (
    <div className="bg-white py-4 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="p-6 lg:p-12 order-2 lg:order-1"
            >
              <div className="space-y-3 lg:space-y-4">
                <div className="text-2xl lg:text-4xl font-bold text-gray-800">SALE</div>
                <div className="text-xl lg:text-2xl font-bold text-rose-600">AS LOW AS $599</div>
                <div className="text-2xl lg:text-3xl font-serif font-bold text-gray-900">The Elegance Edit</div>
                <div className="text-lg lg:text-xl text-gray-700">Couture Collection</div>
                <div className="text-sm lg:text-lg text-gray-600">Free Shipping on Orders Over $1000</div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white px-6 lg:px-8 py-2 lg:py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm lg:text-base"
                >
                  SHOP NOW
                </motion.button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-64 lg:h-96 order-1 lg:order-2"
            >
              <img
                src="/images/banner3.png"
                alt="Couture Collection"
                className="w-full h-full object-cover lg:rounded-r-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-rose-50/30" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}