
import type { Car } from "@/data/cars";
import { Card, CardAction } from "../ui/card";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

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

  return (
    <Card className="p-0 overflow-hidden">
      <Link to={"/showroom/$carId"} params={{ carId: id }} className="block" >
        < img src={image} alt={model} className="w-full aspect-4/3  object-cover transition-transform duration-300 hover:scale-102" />
        <div className="p-4 space-y-2 flex flex-col items-center">
          <h3 className="text-xl font-semibold overflow-clip">{make} {model}</h3>
          <p className="text-sm text-muted-foreground">{year} • {mileage.toLocaleString()} miles </p>
          <p className="text-sm flex items-center gap-2">
            <img src={`https://flagsapi.com/${countryCode}/flat/24.png`} />
            {location}
          </p>
          {/* add unit conversion */}
        </div>
      </Link >
      <CardAction className="w-full px-8 pb-4 flex justify-between ">
        <p className="text-lg font-bold">USD ${price.toLocaleString()}</p>
        <Button
          variant="default"
          className="cursor-pointer"
        >
          Action Button
        </Button>
      </CardAction>
    </Card >
  );
}