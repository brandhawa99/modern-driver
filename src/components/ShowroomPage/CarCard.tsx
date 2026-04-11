
import type { Car } from "@/data/cars";
import { Card, CardAction } from "../ui/card";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { HeartIcon } from "@phosphor-icons/react";
import { useGarageStore } from "@/store/garageStore";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function CarCard({ car }: { car: Car }) {
  const {
    id,
    make,
    model,
    year,
    mileage,
    price,
    location,
    image,
    countryCode,
  } = car;
  const navigate = useNavigate();

  const garageIds = useGarageStore((state) => state.garageIds)
  const { addCar, removeCar } = useGarageStore();
  const isInGarage = garageIds[car?.id]
  function AddToGarage(carID: string): void {
    addCar(carID);
    toast("Car Added To Your Garage!", {
      action: {
        label: "View",
        onClick: () => { navigate({ to: "/garage" }) }
      }
    })

  }

  function RemoveFromGarage(carID: string): void {
    removeCar(carID)
    toast("Car Remove From Garage :(")
  }


  return (
    <Card className="p-0 overflow-hidden">
      <Link to={"/showroom/$carId"} params={{ carId: id }} className="block">
        <img
          src={image}
          alt={model}
          className="w-full aspect-4/3 object-cover transition-transform duration-300 hover:scale-[1.02]"
        />

        <div className="p-4 space-y-1.5 flex flex-col">
          <h3 className="text-lg font-semibold leading-tight">
            {make} {model}
          </h3>

          <p className="text-sm text-muted-foreground leading-tight">
            {year} • {mileage.toLocaleString()} miles
          </p>

          <div className="text-sm flex items-center gap-2 leading-tight">
            <img
              src={`https://flagsapi.com/${countryCode}/flat/24.png`}
              className="w-4 h-4 object-cover"
            />
            <span className="text-muted-foreground">{location}</span>
          </div>
        </div>
      </Link>

      <CardAction className="w-full px-4 pb-4 pt-2 flex items-end justify-between border-t border-border/50">
        <div className="space-y-0.5">
          <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
            Price
          </p>
          <p className="text-lg font-semibold leading-tight">
            USD ${price.toLocaleString()}
          </p>
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "cursor-pointer rounded-full h-9 w-9 p-0 transition-all duration-200 active:scale-75",
                isInGarage
                  ? "bg-pink-200 hover:bg-pink-300 dark:bg-pink-200/30 dark:hover:bg-pink-200/60"
                  : "hover:bg-pink-100 dark:hover:bg-pink-950/40"
              )}
              onClick={
                isInGarage
                  ? () => RemoveFromGarage(id)
                  : () => AddToGarage(id)
              }
            >
              <HeartIcon
                className={cn("transition-transform duration-200", isInGarage && "scale-110")}
                color="red"
                weight={isInGarage ? "fill" : "regular"}
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isInGarage ? "Remove from garage" : "Add to garage"}</p>
          </TooltipContent>
        </Tooltip>
      </CardAction>
    </Card>
  );
}