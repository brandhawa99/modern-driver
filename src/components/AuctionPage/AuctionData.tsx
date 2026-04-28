import { ArrowUpIcon, ClockIcon, GavelIcon, HashIcon } from "@phosphor-icons/react"
import AuctionDetails from "./AuctionDetails"
import { CountdownTimer } from "../DisplayCard/CountdownTimer"
import { formatPrice } from "@/lib/utils"
import { useAuctionStore, type Bid } from "@/store/auctionStore"
import { Button } from "../ui/button"
import { useAuctionBidLoop } from "@/hooks/useAuctionBidLoop"
import type { Car } from "@/data/cars"
import BidHistory from "./BidHistory"
import confetti from "canvas-confetti"
import BidButton from "./BidButton"

const EMPTY_BIDS: Bid[] = []

const AuctionData = ({ car }: { car: Car }) => {
  const currentBid = useAuctionStore(state => state.bidsByCarId[car.id] || 0)
  const isReserveMet = useAuctionStore(state => state.reserveMetByCarId[car.id] ?? false)
  const bids = useAuctionStore(state => state.bids[car.id] ?? EMPTY_BIDS)  // stable fallback
  const placeBid = useAuctionStore(state => state.placeBid)

  useAuctionBidLoop(car)

  const handleBid = () => {
    placeBid(car.id);
    confetti({
      particleCount: 40,
      spread: 90,
      origin: { y: 1 },
      colors: [
        "#c9a84c", // gold
        "#ff595e", // red
        "#ffca3a", // yellow
        "#6a4c93", // purple
        "#1982c4", // blue
        "#8ac926", // green
        "#ff924c", // orange
        "#ffffff", // white
        "#ff99c8", // pink
      ],
      scalar: 0.8,
    })
  }

  return (
    <>
      <div className="max-w-full w-full pb-10 justify-center mt-2 flex flex-col gap-1 sm:items-center sm:flex-row sm:w-fit">
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
        <BidButton carId={car.id} disabled={isReserveMet} />
      </div>
      {
        isReserveMet &&
        <div className="w-full mb-10 px-4 py-3 rounded-2xl bg-primary/10 border border-primary/30 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <p className="text-sm font-medium text-primary tracking-wide">
            Reserve Price Met Auction Closed.
          </p>
        </div>
      }
      {bids.length > 0 && (<h1>Bid History</h1>)}
      <div className="w-full divide-y divide-border/50 min-h-50  max-h-50 overflow-y-auto no-scrollbar">
        <BidHistory bids={bids} isReserveMet={isReserveMet} />
      </div>
    </>
  )
}
export default AuctionData