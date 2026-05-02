import type { Car } from "@/data/cars";
import { useCountUp } from "@/hooks/useCountup";
import { cn, generateRandomChange, type GeneratedValues } from "@/lib/utils";
import { TrendDownIcon, TrendUpIcon } from "@phosphor-icons/react";

export const TrendView = ({ isNeg, percentageChange }: GeneratedValues) => {
  return (
    <div
      className={cn(
        "rounded-4xl flex flex-row items-center gap-2 px-4 py-2 -flex-1 w-fit h-fit font-extrabold opacity-0 animate-fadein",
        isNeg ? "bg-red-400" : "bg-green-500",
      )}
    >
      <div>
        {isNeg ? <TrendDownIcon size={28} /> : <TrendUpIcon size={28} />}
      </div>
      <div>
        {isNeg && "-"}
        {percentageChange}%
      </div>
    </div>
  );
};

export function GarageValuation({ cars }: { cars: Car[] }) {
  const total = cars.reduce((sum, car) => sum + car.price, 0);
  const animated = useCountUp(total, 2000);

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(animated);

  const { isNeg, percentageChange } = generateRandomChange();

  return (
    <div className="py-12">
      <p className="text-xs tracking-widest uppercase text-gold">
        Fleet Valuation
      </p>
      <div className="flex gap-2 items-center">
        <p className="font-cormorant text-5xl font-light mt-1">{formatted}</p>
        <TrendView isNeg={isNeg} percentageChange={percentageChange} />
      </div>
    </div>
  );
}
