'use client'

interface UserBehavior {
  userId: string
  sessionId: string
  pageViews: string[]
  searchQueries: string[]
  productViews: string[]
  categoriesViewed: string[]
  brandsViewed: string[]
  cartActions: Array<{
    productId: string
    action: 'add' | 'remove' | 'view'
    timestamp: number
  }>
  preferences: {
    priceRange: [number, number]
    preferredCategories: string[]
    preferredBrands: string[]
    preferredColors: string[]
    preferredSizes: string[]
  }
  lastVisit: number
  visitCount: number
}

interface RecommendationData {
  trendingProducts: string[]
  personalizedProducts: string[]
  similarUsers: string[]
  recommendedCategories: string[]
  recommendedBrands: string[]
}

class AnalyticsManager {
  private static instance: AnalyticsManager
  private userBehavior: UserBehavior | null = null
  private readonly STORAGE_KEY = 'user_analytics'
  private readonly COOKIE_NAME = 'user_tracking'

  private constructor() {
    this.initializeUser()
  }

  public static getInstance(): AnalyticsManager {
    if (!AnalyticsManager.instance) {
      AnalyticsManager.instance = new AnalyticsManager()
    }
    return AnalyticsManager.instance
  }

  private generateUserId(): string {
    return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
  }

  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
  }

  private getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null
    return null
  }

  private setCookie(name: string, value: string, days: number = 365): void {
    if (typeof document === 'undefined') return
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString()
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`
  }

  private initializeUser(): void {
    try {
      // Try to get existing user data
      const existingData = localStorage.getItem(this.STORAGE_KEY)
      const existingUserId = this.getCookie(this.COOKIE_NAME)

      if (existingData && existingUserId) {
        this.userBehavior = JSON.parse(existingData)
        this.userBehavior!.visitCount += 1
        this.userBehavior!.lastVisit = Date.now()
      } else {
        // Create new user
        const userId = this.generateUserId()
        const sessionId = this.generateSessionId()
        
        this.userBehavior = {
          userId,
          sessionId,
          pageViews: [],
          searchQueries: [],
          productViews: [],
          categoriesViewed: [],
          brandsViewed: [],
          cartActions: [],
          preferences: {
            priceRange: [0, 10000],
            preferredCategories: [],
            preferredBrands: [],
            preferredColors: [],
            preferredSizes: []
          },
          lastVisit: Date.now(),
          visitCount: 1
        }

        this.setCookie(this.COOKIE_NAME, userId)
      }

      this.saveToStorage()
    } catch (error) {
      console.error('Error initializing user analytics:', error)
    }
  }

  private saveToStorage(): void {
    if (this.userBehavior) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.userBehavior))
    }
  }

  public trackPageView(page: string): void {
    if (!this.userBehavior) return

    this.userBehavior.pageViews.push(page)
    this.userBehavior.pageViews = this.userBehavior.pageViews.slice(-50) // Keep last 50 pages
    this.saveToStorage()
  }

  public trackSearch(query: string): void {
    if (!this.userBehavior) return

    this.userBehavior.searchQueries.push(query)
    this.userBehavior.searchQueries = this.userBehavior.searchQueries.slice(-20) // Keep last 20 searches
    this.saveToStorage()
  }

  public trackProductView(productId: string, category: string, brand: string): void {
    if (!this.userBehavior) return

    this.userBehavior.productViews.push(productId)
    this.userBehavior.productViews = this.userBehavior.productViews.slice(-100) // Keep last 100 products

    // Track categories and brands
    if (!this.userBehavior.categoriesViewed.includes(category)) {
      this.userBehavior.categoriesViewed.push(category)
    }
    if (!this.userBehavior.brandsViewed.includes(brand)) {
      this.userBehavior.brandsViewed.push(brand)
    }

    this.saveToStorage()
  }

  public trackCartAction(productId: string, action: 'add' | 'remove' | 'view'): void {
    if (!this.userBehavior) return

    this.userBehavior.cartActions.push({
      productId,
      action,
      timestamp: Date.now()
    })

    // Keep last 200 actions
    this.userBehavior.cartActions = this.userBehavior.cartActions.slice(-200)
    this.saveToStorage()
  }

  public updatePreferences(preferences: Partial<UserBehavior['preferences']>): void {
    if (!this.userBehavior) return

    this.userBehavior.preferences = {
      ...this.userBehavior.preferences,
      ...preferences
    }
    this.saveToStorage()
  }

  public getRecommendations(): RecommendationData {
    if (!this.userBehavior) {
      return {
        trendingProducts: [],
        personalizedProducts: [],
        similarUsers: [],
        recommendedCategories: [],
        recommendedBrands: []
      }
    }

    // Analyze user behavior to generate recommendations
    const { productViews, categoriesViewed, brandsViewed, searchQueries } = this.userBehavior

    // Get most viewed categories
    const categoryFrequency = categoriesViewed.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const recommendedCategories = Object.entries(categoryFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([category]) => category)

    // Get most viewed brands
    const brandFrequency = brandsViewed.reduce((acc, brand) => {
      acc[brand] = (acc[brand] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const recommendedBrands = Object.entries(brandFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([brand]) => brand)

    // Get personalized products based on viewing history
    const personalizedProducts = [...new Set(productViews)].slice(-10)

    return {
      trendingProducts: [], // Would be populated from server data
      personalizedProducts,
      similarUsers: [], // Would be populated from server data
      recommendedCategories,
      recommendedBrands
    }
  }

  public getUserBehavior(): UserBehavior | null {
    return this.userBehavior
  }

  public getAnalyticsSummary() {
    if (!this.userBehavior) return null

    return {
      totalPageViews: this.userBehavior.pageViews.length,
      totalSearches: this.userBehavior.searchQueries.length,
      totalProductViews: this.userBehavior.productViews.length,
      totalCartActions: this.userBehavior.cartActions.length,
      visitCount: this.userBehavior.visitCount,
      lastVisit: this.userBehavior.lastVisit,
      topCategories: this.userBehavior.categoriesViewed,
      topBrands: this.userBehavior.brandsViewed,
      recentSearches: this.userBehavior.searchQueries.slice(-5)
    }
  }

  public clearUserData(): void {
    localStorage.removeItem(this.STORAGE_KEY)
    if (typeof document !== 'undefined') {
      document.cookie = `${this.COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    }
    this.userBehavior = null
    this.initializeUser()
  }
}

export const analytics = AnalyticsManager.getInstance()
export type { UserBehavior, RecommendationData }
