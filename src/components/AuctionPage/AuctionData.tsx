import { ArrowUpIcon, ClockIcon, HashIcon } from "@phosphor-icons/react"
import AuctionDetails from "./AuctionDetails"
import { CountdownTimer } from "../DisplayCard/CountdownTimer"
import { formatPrice } from "@/lib/utils"
import { useAuctionStore, type Bid } from "@/store/auctionStore"
import { useAuctionBidLoop } from "@/hooks/useAuctionBidLoop"
import type { Car } from "@/data/cars"
import BidHistory from "./BidHistory"
import BidButton from "./BidButton"
import { useEffect, useState } from "react"

const EMPTY_BIDS: Bid[] = []

const AuctionData = ({ car }: { car: Car }) => {
  const currentBid = useAuctionStore(state => state.bidsByCarId[car.id] || 0)
  const bids = useAuctionStore(state => state.bids[car.id] ?? EMPTY_BIDS)
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    const endTimeMs = new Date(car.endTime!).getTime()
    const ms = endTimeMs - Date.now()
    const timer = setTimeout(() => setHasEnded(true), ms)
    return () => clearTimeout(timer);
  }, [car.endTime])



  useAuctionBidLoop(car)
  return (
    <>
      <div className="max-w-full w-full mb-10 justify-center mt-2 flex flex-col gap-1 sm:items-center sm:flex-row sm:w-fit">
        <AuctionDetails>
          <div className="flex items-center gap-1">
            <ClockIcon color="#6a7282" />
            <span className="text-gray-500">Time Left:</span>
            <CountdownTimer endTime={car.endTime!} />
          </div>
        </AuctionDetails>
        <AuctionDetails data={formatPrice(currentBid)} iconText="Top Bid">
          <ArrowUpIcon color="#6a7282" />
        </AuctionDetails>
        <AuctionDetails data={bids.length.toLocaleString()} iconText="Bids">
          <HashIcon color="#6a7282" />
        </AuctionDetails>
        <BidButton carId={car.id} disabled={hasEnded} />
      </div>
      {bids.length > 0 && (<h1>Bid History</h1>)}
      <div className="w-full divide-y divide-border/50 min-h-50  max-h-50 overflow-y-auto">
        <BidHistory bids={bids} hasEnded={hasEnded} />
      </div>
    </>
  )
}
export default AuctionData