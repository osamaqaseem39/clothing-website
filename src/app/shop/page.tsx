'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MobileBottomNav from '@/components/MobileBottomNav'
import MobileFilters from '@/components/MobileFilters'
import Footer from '@/components/Footer'
import { Search, Filter, Star, Heart, ShoppingBag, Grid3X3, Grid2X2, Grid, Layout } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Comprehensive product database with 50 products
const products = [
  // Evening Wear (8 products)
  {
    id: 1,
    name: 'Elegant Evening Gown',
    price: 1299,
    originalPrice: 1599,
    image: '/images/1.png',
    category: 'Evening Wear',
    rating: 4.8,
    reviews: 24,
    isNew: true,
    isSale: true,
    slug: 'elegant-evening-gown'
  },
  {
    id: 2,
    name: 'Black Tie Evening Dress',
    price: 1899,
    originalPrice: null,
    image: '/images/2.png',
    category: 'Evening Wear',
    rating: 4.9,
    reviews: 18,
    isNew: false,
    isSale: false,
    slug: 'black-tie-evening-dress'
  },
  {
    id: 3,
    name: 'Sequin Party Dress',
    price: 899,
    originalPrice: 1199,
    image: '/images/3.png',
    category: 'Evening Wear',
    rating: 4.6,
    reviews: 31,
    isNew: true,
    isSale: true
  },
  {
    id: 4,
    name: 'Velvet Evening Gown',
    price: 1599,
    originalPrice: null,
    image: '/images/4.png',
    category: 'Evening Wear',
    rating: 4.7,
    reviews: 12,
    isNew: false,
    isSale: false
  },
  {
    id: 5,
    name: 'Cocktail Party Dress',
    price: 699,
    originalPrice: 899,
    image: '/images/5.png',
    category: 'Evening Wear',
    rating: 4.5,
    reviews: 28,
    isNew: true,
    isSale: true
  },
  {
    id: 6,
    name: 'Formal Evening Attire',
    price: 2199,
    originalPrice: null,
    image: '/images/6.png',
    category: 'Evening Wear',
    rating: 4.8,
    reviews: 15,
    isNew: false,
    isSale: false
  },
  {
    id: 7,
    name: 'Silk Evening Dress',
    price: 1399,
    originalPrice: 1799,
    image: '/images/7.png',
    category: 'Evening Wear',
    rating: 4.7,
    reviews: 22,
    isNew: true,
    isSale: true
  },
  {
    id: 8,
    name: 'Luxury Evening Gown',
    price: 2599,
    originalPrice: null,
    image: '/images/8.png',
    category: 'Evening Wear',
    rating: 4.9,
    reviews: 8,
    isNew: false,
    isSale: false
  },

  // Day Dresses (8 products)
  {
    id: 9,
    name: 'Summer Day Dress',
    price: 599,
    originalPrice: null,
    image: '/images/1.png',
    category: 'Day Dresses',
    rating: 4.6,
    reviews: 18,
    isNew: false,
    isSale: false
  },
  {
    id: 10,
    name: 'Floral Spring Dress',
    price: 499,
    originalPrice: 699,
    image: '/images/2.png',
    category: 'Day Dresses',
    rating: 4.5,
    reviews: 35,
    isNew: true,
    isSale: true
  },
  {
    id: 11,
    name: 'Casual Day Dress',
    price: 399,
    originalPrice: null,
    image: '/images/3.png',
    category: 'Day Dresses',
    rating: 4.4,
    reviews: 42,
    isNew: false,
    isSale: false
  },
  {
    id: 12,
    name: 'Office Day Dress',
    price: 799,
    originalPrice: 999,
    image: '/images/4.png',
    category: 'Day Dresses',
    rating: 4.7,
    reviews: 26,
    isNew: true,
    isSale: true
  },
  {
    id: 13,
    name: 'Weekend Day Dress',
    price: 349,
    originalPrice: null,
    image: '/images/5.png',
    category: 'Day Dresses',
    rating: 4.3,
    reviews: 38,
    isNew: false,
    isSale: false
  },
  {
    id: 14,
    name: 'Chic Day Dress',
    price: 699,
    originalPrice: null,
    image: '/images/6.png',
    category: 'Day Dresses',
    rating: 4.6,
    reviews: 19,
    isNew: true,
    isSale: false
  },
  {
    id: 15,
    name: 'Elegant Day Dress',
    price: 899,
    originalPrice: 1199,
    image: '/images/7.png',
    category: 'Day Dresses',
    rating: 4.8,
    reviews: 14,
    isNew: false,
    isSale: true
  },
  {
    id: 16,
    name: 'Modern Day Dress',
    price: 549,
    originalPrice: null,
    image: '/images/8.png',
    category: 'Day Dresses',
    rating: 4.5,
    reviews: 33,
    isNew: true,
    isSale: false
  },

  // Couture (6 products)
  {
    id: 17,
    name: 'Luxury Couture Piece',
    price: 3500,
    originalPrice: null,
    image: '/images/1.png',
    category: 'Couture',
    rating: 4.9,
    reviews: 12,
    isNew: true,
    isSale: false
  },
  {
    id: 18,
    name: 'Designer Couture Dress',
    price: 4200,
    originalPrice: null,
    image: '/images/2.png',
    category: 'Couture',
    rating: 4.8,
    reviews: 8,
    isNew: false,
    isSale: false
  },
  {
    id: 19,
    name: 'Haute Couture Gown',
    price: 5800,
    originalPrice: null,
    image: '/images/3.png',
    category: 'Couture',
    rating: 4.9,
    reviews: 5,
    isNew: true,
    isSale: false
  },
  {
    id: 20,
    name: 'Exclusive Couture Piece',
    price: 3200,
    originalPrice: 4000,
    image: '/images/4.png',
    category: 'Couture',
    rating: 4.7,
    reviews: 9,
    isNew: false,
    isSale: true
  },
  {
    id: 21,
    name: 'Artisan Couture Dress',
    price: 4500,
    originalPrice: null,
    image: '/images/5.png',
    category: 'Couture',
    rating: 4.8,
    reviews: 7,
    isNew: true,
    isSale: false
  },
  {
    id: 22,
    name: 'Masterpiece Couture',
    price: 6500,
    originalPrice: null,
    image: '/images/6.png',
    category: 'Couture',
    rating: 4.9,
    reviews: 3,
    isNew: false,
    isSale: false
  },

  // Bridal (6 products)
  {
    id: 23,
    name: 'Bridal Collection Dress',
    price: 2500,
    originalPrice: null,
    image: '/images/7.png',
    category: 'Bridal',
    rating: 4.7,
    reviews: 8,
    isNew: false,
    isSale: false
  },
  {
    id: 24,
    name: 'Wedding Gown',
    price: 3200,
    originalPrice: null,
    image: '/images/8.png',
    category: 'Bridal',
    rating: 4.8,
    reviews: 6,
    isNew: true,
    isSale: false
  },
  {
    id: 25,
    name: 'Bridal Party Dress',
    price: 899,
    originalPrice: 1199,
    image: '/images/1.png',
    category: 'Bridal',
    rating: 4.6,
    reviews: 15,
    isNew: false,
    isSale: true
  },
  {
    id: 26,
    name: 'Elegant Bridal Gown',
    price: 2800,
    originalPrice: null,
    image: '/images/2.png',
    category: 'Bridal',
    rating: 4.9,
    reviews: 4,
    isNew: true,
    isSale: false
  },
  {
    id: 27,
    name: 'Classic Wedding Dress',
    price: 1900,
    originalPrice: 2400,
    image: '/images/3.png',
    category: 'Bridal',
    rating: 4.7,
    reviews: 11,
    isNew: false,
    isSale: true
  },
  {
    id: 28,
    name: 'Modern Bridal Dress',
    price: 3600,
    originalPrice: null,
    image: '/images/4.png',
    category: 'Bridal',
    rating: 4.8,
    reviews: 7,
    isNew: true,
    isSale: false
  },

  // Casual Wear (6 products)
  {
    id: 29,
    name: 'Casual Chic Top',
    price: 299,
    originalPrice: 399,
    image: '/images/5.png',
    category: 'Casual Wear',
    rating: 4.4,
    reviews: 31,
    isNew: false,
    isSale: true
  },
  {
    id: 30,
    name: 'Weekend Casual Shirt',
    price: 199,
    originalPrice: null,
    image: '/images/6.png',
    category: 'Casual Wear',
    rating: 4.3,
    reviews: 45,
    isNew: true,
    isSale: false
  },
  {
    id: 31,
    name: 'Relaxed Casual Top',
    price: 249,
    originalPrice: 349,
    image: '/images/7.png',
    category: 'Casual Wear',
    rating: 4.5,
    reviews: 28,
    isNew: true,
    isSale: true
  },
  {
    id: 32,
    name: 'Comfortable Casual Dress',
    price: 399,
    originalPrice: null,
    image: '/images/8.png',
    category: 'Casual Wear',
    rating: 4.4,
    reviews: 36,
    isNew: false,
    isSale: false
  },
  {
    id: 33,
    name: 'Trendy Casual Top',
    price: 179,
    originalPrice: 229,
    image: '/images/1.png',
    category: 'Casual Wear',
    rating: 4.2,
    reviews: 52,
    isNew: true,
    isSale: true
  },
  {
    id: 34,
    name: 'Stylish Casual Shirt',
    price: 329,
    originalPrice: null,
    image: '/images/2.png',
    category: 'Casual Wear',
    rating: 4.6,
    reviews: 24,
    isNew: false,
    isSale: false
  },

  // Formal Wear (4 products)
  {
    id: 35,
    name: 'Formal Business Suit',
    price: 799,
    originalPrice: null,
    image: '/images/3.png',
    category: 'Formal Wear',
    rating: 4.6,
    reviews: 22,
    isNew: false,
    isSale: false
  },
  {
    id: 36,
    name: 'Executive Formal Dress',
    price: 899,
    originalPrice: 1199,
    image: '/images/4.png',
    category: 'Formal Wear',
    rating: 4.7,
    reviews: 18,
    isNew: true,
    isSale: true
  },
  {
    id: 37,
    name: 'Professional Formal Suit',
    price: 1099,
    originalPrice: null,
    image: '/images/5.png',
    category: 'Formal Wear',
    rating: 4.8,
    reviews: 14,
    isNew: false,
    isSale: false
  },
  {
    id: 38,
    name: 'Corporate Formal Dress',
    price: 699,
    originalPrice: 899,
    image: '/images/6.png',
    category: 'Formal Wear',
    rating: 4.5,
    reviews: 26,
    isNew: true,
    isSale: true
  },

  // Accessories (4 products)
  {
    id: 39,
    name: 'Designer Handbag',
    price: 899,
    originalPrice: 1199,
    image: '/images/7.png',
    category: 'Accessories',
    rating: 4.5,
    reviews: 15,
    isNew: true,
    isSale: true
  },
  {
    id: 40,
    name: 'Luxury Scarf',
    price: 299,
    originalPrice: null,
    image: '/images/8.png',
    category: 'Accessories',
    rating: 4.4,
    reviews: 32,
    isNew: false,
    isSale: false
  },
  {
    id: 41,
    name: 'Elegant Clutch',
    price: 499,
    originalPrice: 699,
    image: '/images/1.png',
    category: 'Accessories',
    rating: 4.6,
    reviews: 21,
    isNew: true,
    isSale: true
  },
  {
    id: 42,
    name: 'Designer Belt',
    price: 199,
    originalPrice: null,
    image: '/images/2.png',
    category: 'Accessories',
    rating: 4.3,
    reviews: 28,
    isNew: false,
    isSale: false
  },

  // Jewelry (4 products)
  {
    id: 43,
    name: 'Luxury Jewelry Set',
    price: 1500,
    originalPrice: 2000,
    image: '/images/3.png',
    category: 'Jewelry',
    rating: 4.8,
    reviews: 6,
    isNew: true,
    isSale: true
  },
  {
    id: 44,
    name: 'Diamond Necklace',
    price: 2500,
    originalPrice: null,
    image: '/images/4.png',
    category: 'Jewelry',
    rating: 4.9,
    reviews: 4,
    isNew: false,
    isSale: false
  },
  {
    id: 45,
    name: 'Pearl Earrings',
    price: 899,
    originalPrice: 1199,
    image: '/images/5.png',
    category: 'Jewelry',
    rating: 4.7,
    reviews: 12,
    isNew: true,
    isSale: true
  },
  {
    id: 46,
    name: 'Gold Bracelet',
    price: 1299,
    originalPrice: null,
    image: '/images/6.png',
    category: 'Jewelry',
    rating: 4.6,
    reviews: 9,
    isNew: false,
    isSale: false
  },

  // Handbags (2 products)
  {
    id: 47,
    name: 'Luxury Handbag',
    price: 1199,
    originalPrice: 1599,
    image: '/images/7.png',
    category: 'Handbags',
    rating: 4.8,
    reviews: 11,
    isNew: true,
    isSale: true
  },
  {
    id: 48,
    name: 'Designer Tote',
    price: 799,
    originalPrice: null,
    image: '/images/8.png',
    category: 'Handbags',
    rating: 4.5,
    reviews: 19,
    isNew: false,
    isSale: false
  },

  // Shoes (2 products)
  {
    id: 49,
    name: 'Designer Heels',
    price: 599,
    originalPrice: 799,
    image: '/images/1.png',
    category: 'Shoes',
    rating: 4.6,
    reviews: 25,
    isNew: true,
    isSale: true
  },
  {
    id: 50,
    name: 'Luxury Flats',
    price: 399,
    originalPrice: null,
    image: '/images/2.png',
    category: 'Shoes',
    rating: 4.4,
    reviews: 33,
    isNew: false,
    isSale: false
  }
]

