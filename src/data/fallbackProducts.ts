// Fallback Product Data - Matches API Structure Exactly
// This ensures seamless transition when real API data is available

import { Product } from '../lib/api';

export const fallbackProducts: Product[] = [
  {
    _id: '1',
    name: 'Elegant Evening Gown',
    slug: 'elegant-evening-gown',
    description: 'A stunning evening gown crafted from the finest silk with intricate beadwork and a flattering silhouette. Perfect for special occasions and formal events.',
    shortDescription: 'Luxurious silk evening gown with intricate beadwork',
    sku: 'EEG-001',
    type: 'simple',
    price: 1299,
    salePrice: 1299,
    originalPrice: 1599,
    currency: 'USD',
    stockQuantity: 12,
    stockStatus: 'instock',
    weight: 0.5,
    dimensions: {
      length: 120,
      width: 50,
      height: 2
    },
    manageStock: true,
    allowBackorders: false,
    status: 'published',
    categories: ['evening-wear'],
    tags: ['evening', 'formal', 'silk'],
    brand: 'elegance-couture',
    attributes: ['Silk', 'Beadwork', 'A-line', 'Floor Length', 'Formal'],
    variations: [],
    images: ['/images/1.png', '/images/2.png', '/images/3.png', '/images/4.png'],
    
    // UI-specific fields
    rating: 4.8,
    reviews: 24,
    isNew: true,
    isSale: true,
    features: [
      'Made from premium silk fabric',
      'Hand-sewn beadwork details',
      'Flattering A-line silhouette',
      'Available in multiple sizes',
      'Dry clean only'
    ],
    colors: ['Black', 'Navy', 'Burgundy', 'Emerald'],
    inStock: true,
    stockCount: 12,
    shippingWeight: 0.5,
    shippingDimensions: {
      length: 120,
      width: 50,
      height: 2
    },
    isActive: true,
    seo: {
      title: 'Elegant Evening Gown - Luxury Silk Dress',
      description: 'Luxurious silk evening gown with intricate beadwork for special occasions',
      keywords: ['evening gown', 'silk dress', 'formal wear', 'luxury fashion'],
      slug: 'elegant-evening-gown',
      canonicalUrl: '/products/elegant-evening-gown',
      ogImage: '/images/1.png',
      noIndex: false,
      noFollow: false
    },
    
    // Pakistani Clothing Specific Fields
    fabric: 'Silk',
    collection: 'Eid Collection 2024',
    collectionName: 'Eid Collection 2024',
    occasion: 'Formal',
    season: 'All Season',
    careInstructions: 'Dry clean only',
    modelMeasurements: {
      height: '5\'6"',
      bust: '34"',
      waist: '26"',
      hips: '36"'
    },
    designer: 'Élégance Couture',
    handwork: ['Embroidery', 'Beadwork', 'Sequins'],
    colorFamily: 'Neutrals',
    pattern: 'Solid',
    sleeveLength: 'Long',
    neckline: 'V-neck',
    length: 'Floor Length',
    fit: 'Fitted',
    ageGroup: 'Adult',
    bodyType: ['Pear', 'Hourglass'],
    isLimitedEdition: false,
    isCustomMade: true,
    customDeliveryDays: 14,
    sizeChart: 'size-chart-1',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    _id: '2',
    name: 'Luxury Couture Piece',
    slug: 'luxury-couture-piece',
    description: 'An exclusive couture piece designed by our master artisans. This one-of-a-kind creation represents the pinnacle of luxury fashion.',
    shortDescription: 'Exclusive couture piece by master artisans',
    sku: 'LCP-001',
    type: 'simple',
    price: 3500,
    salePrice: 3500,
    originalPrice: undefined,
    currency: 'USD',
    stockQuantity: 3,
    stockStatus: 'instock',
    weight: 0.8,
    dimensions: {
      length: 130,
      width: 55,
      height: 3
    },
    manageStock: true,
    allowBackorders: false,
    status: 'published',
    categories: ['couture'],
    tags: ['couture', 'luxury', 'exclusive', 'artisan'],
    brand: 'luxury-line',
    attributes: ['Hand-crafted', 'Exclusive', 'Premium', 'Limited Edition', 'Certificate'],
    variations: [],
    images: ['/images/1.png', '/images/2.png', '/images/3.png', '/images/4.png'],
    
    // UI-specific fields
    rating: 4.9,
    reviews: 12,
    isNew: true,
    isSale: false,
    features: [
      'Hand-crafted by master artisans',
      'Exclusive design',
      'Premium materials',
      'Limited edition',
      'Certificate of authenticity'
    ],
    colors: ['Gold', 'Silver', 'Rose Gold'],
    inStock: true,
    stockCount: 3,
    shippingWeight: 0.8,
    shippingDimensions: {
      length: 130,
      width: 55,
      height: 3
    },
    isActive: true,
    seo: {
      title: 'Luxury Couture Piece - Exclusive Designer Wear',
      description: 'Exclusive couture piece designed by master artisans',
      keywords: ['couture', 'luxury', 'designer', 'exclusive', 'artisan'],
      slug: 'luxury-couture-piece',
      canonicalUrl: '/products/luxury-couture-piece',
      ogImage: '/images/1.png',
      noIndex: false,
      noFollow: false
    },
    
    // Pakistani Clothing Specific Fields
    fabric: 'Silk',
    collection: 'Couture Collection',
    collectionName: 'Couture Collection',
    occasion: 'Formal',
    season: 'All Season',
    careInstructions: 'Professional dry clean only',
    modelMeasurements: {
      height: '5\'8"',
      bust: '36"',
      waist: '28"',
      hips: '38"'
    },
    designer: 'Luxury Line',
    handwork: ['Zari', 'Embroidery', 'Beadwork', 'Sequins'],
    colorFamily: 'Metallics',
    pattern: 'Floral',
    sleeveLength: 'Long',
    neckline: 'Round',
    length: 'Floor Length',
    fit: 'Fitted',
    ageGroup: 'Adult',
    bodyType: ['Hourglass', 'Pear'],
    isLimitedEdition: true,
    isCustomMade: true,
    customDeliveryDays: 21,
    sizeChart: 'size-chart-2',
    availableSizes: ['S', 'M', 'L'],
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    _id: '3',
    name: 'Summer Day Dress',
    slug: 'summer-day-dress',
    description: 'A beautiful summer dress perfect for warm weather. Lightweight and comfortable with a flattering fit.',
    shortDescription: 'Lightweight summer dress for warm weather',
    sku: 'SDD-001',
    type: 'simple',
    price: 599,
    salePrice: 599,
    originalPrice: undefined,
    currency: 'USD',
    stockQuantity: 25,
    stockStatus: 'instock',
    weight: 0.3,
    dimensions: {
      length: 100,
      width: 45,
      height: 1
    },
    manageStock: true,
    allowBackorders: false,
    status: 'published',
    categories: ['day-dresses'],
    tags: ['summer', 'casual', 'cotton', 'lightweight'],
    brand: 'couture-collection',
    attributes: ['Cotton Blend', 'Lightweight', 'Machine Washable', 'Comfortable', 'Breathable'],
    variations: [],
    images: ['/images/2.png', '/images/3.png', '/images/4.png', '/images/5.png'],
    
    // UI-specific fields
    rating: 4.6,
    reviews: 18,
    isNew: false,
    isSale: false,
    features: [
      'Lightweight cotton blend',
      'Machine washable',
      'Comfortable fit',
      'Breathable fabric',
      'Easy care'
    ],
    colors: ['White', 'Pink', 'Blue', 'Yellow'],
    inStock: true,
    stockCount: 25,
    shippingWeight: 0.3,
    shippingDimensions: {
      length: 100,
      width: 45,
      height: 1
    },
    isActive: true,
    seo: {
      title: 'Summer Day Dress - Lightweight Cotton',
      description: 'Beautiful summer dress perfect for warm weather',
      keywords: ['summer dress', 'cotton', 'casual', 'lightweight', 'day wear'],
      slug: 'summer-day-dress',
      canonicalUrl: '/products/summer-day-dress',
      ogImage: '/images/2.png',
      noIndex: false,
      noFollow: false
    },
    
    // Pakistani Clothing Specific Fields
    fabric: 'Cotton',
    collection: 'Summer Collection',
    collectionName: 'Summer Collection',
    occasion: 'Casual',
    season: 'Summer',
    careInstructions: 'Machine wash cold, tumble dry low',
    modelMeasurements: {
      height: '5\'5"',
      bust: '32"',
      waist: '24"',
      hips: '34"'
    },
    designer: 'Couture Collection',
    handwork: ['Embroidery'],
    colorFamily: 'Pastels',
    pattern: 'Floral',
    sleeveLength: 'Short',
    neckline: 'Round',
    length: 'Knee Length',
    fit: 'Semi-fitted',
    ageGroup: 'Young Adult',
    bodyType: ['Pear', 'Apple'],
    isLimitedEdition: false,
    isCustomMade: false,
    customDeliveryDays: undefined,
    sizeChart: 'size-chart-3',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z'
  },
  {
    _id: '4',
    name: 'Black Tie Evening Dress',
    slug: 'black-tie-evening-dress',
    description: 'An elegant black tie evening dress perfect for formal events and special occasions.',
    shortDescription: 'Elegant black tie evening dress for formal events',
    sku: 'BTE-001',
    type: 'simple',
    price: 1899,
    salePrice: 1899,
    originalPrice: undefined,
    currency: 'USD',
    stockQuantity: 8,
    stockStatus: 'instock',
    weight: 0.6,
    dimensions: {
      length: 125,
      width: 52,
      height: 2
    },
    manageStock: true,
    allowBackorders: false,
    status: 'published',
    categories: ['evening-wear'],
    tags: ['evening', 'formal', 'black tie', 'elegant'],
    brand: 'elegance-couture',
    attributes: ['Formal', 'Elegant', 'Black Tie', 'Sophisticated', 'Classic'],
    variations: [],
    images: ['/images/2.png', '/images/3.png', '/images/4.png', '/images/5.png'],
    
    // UI-specific fields
    rating: 4.9,
    reviews: 18,
    isNew: false,
    isSale: false,
    features: [
      'Elegant black tie design',
      'Premium fabric construction',
      'Flattering silhouette',
      'Perfect for formal events',
      'Timeless style'
    ],
    colors: ['Black', 'Navy', 'Burgundy'],
    inStock: true,
    stockCount: 8,
    shippingWeight: 0.6,
    shippingDimensions: {
      length: 125,
      width: 52,
      height: 2
    },
    isActive: true,
    seo: {
      title: 'Black Tie Evening Dress - Formal Elegance',
      description: 'Elegant black tie evening dress for formal events',
      keywords: ['black tie', 'evening dress', 'formal', 'elegant', 'sophisticated'],
      slug: 'black-tie-evening-dress',
      canonicalUrl: '/products/black-tie-evening-dress',
      ogImage: '/images/2.png',
      noIndex: false,
      noFollow: false
    },
    
    // Pakistani Clothing Specific Fields
    fabric: 'Silk',
    collection: 'Formal Collection',
    collectionName: 'Formal Collection',
    occasion: 'Formal',
    season: 'All Season',
    careInstructions: 'Dry clean only',
    modelMeasurements: {
      height: '5\'7"',
      bust: '35"',
      waist: '27"',
      hips: '37"'
    },
    designer: 'Élégance Couture',
    handwork: ['Embroidery', 'Beadwork'],
    colorFamily: 'Neutrals',
    pattern: 'Solid',
    sleeveLength: 'Long',
    neckline: 'V-neck',
    length: 'Floor Length',
    fit: 'Fitted',
    ageGroup: 'Adult',
    bodyType: ['Hourglass', 'Pear'],
    isLimitedEdition: false,
    isCustomMade: true,
    customDeliveryDays: 14,
    sizeChart: 'size-chart-1',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z'
  },
  {
    _id: '5',
    name: 'Sequin Party Dress',
    slug: 'sequin-party-dress',
    description: 'A glamorous sequin party dress perfect for celebrations and special events.',
    shortDescription: 'Glamorous sequin party dress for celebrations',
    sku: 'SPD-001',
    type: 'simple',
    price: 899,
    salePrice: 899,
    originalPrice: 1199,
    currency: 'USD',
    stockQuantity: 15,
    stockStatus: 'instock',
    weight: 0.4,
    dimensions: {
      length: 110,
      width: 48,
      height: 1
    },
    manageStock: true,
    allowBackorders: false,
    status: 'published',
    categories: ['evening-wear'],
    tags: ['party', 'sequin', 'glamorous', 'celebration'],
    brand: 'couture-collection',
    attributes: ['Sequin', 'Glamorous', 'Party', 'Celebration', 'Sparkling'],
    variations: [],
    images: ['/images/3.png', '/images/4.png', '/images/5.png', '/images/6.png'],
    
    // UI-specific fields
    rating: 4.6,
    reviews: 31,
    isNew: true,
    isSale: true,
    features: [
      'Glamorous sequin design',
      'Perfect for parties',
      'Comfortable fit',
      'Easy to care for',
      'Versatile styling'
    ],
    colors: ['Gold', 'Silver', 'Rose Gold', 'Black'],
    inStock: true,
    stockCount: 15,
    shippingWeight: 0.4,
    shippingDimensions: {
      length: 110,
      width: 48,
      height: 1
    },
    isActive: true,
    seo: {
      title: 'Sequin Party Dress - Glamorous Celebration Wear',
      description: 'Glamorous sequin party dress for celebrations and special events',
      keywords: ['sequin dress', 'party dress', 'glamorous', 'celebration', 'sparkling'],
      slug: 'sequin-party-dress',
      canonicalUrl: '/products/sequin-party-dress',
      ogImage: '/images/3.png',
      noIndex: false,
      noFollow: false
    },
    
    // Pakistani Clothing Specific Fields
    fabric: 'Polyester',
    collection: 'Party Collection',
    collectionName: 'Party Collection',
    occasion: 'Party',
    season: 'All Season',
    careInstructions: 'Hand wash or dry clean',
    modelMeasurements: {
      height: '5\'6"',
      bust: '34"',
      waist: '26"',
      hips: '36"'
    },
    designer: 'Couture Collection',
    handwork: ['Sequins', 'Beadwork'],
    colorFamily: 'Metallics',
    pattern: 'Solid',
    sleeveLength: 'Sleeveless',
    neckline: 'V-neck',
    length: 'Knee Length',
    fit: 'Fitted',
    ageGroup: 'Young Adult',
    bodyType: ['Hourglass', 'Pear'],
    isLimitedEdition: false,
    isCustomMade: false,
    customDeliveryDays: undefined,
    sizeChart: 'size-chart-3',
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    createdAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z'
  }
];

// Helper function to get product by slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return fallbackProducts.find(product => product.slug === slug);
};

// Helper function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return fallbackProducts.filter(product => 
    product.categories.includes(category.toLowerCase().replace(/\s+/g, '-'))
  );
};

// Helper function to get featured products
export const getFeaturedProducts = (): Product[] => {
  return fallbackProducts.filter(product => product.isNew || product.isSale);
};

// Helper function to search products
export const searchProducts = (query: string): Product[] => {
  const searchTerm = query.toLowerCase();
  return fallbackProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.shortDescription.toLowerCase().includes(searchTerm) ||
    product.attributes.some(attr => attr.toLowerCase().includes(searchTerm))
  );
};
