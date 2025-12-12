'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient, Product } from '@/lib/api'

interface ProductsContextType {
  products: Product[]
  loading: boolean
  error: string | null
  refreshProducts: () => Promise<void>
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchAllProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Fetch all products with a high limit
      // We'll paginate through all pages to get all products
      let allProducts: Product[] = []
      let page = 1
      let hasMore = true
      const limit = 100 // Fetch 100 products per page
      
      while (hasMore) {
        const response = await apiClient.getProducts({
          page,
          limit,
          status: 'published', // Only fetch published products
          sortBy: 'createdAt',
          sortOrder: 'desc'
        })
        
        if (response.data && response.data.length > 0) {
          allProducts = [...allProducts, ...response.data]
          
          // Check if there are more pages
          hasMore = response.hasNext || (response.data.length === limit && page < response.totalPages)
          page++
        } else {
          hasMore = false
        }
      }
      
      setProducts(allProducts)
    } catch (err) {
      setError('Failed to fetch products')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAllProducts()
  }, [])

  const refreshProducts = async () => {
    await fetchAllProducts()
  }

  return (
    <ProductsContext.Provider value={{ products, loading, error, refreshProducts }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }
  return context
}
