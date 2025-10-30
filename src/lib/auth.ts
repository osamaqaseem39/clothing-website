import { API_BASE_URL, getCorsHeaders, getCorsConfig } from './api'

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  firstName: string
  lastName: string
  email: string
  password: string
}

export interface Customer {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  addresses?: any[]
  createdAt: string
  updatedAt: string
}

export async function loginCustomer(payload: LoginPayload) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      ...getCorsHeaders(),
      'Content-Type': 'application/json',
    },
    ...getCorsConfig(),
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

export async function registerCustomer(payload: RegisterPayload) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      ...getCorsHeaders(),
      'Content-Type': 'application/json',
    },
    ...getCorsConfig(),
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Registration failed')
  return res.json()
}

export async function getCurrentUser(token: string): Promise<Customer> {
  const res = await fetch(`${API_BASE_URL}/auth/profile`, {
    method: 'GET',
    headers: {
      ...getCorsHeaders(),
      'Authorization': `Bearer ${token}`,
    },
    ...getCorsConfig(),
  })
  if (!res.ok) throw new Error('Failed to get user')
  const payload = await res.json()
  // Normalize to return the user object directly
  return (payload?.data?.user || payload?.user || payload) as Customer
}


