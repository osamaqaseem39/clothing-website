'use client'

import { motion } from 'framer-motion'
import { CreditCard, Plus, Edit, Trash2, Shield, Lock } from 'lucide-react'
import { useState } from 'react'

const paymentMethods = [
  {
    id: '1',
    type: 'card',
    last4: '4242',
    brand: 'Visa',
    expiryMonth: '12',
    expiryYear: '2026',
    isDefault: true,
    holderName: 'Sarah Johnson'
  },
  {
    id: '2',
    type: 'card',
    last4: '5555',
    brand: 'Mastercard',
    expiryMonth: '08',
    expiryYear: '2025',
    isDefault: false,
    holderName: 'Sarah Johnson'
  },
  {
    id: '3',
    type: 'paypal',
    email: 'sarah.johnson@email.com',
    isDefault: false
  }
]

export default function PaymentPage() {
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [paymentList, setPaymentList] = useState(paymentMethods)
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    holderName: '',
    isDefault: false
  })

  const handleAddPayment = () => {
    if (formData.cardNumber && formData.holderName) {
      const newPayment = {
        id: Date.now().toString(),
        type: 'card' as const,
        last4: formData.cardNumber.slice(-4),
        brand: formData.cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
        expiryMonth: formData.expiryMonth,
        expiryYear: formData.expiryYear,
        isDefault: paymentList.length === 0 || formData.isDefault,
        holderName: formData.holderName
      }
      setPaymentList([...paymentList, newPayment])
      setIsAddingNew(false)
      setFormData({
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvv: '',
        holderName: '',
        isDefault: false
      })
    }
  }

  const handleDeletePayment = (id: string) => {
    setPaymentList(paymentList.filter(payment => payment.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setPaymentList(paymentList.map(payment => ({
      ...payment,
      isDefault: payment.id === id
    })))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payment Methods</h1>
          <p className="text-gray-600">Manage your payment information</p>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Payment Method
        </button>
      </div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-2xl p-4"
      >
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">Secure Payment Processing</h3>
            <p className="text-sm text-blue-700 mt-1">
              Your payment information is encrypted and secure. We never store your full card details.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Payment Methods List */}
      <div className="space-y-4">
        {paymentList.map((payment, index) => (
          <motion.div
            key={payment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border-2 border-transparent hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 rounded-lg">
                  {payment.type === 'card' ? (
                    <CreditCard className="h-6 w-6 text-gray-600" />
                  ) : (
                    <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                  )}
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-900">
                      {payment.type === 'card' 
                        ? `${payment.brand} •••• ${payment.last4}`
                        : `PayPal • ${payment.email}`
                      }
                    </h3>
                    {payment.isDefault && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                        Default
                      </span>
                    )}
                  </div>
                  {payment.type === 'card' && (
                    <p className="text-sm text-gray-600">
                      Expires {payment.expiryMonth}/{payment.expiryYear} • {payment.holderName}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!payment.isDefault && (
                  <button
                    onClick={() => handleSetDefault(payment.id)}
                    className="px-3 py-1 text-sm text-gray-600 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Set Default
                  </button>
                )}
                <button
                  onClick={() => handleDeletePayment(payment.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Payment Method Modal */}
      {isAddingNew && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex items-center gap-2 mb-6">
              <Lock className="h-5 w-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Add Payment Method</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.holderName}
                  onChange={(e) => setFormData({...formData, holderName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Month
                  </label>
                  <select
                    value={formData.expiryMonth}
                    onChange={(e) => setFormData({...formData, expiryMonth: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">MM</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <select
                    value={formData.expiryYear}
                    onChange={(e) => setFormData({...formData, expiryYear: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">YYYY</option>
                    {Array.from({ length: 10 }, (_, i) => {
                      const year = new Date().getFullYear() + i
                      return (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      )
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({...formData, isDefault: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isDefault" className="text-sm text-gray-700">
                  Set as default payment method
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsAddingNew(false)}
                className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPayment}
                className="flex-1 btn-primary"
              >
                Add Payment Method
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Empty State */}
      {paymentList.length === 0 && !isAddingNew && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No payment methods</h3>
          <p className="text-gray-600 mb-6">Add a payment method to make purchases easier</p>
          <button
            onClick={() => setIsAddingNew(true)}
            className="btn-primary"
          >
            Add Payment Method
          </button>
        </motion.div>
      )}
    </div>
  )
}