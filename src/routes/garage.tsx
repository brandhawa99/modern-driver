import GarageCard from "@/components/Garage/GarageCard";
import { GarageValuation } from "@/components/Garage/GarageValuation";
import { Button } from "@/components/ui/button";
import { carsData } from "@/data/cars";
import { formatPrice } from "@/lib/utils";
import { useGarageStore } from "@/store/garageStore";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/garage")({
  component: RouteComponent,
});

function RouteComponent() {
  const garageIds = useGarageStore((state) => state.garageIds);
  const garageCars = carsData.filter((c) => garageIds[c.id])

  // const avgValue = totalValue / garageCars.length
  return (
    <div className="w-full flex items-center justify-center">
      <div>
        {garageCars.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <p>Your garage is empty. Go add some cars!</p>
            <Button asChild variant="link">
              <Link to="/showroom">Add Cars</Link>

            </Button>

          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-8xl px-8 md:15 lg:px-20 xl:px-40  ">
              <GarageValuation cars={garageCars} />
              {/* <h2 className="text-2xl py-12">{garageCars.length} Cars In Your Garage</h2> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10">
                {garageCars.map((car) => (
                  <GarageCard car={car} />
                ))}
              </div>
            </div>
          </div >
        )}
      </div>

    </div >

  )
}
