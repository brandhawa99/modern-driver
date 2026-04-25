import { useCar } from "@/hooks/useCars";
import { createFileRoute } from "@tanstack/react-router";
import { CarDetailPage } from "@/components/CarDetailPage/CarDetailPage";



export const Route = createFileRoute("/showroom/$carId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { carId } = Route.useParams();
  const { data, isPending, isError } = useCar(carId);
  if (isError) {
    return <div>Error loading car data.</div>
  }
  if (isPending) {
    return <div>Loading...</div>
  }

  return (
    <CarDetailPage car={data} />
  )
}
