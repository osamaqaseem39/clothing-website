'use client'

import { motion } from 'framer-motion'
import { Package, CreditCard, MapPin, Heart, Star, TrendingUp } from 'lucide-react'

const stats = [
  { name: 'Total Orders', value: '12', icon: Package, change: '+2 this month' },
  { name: 'Total Spent', value: '$1,247', icon: CreditCard, change: '+$89 this month' },
  { name: 'Wishlist Items', value: '8', icon: Heart, change: '3 added recently' },
  { name: 'Reviews Given', value: '5', icon: Star, change: 'All 5-star' }
]

const recentOrders = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 189.99,
    items: 3,
    tracking: 'TRK123456789'
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'Shipped',
    total: 79.99,
    items: 1,
    tracking: 'TRK987654321'
  },
  {
    id: 'ORD-003',
    date: '2024-01-05',
    status: 'Processing',
    total: 299.99,
    items: 2,
    tracking: null
  }
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, Sarah! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your account and orders.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-green-600 mt-1">{stat.change}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <stat.icon className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-2xl shadow-sm"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All Orders
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {recentOrders.map((order) => (
            <div key={order.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium text-gray-900">Order {order.id}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                    <span>{order.items} item{order.items > 1 ? 's' : ''}</span>
                    <span>${order.total}</span>
                    {order.tracking && (
                      <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
                        Track Order
                      </span>
                    )}
                  </div>
                </div>
                <button className="text-sm text-gray-600 hover:text-gray-900 font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Manage Addresses</p>
                <p className="text-sm text-gray-600">Update shipping info</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Heart className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Wishlist</p>
                <p className="text-sm text-gray-600">View saved items</p>
              </div>
            </div>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Order History</p>
                <p className="text-sm text-gray-600">View all orders</p>
              </div>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  )
}