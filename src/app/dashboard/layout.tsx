'use client'

import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { useCustomer } from '@/contexts/CustomerContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { customer, isLoading } = useCustomer()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !customer) {
      router.push('/login')
    }
  }, [customer, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!customer) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full lg:ml-0 pt-20 lg:pt-0">
            {children}
        </main>
      </div>
    </div>
  )
}