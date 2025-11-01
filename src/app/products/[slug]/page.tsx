'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext'
import { useAnalytics } from '@/hooks/useAnalytics'
import { apiClient, Product } from '@/lib/api'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MobileBottomNav from '@/components/MobileBottomNav'
import Footer from '@/components/Footer'
// import SimilarProducts from '@/components/SimilarProducts'
import LoadingSpinner from '@/components/LoadingSpinner'
import SizeChart from '@/components/SizeChart'
import { Star, Heart, ShoppingBag, Minus, Plus, Share2, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, User, X } from 'lucide-react'
import Image from 'next/image'

// No hardcoded related products

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const { addToRecentlyViewed } = useRecentlyViewed()
  const { trackProductView, trackCartAction } = useAnalytics()
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [activeTab, setActiveTab] = useState<string>('Overview')
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSizeImageOpen, setIsSizeImageOpen] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        setError(null)
        const productData = await apiClient.getProductBySlug(slug)
        setProduct(productData)
      } catch (err) {
        setError('Product not found')
        console.error('Error fetching product:', err)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProduct()
    }
  }, [slug])

  // Add product to recently viewed when component mounts
  useEffect(() => {
    if (product) {
      const productForRecentlyViewed = {
        id: parseInt(product._id) || 0, // Convert string ID to number
        name: product.name || 'Product',
        price: product.price || 0,
        originalPrice: product.originalPrice,
        image: product.images?.[0] || '/images/1.png',
        category: product.categories?.[0] || 'General',
        rating: product.rating || 0,
        reviews: product.reviews || 0,
        isNew: product.isNew || false,
        isSale: product.isSale || false,
        slug: slug
      }
      addToRecentlyViewed(productForRecentlyViewed)
      
      // Track product view for analytics
      trackProductView(product._id, product.categories?.[0] || 'General', product.brand || 'Unknown')
    }
  }, [product, slug, addToRecentlyViewed, trackProductView])

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist or is currently unavailable.</p>
          <div className="space-x-4">
            <a href="/shop" className="btn-primary">
              Back to Shop
            </a>
            <a href="/" className="btn-secondary">
              Go Home
            </a>
          </div>
        </div>
      </div>
    )
  }

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change))
  }

  const handleAddToCart = () => {
    const requiresSize = Array.isArray(product?.availableSizes) && product!.availableSizes!.length > 0
    const requiresColor = Array.isArray((product as any)?.colors) && (product as any).colors.length > 0
    if ((requiresSize && !selectedSize) || (requiresColor && !selectedColor)) {
      alert('Please select all required options')
      return
    }
    // Add to cart logic here
    alert('Added to cart!')
    
    // Track cart action for analytics
    trackCartAction(product._id, 'add')
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const nextImage = () => {
    if (product.images && product.images.length > 0) {
      setSelectedImage((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = () => {
    if (product.images && product.images.length > 0) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuClick={handleMenuToggle} 
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <div className="flex">
        <Sidebar isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
        <main className="flex-1 lg:ml-64 pb-16 lg:pb-0">
          {/* Breadcrumb */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <nav className="flex items-center space-x-2 text-sm">
                <a href="/" className="text-gray-500 hover:text-primary-600">Home</a>
                <span className="text-gray-400">/</span>
                <a href="/shop" className="text-gray-500 hover:text-primary-600">Shop</a>
                {(() => {
                  const isObjectId = (s: string) => /^[a-f\d]{24}$/i.test(s)
                  const firstCategory = product.categories?.[0]
                  const categoryName = firstCategory && typeof firstCategory === 'string' && !isObjectId(firstCategory)
                    ? firstCategory
                    : null
                  
                  if (categoryName) {
                    return (
                      <>
                        <span className="text-gray-400">/</span>
                        <a href={`/shop?category=${categoryName.toLowerCase().replace(/\s+/g, '-')}`} className="text-gray-500 hover:text-primary-600">{categoryName}</a>
                      </>
                    )
                  }
                  return null
                })()}
                <span className="text-gray-400">/</span>
                <span className="text-gray-900">{product.name}</span>
              </nav>
            </div>
          </div>

          {/* Product Details */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                {(() => {
                  // Normalize image - handle both string arrays and object arrays
                  const normalizeImageUrl = (img: any): string => {
                    if (!img) return '/images/1.png'
                    if (typeof img === 'string') return img
                    if (typeof img === 'object') {
                      return img.url || img.imageUrl || img.path || '/images/1.png'
                    }
                    return '/images/1.png'
                  }

                  const imageArray = Array.isArray(product.images) ? product.images : []
                  const mainImageUrl = imageArray.length > 0 
                    ? normalizeImageUrl(imageArray[selectedImage] || imageArray[0])
                    : '/images/1.png'

                  return (
                    <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
                      <Image
                        src={mainImageUrl}
                        alt={product.name || 'Product'}
                        fill
                        className="object-cover"
                        unoptimized={mainImageUrl.startsWith('http')}
                        onError={(e) => {
                          e.currentTarget.src = '/images/1.png'
                        }}
                      />
                  
                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && (
                          <span className="bg-primary-600 text-white text-xs px-3 py-1 rounded-full">
                            New
                          </span>
                        )}
                        {product.isSale && (
                          <span className="bg-secondary-500 text-white text-xs px-3 py-1 rounded-full">
                            Sale
                          </span>
                        )}
                      </div>

                      {/* Navigation Arrows */}
                      {imageArray.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
                          >
                            <ChevronLeft className="h-5 w-5 text-gray-600" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
                          >
                            <ChevronRight className="h-5 w-5 text-gray-600" />
                          </button>
                        </>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={handleWishlist}
                        className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-colors ${
                          isWishlisted ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  )
                })()}

                {/* Thumbnail Images */}
                {(() => {
                  const normalizeImageUrl = (img: any): string => {
                    if (!img) return '/images/1.png'
                    if (typeof img === 'string') return img
                    if (typeof img === 'object') {
                      return img.url || img.imageUrl || img.path || '/images/1.png'
                    }
                    return '/images/1.png'
                  }

                  const imageArray = Array.isArray(product.images) ? product.images : []
                  
                  if (imageArray.length > 1) {
                    return (
                      <div className="grid grid-cols-4 gap-2">
                        {imageArray.map((image, index) => {
                          const imageUrl = normalizeImageUrl(image)
                          return (
                            <button
                              key={index}
                              onClick={() => setSelectedImage(index)}
                              className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                                selectedImage === index ? 'border-primary-600' : 'border-gray-200 hover:border-gray-300'
                              }`}
                            >
                              <Image
                                src={imageUrl}
                                alt={`${product.name || 'Product'} ${index + 1}`}
                                width={100}
                                height={100}
                                className="w-full h-full object-cover"
                                unoptimized={imageUrl.startsWith('http')}
                                onError={(e) => {
                                  e.currentTarget.src = '/images/1.png'
                                }}
                              />
                            </button>
                          )
                        })}
                      </div>
                    )
                  }
                  return null
                })()}
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                {/* Product Title & Rating */}
                <div>
                  <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">{product.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {product.rating || 0} ({product.reviews || 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary-600">₨{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-gray-400 line-through">₨{product.originalPrice.toLocaleString()}</span>
                  )}
                  {product.isSale && product.originalPrice && (
                    <span className="bg-secondary-500 text-white text-sm px-2 py-1 rounded">
                      Save ₨{(product.originalPrice - product.price).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Brand */}
                {product.brand && (
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm text-gray-600">Brand:</span>
                    <span className="text-lg font-semibold text-primary-600">{product.brand}</span>
                  </div>
                )}

                {/* Size Selection */}
                {Array.isArray(product.availableSizes) && product.availableSizes.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Size:</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                            selectedSize === size
                              ? 'border-primary-600 bg-primary-50 text-primary-600'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {Array.isArray((product as any).colors) && (product as any).colors.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Color:</h3>
                    <div className="flex flex-wrap gap-2">
                      {(product as any).colors.map((c: any, idx: number) => {
                        const isObjectId = (s: string) => /^[a-f\d]{24}$/i.test(s)
                        const label = typeof c === 'string' 
                          ? (isObjectId(c) ? '' : c)
                          : (c.name || c.colorName || c.label || c.title || (!isObjectId(String(c?.colorId)) ? String(c?.colorId) : ''))
                        const imgUrl = typeof c === 'object' ? (c.imageUrl || c.url) : ''
                        if (!label) return null
                        return (
                          <button
                            key={label + idx}
                            onClick={() => setSelectedColor(label)}
                            className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                              selectedColor === label
                                ? 'border-primary-600 bg-primary-50 text-primary-600'
                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            {imgUrl ? (
                              <img src={imgUrl} alt={label} className="h-6 w-6 rounded object-cover" />
                            ) : null}
                            <span>{label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                {(typeof product.stockQuantity === 'number' || typeof product.stockCount === 'number') && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Quantity:</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 font-medium">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          className="p-2 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-600">
                        {(product.stockQuantity ?? product.stockCount) as number} in stock
                      </span>
                    </div>
                  </div>
                )}

                {/* Size Chart Link */}
                {(product.sizeChart || product.sizeChartImageUrl) && (
                  <div className="mb-4">
                    {product.sizeChart ? (
                      <SizeChart 
                        sizeChart={product.sizeChart} 
                        availableSizes={product.availableSizes || []} 
                      />
                    ) : product.sizeChartImageUrl ? (
                      <button
                        onClick={() => setIsSizeImageOpen(true)}
                        className="text-sm text-primary-600 hover:text-primary-800 underline font-medium"
                      >
                        View Size Chart
                      </button>
                    ) : null}

                    {isSizeImageOpen && product.sizeChartImageUrl && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                          <div className="flex justify-between items-center p-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">Size Guide</h3>
                            <button
                              onClick={() => setIsSizeImageOpen(false)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="h-6 w-6" />
                            </button>
                          </div>
                          <div className="p-4 flex justify-center">
                            <img
                              src={product.sizeChartImageUrl}
                              alt="Size chart"
                              className="max-w-full h-auto rounded border border-gray-200 shadow-sm"
                            />
                          </div>
                          <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                            <button
                              onClick={() => setIsSizeImageOpen(false)}
                              className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 btn-primary flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Add to Cart
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Share2 className="h-5 w-5" />
                    Share
                  </button>
                </div>

                {/* No hardcoded shipping info */}

              </div>
            </div>

            {/* Product Description and Details - Full Width */}
            <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Description */}
                {(product.description || product.shortDescription) && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Description:</h3>
                    <p className="text-gray-600 leading-relaxed">{product.description || product.shortDescription}</p>
                  </div>
                )}

                {/* Features */}
                {Array.isArray(product.features) && product.features.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Features:</h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Product Details (dynamic from API) */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">Product Details</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[
                        ['SKU', (product as any).sku],
                        ['Stock Status', (product as any).stockStatus],
                        ['In Stock', product.inStock ? 'Yes' : 'No'],
                        ['Stock Quantity', (product.stockQuantity || product.stockCount || 0).toString()],
                        ['Currency', (product as any).currency || 'PKR'],
                        ['Category', (() => {
                          const isObjectId = (s: string) => /^[a-f\d]{24}$/i.test(s)
                          if (!product.categories || product.categories.length === 0) return '—'
                          const validCategories = product.categories
                            .filter((cat: any) => cat && typeof cat === 'string' && !isObjectId(cat))
                          return validCategories.length > 0 ? validCategories.join(', ') : '—'
                        })()],
                        ['Brand', product.brand && product.brand !== 'Unknown' ? product.brand : '—'],
                        ['Collection', (product as any).collectionName],
                        ['Occasion', product.occasion],
                        ['Season', product.season],
                        ['Fabric', (product as any).fabric],
                        ['Pattern', (product as any).pattern],
                        ['Sleeve Length', (product as any).sleeveLength],
                        ['Neckline', (product as any).neckline],
                        ['Length', (product as any).length],
                        ['Fit', (product as any).fit],
                        ['Age Group', (product as any).ageGroup],
                        ['Body Type', Array.isArray((product as any).bodyType) ? (product as any).bodyType.join(', ') : (product as any).bodyType],
                        ['Limited Edition', (product as any).isLimitedEdition ? 'Yes' : undefined],
                        ['Custom Made', (product as any).isCustomMade ? 'Yes' : undefined],
                        ['Custom Delivery Days', (product as any).customDeliveryDays?.toString()],
                      ].filter(([, v]) => !!v && v !== '—').map(([k, v]) => (
                        <tr key={k as string} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-600 bg-gray-50">
                            {k as string}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {v as string}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Designer & Handwork */}
              {(product as any).designer || (product as any).handwork?.length ? (
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {(product as any).designer && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Designer</h3>
                      <p className="text-gray-700">{(product as any).designer}</p>
                    </div>
                  )}
                  {Array.isArray((product as any).handwork) && (product as any).handwork.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Handwork</h3>
                      <div className="flex flex-wrap gap-2">
                        {(product as any).handwork.map((h: string) => (
                          <span key={h} className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">{h}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}

              {/* Care Instructions */}
              {(product as any).careInstructions ? (
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 mb-3">Care Instructions</h3>
                  <p className="text-gray-700 leading-relaxed">{(product as any).careInstructions}</p>
                </div>
              ) : null}

              {/* Model Measurements */}
              {(product as any).modelMeasurements ? (
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 mb-3">Model Measurements</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {Object.entries((product as any).modelMeasurements).map(([k, v]) => (
                      v ? (
                        <div key={k} className="p-3 bg-gray-50 rounded-lg">
                          <div className="text-xs text-gray-500 uppercase">{k}</div>
                          <div className="text-sm font-medium text-gray-900">{v as string}</div>
                        </div>
                      ) : null
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Shipping Details */}
              {(product as any).shippingWeight || (product as any).shippingDimensions ? (
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 mb-3">Shipping Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(product as any).shippingWeight ? (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Weight</span>
                        <span className="text-gray-900 font-medium">{(product as any).shippingWeight}</span>
                      </div>
                    ) : null}
                    {(product as any).shippingDimensions ? (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Dimensions</span>
                        <span className="text-gray-900 font-medium">
                          {`${(product as any).shippingDimensions.length || '-'} x ${(product as any).shippingDimensions.width || '-'} x ${(product as any).shippingDimensions.height || '-'}`}
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {/* No hardcoded additional description, disclaimers, or shopping security */}
            </div>

            {/* No hardcoded related products */}
          </div>

          {/* SimilarProducts removed to avoid hardcoded fallbacks */}

          <Footer />
        </main>
      </div>
      
      <MobileBottomNav />
    </div>
  )
}