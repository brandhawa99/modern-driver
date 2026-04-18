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
  const showSeconds = timeLeft.days === 0 && timeLeft.hours === 0

  return (
    <div flex-1>
      {timeLeft.days > 0 && <span>{timeLeft.days}D </span>}
      {timeLeft.hours > 0 && <span>{timeLeft.hours}H </span>}
      <span>{timeLeft.minutes}M </span>
      {showSeconds && <span>{timeLeft.seconds}S</span>}
    </div>
  )
}