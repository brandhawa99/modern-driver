import { useCar } from "@/hooks/useCars";
import { createFileRoute } from "@tanstack/react-router";
import { CarDetailPage } from "@/components/CarDetailPage/CarDetailPage";
import { useMemo } from "react";
import CarDetailPageSkeleton from "@/components/CarDetailPage/CarDetailPageSkeleton";
import CarDetailPageError from "@/components/CarDetailPage/CarDetailPageError";

export const Route = createFileRoute("/showroom/$carId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { carId } = Route.useParams();
  const { data, isPending, isError } = useCar(carId);
  const car = data
  // useMemo(() => data, [data?.id]);

  if (isError) {
    return <CarDetailPageError />;
  }
  if (isPending) {
    return <CarDetailPageSkeleton />;
  }

  return <CarDetailPage car={car!} />;
}
