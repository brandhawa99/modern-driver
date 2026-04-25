import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

const AuctionDetails = ({
  data,
  children,
  iconText,
  className
}: {
  data?: string
  iconText?: string
  children: ReactNode
  className?: string
}) => {
  return (
    <h2 className={cn("flex flex-row items-center gap-1 bg-accent justify-center rounded text-lg px-2 h-8", className)}>
      <div className="text-gray-500 flex items-center justify-center">
        {children}
        {iconText && <span>{iconText}:</span>}
      </div>
      {data && (<div className="font-mono ">{data}</div>)}
    </h2>
  )
}

export default AuctionDetails