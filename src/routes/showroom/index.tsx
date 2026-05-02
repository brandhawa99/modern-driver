import { createFileRoute } from "@tanstack/react-router";
import CarCard from "@/components/ShowroomPage/CarCard";
import { carsData } from "@/data/cars";
import DisplayCard from "@/components/DisplayCard/DisplayCard";
export const Route = createFileRoute("/showroom/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-8xl px-8 md:15 lg:px-20 xl:px-40  ">
        <h2 className="text-2xl py-12">{carsData.length} Cars For Sale</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10">
          {carsData.map((car) => (
            <DisplayCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}
