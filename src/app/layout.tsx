import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import './globals.css'
import { RecentlyViewedProvider } from '@/contexts/RecentlyViewedContext'
import { AnalyticsProvider } from '@/contexts/AnalyticsContext'
import CookieConsentBanner from '@/components/CookieConsentBanner'

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  variable: '--font-cormorant',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})
const manrope = Manrope({ 
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'She\'s Trends - Luxury Women\'s Fashion',
  description: 'Exclusive luxury couture for the sophisticated woman. Discover our curated collection of high-end women\'s fashion, designer dresses, and premium accessories.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} ${cormorant.variable} font-sans`}>
        <AnalyticsProvider>
          <RecentlyViewedProvider>
            {children}
            <CookieConsentBanner />
          </RecentlyViewedProvider>
        </AnalyticsProvider>
      </body>
    </html>
  )
}