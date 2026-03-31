import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/showroom/$cardId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/showroom/$cardId"!</div>;
}
