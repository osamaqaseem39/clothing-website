'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import SaleBanner from '@/components/SaleBanner'
import CollectionBanner from '@/components/CollectionBanner'
import ProductShowcase from '@/components/ProductShowcase'
import FeaturedProducts from '@/components/FeaturedProducts'
import TrendingProducts from '@/components/TrendingProducts'
import RecentlyViewed from '@/components/RecentlyViewed'
import Brands from '@/components/Brands'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import MobileFilters from '@/components/MobileFilters'

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  const handleFilterToggle = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen)
  }

  const handleFilterClose = () => {
    setIsMobileFiltersOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onMenuClick={handleMenuToggle} 
        isMobileMenuOpen={isMobileMenuOpen}
        onFilterClick={handleFilterToggle}
      />
      <div className="flex">
        <Sidebar isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
        <main className="flex-1 lg:ml-64 pb-16 lg:pb-0">
          <SaleBanner />
          <CollectionBanner />
          <ProductShowcase />
          <FeaturedProducts />
          <Brands />
          <TrendingProducts />
          <RecentlyViewed />
          <Newsletter />
          <Footer />
        </main>
      </div>
      <MobileBottomNav />
      <MobileFilters isOpen={isMobileFiltersOpen} onClose={handleFilterClose} />
    </div>
  )
}