import { Button } from "@/components/ui/button";
import { carsData } from "@/data/cars";
import { useGarageStore } from "@/store/garageStore";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/garage")({
  component: RouteComponent,
});

function RouteComponent() {
  const garageIds = useGarageStore((state) => state.garageIds);
  const garageCars = carsData.filter((c) => garageIds[c.id])
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
          <div className="flex flex-col gap-4">
            {garageCars.map((car) => (
              <div key={car.id} className="border p-4 rounded">
                <h2 className="text-lg font-bold">{car.make} {car.model}</h2>
                <p>Year: {car.year}</p>
                <p>Price: ${car.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div >

  )
}
