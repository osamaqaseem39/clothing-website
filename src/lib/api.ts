export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://clothing-server-cyan.vercel.app/api'

export interface Product {
  _id: string
  name: string
  slug: string
  description: string
  shortDescription: string
  sku: string
  type: 'simple' | 'variable' | 'grouped' | 'external'
  price: number
  salePrice?: number
  currency: string
  stockQuantity: number
  stockStatus: 'instock' | 'outofstock' | 'onbackorder'
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  manageStock: boolean
  allowBackorders: boolean
  status: 'draft' | 'published'
  categories: string[]
  tags: string[]
  brand?: string
  attributes: string[]
  variations?: string[]
  images: string[]
  fabric?: string
  collection?: string
  occasion?: string
  season?: string
  careInstructions?: string
  modelMeasurements?: {
    height: string
    bust: string
    waist: string
    hips: string
  }
  designer?: string
  handwork?: string[]
  colorFamily?: string
  pattern?: string
  sleeveLength?: string
  neckline?: string
  length?: string
  fit?: string
  ageGroup?: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  _id: string
  name: string
  slug: string
  description?: string
  parent?: string
  image?: string
  isActive: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface Brand {
  _id: string
  name: string
  slug: string
  description?: string
  logo?: string
  website?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ProductFilters {
  page?: number
  limit?: number
  search?: string
  category?: string
  brand?: string
  tag?: string
  minPrice?: number
  maxPrice?: number
  status?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  // Attribute-based filters
  size?: string
  fabric?: string
  style?: string
  colorFamily?: string
  pattern?: string
  sleeveLength?: string
  neckline?: string
  length?: string
  fit?: string
  season?: string
  occasion?: string
  designer?: string
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
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    return this.request<PaginatedResponse<Product>>(`/products?${params.toString()}`)
  }

  async getProduct(id: string): Promise<Product> {
    return this.request<Product>(`/products/${id}`)
  }

  async getProductBySlug(slug: string): Promise<Product> {
    return this.request<Product>(`/products/slug/${slug}`)
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
    const params = new URLSearchParams({ q: query })
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    return this.request<PaginatedResponse<Product>>(`/products/search?${params.toString()}`)
  }

  async getPublishedProducts(filters: Omit<ProductFilters, 'search'> = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    const query = params.toString()
    const suffix = query ? `?${query}` : ''
    return this.request<PaginatedResponse<Product>>(`/products/published${suffix}`)
  }

  async getProductsByCategory(categoryId: string, filters: Omit<ProductFilters, 'category'> = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    return this.request<PaginatedResponse<Product>>(`/products/category/${categoryId}?${params.toString()}`)
  }

  async getProductsByBrand(brandId: string, filters: Omit<ProductFilters, 'brand'> = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    return this.request<PaginatedResponse<Product>>(`/products/brand/${brandId}?${params.toString()}`)
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