import { carsData, type Car } from "@/data/cars";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CarStore = {
  cars: Car[];
  addCar: (id: string) => void;
  removeCar: (id: string) => void;
};
export const useGarageStore = create<CarStore>()(
  persist(
    (set) => ({
      cars: [],
      addCar: (id: string) => {
        const newCar = carsData.find((c: Car) => c.id === id);
        if (!newCar) return;
        return set((state) => ({ cars: [...state.cars, newCar] }));
        // Alternative using functional update to ensure we get the latest state
      },
      removeCar: (id) => {
        return set((state) => ({
          cars: state.cars.filter((c) => c.id !== id),
        }));
      },
    }),
    {
      name: "garage-storage",
      version: 1,
    },
  ),
);
