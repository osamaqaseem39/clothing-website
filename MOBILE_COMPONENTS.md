# Mobile Components Documentation

This document describes the mobile component structure for the ecommerce landing page.

## Overview

The application now includes separate mobile components that are optimized for mobile devices. The app automatically detects mobile devices and renders the appropriate components.

## Mobile Detection

The app uses a custom hook `useIsMobile()` located in `src/utils/useMobile.ts` to detect mobile devices. The default breakpoint is 1024px (tablets and below are considered mobile).

## Mobile Components Structure

All mobile components are located in `src/components/mobile/`:

### Core Components

1. **MobileProductCard** (`MobileProductCard.tsx`)
   - Optimized product card for mobile screens
   - Compact layout with touch-friendly buttons
   - Smaller images and text optimized for mobile viewing

2. **MobileHero** (`MobileHero.tsx`)
   - Mobile-optimized hero banner carousel
   - Vertical aspect ratio (9:16) for mobile screens
   - Touch-friendly navigation controls

3. **MobileCategoryGrid** (`MobileCategoryGrid.tsx`)
   - 3-column grid layout for categories
   - Compact category cards with icons
   - Optimized for mobile scrolling

4. **MobileFeaturedProducts** (`MobileFeaturedProducts.tsx`)
   - 2-column grid for featured products
   - Uses MobileProductCard components
   - Compact header and spacing

### Page Components

1. **MobileHomepage** (`MobileHomepage.tsx`)
   - Complete mobile homepage layout
   - Includes all sections: Hero, Featured Products, Categories, Brands
   - Optimized spacing and typography for mobile

2. **MobileProductPage** (`MobileProductPage.tsx`)
   - Full mobile product detail page
   - Vertical image gallery with horizontal thumbnails
   - Compact product information and options
   - Mobile-optimized tabs for product details

## Implementation

### Conditional Rendering

Pages conditionally render mobile or desktop components based on screen size:

```typescript
import { useIsMobile } from '@/utils/useMobile'

export default function Home() {
  const isMobile = useIsMobile()
  
  return (
    <div>
      {isMobile ? <MobileHomepage /> : <PersonalizedHomepage />}
    </div>
  )
}
```

### Updated Pages

1. **Homepage** (`src/app/page.tsx`)
   - Conditionally renders `MobileHomepage` or `PersonalizedHomepage`

2. **Product Page** (`src/app/products/[slug]/page.tsx`)
   - Conditionally renders `MobileProductPage` or desktop product page

## Mobile Optimizations

### Design Considerations

- **Touch Targets**: All interactive elements are at least 44x44px for easy tapping
- **Spacing**: Reduced padding and margins for mobile screens
- **Typography**: Smaller font sizes optimized for mobile readability
- **Images**: Optimized image sizes and aspect ratios for mobile
- **Navigation**: Simplified navigation with bottom navigation bar

### Performance

- Lazy loading for images
- Reduced animation complexity
- Optimized component rendering
- Smaller bundle sizes for mobile components

## Usage

The mobile components are automatically used when:
- Screen width is less than 1024px
- User is on a mobile device or tablet

No additional configuration is needed - the app automatically detects and renders the appropriate components.

## Extending Mobile Components

To add new mobile components:

1. Create the component in `src/components/mobile/`
2. Follow the naming convention: `Mobile[ComponentName].tsx`
3. Optimize for mobile screens (touch targets, spacing, typography)
4. Update the parent page to conditionally render the mobile version

## Future Enhancements

- Mobile-specific checkout flow
- Mobile-optimized search and filters
- Mobile dashboard components
- Progressive Web App (PWA) features

