'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useRecentlyViewed } from '@/contexts/RecentlyViewedContext'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MobileBottomNav from '@/components/MobileBottomNav'
import Footer from '@/components/Footer'
import SimilarProducts from '@/components/SimilarProducts'
import { Star, Heart, ShoppingBag, Minus, Plus, Share2, Truck, Shield, RotateCcw, ChevronLeft, ChevronRight, User } from 'lucide-react'
import Image from 'next/image'

// Product data (in a real app, this would come from an API)
const productData = {
  'elegant-evening-gown': {
    id: 1,
    name: 'Elegant Evening Gown',
    price: 1299,
    originalPrice: 1599,
    images: ['/images/1.png', '/images/2.png', '/images/3.png', '/images/4.png'],
    category: 'Evening Wear',
    brand: 'Élégance Couture',
    brandRating: 4.9,
    rating: 4.8,
    reviews: 24,
    isNew: true,
    isSale: true,
    description: 'A stunning evening gown crafted from the finest silk with intricate beadwork and a flattering silhouette. Perfect for special occasions and formal events.',
    features: [
      'Made from premium silk fabric',
      'Hand-sewn beadwork details',
      'Flattering A-line silhouette',
      'Available in multiple sizes',
      'Dry clean only'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'Burgundy', 'Emerald'],
    inStock: true,
    stockCount: 12
  },
  'luxury-couture-piece': {
    id: 17,
    name: 'Luxury Couture Piece',
    price: 3500,
    originalPrice: undefined,
    images: ['/images/1.png', '/images/2.png', '/images/3.png', '/images/4.png'],
    category: 'Couture',
    brand: 'Luxury Line',
    brandRating: 4.8,
    rating: 4.9,
    reviews: 12,
    isNew: true,
    isSale: false,
    description: 'An exclusive couture piece designed by our master artisans. This one-of-a-kind creation represents the pinnacle of luxury fashion.',
    features: [
      'Hand-crafted by master artisans',
      'Exclusive design',
      'Premium materials',
      'Limited edition',
      'Certificate of authenticity'
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['Gold', 'Silver', 'Rose Gold'],
    inStock: true,
    stockCount: 3
  },
  'summer-day-dress': {
    id: 9,
    name: 'Summer Day Dress',
    price: 599,
    originalPrice: undefined,
    images: ['/images/2.png', '/images/3.png', '/images/4.png', '/images/5.png'],
    category: 'Day Dresses',
    brand: 'Couture Collection',
    brandRating: 4.7,
    rating: 4.6,
    reviews: 18,
    isNew: false,
    isSale: false,
    description: 'A beautiful summer dress perfect for warm weather. Lightweight and comfortable with a flattering fit.',
    features: [
      'Lightweight cotton blend',
      'Machine washable',
      'Comfortable fit',
      'Breathable fabric',
      'Easy care'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Pink', 'Blue', 'Yellow'],
    inStock: true,
    stockCount: 25
  }
}

const relatedProducts = [
  {
    id: 2,
    name: 'Black Tie Evening Dress',
    price: 1899,
    originalPrice: undefined,
    image: '/images/2.png',
    category: 'Evening Wear',
    rating: 4.9,
    reviews: 15,
    isNew: false,
    isSale: false,
    slug: 'black-tie-evening-dress'
  },
  {
    id: 3,
    name: 'Sequin Party Dress',
    price: 899,
    originalPrice: 1199,
    image: '/images/3.png',
    category: 'Evening Wear',
    rating: 4.6,
    reviews: 22,
    isNew: false,
    isSale: true,
    slug: 'sequin-party-dress'
  },
  {
    id: 4,
    name: 'Velvet Evening Gown',
    price: 1599,
    originalPrice: undefined,
    image: '/images/4.png',
    category: 'Evening Wear',
    rating: 4.7,
    reviews: 18,
    isNew: true,
    isSale: false,
    slug: 'velvet-evening-gown'
  },
  {
    id: 5,
    name: 'Cocktail Party Dress',
    price: 699,
    originalPrice: 899,
    image: '/images/5.png',
    category: 'Evening Wear',
    rating: 4.5,
    reviews: 12,
    isNew: false,
    isSale: true,
    slug: 'cocktail-party-dress'
  }
]

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const { addToRecentlyViewed } = useRecentlyViewed()
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const product = productData[slug as keyof typeof productData] || productData['elegant-evening-gown']

  // Add product to recently viewed when component mounts
  useEffect(() => {
    const productForRecentlyViewed = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      category: product.category,
      rating: product.rating,
      reviews: product.reviews,
      isNew: product.isNew,
      isSale: product.isSale,
      slug: slug
    }
    addToRecentlyViewed(productForRecentlyViewed)
  }, [product, slug, addToRecentlyViewed])

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
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color')
      return
    }
    // Add to cart logic here
    alert('Added to cart!')
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
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
                <span className="text-gray-400">/</span>
                <a href={`/shop?category=${product.category.toLowerCase().replace(' ', '-')}`} className="text-gray-500 hover:text-primary-600">{product.category}</a>
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
                <div className="relative aspect-square bg-white rounded-lg overflow-hidden">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
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
                  {product.images.length > 1 && (
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

                {/* Thumbnail Images */}
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                          selectedImage === index ? 'border-primary-600' : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
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
                            i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">
                        {product.rating} ({product.reviews} reviews)
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
                  {product.isSale && (
                    <span className="bg-secondary-500 text-white text-sm px-2 py-1 rounded">
                      Save ₨{(product.originalPrice! - product.price).toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Brand */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-gray-600">Brand:</span>
                  <span className="text-lg font-semibold text-primary-600">{product.brand}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.brandRating}</span>
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Size:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
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

                {/* Color Selection */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Color:</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                          selectedColor === color
                            ? 'border-primary-600 bg-primary-50 text-primary-600'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
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
                      {product.stockCount} in stock
                    </span>
                  </div>
                </div>

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

                {/* Shipping Info */}
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-primary-600" />
                    <span className="text-sm text-gray-600">Free shipping on orders over $1000</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary-600" />
                    <span className="text-sm text-gray-600">2-year warranty included</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <RotateCcw className="h-5 w-5 text-primary-600" />
                    <span className="text-sm text-gray-600">30-day return policy</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Product Description and Details - Full Width */}
            <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Description:</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                {/* Features */}
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
              </div>

              {/* Product Details */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-3">Product Details:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Bottom Style</span>
                      <span className="text-gray-900 font-medium">Straight trouser</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Color Type</span>
                      <span className="text-gray-900 font-medium">Pastel pink</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Dupatta Fabric</span>
                      <span className="text-gray-900 font-medium">Net</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Product ID</span>
                      <span className="text-gray-900 font-medium">REL0249</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Lining Attached</span>
                      <span className="text-gray-900 font-medium">As shown in picture</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Number Of Pieces</span>
                      <span className="text-gray-900 font-medium">4 piece - top + bottom + outerwear + dupatta</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Season</span>
                      <span className="text-gray-900 font-medium">All season</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Shirt Fabric</span>
                      <span className="text-gray-900 font-medium">Net</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Top Fit</span>
                      <span className="text-gray-900 font-medium">Regular fit</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Top Style</span>
                      <span className="text-gray-900 font-medium">Flared gown</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Trouser Fabrics</span>
                      <span className="text-gray-900 font-medium">Poly silk</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Work Technique</span>
                      <span className="text-gray-900 font-medium">Embroidered</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Description */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-3">Additional Description:</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Step into timeless sophistication with our four-piece Harika Pearl Coat Pishwas ensemble. This exquisite design showcases a front-open long coat, beautifully embellished with glistening sequins and intricate golden zari embroidery. Paired effortlessly with a coordinated dupatta and elegant silk trousers, it's the perfect choice for a refined and luxurious wedding look.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm text-yellow-800 font-medium">
                      <strong>NOTE:</strong> Dupatta is less than 2.5 yards
                    </p>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-3">Important Information:</h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Disclaimer:</strong> Actual product color may vary slightly from the image.
                  </p>
                </div>
              </div>

              {/* Shopping Security */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-3">Shopping Security:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-800 font-medium">Safe Payment</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-800 font-medium">Secure Logistics</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <User className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-800 font-medium">Customer Services</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span className="text-sm text-green-800 font-medium">Privacy Protection</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related Products */}
            <div className="mt-16">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative overflow-hidden rounded-t-lg">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {product.originalPrice && (
                        <span className="absolute top-2 left-2 bg-secondary-500 text-white text-xs px-2 py-1 rounded">
                          Sale
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 text-sm mb-2">{product.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{product.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-primary-600">₨{product.price.toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">₨{product.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <SimilarProducts 
            currentProduct={{
              id: product.id,
              name: product.name,
              price: product.price,
              originalPrice: product.originalPrice,
              image: product.images[0],
              category: product.category,
              rating: product.rating,
              reviews: product.reviews,
              isNew: product.isNew,
              isSale: product.isSale,
              slug: slug
            }}
            products={relatedProducts}
          />

          <Footer />
        </main>
      </div>
      
      <MobileBottomNav />
    </div>
  )
}