import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { HeartIcon } from "@phosphor-icons/react";
import useGarageActions from "@/hooks/useGarageActions";
import type { Car } from "@/data/cars";
import { useWebHaptics } from "web-haptics/react";

interface HeartButtonProps {
  car: Car;
}

export default function HeartButton({ car }: HeartButtonProps) {
  const { isInGarage, remove, add } = useGarageActions();
  const { trigger } = useWebHaptics();

  const ToggleHeart = (car: Car) => {
    if (isInGarage(car.id)) {
      remove(car);
      trigger([{ duration: 10 }], { intensity: 1 });
    } else {
      add(car);
      trigger([{ duration: 8 }], { intensity: 0.3 });
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "cursor-pointer rounded-full h-9 w-9 p-0 transition-all duration-200 active:scale-75",
            "backdrop-blur-md border border-white/20",
            isInGarage(car.id)
              ? "bg-white/30 hover:bg-white/50"
              : "bg-black/20 hover:bg-black/30",
          )}
          onClick={() => ToggleHeart(car)}
          aria-label="Like Button"
        >
          <HeartIcon
            className={cn(
              "transition-all duration-200 drop-shadow-sm",
              isInGarage(car.id) ? "scale-110" : "scale-100 hover:scale-105",
            )}
            color={isInGarage(car.id) ? "red" : "white"}
            weight={isInGarage(car.id) ? "fill" : "regular"}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isInGarage(car.id) ? "Remove from garage" : "Add to garage"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
