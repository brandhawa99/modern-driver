import { cars } from '@/data/cars'

export const fetchCars = () => {
  return new Promise((res) => setTimeout(() => res(cars), 300))
}

export const fetchCarById = (id: string) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const car = cars.find((c) => c.id == id)
      car ? res(car) : rej(new Error('Not Found'))
    }, 300)
  })
}
