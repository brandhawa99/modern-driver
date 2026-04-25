import { ArrowUpIcon, ClockIcon, GavelIcon, HashIcon } from "@phosphor-icons/react"
import AuctionDetails from "./AuctionDetails"
import { CountdownTimer } from "../DisplayCard/CountdownTimer"
import { formatPrice } from "@/lib/utils"
import { useAuctionStore } from "@/store/auctionStore"
import { Button } from "../ui/button"
import { useAuctionBidLoop } from "@/hooks/useAuctionBidLoop"
import type { Car } from "@/data/cars"

const AuctionData = ({ car }: { car: Car }) => {

  const currentBid = useAuctionStore(state => state.currentBid)
  const bids = useAuctionStore(state => state.bids)
  useAuctionBidLoop(car)

  return (
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
      <Button onClick={() => { console.log("HELLO") }} className="grow-4 order-first sm:order-last cursor-pointer rounded w-full sm:w-30 p-0  h-8 ">
        <GavelIcon color="#fff" />
        Place Bid
      </Button>
    </div>
  )
}
export default AuctionData