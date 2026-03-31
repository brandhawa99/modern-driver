import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/showroom/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/showroom/"!</div>;
}
