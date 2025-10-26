export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://clothing-server-cyan.vercel.app/api'

// CORS configuration for all API requests
export const getCorsHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Origin': typeof window !== 'undefined' ? window.location.origin : 'https://clothing-website-lovat.vercel.app',
})

export const getCorsConfig = (): RequestInit => ({
  credentials: 'include',
  mode: 'cors',
})

// No sample data - API only

// Product interface for landing page
export interface Product {
  _id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  price: number
  originalPrice?: number
  salePrice?: number
  images: string[]
  category: string
  categories?: string[]
  brand: string
  status: 'draft' | 'published' | 'archived'
  inStock: boolean
  stockQuantity: number
  stockCount?: number
  isNew?: boolean
  isSale?: boolean
  rating?: number
  reviews?: number
  availableSizes?: string[]
  colors?: string[]
  features?: string[]
  bodyType?: string[]
  occasion?: string
  season?: string
  sizeChart?: {
    _id: string
    name: string
    description?: string
    sizeType: 'numeric' | 'alphabetic' | 'custom'
    sizes: Array<{
      size: string
      measurements: {
        bust?: string
        waist?: string
        hips?: string
        shoulder?: string
        sleeveLength?: string
        length?: string
        custom?: Record<string, string>
      }
    }>
    imageUrl?: string
    imageAltText?: string
    isActive: boolean
  }
  attributes?: {
    color?: string
    sizes?: string[]
    material?: string
    gender?: string
  }
  tags?: string[]
  createdAt: string
  updatedAt: string
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
  status?: string
  sizes?: string[]
  fabrics?: string[]
  occasions?: string[]
  colorFamilies?: string[]
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
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

export interface Brand {
  _id: string
  name: string
  slug: string
  description?: string
  logo?: string
  website?: string
  country?: string
  isActive?: boolean
  createdAt: string
  updatedAt: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  image?: string
  parent?: string
  children?: Category[]
  isActive: boolean
  sortOrder?: number
  createdAt: string
  updatedAt: string
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
        ...getCorsHeaders(),
        ...options.headers,
      },
      ...getCorsConfig(),
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
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    return await this.request<PaginatedResponse<Product>>(`/products?${params.toString()}`)
  }

  async getProduct(id: string): Promise<Product> {
    return await this.request<Product>(`/products/${id}`)
  }

  async getProductBySlug(slug: string): Promise<Product> {
    return await this.request<Product>(`/products/slug/${slug}`)
  }

  async getFeaturedProducts(): Promise<Product[]> {
    const published = await this.getPublishedProducts()
    return published.data
  }

  async getTrendingProducts(): Promise<Product[]> {
    const published = await this.getPublishedProducts()
    return published.data
  }

  async searchProducts(query: string, filters: Omit<ProductFilters, 'search'> = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams()
    params.append('search', query)
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    return await this.request<PaginatedResponse<Product>>(`/products/search?${params.toString()}`)
  }

  async getPublishedProducts(filters: Omit<ProductFilters, 'status'> = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams()
    params.append('status', 'published')
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    const suffix = params.toString() ? `?${params.toString()}` : ''
    return await this.request<PaginatedResponse<Product>>(`/products/published${suffix}`)
  }

  async getProductsByCategory(categoryId: string, filters: Omit<ProductFilters, 'category'> = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    return await this.request<PaginatedResponse<Product>>(`/products/category/${categoryId}?${params.toString()}`)
  }

  async getProductsByBrand(brandId: string, filters: Omit<ProductFilters, 'brand'> = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    return await this.request<PaginatedResponse<Product>>(`/products/brand/${brandId}?${params.toString()}`)
  }

  // Categories API
  async getCategories(): Promise<Category[]> {
    return await this.request<Category[]>('/categories')
  }

  async getCategory(id: string): Promise<Category> {
    return await this.request<Category>(`/categories/${id}`)
  }

  async getCategoryBySlug(slug: string): Promise<Category> {
    return await this.request<Category>(`/categories/slug/${slug}`)
  }

  // Brands API
  async getBrands(): Promise<Brand[]> {
    return await this.request<Brand[]>('/brands')
  }

  async getBrand(id: string): Promise<Brand> {
    return await this.request<Brand>(`/brands/${id}`)
  }

  async getBrandBySlug(slug: string): Promise<Brand> {
    return await this.request<Brand>(`/brands/slug/${slug}`)
  }

  async getBrandsByCountry(country: string, params: { page?: number; limit?: number } = {}): Promise<PaginatedResponse<Brand>> {
    const searchParams = new URLSearchParams()
    searchParams.append('country', country)
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString())
      }
    })

    const suffix = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return await this.request<PaginatedResponse<Brand>>(`/brands/country/${country}${suffix}`)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)