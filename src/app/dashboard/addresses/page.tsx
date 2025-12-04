'use client'

import { motion } from 'framer-motion'
import { MapPin, Plus, Edit, Trash2, Check } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useCustomer } from '@/contexts/CustomerContext'
import { apiClient } from '@/lib/api'

interface Address {
  id: string
  type: string
  name: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
  isDefault: boolean
}

export default function AddressesPage() {
  const { customer } = useCustomer()
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [addressList, setAddressList] = useState<Address[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (customer?._id) {
      fetchAddresses()
    } else {
      setLoading(false)
    }
  }, [customer])

  const fetchAddresses = async () => {
    try {
      setLoading(true)
      // TODO: Replace with actual API call when addresses API is available
      // const response = await apiClient.getCustomerAddresses(customer._id)
      // setAddressList(response.data || [])
      setAddressList([])
    } catch (error) {
      console.error('Failed to fetch addresses:', error)
      setAddressList([])
    } finally {
      setLoading(false)
    }
  }
  const [formData, setFormData] = useState({
    type: 'Home',
    name: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    phone: ''
  })

  const handleAddAddress = () => {
    if (formData.name && formData.address && formData.city) {
      const newAddress = {
        id: Date.now().toString(),
        ...formData,
        isDefault: addressList.length === 0
      }
      setAddressList([...addressList, newAddress])
      setIsAddingNew(false)
      setFormData({
        type: 'Home',
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        phone: ''
      })
    }
  }

  const handleEditAddress = (id: string) => {
    const address = addressList.find(addr => addr.id === id)
    if (address) {
      setFormData({
        type: address.type,
        name: address.name,
        address: address.address,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
        phone: address.phone
      })
      setEditingId(id)
    }
  }

  const handleUpdateAddress = () => {
    if (editingId) {
      setAddressList(addressList.map(addr => 
        addr.id === editingId ? { ...addr, ...formData } : addr
      ))
      setEditingId(null)
      setFormData({
        type: 'Home',
        name: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        phone: ''
      })
    }
  }

  const handleDeleteAddress = (id: string) => {
    setAddressList(addressList.filter(addr => addr.id !== id))
  }

  const handleSetDefault = (id: string) => {
    setAddressList(addressList.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Addresses</h1>
          <p className="text-gray-600">Manage your shipping addresses</p>
        </div>
        <button
          onClick={() => setIsAddingNew(true)}
          className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add New Address
        </button>
      </div>

      {/* Address List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addressList.map((address, index) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border-2 border-transparent hover:border-gray-200 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">{address.type}</span>
                {address.isDefault && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                    Default
                  </span>
                )}
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => handleEditAddress(address.id)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p className="font-medium text-gray-900">{address.name}</p>
              <p>{address.address}</p>
              <p>{address.city}, {address.state} {address.zipCode}</p>
              <p>{address.country}</p>
              <p>{address.phone}</p>
            </div>

            {!address.isDefault && (
              <button
                onClick={() => handleSetDefault(address.id)}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Check className="h-4 w-4" />
                Set as Default
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      {(isAddingNew || editingId) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              {isAddingNew ? 'Add New Address' : 'Edit Address'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({...formData, country: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setIsAddingNew(false)
                  setEditingId(null)
                  setFormData({
                    type: 'Home',
                    name: '',
                    address: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    country: 'United States',
                    phone: ''
                  })
                }}
                className="flex-1 px-4 py-2 text-gray-600 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={isAddingNew ? handleAddAddress : handleUpdateAddress}
                className="flex-1 btn-primary"
              >
                {isAddingNew ? 'Add Address' : 'Update Address'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Empty State */}
      {addressList.length === 0 && !isAddingNew && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
          <p className="text-gray-600 mb-6">Add your first address to get started</p>
          <button
            onClick={() => setIsAddingNew(true)}
            className="btn-primary"
          >
            Add Address
          </button>
        </motion.div>
      )}
    </div>
  )
}