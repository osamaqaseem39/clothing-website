'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { ProductFilters } from '@/lib/api'
import { useProducts } from '@/contexts/ProductsContext'
import MobileProductCard from './MobileProductCard'

export default function MobileSearchPage() {
  const searchParams = useSearchParams()
  const { products: allProducts, loading: productsLoading } = useProducts()
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    limit: 12,
    search: searchParams.get('q') || '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })

  const filteredProducts = allProducts.filter(product => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matchesSearch = 
        product.name.toLowerCase().includes(searchLower) ||
        product.description?.toLowerCase().includes(searchLower) ||
        product.brand?.toLowerCase().includes(searchLower) ||
        product.category?.toLowerCase().includes(searchLower) ||
        (Array.isArray(product.categories) && product.categories.some(cat => 
          String(cat).toLowerCase().includes(searchLower)
        ))
      if (!matchesSearch) return false
    }

    const productPrice = product.salePrice && product.salePrice > 0 ? product.salePrice : product.price
    if (filters.minPrice !== undefined && productPrice < filters.minPrice) return false
    if (filters.maxPrice !== undefined && productPrice > filters.maxPrice) return false
    if (filters.status && product.status !== filters.status) return false

    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price':
        return filters.sortOrder === 'asc' ? (a.price - b.price) : (b.price - a.price)
      case 'name':
        return filters.sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      case 'createdAt':
      default:
        const aTime = new Date(a.createdAt).getTime()
        const bTime = new Date(b.createdAt).getTime()
        return filters.sortOrder === 'asc' ? (aTime - bTime) : (bTime - aTime)
    }
  })

  const page = filters.page || 1
  const limit = filters.limit || 12
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex)
  const totalPages = Math.ceil(sortedProducts.length / limit)

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm || undefined,
      page: 1
    }))
  }

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }))
  }

  const handlePageChange = (page: number) => {
    setFilters(prev => ({ ...prev, page }))
  }

  const clearSearch = () => {
    setFilters(prev => ({
      ...prev,
      search: undefined,
      page: 1
    }))
  }

  if (productsLoading) {
    return (
      <div className="px-4 py-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 mb-3">Search Results</h1>
          {filters.search && (
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-600 flex-1">
                Results for "{filters.search}"
              </p>
              <button
                onClick={clearSearch}
                className="p-1 text-gray-500 active:text-gray-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="relative mb-3">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search || ''}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split('-')
            handleFilterChange('sortBy', sortBy)
            handleFilterChange('sortOrder', sortOrder)
          }}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="createdAt-desc">Newest First</option>
          <option value="createdAt-asc">Oldest First</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="px-4 py-2 bg-gray-50">
        <p className="text-xs text-gray-600">{sortedProducts.length} products found</p>
      </div>

      {/* Products */}
      {paginatedProducts.length === 0 ? (
        <div className="text-center py-12 px-4">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-base font-medium text-gray-900 mb-2">
            {filters.search ? 'No products found' : 'Start searching'}
          </h3>
          <p className="text-sm text-gray-600">
            {filters.search 
              ? 'Try adjusting your search terms' 
              : 'Enter a search term to find products'
            }
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 p-4">
            {paginatedProducts.map((product) => (
              <MobileProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.images[0] || '/images/1.png'}
                category={product.categories?.[0] || product.category || 'Uncategorized'}
                brand={product.brand}
                isNew={new Date(product.createdAt).getTime() > Date.now() - 7 * 24 * 60 * 60 * 1000}
                isOnSale={!!product.originalPrice && product.originalPrice > product.price}
                slug={product.slug}
                rating={product.rating}
                reviews={product.reviews}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6 px-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-2 text-xs text-gray-600 active:text-gray-900 disabled:opacity-50"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (page <= 3) {
                    pageNum = i + 1
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = page - 2 + i
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 text-xs rounded-lg ${
                        pageNum === page
                          ? 'bg-primary-600 text-white'
                          : 'text-gray-600 active:bg-gray-100'
                      }`}
                    >
                      {pageNum}
                    </button>
                  )
                })}
                
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-2 text-xs text-gray-600 active:text-gray-900 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

