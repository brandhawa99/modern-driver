import type { Bid } from "@/store/auctionStore"
import { formatPrice } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { TrophyIcon } from "@phosphor-icons/react"

const BidHistory = ({ bids, isReserveMet }: { bids: Bid[], isReserveMet: boolean }) => {
  const winner = isReserveMet ? bids[0] : null

  if (bids.length === 0) {
    return (
      <p className="text-center text-muted-foreground text-sm py-4">
        No bids yet
      </p>
    )
  }

  return (
    <div className="w-full">
      {winner && (
        <div className="w-full mb-4 px-4 py-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 flex items-center gap-4">
          <TrophyIcon size={24} className="text-yellow-500 shrink-0" />
          <div>
            <p className="text-xs tracking-widest uppercase text-yellow-500 mb-0.5">
              Winning Bid
            </p>
            <p className="text-sm font-medium">{winner.bidder}</p>
            <p className="font-mono text-lg text-yellow-500">
              {formatPrice(winner.amount)}
            </p>
          </div>
        </div>
      )}

      <div className="w-full divide-y divide-border/50">
        {bids.map((bid, index) => (
          <div
            key={bid.id}
            className={`flex justify-between items-center py-3 px-4 ${index === 0 && isReserveMet ? "opacity-50" : ""}`}
          >
            <div className="flex items-center gap-3">
              {index === 0 && !isReserveMet && (
                <span className="text-[10px] tracking-widest uppercase text-green-500">
                  Leading
                </span>
              )}
              {index === 0 && isReserveMet && (
                <span className="text-[10px] tracking-widest uppercase text-yellow-500">
                  Winner
                </span>
              )}
              <span className="text-sm text-muted-foreground">{bid.bidder}</span>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm">{formatPrice(bid.amount)}</p>
              <p className="text-[10px] text-muted-foreground">
                {formatDistanceToNow(new Date(bid.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BidHistory