const categories = [
  'All',
  'Evening Wear',
  'Day Dresses',
  'Couture',
  'Bridal',
  'Casual Wear',
  'Formal Wear',
  'Accessories',
  'Jewelry',
  'Handbags',
  'Shoes',
  'Lingerie',
  'Activewear'
]

const sortOptions = [
  'Featured',
  'Price: Low to High',
  'Price: High to Low',
  'Newest',
  'Best Rated'
]

export default function ShopPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Featured')
  const [productsPerRow, setProductsPerRow] = useState(3)
  const [searchQuery, setSearchQuery] = useState('')
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  const handleFilterToggle = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen)
  }

  const handleFilterClose = () => {
    setIsMobileFiltersOpen(false)
  }

  // Filter products based on selected criteria
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    const matchesSearch = searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    
    return matchesCategory && matchesSearch && matchesPrice
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'Price: Low to High':
        return a.price - b.price
      case 'Price: High to Low':
        return b.price - a.price
      case 'Newest':
        return b.isNew ? -1 : 1
      case 'Best Rated':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuClick={handleMenuToggle} 
        isMobileMenuOpen={isMobileMenuOpen}
        onFilterClick={handleFilterToggle}
      />
      <div className="flex">
        <Sidebar isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
        <main className="flex-1 lg:ml-64 pb-16 lg:pb-0">
          {/* Page Header */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-3xl font-serif font-bold text-gray-900">Shop</h1>
                  <p className="text-gray-600 mt-2">
                    Discover our curated collection of luxury fashion pieces
                  </p>
                </div>
                
                {/* Desktop Search */}
                <div className="mt-4 lg:mt-0 lg:w-96">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Controls */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* Sort and View Controls */}
                <div className="flex items-center gap-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-600"
                  >
                    {sortOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>

                  {/* Products Per Row Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">View:</span>
                    <div className="flex border border-gray-200 rounded-lg">
                      {/* Mobile: Show only 1 and 2 options */}
                      <div className="flex sm:hidden">
                        {[
                          { count: 1, icon: Grid2X2, label: '1 per row' },
                          { count: 2, icon: Grid3X3, label: '2 per row' }
                        ].map(({ count, icon: Icon, label }) => (
                          <button
                            key={count}
                            onClick={() => setProductsPerRow(count)}
                            title={label}
                            className={`p-2 transition-colors ${
                              productsPerRow === count
                                ? 'bg-primary-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </button>
                        ))}
                      </div>
                      
                      {/* Desktop: Show all 3 options */}
                      <div className="hidden sm:flex">
                        {[
                          { count: 1, icon: Grid2X2, label: '1 per row' },
                          { count: 2, icon: Grid3X3, label: '2 per row' },
                          { count: 3, icon: Grid, label: '3 per row' }
                        ].map(({ count, icon: Icon, label }) => (
                          <button
                            key={count}
                            onClick={() => setProductsPerRow(count)}
                            title={label}
                            className={`p-2 transition-colors ${
                              productsPerRow === count
                                ? 'bg-primary-600 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {sortedProducts.length} of {products.length} products
              </p>
            </div>

            <div className={`grid gap-6 ${
              productsPerRow === 1 
                ? 'grid-cols-1' 
                : productsPerRow === 2
                ? 'grid-cols-1 sm:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {sortedProducts.map((product) => (
                <Link key={product.id} href={product.slug ? `/products/${product.slug}` : `/products/${product.id}`}>
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isNew && (
                        <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                          New
                        </span>
                      )}
                      {product.isSale && (
                        <span className="bg-secondary-500 text-white text-xs px-2 py-1 rounded-full">
                          Sale
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900 text-sm lg:text-base">
                        {product.name}
                      </h3>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <ShoppingBag className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-sm text-gray-400">({product.reviews})</span>
                    </div>

                    <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary-600">
                      ₨{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">
                        ₨{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    </div>

                    <div className="mt-2">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-12">
              <button className="btn-primary">
                Load More Products
              </button>
            </div>
          </div>

          <Footer />
        </main>
      </div>
      
      <MobileBottomNav />
      <MobileFilters isOpen={isMobileFiltersOpen} onClose={handleFilterClose} />
    </div>
  )
}
