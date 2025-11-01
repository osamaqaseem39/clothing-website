'use client'

import { motion } from 'framer-motion'
import { Heart, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  brand?: string
  color?: string
  isNew?: boolean
  isOnSale?: boolean
  slug?: string
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  category,
  brand,
  color,
  isNew = false,
  isOnSale = false,
  slug
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={slug ? `/products/${slug}` : `/products/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="group relative bg-white rounded-lg overflow-hidden card-hover cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Image Container */}
      <div className="relative aspect-[9/16] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          )}
          {isOnSale && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Sale
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : 10 
          }}
          transition={{ duration: 0.2 }}
          className="absolute top-3 right-3 flex flex-col gap-2"
        >
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full transition-colors ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button className="p-2 bg-white text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <ShoppingBag className="h-4 w-4" />
          </button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-rose-600">PKR {Number(price).toLocaleString()}</span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-400 line-through">PKR {Number(originalPrice).toLocaleString()}</span>
          )}
        </div>
        <p className="text-xs text-gray-700 mt-2 truncate">{brand || category}{color ? ` • ${String(color).toUpperCase()}` : ''}</p>
        <p className="text-xs text-gray-600 mt-1 line-clamp-1">{name}</p>
      </div>
    </motion.div>
    </Link>
  )
}