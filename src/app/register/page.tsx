'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { registerCustomer } from '@/lib/auth'

export default function RegisterPage() {
  const router = useRouter()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const data = await registerCustomer({ firstName, lastName, email, password })
      localStorage.setItem('customer', JSON.stringify(data))
      router.push('/dashboard')
    } catch (err: any) {
      setError(err?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white rounded-xl p-6 shadow-sm space-y-4">
        <h1 className="text-xl font-semibold text-gray-900">Create account</h1>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">First name</label>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Last name</label>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="w-full border rounded-lg px-3 py-2" required />
        </div>
        <button disabled={loading} className="w-full bg-gray-900 text-white rounded-lg py-2 disabled:opacity-60">
          {loading ? 'Creating...' : 'Create account'}
        </button>
        <p className="text-xs text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600">Login</a>
        </p>
      </form>
    </div>
  )
}


