import { createFileRoute } from "@tanstack/react-router";
import { CarGrid } from "@/components/CarGrid/CarGrid";
import { carsData } from "@/data/cars";
export const Route = createFileRoute("/showroom/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <CarGrid
      cars={carsData}
      title={(n) => `${n} ${n === 1 ? "Car" : "Cars"} For Sale`}
    />
  );
}
