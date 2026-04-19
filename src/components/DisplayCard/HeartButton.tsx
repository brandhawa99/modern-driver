import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { HeartIcon } from "@phosphor-icons/react";

interface HeartButtonProps {
  isInGarage: boolean;
  RemoveFromGarage: (id: string) => void;
  AddToGarage: (id: string) => void;
  carId: string;
}

export default function HeartButton({ isInGarage, AddToGarage, RemoveFromGarage, carId }: HeartButtonProps) {

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