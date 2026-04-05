import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/showroom/$carId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { cardId } = Route.useParams();
  return <div>Hello /showroom/{cardId}!</div>;
}
