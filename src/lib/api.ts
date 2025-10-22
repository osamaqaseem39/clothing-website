export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://clothing-server-cyan.vercel.app/api'

import { fallbackProducts, getProductBySlug, getProductsByCategory, getFeaturedProducts, searchProducts } from '../data/fallbackProducts';

// Product interface for landing page
export interface Product {
  _id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  sku: string
  type: 'simple' | 'variable' | 'grouped'
  price: number
  salePrice?: number
  originalPrice?: number
  currency: string
  stockQuantity: number
  stockStatus: 'instock' | 'outofstock' | 'onbackorder'
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
  manageStock: boolean
  allowBackorders: boolean
  status: 'published' | 'draft' | 'archived'
  categories: string[]
  tags: string[]
  brand: string
  attributes: string[]
  variations: ProductVariation[]
  images: string[]
  
  // UI-specific fields
  rating: number
  reviews: number
  isNew: boolean
  isSale: boolean
  features: string[]
  colors: string[]
  inStock: boolean
  stockCount: number
  shippingWeight: number
  shippingDimensions: {
    length: number
    width: number
    height: number
  }
  isActive: boolean
  seo: ProductSEO
  
  // Pakistani Clothing Specific Fields
  fabric: string
  collection: string
  collectionName: string
  occasion: string
  season: string
  careInstructions: string
  modelMeasurements: {
    height: string
    bust: string
    waist: string
    hips: string
  }
  designer: string
  handwork: string[]
  colorFamily: string
  pattern: string
  sleeveLength: string
  neckline: string
  length: string
  fit: string
  ageGroup: string
  bodyType: string[]
  isLimitedEdition: boolean
  isCustomMade: boolean
  customDeliveryDays?: number
  sizeChart: string
  availableSizes: string[]
  createdAt: string
  updatedAt: string
}

export interface ProductVariation {
  _id: string
  name: string
  sku: string
  price: number
  salePrice?: number
  stockQuantity: number
  stockStatus: 'instock' | 'outofstock' | 'onbackorder'
  attributes: Record<string, string>
  images: string[]
  weight: number
  dimensions: {
    length: number
    width: number
    height: number
  }
}

export interface ProductSEO {
  title: string
  description: string
  keywords: string[]
  slug: string
  canonicalUrl: string
  ogImage: string
  noIndex: boolean
  noFollow: boolean
}

export interface ProductFilters {
  page?: number
  limit?: number
  search?: string
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  status?: 'published' | 'draft' | 'archived'
  sortBy?: 'name' | 'price' | 'createdAt' | 'updatedAt' | 'rating'
  sortOrder?: 'asc' | 'desc'
  sizes?: string[]
  fabrics?: string[]
  occasions?: string[]
  colorFamilies?: string[]
  tags?: string[]
  attributes?: string[]
  collections?: string[]
  designers?: string[]
  seasons?: string[]
  ageGroups?: string[]
  bodyTypes?: string[]
  isNew?: boolean
  isSale?: boolean
  isLimitedEdition?: boolean
  isCustomMade?: boolean
  handwork?: string[]
  patterns?: string[]
  sleeveLengths?: string[]
  necklines?: string[]
  lengths?: string[]
  fits?: string[]
  priceRange?: {
    min: number
    max: number
  }
  rating?: {
    min: number
    max: number
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  parent?: string
  parentId?: string
  image?: string
  icon?: string
  color?: string
  isActive: boolean
  sortOrder: number
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  productCount?: number
  children?: Category[]
  createdAt: string
  updatedAt: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  description?: string
  logo?: string
  logoUrl?: string
  website?: string
  mainCompany?: string
  level: 'main' | 'sub'
  industry?: string
  country?: string
  foundedYear?: number
  colors?: {
    primary: string
    secondary: string
  }
  isFeatured: boolean
  isActive: boolean
  sortOrder: number
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
}

// Paginated response for landing page
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Products API
  async getProducts(filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
    try {
      const params = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })

