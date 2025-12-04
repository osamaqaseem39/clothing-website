import { Metadata } from 'next'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { redirect } from 'next/navigation'

function Guard({ children }: { children: React.ReactNode }) {
  if (typeof window !== 'undefined') {
    const customer = localStorage.getItem('customer')
    if (!customer) {
      redirect('/login')
    }
  }
  return <>{children}</>
}

export const metadata: Metadata = {
  title: 'Dashboard - Shes Trends',
  description: 'Manage your account, orders, and preferences',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6">
          <Guard>
            {children}
          </Guard>
        </main>
      </div>
    </div>
  )
}