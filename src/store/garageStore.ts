import { create } from "zustand";
import { persist } from "zustand/middleware";

type CarStore = {
  garageIds: Record<string, boolean>;
  addCar: (id: string) => void;
  removeCar: (id: string) => void;
};
export const useGarageStore = create<CarStore>()(
  persist(
    (set) => ({
      garageIds: {},
      addCar: (id: string) =>
        set((state) => ({ garageIds: { ...state.garageIds, [id]: true } })),
      removeCar: (id: string) =>
        set((state) => {
          const { [id]: _, ...rest } = state.garageIds;
          return { garageIds: rest };
        }),
    }),
    {
      name: "garage-storage",
      version: 1,
    },
  ),
);
