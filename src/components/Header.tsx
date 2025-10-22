'use client'

import { Search, ShoppingBag, User, ChevronDown, Menu, X, Filter } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

interface HeaderProps {
  onMenuClick: () => void
  isMobileMenuOpen: boolean
  onFilterClick?: () => void
}

export default function Header({ onMenuClick, isMobileMenuOpen, onFilterClick }: HeaderProps) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 hidden lg:block">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="flex items-center">
                <Image
                  src="/images/logo.png"
                  alt="She's Trends"
                  width={100}
                  height={100}
                  className="h-20 w-auto"
                />
              </a>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <div className="flex shadow-lg rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-primary-300 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-200 transition-all duration-200">
                  <select className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-sm font-medium text-gray-700 focus:outline-none border-r border-gray-200 hover:from-gray-100 hover:to-gray-200 transition-colors">
                    <option>All Categories</option>
                    <option>Evening Wear</option>
                    <option>Day Dresses</option>
                    <option>Couture</option>
                    <option>Bridal</option>
                    <option>Accessories</option>
                    <option>Jewelry</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search luxury pieces, brands, styles..."
                    className="flex-1 px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none bg-white"
                  />
                  <button className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-500 text-white hover:from-primary-700 hover:to-secondary-600 transition-all duration-200 flex items-center gap-2 font-medium">
                    <Search className="h-4 w-4" />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
                {/* Search suggestions dropdown would go here */}
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-10 hidden">
                  <div className="p-4">
                    <p className="text-sm text-gray-500">Popular searches:</p>
                    <div className="mt-2 space-y-1">
                      <button className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded">Evening gowns</button>
                      <button className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded">Designer handbags</button>
                      <button className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-50 rounded">Bridal collection</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-4">
              {/* Delivery/Currency */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Deliver To</span>
                <ChevronDown className="h-4 w-4" />
                <span className="mx-2">|</span>
                <span>Currency</span>
                <ChevronDown className="h-4 w-4" />
              </div>

              {/* Shopping Cart */}
              <button className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
                <ShoppingBag className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-sm text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Sign In / Register</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        My Account
                      </a>
                      <a href="/dashboard/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Orders
                      </a>
                      <a href="/dashboard/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Wishlist
                      </a>
                      <div className="border-t border-gray-100" />
                      <a href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Sign In
                      </a>
                      <a href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Register
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 lg:hidden">
        <div className="px-4">
          <div className="flex items-center justify-between h-20">
            {/* Menu Button */}
            <button
              onClick={onMenuClick}
              className="p-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Logo */}
            <div className="flex-1 text-center">
              <a href="/" className="flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="She's Trends"
                  width={100}
                  height={40}
                  className="h-10 w-auto"
                />
              </a>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-700 hover:text-primary-600 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="pb-3">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search luxury pieces..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              </div>
              {onFilterClick && (
                <button
                  onClick={onFilterClick}
                  className="p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}