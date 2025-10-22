'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function EditorialSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
              Artisan Craftsmanship
              <span className="block text-gradient">
                & Timeless Elegance
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Each piece in our collection is meticulously crafted by master artisans, 
              using only the finest materials and traditional techniques passed down 
              through generations. We celebrate the art of couture.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                <span className="text-gray-700">Hand-sewn Couture Details</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                <span className="text-gray-700">Luxury Fabrics & Materials</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></div>
                <span className="text-gray-700">Personal Styling Consultation</span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2 group"
            >
              Discover Our Story
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/images/banner2.png"
                alt="Couture Craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gradient mb-1">50+</div>
                <div className="text-sm text-gray-600">Exclusive Designs</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}