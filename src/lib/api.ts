// Prefer a relative base so we can proxy via Next.js rewrites in all environments
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

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
  sizeChartImageUrl?: string
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

    // Normalize brand to a readable string; avoid showing ObjectId
    let brandName: string = ''
    if (typeof raw?.brand === 'string') {
      const looksLikeObjectId = /^[a-f\d]{24}$/i.test(raw.brand)
      brandName = looksLikeObjectId ? '' : raw.brand
    } else if (raw?.brand && typeof raw.brand === 'object') {
      brandName = raw.brand.name || raw.brand.slug || raw.brand._id || ''
    }
    const brandDisplay = brandName && String(brandName).trim() !== '' ? brandName : ''

    // Normalize categories to human-readable names; avoid ObjectIds
    let categoryNames: string[] | undefined = undefined
    if (Array.isArray(raw?.categories)) {
      const isObjectId = (s: string) => /^[a-f\d]{24}$/i.test(s)
      categoryNames = raw.categories
        .map((cat: any) => {
          if (!cat) return null
          if (typeof cat === 'string') {
            return isObjectId(cat) ? null : cat
          }
          if (typeof cat === 'object') {
            const label = cat.name || cat.slug || ''
            return label && !isObjectId(String(label)) ? String(label) : null
          }
          return null
        })
        .filter((v: any) => typeof v === 'string' && v.trim() !== '')
    }

    // Align price/originalPrice when only salePrice is present
    let normalizedPrice = raw?.price
    let normalizedOriginalPrice = raw?.originalPrice
    if (raw?.salePrice && (raw.salePrice < raw.price)) {
      normalizedOriginalPrice = normalizedOriginalPrice ?? raw.price
      normalizedPrice = raw.salePrice
    }

    // Normalize colors to human-readable strings
    let normalizedColors: string[] | undefined = undefined
    if (Array.isArray(raw?.colors)) {
      const isObjectId = (s: string) => /^[a-f\d]{24}$/i.test(s)
      normalizedColors = raw.colors
        .map((c: any) => {
          if (!c) return null
          if (typeof c === 'string') {
            return isObjectId(c) ? null : c
          }
          if (typeof c === 'object') {
            const label = c.name || c.colorName || c.label || c.title || c.value || ''
            if (label && !isObjectId(String(label))) return String(label)
            // As a last resort, avoid exposing raw ObjectId colorId
            if (c.colorId && !isObjectId(String(c.colorId))) return String(c.colorId)
            return null
          }
          return null
        })
        .filter((v: any) => typeof v === 'string' && v.trim() !== '')
    }

    // Normalize sizes from multiple possible locations
    let normalizedSizes: string[] | undefined = undefined
    // Check availableSizes first
    if (Array.isArray(raw?.availableSizes) && raw.availableSizes.length > 0) {
      normalizedSizes = raw.availableSizes.filter((s: any) => s && typeof s === 'string' && s.trim() !== '')
    }
    // Check sizes field
    else if (Array.isArray(raw?.sizes) && raw.sizes.length > 0) {
      normalizedSizes = raw.sizes.filter((s: any) => s && typeof s === 'string' && s.trim() !== '')
    }
    // Check sizeChart.sizes
    else if (raw?.sizeChart && Array.isArray(raw.sizeChart.sizes) && raw.sizeChart.sizes.length > 0) {
      normalizedSizes = raw.sizeChart.sizes
        .map((s: any) => {
          if (typeof s === 'string') return s
          if (typeof s === 'object' && s.size) return s.size
          return null
        })
        .filter((s: any): s is string => s && typeof s === 'string' && s.trim() !== '')
    }
    // Check attributes.sizes
    else if (raw?.attributes?.sizes && Array.isArray(raw.attributes.sizes) && raw.attributes.sizes.length > 0) {
      normalizedSizes = raw.attributes.sizes.filter((s: any) => s && typeof s === 'string' && s.trim() !== '')
    }

    return {
      ...raw,
      images: imageUrls,
      brand: brandDisplay || 'Unknown',
      categories: categoryNames || raw?.categories,
      price: normalizedPrice,
      originalPrice: normalizedOriginalPrice,
      colors: normalizedColors ?? raw?.colors,
      availableSizes: normalizedSizes ?? raw?.availableSizes ?? raw?.sizes,
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

    // Only send supported keys to avoid 400s from backend validation
    const allowedKeys = new Set([
      'page',
      'limit',
      'search',
      'brand',
      'minPrice',
      'maxPrice',
      'inStock',
      'status',
      'sizes',
      'sortBy',
      'sortOrder',
    ])
    Object.entries(rest).forEach(([key, value]) => {
      if (!allowedKeys.has(key)) return
      if (value === undefined || value === null) return
      if (Array.isArray(value)) {
        value.forEach(v => params.append(key, v.toString()))
      } else {
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
    const normalized = this.normalizeProduct(raw)
    
    // Fallback: If brand is still an ObjectId, fetch the brand details
    if (normalized.brand === 'Unknown' || normalized.brand === '') {
      const isObjectId = (s: string) => /^[a-f\d]{24}$/i.test(s)
      const brandId = raw?.brand
      
      if (brandId && ((typeof brandId === 'string' && isObjectId(brandId)) || (typeof brandId === 'object' && brandId._id))) {
        try {
          const brandData = typeof brandId === 'string' 
            ? await this.getBrand(brandId)
            : await this.getBrand(brandId._id)
          if (brandData && brandData.name) {
            normalized.brand = brandData.name
          }
        } catch (err) {
          console.warn('Failed to fetch brand details:', err)
        }
      }
    }
    
    // Fallback: If categories are still ObjectIds, fetch category details
    const isObjectId = (s: string) => /^[a-f\d]{24}$/i.test(s)
    if (!normalized.categories || normalized.categories.length === 0 || 
        (Array.isArray(normalized.categories) && normalized.categories.every((cat: any) => 
          typeof cat === 'string' && isObjectId(cat)))) {
      if (Array.isArray(raw?.categories) && raw.categories.length > 0) {
        try {
          const categoryPromises = raw.categories
            .map((catId: any) => {
              const id = typeof catId === 'string' ? catId : (catId?._id || catId)
              if (id && isObjectId(String(id))) {
                return this.getCategory(String(id))
              }
              return null
            })
            .filter(Boolean)
          
          const categoryData = await Promise.all(categoryPromises)
          const categoryNames = categoryData
            .filter((cat: any) => cat && cat.name)
            .map((cat: any) => cat.name)
          
          if (categoryNames.length > 0) {
            normalized.categories = categoryNames
          }
        } catch (err) {
          console.warn('Failed to fetch category details:', err)
        }
      }
    }
    
    return normalized
  }

  async getProductBySlug(slug: string): Promise<Product> {
    const raw = await this.request<any>(`/products/slug/${slug}`)
    const normalized = this.normalizeProduct(raw)
    
    // Fallback: If brand is still an ObjectId, fetch the brand details
    if (normalized.brand === 'Unknown' || normalized.brand === '') {
      const isObjectId = (s: string) => /^[a-f\d]{24}$/i.test(s)
      const brandId = raw?.brand
      
      if (brandId && ((typeof brandId === 'string' && isObjectId(brandId)) || (typeof brandId === 'object' && brandId._id))) {
        try {
          const brandData = typeof brandId === 'string' 
            ? await this.getBrand(brandId)
            : await this.getBrand(brandId._id)
          if (brandData && brandData.name) {
            normalized.brand = brandData.name
          }
        } catch (err) {
          console.warn('Failed to fetch brand details:', err)
        }
      }
    }
    
    // Fallback: If categories are still ObjectIds, fetch category details
    const isObjectId = (s: string) => /^[a-f\d]{24}$/i.test(s)
    if (!normalized.categories || normalized.categories.length === 0 || 
        (Array.isArray(normalized.categories) && normalized.categories.every((cat: any) => 
          typeof cat === 'string' && isObjectId(cat)))) {
      if (Array.isArray(raw?.categories) && raw.categories.length > 0) {
        try {
          const categoryPromises = raw.categories
            .map((catId: any) => {
              const id = typeof catId === 'string' ? catId : (catId?._id || catId)
              if (id && isObjectId(String(id))) {
                return this.getCategory(String(id))
              }
              return null
            })
            .filter(Boolean)
          
          const categoryData = await Promise.all(categoryPromises)
          const categoryNames = categoryData
            .filter((cat: any) => cat && cat.name)
            .map((cat: any) => cat.name)
          
          if (categoryNames.length > 0) {
            normalized.categories = categoryNames
          }
        } catch (err) {
          console.warn('Failed to fetch category details:', err)
        }
      }
    }
    
    return normalized
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

  // Filter Options API
  async getFilterOptions(): Promise<{
    categories: Array<{ _id: string; name: string; slug: string }>;
    brands: Array<{ _id: string; name: string; slug: string }>;
    sizes: string[];
    colors: string[];
    priceRange: { min: number; max: number };
  }> {
    return await this.request<any>('/products/filter-options')
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