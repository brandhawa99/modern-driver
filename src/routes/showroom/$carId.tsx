import { useCar } from "@/hooks/useCars";
import { createFileRoute } from "@tanstack/react-router";
import { queryClient } from "../../main";
import { fetchCarById } from "@/services/carsService";
import { CarDetailPage } from "@/components/CarDetailPage/CarDetailPage";



export const Route = createFileRoute("/showroom/$carId")({
  loader: async ({ params }) => {
    queryClient.ensureQueryData({ queryKey: ["car", params.carId], queryFn: () => fetchCarById(params.carId) });
  },
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