      return await this.request<PaginatedResponse<Product>>(`/products?${params.toString()}`)
    } catch (error) {
      console.warn('API not available, using fallback data:', error)
      
      // Use fallback data with filtering
      let filteredProducts = [...fallbackProducts]
      
      // Apply filters
      if (filters.search) {
        filteredProducts = searchProducts(filters.search)
      }
      
      if (filters.category) {
        filteredProducts = getProductsByCategory(filters.category)
      }
      
      if (filters.brand) {
        filteredProducts = filteredProducts.filter(p => p.brand === filters.brand)
      }
      
      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!)
      }
      
      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!)
      }
      
      if (filters.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock)
      }
      
      // Apply pagination
      const page = filters.page || 1
      const limit = filters.limit || 12
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
      
      return {
        data: paginatedProducts,
        total: filteredProducts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit),
        hasNext: page < Math.ceil(filteredProducts.length / limit),
        hasPrev: page > 1
      }
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      return await this.request<Product>(`/products/${id}`)
    } catch (error) {
      console.warn('API not available, using fallback data:', error)
      const product = fallbackProducts.find(p => p._id === id)
      if (!product) {
        throw new Error('Product not found')
      }
      return product
    }
  }

  async getProductBySlug(slug: string): Promise<Product> {
    try {
      return await this.request<Product>(`/products/slug/${slug}`)
    } catch (error) {
      console.warn('API not available, using fallback data:', error)
      const product = getProductBySlug(slug)
      if (!product) {
        throw new Error('Product not found')
      }
      return product
    }
  }

  async getFeaturedProducts(): Promise<Product[]> {
    try {
      const published = await this.getPublishedProducts()
      return published.data
    } catch (error) {
      console.warn('API not available, using fallback data:', error)
      return getFeaturedProducts()
    }
  }

  async getTrendingProducts(): Promise<Product[]> {
    try {
      const published = await this.getPublishedProducts()
      return published.data
    } catch (error) {
      console.warn('API not available, using fallback data:', error)
      return getFeaturedProducts()
    }
  }

  async searchProducts(query: string, filters: Omit<ProductFilters, 'search'> = {}): Promise<PaginatedResponse<Product>> {
    try {
      const params = new URLSearchParams({ q: query })
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })

      return await this.request<PaginatedResponse<Product>>(`/products/search?${params.toString()}`)
    } catch (error) {
      console.warn('API not available, using fallback data:', error)
      
      // Use fallback search
      let filteredProducts = searchProducts(query)
      
      // Apply additional filters
      if (filters.category) {
        filteredProducts = getProductsByCategory(filters.category)
      }
      
      if (filters.brand) {
        filteredProducts = filteredProducts.filter(p => p.brand === filters.brand)
      }
      
      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!)
      }
      
      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!)
      }
      
      // Apply pagination
      const page = filters.page || 1
      const limit = filters.limit || 12
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
      
      return {
        data: paginatedProducts,
        total: filteredProducts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit),
        hasNext: page < Math.ceil(filteredProducts.length / limit),
        hasPrev: page > 1
      }
    }
  }

  async getPublishedProducts(filters: Omit<ProductFilters, 'search'> = {}): Promise<PaginatedResponse<Product>> {
    try {
      const params = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })

      const query = params.toString()
      const suffix = query ? `?${query}` : ''
      return await this.request<PaginatedResponse<Product>>(`/products/published${suffix}`)
    } catch (error) {
      console.warn('API not available, using fallback data:', error)
      
      // Use fallback data with filtering
      let filteredProducts = fallbackProducts.filter(p => p.status === 'published')
      
      // Apply filters
      if (filters.category) {
        filteredProducts = getProductsByCategory(filters.category)
      }
      
      if (filters.brand) {
        filteredProducts = filteredProducts.filter(p => p.brand === filters.brand)
      }
      
      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!)
      }
      
      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!)
      }
      
      if (filters.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock)
      }
      
      // Apply pagination
      const page = filters.page || 1
      const limit = filters.limit || 12
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
      
      return {
        data: paginatedProducts,
        total: filteredProducts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit),
        hasNext: page < Math.ceil(filteredProducts.length / limit),
        hasPrev: page > 1
      }
    }
  }

  async getProductsByCategory(categoryId: string, filters: Omit<ProductFilters, 'category'> = {}): Promise<PaginatedResponse<Product>> {
    try {
      const params = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })

      return await this.request<PaginatedResponse<Product>>(`/products/category/${categoryId}?${params.toString()}`)
    } catch (error) {
      console.warn('API not available, using fallback data:', error)
      
      // Use fallback data
      let filteredProducts = getProductsByCategory(categoryId)
      
      // Apply additional filters
      if (filters.brand) {
        filteredProducts = filteredProducts.filter(p => p.brand === filters.brand)
      }
      
      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!)
      }
      
      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!)
      }
      
      if (filters.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock)
      }
      
      // Apply pagination
      const page = filters.page || 1
      const limit = filters.limit || 12
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
      
      return {
        data: paginatedProducts,
        total: filteredProducts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit),
        hasNext: page < Math.ceil(filteredProducts.length / limit),
        hasPrev: page > 1
      }
    }
  }

  async getProductsByBrand(brandId: string, filters: Omit<ProductFilters, 'brand'> = {}): Promise<PaginatedResponse<Product>> {
    try {
      const params = new URLSearchParams()
      
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          params.append(key, value.toString())
        }
      })

      return await this.request<PaginatedResponse<Product>>(`/products/brand/${brandId}?${params.toString()}`)
    } catch (error) {
      console.warn('API not available, using fallback data:', error)
      
      // Use fallback data
      let filteredProducts = fallbackProducts.filter(p => p.brand === brandId)
      
      // Apply additional filters
      if (filters.category) {
        filteredProducts = getProductsByCategory(filters.category)
      }
      
      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!)
      }
      
      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!)
      }
      
      if (filters.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock)
      }
      
      // Apply pagination
      const page = filters.page || 1
      const limit = filters.limit || 12
      const startIndex = (page - 1) * limit
      const endIndex = startIndex + limit
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex)
      
      return {
        data: paginatedProducts,
        total: filteredProducts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit),
        hasNext: page < Math.ceil(filteredProducts.length / limit),
        hasPrev: page > 1
      }
    }
  }

  // Categories API
  async getCategories(): Promise<Category[]> {
    return this.request<Category[]>('/categories')
  }

  async getCategory(id: string): Promise<Category> {
    return this.request<Category>(`/categories/${id}`)
  }

  async getCategoryBySlug(slug: string): Promise<Category> {
    return this.request<Category>(`/categories/slug/${slug}`)
  }

  // Brands API
  async getBrands(params: { page?: number; limit?: number } = {}): Promise<PaginatedResponse<Brand> | Brand[]> {
    const q = new URLSearchParams()
    if (params.page !== undefined) q.append('page', String(params.page))
    if (params.limit !== undefined) q.append('limit', String(params.limit))
    const suffix = q.toString() ? `?${q.toString()}` : ''
    return this.request<PaginatedResponse<Brand> | Brand[]>(`/brands${suffix}`)
  }

  async getBrand(id: string): Promise<Brand> {
    return this.request<Brand>(`/brands/${id}`)
  }

  async getBrandBySlug(slug: string): Promise<Brand> {
    return this.request<Brand>(`/brands/slug/${slug}`)
  }

  async getActiveBrands(params: { page?: number; limit?: number } = {}): Promise<PaginatedResponse<Brand> | Brand[]> {
    const q = new URLSearchParams()
    if (params.page !== undefined) q.append('page', String(params.page))
    if (params.limit !== undefined) q.append('limit', String(params.limit))
    const suffix = q.toString() ? `?${q.toString()}` : ''
    return this.request<PaginatedResponse<Brand> | Brand[]>(`/brands/active${suffix}`)
  }

  async searchBrands(query: string, params: { page?: number; limit?: number } = {}): Promise<PaginatedResponse<Brand>> {
    const q = new URLSearchParams({ q: query })
    if (params.page !== undefined) q.append('page', String(params.page))
    if (params.limit !== undefined) q.append('limit', String(params.limit))
    return this.request<PaginatedResponse<Brand>>(`/brands/search?${q.toString()}`)
  }

  async getBrandsByCountry(country: string, params: { page?: number; limit?: number } = {}): Promise<PaginatedResponse<Brand>> {
    const q = new URLSearchParams()
    if (params.page !== undefined) q.append('page', String(params.page))
    if (params.limit !== undefined) q.append('limit', String(params.limit))
    const suffix = q.toString() ? `?${q.toString()}` : ''
    return this.request<PaginatedResponse<Brand>>(`/brands/country/${country}${suffix}`)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)