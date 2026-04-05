
import type { Car } from "@/data/cars";
import { Card, CardAction, CardFooter } from "../ui/card";
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
    <Link to={"/showroom/$carId"} params={{ carId: id }} >
      <Card className="rounded-3xl p-4">
        < img src={image} alt={model} className="w-full pt-4 aspect-4/3 rounded-3xl object-cover transition-transform duration-300 hover:scale-102" />
        <div className="p-4 space-y-2">
          <h3 className="text-xl font-semibold overflow-clip">{make} {model}</h3>
          <p className="text-sm text-muted-foreground">{year} • {mileage.toLocaleString()} miles </p>
          <p className="text-sm flex items-center gap-2">
            <img src={`https://flagsapi.com/${countryCode}/flat/24.png`} />
            {location}
          </p>
          {/* add unit conversion */}
          <p className="text-lg font-bold">USD ${price.toLocaleString()}</p>
        </div>
      </Card >
    </Link >
  );
}