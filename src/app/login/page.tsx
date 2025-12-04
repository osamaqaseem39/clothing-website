'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginCustomer } from '@/lib/auth'
import { useCustomer } from '@/contexts/CustomerContext'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useCustomer()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const data = await loginCustomer({ email, password })
      // API returns { token, user } or { accessToken, user } or similar
      const token = data.token || data.accessToken || data.access_token
      const customer = data.user || data.customer || data
      
      if (token && customer) {
        login(token, customer)
        router.push('/dashboard')
      } else {
        setError('Invalid response from server')
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-xl p-6 shadow-sm space-y-4">
        <h1 className="text-xl font-semibold text-gray-900">Login</h1>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <button disabled={loading} className="w-full bg-gray-900 text-white rounded-lg py-2 disabled:opacity-60">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="text-xs text-gray-600">
          No account? <a href="/register" className="text-blue-600">Register</a>
        </p>
      </form>
    </div>
  )
}


