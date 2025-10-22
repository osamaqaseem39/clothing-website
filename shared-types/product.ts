// Shared Product Types - Used across the application
// This file defines the core product interfaces that are shared between components

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
  dateRange?: {
    start: string
    end: string
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ProductReview {
  _id: string
  productId: string
  userId: string
  userName: string
  userEmail: string
  rating: number
  title: string
  comment: string
  isVerified: boolean
  helpful: number
  notHelpful: number
  images: string[]
  createdAt: string
  updatedAt: string
}

export interface ProductQuestion {
  _id: string
  productId: string
  userId: string
  userName: string
  userEmail: string
  question: string
  answer?: string
  answeredBy?: string
  answeredAt?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductWishlist {
  _id: string
  userId: string
  productId: string
  product: Product
  createdAt: string
}

export interface ProductComparison {
  _id: string
  userId: string
  products: string[]
  createdAt: string
  updatedAt: string
}

export interface ProductRecommendation {
  _id: string
  productId: string
  recommendedProductId: string
  reason: string
  confidence: number
  type: 'similar' | 'complementary' | 'frequently_bought_together' | 'trending'
  createdAt: string
  updatedAt: string
}

export interface ProductAnalytics {
  _id: string
  productId: string
  views: number
  clicks: number
  conversions: number
  revenue: number
  date: string
  source: string
  medium: string
  campaign?: string
  createdAt: string
  updatedAt: string
}
