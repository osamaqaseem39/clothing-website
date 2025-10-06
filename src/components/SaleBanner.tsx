'use client'

import { useState, useEffect } from 'react'

export default function SaleBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 19,
    minutes: 44,
    seconds: 21
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gray-800 text-white py-3 lg:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 lg:space-x-4">
            <div className="text-2xl lg:text-4xl font-bold">SALE</div>
            <div className="text-sm lg:text-lg">
              <span className="text-red-400">END OF SEASON</span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-xs lg:text-sm text-gray-300 mb-1">Ends in {timeLeft.days} days:</div>
            <div className="text-lg lg:text-2xl font-mono font-bold">
              {timeLeft.hours.toString().padStart(2, '0')}h: {timeLeft.minutes.toString().padStart(2, '0')}m: {timeLeft.seconds.toString().padStart(2, '0')}s
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}