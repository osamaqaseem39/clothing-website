'use client'

import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Trash2, Eye, Search } from 'lucide-react'
import { useState } from 'react'

const wishlistItems = [
  {
    id: '1',
    name: 'Silk Evening Gown',
    price: 1299.99,
    originalPrice: 1599.99,
    image: '/images/1.png',
    category: 'Evening Wear',
    size: 'M',
    color: 'Ivory',
    isInStock: true,
    addedDate: '2024-01-10'
  },
  {
    id: '2',
    name: 'Couture Cocktail Dress',
    price: 899.99,
    image: '/images/2.png',
    category: 'Couture',
    size: 'S',
    color: 'Black',
    isInStock: true,
    addedDate: '2024-01-08'
  },
  {
    id: '3',
    name: 'Designer Blazer',
    price: 699.99,
    image: '/images/3.png',
    category: 'Day Dresses',
    size: 'L',
    color: 'Navy',
    isInStock: false,
    addedDate: '2024-01-05'
  },
  {
    id: '4',
    name: 'Bridal Gown',
    price: 2499.99,
    image: '/images/4.png',
    category: 'Bridal',
    size: 'M',
    color: 'White',
    isInStock: true,
    addedDate: '2024-01-03'
  },
  {
    id: '5',
    name: 'Luxury Handbag',
    price: 1299.99,
    image: '/images/5.png',
    category: 'Accessories',
    size: 'One Size',
    color: 'Black',
    isInStock: true,
    addedDate: '2023-12-28'
  },
  {
    id: '6',
    name: 'Pearl Necklace Set',
    price: 599.99,
    originalPrice: 799.99,
    image: '/images/6.png',
    category: 'Jewelry',
    size: 'One Size',
    color: 'Pearl',
    isInStock: true,
    addedDate: '2023-12-25'
  }
]

export default function WishlistPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [wishlist, setWishlist] = useState(wishlistItems)

  const removeFromWishlist = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id))
  }

  const addToCart = (item: any) => {
    // Here you would typically add to cart
    console.log('Added to cart:', item)
  }

  const filteredWishlist = wishlist.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-600">Items you've saved for later</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{wishlist.length} items</span>
          {wishlist.length > 0 && (
            <button className="btn-primary flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Add All to Cart
            </button>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search your wishlist..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Wishlist Items */}
      {filteredWishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWishlist.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!item.isInStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}
                
                {/* Remove Button */}
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <p className="text-sm text-gray-500">{item.category}</p>
                  <h3 className="font-medium text-gray-900 line-clamp-2">{item.name}</h3>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-semibold text-gray-900">${item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">${item.originalPrice}</span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>Size: {item.size}</span>
                  <span>Color: {item.color}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.isInStock}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      item.isInStock
                        ? 'bg-black text-white hover:bg-gray-800'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    {item.isInStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  Added on {new Date(item.addedDate).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'No items found' : 'Your wishlist is empty'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? 'Try adjusting your search terms' 
              : 'Start adding items you love to your wishlist'
            }
          </p>
          {!searchTerm && (
            <button className="btn-primary">
              Start Shopping
            </button>
          )}
        </motion.div>
      )}

      {/* Quick Stats */}
      {wishlist.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Wishlist Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{wishlist.length}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                ${wishlist.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {wishlist.filter(item => item.isInStock).length}
              </div>
              <div className="text-sm text-gray-600">In Stock</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}