import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { HeartIcon } from "@phosphor-icons/react";
import { useGarageStore } from "@/store/garageStore";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

interface HeartButtonProps {
  isInGarage: boolean;
  carId: string;
}

export default function HeartButton({ isInGarage, carId }: HeartButtonProps) {

  const { addCar, removeCar } = useGarageStore();
  const navigate = useNavigate();
  function AddToGarage(carID: string): void {
    addCar(carID);
    toast("Car Added To Your Garage!", {
      action: {
        label: "View",
        onClick: () => {
          navigate({ to: "/garage" });
        },
      },
    });
  }

  function RemoveFromGarage(carID: string): void {
    removeCar(carID);
    toast("Car Remove From Garage :(");
  }


  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "cursor-pointer rounded-full h-9 w-9 p-0 transition-all duration-200 active:scale-75",
            "backdrop-blur-md border border-white/20",
            isInGarage
              ? "bg-white/30 hover:bg-white/50"
              : "bg-black/20 hover:bg-black/30"
          )}
          onClick={() => isInGarage ? RemoveFromGarage(carId) : AddToGarage(carId)}
        >
          <HeartIcon
            className={cn(
              "transition-all duration-200 drop-shadow-sm",
              isInGarage ? "scale-110" : "scale-100 hover:scale-105"
            )}
            color={isInGarage ? "red" : "white"}
            weight={isInGarage ? "fill" : "regular"}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isInGarage ? "Remove from garage" : "Add to garage"}</p>
      </TooltipContent>
    </Tooltip>


  )

}