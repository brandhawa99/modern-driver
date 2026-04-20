import { isPlainArray, Link, useNavigate } from "@tanstack/react-router"
import { Card, CardAction } from "../ui/card"
import { cn } from "@/lib/utils"
import { ClockCountdownIcon, HeartIcon, TimerIcon } from "@phosphor-icons/react"
import { Button } from "../ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip"
import { useGarageStore } from "@/store/garageStore"
import type { Car } from "@/data/cars"
import { toast } from "sonner"
import { CountdownTimer } from "../CountdownTimer"
import HeartButton from "./HeartButton"

const DisplayCard = ({ car }: { car: Car }) => {
  const {
    id,
    make,
    model,
    year,
    mileage,
    price,
    location,
    transmission,
    image,
    countryCode,
    isAuction,
    condition,
    engine,
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
      <div className="relative group">
        <Link to={"/showroom/$carId"} params={{ carId: id }} className="block">
          <div className="relative group ">
            <img
              src={image}
              alt={model}
              fetchPriority="high"
              className="w-full aspect-4/3 object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
            {
              isAuction &&
              <div className="absolute right-1 bottom-1 bg-background p-1 px-2 w-38 rounded-2xl text-default z-10 flex justify-center items-center gap-1">
                <ClockCountdownIcon />
                <CountdownTimer endTime={car.endTime + ""} />
              </div>
            }
          </div>

          <div className="px-4 pt-4 space-y-1.5 flex flex-col">
            <CarHeader year={year} make={make} model={model} />
            <CountrySection location={location} countryCode={countryCode} />
            <p className="text-sm text-muted-foreground leading-tight capitalize">
              {/* add ability to change units */}
              {mileage.toLocaleString()} miles • {engine.displacement} {engine.aspiration} {engine.type} Engine  • {engine.horsepower}HP • Condition: {condition}
            </p>
          </div>
        </Link>
        <div className={cn("absolute top-2 right-2 hidden group-hover:flex", isInGarage && "flex")} onClick={e => e.stopPropagation()}>
          <HeartButton isInGarage={isInGarage} RemoveFromGarage={RemoveFromGarage} AddToGarage={AddToGarage} carId={id} />
        </div>
      </div>

      <CardAction className="w-full px-4 pb-4 pt-2 flex items-end justify-between border-t border-border/50">
        <div className="space-y-0.5">
          <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
            Price
          </p>
          <p className="text-lg font-semibold leading-tight">
            USD ${price.toLocaleString()}
          </p>
        </div>
      </CardAction>
    </Card >
  )
}

type CarHeaderProps = Pick<Car, "year" | "make" | "model">

const CarHeader = ({ year, make, model }: CarHeaderProps) => {
  return (
    <h3 className="text-lg font-semibold leading-tight">
      {year} {make} {model}
    </h3>
  )
}

type CountrySectionProps = Pick<Car, "countryCode" | "location">
const CountrySection = ({ location, countryCode }: CountrySectionProps) => {
  return (
    <div className="text-sm flex items-center gap-2 leading-tight">
      <img
        src={`https://flagsapi.com/${countryCode}/flat/24.png`}
        className="w-4 h-4 object-cover"
      />
      <span className="text-muted-foreground">{location}</span>
    </div>
  )
}

export default DisplayCard