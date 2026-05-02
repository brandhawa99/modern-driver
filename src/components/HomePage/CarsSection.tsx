import { carsData } from '@/data/cars'
import DisplayCard from '../DisplayCard/DisplayCard'

function CarsSection() {
  return (
    <div className="w-full flex justify-center">
      <article className='flex flex-col justify-center mt-20 max-w-5xl'>
        <h1 className="text-4xl font-bold mb-20">Featured Cars</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10">
          {
            carsData.map((car, index) => {
              if (car.isFeatured && car.isAuction) {
                return (
                  <DisplayCard car={car} key={index} />
                )
              }
            })
          }
        </div>
      </article>
    </div>
  )
}

export default CarsSection