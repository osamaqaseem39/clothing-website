import { API_BASE_URL } from './api'

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

export async function loginCustomer(payload: LoginPayload) {
  const res = await fetch(`${API_BASE_URL}/customers/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

export async function registerCustomer(payload: RegisterPayload) {
  const res = await fetch(`${API_BASE_URL}/customers/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error('Registration failed')
  return res.json()
}


