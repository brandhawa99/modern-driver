import { Card } from '#/components/ui/card'
import { useCar } from '@/hooks/useCars'
import { createFileRoute } from '@tanstack/react-router'
import { useSuspenseQuery } from "@tanstack/react-query"

export const Route = createFileRoute('/browse/$carId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { carId } = Route.useParams()
  const { data, error, isFetching } = useCar(carId)
  if (error) {
    return (
      <div>
        HUGE ERROR AHHHH
      </div>
    )
  }
  if (isFetching) {
    return (
      <div>
        loading....
      </div>
    )
  }

  return (
    <main>
      <Card>
        <strong>{carId}</strong>
        <div>{data.make}</div>
      </Card>
      <img src={data.image} />
    </main>
  )
}
