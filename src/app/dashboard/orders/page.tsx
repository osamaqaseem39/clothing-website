'use client'

import { motion } from 'framer-motion'
import { Package, Search, Filter, Download, Eye, Truck } from 'lucide-react'
import { useState } from 'react'

const orders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 2199.99,
    items: [
      { name: 'Silk Evening Gown', quantity: 1, price: 1299.99, image: '/images/1.png' },
      { name: 'Couture Cocktail Dress', quantity: 1, price: 899.99, image: '/images/2.png' },
      { name: 'Pearl Necklace Set', quantity: 1, price: 599.99, image: '/images/6.png' }
    ],
    tracking: 'TRK123456789',
    shippingAddress: '123 Main St, New York, NY 10001'
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'Shipped',
    total: 699.99,
    items: [
      { name: 'Designer Blazer', quantity: 1, price: 699.99, image: '/images/3.png' }
    ],
    tracking: 'TRK987654321',
    shippingAddress: '456 Oak Ave, Los Angeles, CA 90210'
  },
  {
    id: 'ORD-003',
    date: '2024-01-05',
    status: 'Processing',
    total: 2499.99,
    items: [
      { name: 'Bridal Gown', quantity: 1, price: 2499.99, image: '/images/4.png' }
    ],
    tracking: null,
    shippingAddress: '789 Pine St, Chicago, IL 60601'
  },
  {
    id: 'ORD-004',
    date: '2023-12-28',
    status: 'Cancelled',
    total: 1299.99,
    items: [
      { name: 'Luxury Handbag', quantity: 1, price: 1299.99, image: '/images/5.png' }
    ],
    tracking: null,
    shippingAddress: '321 Elm St, Miami, FL 33101'
  }
]

const statusColors = {
  'Delivered': 'bg-green-100 text-green-800',
  'Shipped': 'bg-blue-100 text-blue-800',
  'Processing': 'bg-yellow-100 text-yellow-800',
  'Cancelled': 'bg-red-100 text-red-800'
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Orders
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="delivered">Delivered</option>
            <option value="shipped">Shipped</option>
            <option value="processing">Processing</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Order Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Package className="h-5 w-5 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
                    {order.status}
                  </span>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${order.total}</p>
                    <p className="text-sm text-gray-500">{order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="p-6">
              <div className="space-y-4">
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Actions */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="text-sm text-gray-600">
                    <p><strong>Shipping Address:</strong> {order.shippingAddress}</p>
                    {order.tracking && (
                      <p><strong>Tracking:</strong> {order.tracking}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {order.tracking && (
                      <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                        <Truck className="h-4 w-4" />
                        Track Package
                      </button>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <Eye className="h-4 w-4" />
                      View Details
                    </button>
                    {order.status === 'Delivered' && (
                      <button className="px-4 py-2 text-sm text-white bg-black rounded-lg hover:bg-gray-800 transition-colors">
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </motion.div>
      )}
    </div>
  )
}