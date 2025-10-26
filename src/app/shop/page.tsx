'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import FiltersSidebar from '@/components/FiltersSidebar'
import MobileBottomNav from '@/components/MobileBottomNav'
import MobileFilters from '@/components/MobileFilters'
import Footer from '@/components/Footer'
import { Search, Filter, Star, Heart, ShoppingBag, Grid3X3, Grid2X2, Grid, Layout } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { apiClient, Product, ProductFilters } from '@/lib/api'

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
  'Outerwear',
  'Swimwear',
  'Activewear',
  'Sleepwear',
  'Maternity',
  'Plus Size',
  'Petite',
  'Vintage',
  'Sustainable',
  'Designer',
  'Limited Edition',
  'Seasonal',
  'Occasion',
  'Workwear',
  'Travel',
  'Home',
  'Special',
  'Custom',
  'Final',
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
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        setError(null)
        const filters: ProductFilters = {
          page: 1,
          limit: 100, // Get more products for the shop page
          sortBy: 'createdAt',
          sortOrder: 'desc'
        }
        const response = await apiClient.getProducts(filters)
        setProducts(response.data)
      } catch (err) {
        setError('Failed to fetch products')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

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
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case 'Best Rated':
        return (b.rating || 0) - (a.rating || 0)
      default:
        return 0
    }
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled by the filter function
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
  }

  const handlePriceRangeChange = (range: number[]) => {
    setPriceRange(range)
  }

  const handleColorToggle = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  const clearFilters = () => {
    setSelectedCategory('All')
    setSearchQuery('')
    setPriceRange([0, 5000])
    setSelectedColors([])
    setSelectedSizes([])
    setSortBy('Featured')
  }

  const getGridCols = () => {
    switch (productsPerRow) {
      case 1: return 'grid-cols-1'
      case 2: return 'grid-cols-1 sm:grid-cols-2'
      case 3: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      case 4: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      default: return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onMenuClick={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-6">
                  <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onMenuClick={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Products</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuClick={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop All Products</h1>
          <p className="text-gray-600">Discover our complete collection of luxury fashion</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <FiltersSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              priceRange={priceRange}
              onPriceRangeChange={handlePriceRangeChange}
              selectedColors={selectedColors}
              onColorToggle={handleColorToggle}
              selectedSizes={selectedSizes}
              onSizeToggle={handleSizeToggle}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {sortedProducts.length} products found
                </span>
              </div>

              <div className="flex items-center gap-4">
                {/* Search */}
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </form>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>

                {/* View Options */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setProductsPerRow(1)}
                    className={`p-2 rounded ${productsPerRow === 1 ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Layout className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setProductsPerRow(2)}
                    className={`p-2 rounded ${productsPerRow === 2 ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Grid2X2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setProductsPerRow(3)}
                    className={`p-2 rounded ${productsPerRow === 3 ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setProductsPerRow(4)}
                    className={`p-2 rounded ${productsPerRow === 4 ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <ShoppingBag className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`grid ${getGridCols()} gap-6`}>
                {sortedProducts.map((product) => (
                  <div key={product._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 group">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Link href={`/products/${product.slug}`}>
                        <Image
                          src={product.images[0] || '/images/1.png'}
                          alt={product.name}
                          width={400}
                          height={400}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </Link>
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.isNew && (
                          <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                            New
                          </span>
                        )}
                        {product.isSale && (
                          <span className="bg-secondary-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                            Sale
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
                        <Heart className="h-4 w-4 text-gray-400 hover:text-red-500" />
                      </button>
                    </div>

                    <div className="p-4">
                      <div className="mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg line-clamp-2 mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">{product.brand}</p>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 font-medium">{product.rating || 0}</span>
                        <span className="text-sm text-gray-400">({product.reviews || 0} reviews)</span>
                      </div>

                      <div className="flex items-center justify-between">
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
                        <button className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors duration-200">
                          <ShoppingBag className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={handleMenuClose} />
          <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
            <Sidebar
              isOpen={isMobileMenuOpen}
              onClose={handleMenuClose}
            />
          </div>
        </div>
      )}

      {/* Mobile Filters */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={handleFilterClose} />
          <div className="fixed inset-y-0 right-0 w-80 bg-white shadow-xl">
            <MobileFilters
              isOpen={isMobileFiltersOpen}
              onClose={handleFilterClose}
            />
          </div>
        </div>
      )}

      <MobileBottomNav />
    </div>
  )
}