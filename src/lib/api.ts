export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://clothing-server-cyan.vercel.app/api'

// Minimal default headers to avoid triggering unnecessary CORS preflights
export const getCorsHeaders = () => ({
  'Accept': 'application/json',
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

  private normalizeProduct = (raw: any): Product => {
    const placeholder = '/images/logo.png'

    // Normalize images from multiple possible shapes
    // Possible shapes: string[], [{ url }], [{ imageUrl }], [{ path }], [ObjectId]
    let imageUrls: string[] = []
    if (Array.isArray(raw?.images)) {
      for (const img of raw.images) {
        if (typeof img === 'string') {
          // If it looks like a URL/path, accept; if it looks like an ObjectId, skip
          const looksLikeObjectId = /^[a-f\d]{24}$/i.test(img)
          if (!looksLikeObjectId) {
            imageUrls.push(img)
          }
          continue
        }
        if (img && typeof img === 'object') {
          const candidate = img.url || img.imageUrl || img.path || ''
          if (candidate) imageUrls.push(candidate)
        }
      }
    }
    if (imageUrls.length === 0) {
      imageUrls = [placeholder]
    }

    // Normalize brand to a string name if object/id provided
    let brandName: string = ''
    if (typeof raw?.brand === 'string') {
      brandName = raw.brand
    } else if (raw?.brand && typeof raw.brand === 'object') {
      brandName = raw.brand.name || raw.brand.slug || raw.brand._id || ''
    }

    // Normalize categories to names array if objects/ids provided
    let categoryNames: string[] | undefined = undefined
    if (Array.isArray(raw?.categories)) {
      categoryNames = raw.categories.map((cat: any) => {
        if (typeof cat === 'string') return cat
        if (cat && typeof cat === 'object') return cat.name || cat.slug || cat._id || 'General'
        return 'General'
      })
    }

    // Align price/originalPrice when only salePrice is present
    let normalizedPrice = raw?.price
    let normalizedOriginalPrice = raw?.originalPrice
    if (raw?.salePrice && (raw.salePrice < raw.price)) {
      normalizedOriginalPrice = normalizedOriginalPrice ?? raw.price
      normalizedPrice = raw.salePrice
    }

    return {
      ...raw,
      images: imageUrls,
      brand: brandName || raw?.brand || 'Unknown',
      categories: categoryNames || raw?.categories,
      price: normalizedPrice,
      originalPrice: normalizedOriginalPrice,
    } as Product
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`
    
    // Compose headers without forcing Content-Type for GET to keep it a simple request
    const baseHeaders: Record<string, string> = {
      ...getCorsHeaders(),
    }

    const method = (options.method || 'GET').toUpperCase()
    const hasBody = typeof options.body !== 'undefined' && options.body !== null
    if (method !== 'GET' && hasBody) {
      baseHeaders['Content-Type'] = (options.headers as any)?.['Content-Type'] || 'application/json'
    }

    const config: RequestInit = {
      headers: {
        ...baseHeaders,
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

    // Normalize category/categories to backend expected repeated `categories` params
    const { category, categories, ...rest } = filters as any
    if (category) {
      const categoryArray = Array.isArray(category) ? category : [category]
      categoryArray.forEach((cat: string) => params.append('categories', cat))
    }
    if (Array.isArray(categories)) {
      categories.forEach((cat: string) => params.append('categories', cat))
    }

    // Append the rest of the filters
    Object.entries(rest).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    const payload = await this.request<PaginatedResponse<any>>(`/products?${params.toString()}`)
    return {
      ...payload,
      data: (payload.data || []).map(this.normalizeProduct),
    }
  }

  async getProduct(id: string): Promise<Product> {
    const raw = await this.request<any>(`/products/${id}`)
    return this.normalizeProduct(raw)
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const raw = await this.request<any>(`/products/slug/${slug}`)
    return this.normalizeProduct(raw)
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
    // Backend expects `q` as the search query parameter
    params.append('q', query)
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    const payload = await this.request<PaginatedResponse<any>>(`/products/search?${params.toString()}`)
    return {
      ...payload,
      data: (payload.data || []).map(this.normalizeProduct),
    }
  }

  async getPublishedProducts(filters: Omit<ProductFilters, 'status'> = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    const suffix = params.toString() ? `?${params.toString()}` : ''
    const payload = await this.request<PaginatedResponse<any>>(`/products/published${suffix}`)
    return {
      ...payload,
      data: (payload.data || []).map(this.normalizeProduct),
    }
  }

  async getProductsByCategory(categoryId: string, filters: Omit<ProductFilters, 'category'> = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    const payload = await this.request<PaginatedResponse<any>>(`/products/category/${categoryId}?${params.toString()}`)
    return {
      ...payload,
      data: (payload.data || []).map(this.normalizeProduct),
    }
  }

  async getProductsByBrand(brandId: string, filters: Omit<ProductFilters, 'brand'> = {}): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    const payload = await this.request<PaginatedResponse<any>>(`/products/brand/${brandId}?${params.toString()}`)
    return {
      ...payload,
      data: (payload.data || []).map(this.normalizeProduct),
    }
  }

  // Categories API
  async getCategories(): Promise<Category[]> {
    // Prefer active categories endpoint which returns an array
    const payload = await this.request<any>('/categories/active')
    if (Array.isArray(payload)) return payload as Category[]
    if (payload?.data && Array.isArray(payload.data)) return payload.data as Category[]
    // Fallback to paginated shape from /categories
    if (payload?.data?.docs && Array.isArray(payload.data.docs)) return payload.data.docs as Category[]
    // If direct call to /categories was made by some proxies, normalize here
    if (payload?.docs && Array.isArray(payload.docs)) return payload.docs as Category[]
    return []
  }

  async getCategory(id: string): Promise<Category> {
    return await this.request<Category>(`/categories/${id}`)
  }

  async getCategoryBySlug(slug: string): Promise<Category> {
    return await this.request<Category>(`/categories/slug/${slug}`)
  }

  // Brands API
  async getBrands(): Promise<Brand[]> {
    // Use active brands with high limit; normalize paginated responses
    const params = new URLSearchParams()
    params.append('page', '1')
    params.append('limit', '1000')
    const payload = await this.request<any>(`/brands/active?${params.toString()}`)
    if (Array.isArray(payload)) return payload as Brand[]
    if (payload?.data && Array.isArray(payload.data)) return payload.data as Brand[]
    if (payload?.data?.docs && Array.isArray(payload.data.docs)) return payload.data.docs as Brand[]
    if (payload?.docs && Array.isArray(payload.docs)) return payload.docs as Brand[]
    return []
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

  // Orders API - TODO: Connect to backend
  async getCustomerOrders(customerId: string, filters: { page?: number; limit?: number } = {}): Promise<any> {
    const params = new URLSearchParams()
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, value.toString())
      }
    })

    const suffix = params.toString() ? `?${params.toString()}` : ''
    return await this.request(`/orders/customer/${customerId}${suffix}`)
  }

  async getOrder(id: string): Promise<any> {
    return await this.request(`/orders/${id}`)
  }
}

export const apiClient = new ApiClient(API_BASE_URL)