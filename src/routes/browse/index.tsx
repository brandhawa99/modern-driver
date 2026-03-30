
import { Card } from '@/components/ui/card'
import type { Car } from '@/data/cars'
import { useCars } from '@/hooks/useCars'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/browse/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data } = useCars()
  return (
    <main className="page-wrap px-4 py-12">
      {
        (data as Car[] ?? []).map((carData: Car) => (
          <Card key={carData.id}>
            <Link to="/browse/$carId" params={{ carId: carData.id }}>Go to  details </Link>
            {carData.model}
            <img src={carData.image} />
          </Card>
        ))
      }

    </main>
  )
}
