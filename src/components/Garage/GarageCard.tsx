import type { Car } from "@/data/cars"
import { Link } from "@tanstack/react-router"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { HeartIcon } from "@phosphor-icons/react"
import { useGarageStore } from "@/store/garageStore"

const GarageCard = ({ car }: { car: Car }) => {
  const { image, model, year, make, price, id, condition } = car
  const { removeCar } = useGarageStore()

  return (
    <Card className="p-0 overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={model}
          className="w-full aspect-4/3 object-cover transition-transform duration-300 hover:scale-[1.02]" />
        <div className="absolute top-4 left-4 px-3 py-1 text-xs tracking-widest uppercase rounded-full bg-black/70 text-white backdrop-blur">
          {condition}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="
                  absolute top-4 right-4 cursor-pointer rounded-full h-9 w-9 p-0 transition-all duration-200 active:scale-75 bg-pink-200 hover:bg-pink-300 dark:bg-pink-200/30 dark:hover:bg-pink-200/60"
              onClick={() => removeCar(id)}
            >
              <HeartIcon
                className="transition-transform duration-200 scale-110"
                color="red"
                weight={"fill"} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remove from garage</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
              {year} {make}
            </p>
            <h3 className="text-2xl font-semibold leading-tight tracking-tight">
              {model}
            </h3>
          </div>
          <div className="text-right space-y-1">
            <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
              Market Value
            </p>
            <p className="text-lg font-semibold text-primary">
              ${price.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="border-t border-border/50" />
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
              Engine
            </p>
            <p className="font-medium">7.0L V8 Cobra Jet</p>
          </div>
          <div>
            <p className="text-[11px] tracking-widest text-muted-foreground uppercase">
              Status
            </p>
            <p className="font-medium">Concours Gold</p>
          </div>
        </div>
      </div>
      <div className="p-5 pt-0">
        <Button
          variant="outline"
          className="w-full tracking-widest uppercase text-xs py-5"
        >
          <Link to="/showroom/$carId" params={{ carId: id }} >
            View Details
          </Link>
        </Button>
      </div>
    </Card >
  )

}
export default GarageCard