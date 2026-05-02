import { GarageValuation } from "@/components/Garage/GarageValuation";
import { Button } from "@/components/ui/button";
import { carsData } from "@/data/cars";
import { useGarageStore } from "@/store/garageStore";
import { createFileRoute, Link } from "@tanstack/react-router";
import Garage from "@/assets/Garage.gif"
import DisplayCard from "@/components/DisplayCard/DisplayCard";

export const Route = createFileRoute("/garage")({
  component: RouteComponent,
});

function RouteComponent() {
  const garageIds = useGarageStore((state) => state.garageIds);
  const garageCars = carsData.filter((c) => garageIds[c.id])

  // const avgValue = totalValue / garageCars.length
  return (
    <div className="w-full flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div>
        {garageCars.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <div>
              <div className="bg-primary/70 p-10 rounded my-10 flex items-center justify-center">
                {/* <GarageIcon size={80} /> */}
                <img src={Garage} />
              </div>
              <h1 className="font-bold">Your Collection is currently empty.</h1>
            </div>
            <p className="max-w-md dark:text-gray-400 text-center">Start exploring our curated collection to discover rare automotive masterpieces and begin your collection!</p>
            <Button asChild >
              <Link to="/showroom">Add Cars</Link>
            </Button>

          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-8xl px-8 md:15 lg:px-20 xl:px-40  ">
              <GarageValuation cars={garageCars} />
              {/* <h2 className="text-2xl py-12">{garageCars.length} Cars In Your Garage</h2> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10">
                {garageCars.map((car, index) => (
                  <DisplayCard car={car} key={index} />
                ))}
              </div>
            </div>
          </div >
        )}
      </div>

    </div >

  )
}
