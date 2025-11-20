'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  size?: string
  color?: string
}

interface CartContextType {
  items: CartItem[]
  itemCount: number
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeFromCart: (productId: string, size?: string, color?: string) => void
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void
  clearCart: () => void
  message: string | null
  setMessage: (message: string | null) => void
  isInCart: (productId: string, size?: string, color?: string) => boolean
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (error) {
        console.error('Error parsing cart:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  // Auto-hide message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const addToCart = (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.productId === item.productId && 
        i.size === item.size && 
        i.color === item.color
      )

      if (existingIndex >= 0) {
        // Update existing item quantity
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + (item.quantity || 1)
        }
        setMessage(`${item.name} quantity updated in cart`)
        return updated
      } else {
        // Add new item
        const newItem: CartItem = {
          ...item,
          quantity: item.quantity || 1
        }
        setMessage(`${item.name} added to cart`)
        return [...prev, newItem]
      }
    })
  }

  const removeFromCart = (productId: string, size?: string, color?: string) => {
    setItems(prev => prev.filter(item => 
      !(item.productId === productId && 
        item.size === (size || undefined) && 
        item.color === (color || undefined))
    ))
    setMessage('Item removed from cart')
  }

  const updateQuantity = (productId: string, quantity: number, size?: string, color?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color)
      return
    }
    setItems(prev =>
      prev.map(item =>
        item.productId === productId && 
        item.size === (size || undefined) && 
        item.color === (color || undefined)
          ? { ...item, quantity } 
          : item
      )
    )
  }

  const clearCart = () => {
    setItems([])
    setMessage(null)
  }

  const isInCart = (productId: string, size?: string, color?: string) => {
    return items.some(item => 
      item.productId === productId && 
      item.size === (size || undefined) && 
      item.color === (color || undefined)
    )
  }

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        message,
        setMessage,
        isInCart,
        isOpen,
        openCart,
        closeCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

