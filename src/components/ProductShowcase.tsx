'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

const products = [
  {
    id: '1',
    name: 'Summer Lawn Collection',
    price: 1000,
    image: '/images/1.png',
    category: 'Day Dresses'
  },
  {
    id: '2',
    name: 'Festive Collection',
    price: 900,
    image: '/images/2.png',
    category: 'Evening Wear'
  },
  {
    id: '3',
    name: 'Luxury Pret',
    price: 3500,
    image: '/images/3.png',
    category: 'Couture'
  },
  {
    id: '4',
    name: 'Daily Wear',
    price: 499,
    image: '/images/4.png',
    category: 'Day Dresses'
  },
  {
    id: '5',
    name: 'Modest Wear',
    price: 350,
    image: '/images/5.png',
    category: 'Day Dresses'
  },
  {
    id: '6',
    name: 'Fusion Collection',
    price: 150,
    image: '/images/6.png',
    category: 'Couture'
  }
]

export default function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 6

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + 1 >= Math.ceil(products.length / itemsPerView) ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.ceil(products.length / itemsPerView) - 1 : prev - 1
    )
  }

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:bg-white"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:bg-white"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>

          {/* Product Grid */}
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: -currentIndex * 100 + '%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex gap-3 lg:gap-6"
            >
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6">
                  <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    {/* Product Image */}
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-2 lg:p-4">
                      <div className="text-xs lg:text-sm text-rose-600 font-medium mb-1">
                        AS LOW AS ${product.price}
                      </div>
                      <h3 className="font-medium text-gray-900 text-xs lg:text-sm">{product.name}</h3>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}