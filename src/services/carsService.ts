import { carsData, type Car } from "@/data/cars";

export const fetchCars = (): Promise<Car[]> => {
  return new Promise((res) => setTimeout(() => res(carsData), 300));
};

export const fetchCarById = (id: string): Promise<Car> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const car = carsData.find((c: Car) => c.id == id);
      return car ? res(car) : rej(new Error("Not Found"));
    }, 300);
  });
};
