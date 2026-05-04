import { createFileRoute } from "@tanstack/react-router";
import { useCar } from "@/hooks/useCars";
import { CarDetailPage } from "@/components/CarDetailPage/CarDetailPage";
import CarDetailPageSkeleton from "@/components/CarDetailPage/CarDetailPageSkeleton";
import CarDetailPageError from "@/components/CarDetailPage/CarDetailPageError";

export const Route = createFileRoute("/auction/$carId")({
  component: RouteComponent,
});
function RouteComponent() {
  const { carId } = Route.useParams();
  const { data, isPending, isError } = useCar(carId);
  if (isError) {
    return <CarDetailPageError />;
  }
  if (isPending) {
    return <CarDetailPageSkeleton />;
  }

  return <CarDetailPage car={data} />;
}
