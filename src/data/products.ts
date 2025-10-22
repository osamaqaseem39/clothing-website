export interface Product {
  id: number | string
  name: string
  price: number
  originalPrice?: number | null
  image: string
  category: string
  brand: string
  rating: number
  reviews: number
  isNew?: boolean
  isSale?: boolean
  isTopSeller?: boolean
  slug: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Elegant Evening Gown',
    price: 1299,
    originalPrice: 1599,
    image: '/images/1.png',
    category: 'Evening Wear',
    brand: 'Élégance Couture',
    rating: 4.8,
    reviews: 24,
    isNew: true,
    isSale: true,
    isTopSeller: true,
    slug: 'elegant-evening-gown'
  },
  {
    id: 2,
    name: 'Luxury Couture Piece',
    price: 3500,
    originalPrice: null,
    image: '/images/2.png',
    category: 'Couture',
    brand: 'Luxury Line',
    rating: 4.9,
    reviews: 12,
    isNew: true,
    isSale: false,
    isTopSeller: false,
    slug: 'luxury-couture-piece'
  },
  {
    id: 3,
    name: 'Summer Day Dress',
    price: 599,
    originalPrice: null,
    image: '/images/3.png',
    category: 'Day Dresses',
    brand: 'Couture Collection',
    rating: 4.6,
    reviews: 18,
    isNew: false,
    isSale: false,
    isTopSeller: true,
    slug: 'summer-day-dress'
  },
  {
    id: 4,
    name: 'Luxury Jewelry Set',
    price: 1500,
    originalPrice: 2000,
    image: '/images/4.png',
    category: 'Jewelry',
    brand: 'Premium',
    rating: 4.8,
    reviews: 6,
    isNew: true,
    isSale: true,
    isTopSeller: true,
    slug: 'luxury-jewelry-set'
  },
  {
    id: 5,
    name: 'Designer Handbag',
    price: 899,
    originalPrice: 1199,
    image: '/images/5.png',
    category: 'Accessories',
    brand: 'Élégance Couture',
    rating: 4.5,
    reviews: 15,
    isNew: true,
    isSale: true,
    isTopSeller: false,
    slug: 'designer-handbag'
  },
  {
    id: 6,
    name: 'Bridal Collection Dress',
    price: 2500,
    originalPrice: null,
    image: '/images/6.png',
    category: 'Bridal',
    brand: 'Luxury Line',
    rating: 4.7,
    reviews: 8,
    isNew: false,
    isSale: false,
    isTopSeller: true,
    slug: 'bridal-collection-dress'
  },
  {
    id: 7,
    name: 'Casual Chic Top',
    price: 299,
    originalPrice: 399,
    image: '/images/7.png',
    category: 'Casual Wear',
    brand: 'Fashion House',
    rating: 4.4,
    reviews: 22,
    isNew: false,
    isSale: true,
    isTopSeller: false,
    slug: 'casual-chic-top'
  },
  {
    id: 8,
    name: 'Formal Business Suit',
    price: 899,
    originalPrice: null,
    image: '/images/8.png',
    category: 'Formal Wear',
    brand: 'Style Studio',
    rating: 4.6,
    reviews: 14,
    isNew: true,
    isSale: false,
    isTopSeller: false,
    slug: 'formal-business-suit'
  },
  {
    id: 9,
    name: 'Activewear Set',
    price: 199,
    originalPrice: 299,
    image: '/images/9.png',
    category: 'Activewear',
    brand: 'Couture Collection',
    rating: 4.3,
    reviews: 31,
    isNew: false,
    isSale: true,
    isTopSeller: false,
    slug: 'activewear-set'
  },
  {
    id: 10,
    name: 'Lingerie Set',
    price: 149,
    originalPrice: 199,
    image: '/images/1.png',
    category: 'Lingerie',
    brand: 'Premium',
    rating: 4.7,
    reviews: 19,
    isNew: true,
    isSale: true,
    isTopSeller: false,
    slug: 'lingerie-set'
  }
]
