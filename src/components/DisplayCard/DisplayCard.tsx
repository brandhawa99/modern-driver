import { Link } from "@tanstack/react-router";
import { Card, CardAction } from "../ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRightIcon,
  ClockCountdownIcon,
  EngineIcon,
  GaugeIcon,
  MedalIcon,
  SpeedometerIcon,
} from "@phosphor-icons/react";
import type { Car } from "@/data/cars";
import { CountdownTimer } from "./CountdownTimer";
import HeartButton from "./HeartButton";
import { Button } from "../ui/button";
import { useAuctionStore } from "@/store/auctionStore";
import { countryCodeMap } from "@/lib/countryCodeToName";

const DisplayCard = ({ car }: { car: Car }) => {
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
    isAuction,
    condition,
    engine,
    currentBid,
  } = car;

  const topBid = useAuctionStore(
    (state) => state.bidsByCarId[id] ?? currentBid,
  );

  return (
    <Card className="p-0 overflow-hidden h-full flex flex-col justify-between">
      <div className="relative group">
        <Link
          to={isAuction ? "/auction/$carId" : "/showroom/$carId"}
          params={{ carId: id }}
          className="block"
        >
          <div className="relative group ">
            <img
              src={image}
              alt={model}
              fetchPriority="high"
              className="w-full aspect-4/3 object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
            {isAuction && (
              <div className="absolute right-1 bottom-1 bg-background p-1 px-2 w-38 rounded-2xl text-default z-10 flex justify-center items-center gap-1">
                {/* TODO: Fix the moving icon */}
                <ClockCountdownIcon />
                <CountdownTimer endTime={car.endTime + ""} />
              </div>
            )}
          </div>
        </Link>

        <div className="px-4 pt-4 space-y-1.5 flex flex-col">
          <CarHeader year={year} make={make} model={model} />
          <CountrySection location={location} countryCode={countryCode} />
          <p className="text-sm text-muted-foreground leading-tight flex flex-wrap gap-x-3 gap-y-1">
            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <GaugeIcon size={16} />
              {mileage.toLocaleString()} mi
            </span>

            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <EngineIcon size={16} />
              {engine.displacement} {engine.aspiration} {engine.type}
            </span>

            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <SpeedometerIcon size={16} />
              {engine.horsepower} HP
            </span>

            <span className="inline-flex items-center gap-1 whitespace-nowrap">
              <MedalIcon size={16} />
              {condition}
            </span>
          </p>
        </div>
        <div
          className={cn("absolute top-2 right-2 flex")}
          onClick={(e) => e.stopPropagation()}
        >
          <HeartButton car={car} />
        </div>
      </div>
      <ActionSection
        isAuction={isAuction}
        currentBid={topBid}
        price={price}
        id={id}
      />
    </Card>
  );
};

type ActionSectionProps = Pick<Car, "currentBid" | "price" | "id"> & {
  isAuction: boolean;
};

const ActionSection = ({
  isAuction,
  currentBid,
  price,
  id,
}: ActionSectionProps) => {
  const label = isAuction ? "Current Bid" : "Price";
  const primaryValue = isAuction ? currentBid : price;
  return (
    <CardAction className="w-full px-4 pb-4 pt-2 border-t border-border/50 flex flex-col gap-4">
      {/* Top row: pricing */}
      <div className="flex items-end justify-between">
        <div className="space-y-0.5">
          <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
            {label}
          </p>
          <p className="text-lg font-semibold leading-tight">
            USD ${primaryValue?.toLocaleString()}
          </p>
        </div>

        {isAuction && (
          <div className="rounded-2xl space-y-0.5 text-right bg-primary/80 p-2 ">
            <p className=" text-white px-1 text-sm text-center">Has Reserve</p>
          </div>
        )}
      </div>

      {/* Bottom row: full-width CTA */}
      <Button asChild className="w-full group" variant="outline">
        <Link
          className="relative flex w-full items-center justify-between"
          to={isAuction ? "/auction/$carId" : "/showroom/$carId"}
          params={{ carId: id }}
        >
          {isAuction ? "Bid Now" : "View Showroom"}
          <ArrowRightIcon className="absolute right-5 size-4 shrink-0 transition-all duration-200 ease-out group-hover:translate-x-2" />
        </Link>
      </Button>
    </CardAction>
  );
};

type CarHeaderProps = Pick<Car, "year" | "make" | "model">;

const CarHeader = ({ year, make, model }: CarHeaderProps) => {
  return (
    <h3 className="text-lg font-semibold leading-tight cursor-text select-text">
      {year} {make} {model}
    </h3>
  );
};

type CountrySectionProps = Pick<Car, "countryCode" | "location">;
const CountrySection = ({ location, countryCode }: CountrySectionProps) => {
  return (
    <div className="text-sm flex items-center gap-2 leading-tight">
      <img
        src={`https://flagsapi.com/${countryCode}/flat/24.png`}
        className="w-4 h-4 object-cover"
      />
      <span className="text-muted-foreground">
        {location}, {countryCodeMap[countryCode]}
      </span>
    </div>
  );
};

export default DisplayCard;
