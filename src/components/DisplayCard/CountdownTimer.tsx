import { useState, useEffect } from 'react'
import { getTimeLeft } from '@/lib/getTimeLeft'

export function CountdownTimer({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(endTime))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(endTime))
    }, 1000)
    return () => clearInterval(interval)
  }, [endTime])

  if (timeLeft.isExpired) return <span>Auction ended</span>

  return (
    <div className="font-mono dark:text-white text-black">
      {
        timeLeft.days > 0
          ? <span>{timeLeft.days} Day{timeLeft.days > 1 ? "s" : ""}</span>
          :
          <>
            <span>{timeLeft.hours <= 9 ? "0" : ""}{timeLeft.hours}:</span>
            <span>{timeLeft.minutes <= 9 ? "0" : ""}{timeLeft.minutes}:</span>
            <span>{timeLeft.seconds <= 9 ? "0" : ""}{timeLeft.seconds}</span>
          </>
      }
    </div >
  )
}