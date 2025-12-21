'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react'
import { apiClient, Product } from '@/lib/api'

interface ProductsContextType {
  products: Product[]
  loading: boolean
  error: string | null
  refreshProducts: () => Promise<void>
}

interface ProductsCache {
  products: Product[]
  timestamp: number
}

const CACHE_KEY = 'products_cache'
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes in milliseconds

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load products from cache
  const loadFromCache = useCallback((): Product[] | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (!cached) return null

      const cacheData: ProductsCache = JSON.parse(cached)
      const now = Date.now()
      
      // Check if cache is still valid
      if (now - cacheData.timestamp < CACHE_DURATION) {
        return cacheData.products
      }
      
      // Cache expired, remove it
      localStorage.removeItem(CACHE_KEY)
      return null
    } catch (err) {
      console.error('Error loading products from cache:', err)
      localStorage.removeItem(CACHE_KEY)
      return null
    }
  }, [])

  // Save products to cache
  const saveToCache = useCallback((productsToCache: Product[]) => {
    try {
      const cacheData: ProductsCache = {
        products: productsToCache,
        timestamp: Date.now()
      }
      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData))
    } catch (err) {
      console.error('Error saving products to cache:', err)
      // If storage is full, try to clear old cache
      try {
        localStorage.removeItem(CACHE_KEY)
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          products: productsToCache,
          timestamp: Date.now()
        }))
      } catch (clearErr) {
        console.error('Error clearing cache:', clearErr)
      }
    }
  }, [])

  const fetchAllProducts = useCallback(async (skipCache: boolean = false) => {
    try {
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
      
      // Update products and cache
      setProducts(allProducts)
      saveToCache(allProducts)
    } catch (err) {
      setError('Failed to fetch products')
      console.error('Error fetching products:', err)
      
      // If fetch fails and we have cached data, keep using it
      const cachedProducts = loadFromCache()
      if (cachedProducts && cachedProducts.length > 0) {
        setProducts(cachedProducts)
        setError(null) // Don't show error if we have cached data
      }
    } finally {
      setLoading(false)
    }
  }, [loadFromCache, saveToCache])

  // Load from cache on mount, then fetch fresh data
  useEffect(() => {
    const cachedProducts = loadFromCache()
    if (cachedProducts && cachedProducts.length > 0) {
      // Show cached data immediately
      setProducts(cachedProducts)
      setLoading(false)
      // Fetch fresh data in background (don't show loading state)
      fetchAllProducts(true)
    } else {
      // No cache, fetch immediately with loading state
      setLoading(true)
      fetchAllProducts(true)
    }
  }, [loadFromCache, fetchAllProducts])

  const refreshProducts = useCallback(async () => {
    // Force refresh (skipCache is true, but we still fetch fresh data)
    setLoading(true)
    await fetchAllProducts(true)
  }, [fetchAllProducts])

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
