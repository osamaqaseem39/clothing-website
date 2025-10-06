'use client'

import { Search, ShoppingBag, User, ChevronDown, Menu, X, Filter } from 'lucide-react'
import { useState } from 'react'

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-serif font-bold text-gradient">Élégance Couture</h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <div className="flex">
                  <select className="px-4 py-2 border border-gray-200 rounded-l-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500">
                    <option>All</option>
                    <option>Evening Wear</option>
                    <option>Day Dresses</option>
                    <option>Couture</option>
                    <option>Bridal</option>
                    <option>Accessories</option>
                    <option>Jewelry</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search luxury pieces..."
                    className="flex-1 px-4 py-2 border-t border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                  <button className="px-4 py-2 bg-rose-600 text-white rounded-r-lg hover:bg-rose-700 transition-colors">
                    <Search className="h-4 w-4" />
                  </button>
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
              <button className="relative p-2 text-gray-700 hover:text-rose-600 transition-colors">
                <ShoppingBag className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-sm text-gray-700 hover:text-rose-600 transition-colors"
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
          <div className="flex items-center justify-between h-14">
            {/* Menu Button */}
            <button
              onClick={onMenuClick}
              className="p-2 text-gray-700 hover:text-rose-600 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Logo */}
            <div className="flex-1 text-center">
              <h1 className="text-lg font-serif font-bold text-gradient">Élégance Couture</h1>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-700 hover:text-rose-600 transition-colors">
                <Search className="h-5 w-5" />
              </button>
              <button className="relative p-2 text-gray-700 hover:text-rose-600 transition-colors">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
              </div>
              {onFilterClick && (
                <button
                  onClick={onFilterClick}
                  className="p-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 hover:text-rose-600 transition-colors"
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