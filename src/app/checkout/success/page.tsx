'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import MobileBottomNav from '@/components/MobileBottomNav'
import { CheckCircle, ShoppingBag, Home, Package } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false)
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
          <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-2xl w-full text-center">
              {/* Success Icon */}
              <div className="mb-6 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
                  <div className="relative bg-green-100 rounded-full p-4">
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
                Order Placed Successfully!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for your order. We've received your order and will begin processing it right away.
              </p>

              {/* Order Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-center gap-2 text-primary-600 mb-4">
                  <Package className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">What's Next?</h2>
                </div>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Order Confirmation</p>
                      <p className="text-sm text-gray-600">You'll receive an email confirmation shortly with your order details.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Processing</p>
                      <p className="text-sm text-gray-600">We'll prepare your order for shipment.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm">
                      3
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Shipping</p>
                      <p className="text-sm text-gray-600">You'll receive tracking information once your order ships.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  <ShoppingBag className="h-5 w-5" />
                  Continue Shopping
                </Link>
                <Link
                  href="/dashboard/orders"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <Package className="h-5 w-5" />
                  View Orders
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <Home className="h-5 w-5" />
                  Back to Home
                </Link>
              </div>

              {/* Help Text */}
              <p className="mt-8 text-sm text-gray-600">
                Have questions? <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">Contact us</Link>
              </p>
            </div>
          </div>

          <Footer />
        </main>
      </div>
      
      <MobileBottomNav />
    </div>
  )
}

