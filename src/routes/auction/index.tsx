import DisplayCard from '@/components/DisplayCard/DisplayCard'
import { carsData } from '@/data/cars'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auction/')({
  component: RouteComponent,
})

function RouteComponent() {
  const auctionCars = carsData.filter((c) => c.isAuction)
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-8xl px-8 md:15 lg:px-20 xl:px-40  ">
        <h2 className="text-2xl py-12">{auctionCars.length} Cars In The Auction</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10">
          {auctionCars.map(car => (
            <DisplayCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div >
  )
}
