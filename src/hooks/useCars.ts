import { fetchCarById, fetchCars } from "@/services/carsService";
import { useQuery } from "@tanstack/react-query";

export const useCars = () => {
  return useQuery({ queryKey: ["cars"], queryFn: fetchCars });
};

export const useCar = (id: string) => {
  return useQuery({
    queryKey: ["car", id],
    queryFn: () => fetchCarById(id),
    retry: 1,
  });
};
