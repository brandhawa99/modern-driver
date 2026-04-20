import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auction/$carId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/auction/$carId"!</div>
}
