import type { Car } from "@/data/cars";
import { useGarageStore } from "@/store/garageStore";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

function useGarageActions() {
  const garageIds = useGarageStore((state) => state.garageIds);
  const { addCar, removeCar } = useGarageStore();
  const navigate = useNavigate();

  function add(car: Car) {
    addCar(car.id);
    toast("Car Added To Your Garage!", {
      description: <span className="text-foreground">{`${car.make} ${car.model}`}</span>,
      action: {
        label: "View",
        onClick: () => navigate({ to: "/garage" }),
      },
    });
  }

  function remove(car: Car) {
    removeCar(car.id);
    toast("Car Removed From Garage", {
      description: <span className="text-foreground">{`${car.make} ${car.model}`}</span>,
      action: {
        label: "Undo",
        onClick: () => addCar(car.id),
      },
    });
  }

  return {
    isInGarage: (id: string) => !!garageIds[id],
    add,
    remove,
  };
}

export default useGarageActions;