import { CarGrid } from "@/components/CarGrid/CarGrid";
import { carsData } from "@/data/cars";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/auction/")({
  component: RouteComponent,
});

function RouteComponent() {
  const auctionCars = carsData.filter((c) => c.isAuction);
  return (
    <CarGrid
      cars={auctionCars}
      title={(n) => `${n} ${n === 1 ? "Car" : "Cars"} In The Auction`}
    />
  );
}