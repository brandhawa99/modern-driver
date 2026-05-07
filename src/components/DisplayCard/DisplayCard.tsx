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
              src={`${image}?w=400&auto=format&q=75`}
              alt={model}
              fetchPriority="high"
              className="w-full aspect-4/3 object-cover transition-transform duration-300 hover:scale-[1.02]"
              crossOrigin="anonymous"
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
    <CardAction className="w-full px-4 pb-4 pt-2 border-t border-border/50 flex flex-col gap-4 justify-center">
      {/* Top row: pricing */}
      <div className="flex items-end justify-between">
        <div className="space-y-0.5">
          <p className="text-[10px] tracking-widest text-muted-foreground uppercase">
            {label}
          </p>
          <p className="text-lg font-semibold leading-tight">
            ${primaryValue?.toLocaleString()}
          </p>
        </div>

        {isAuction && (
          <div className="border border-foreground/30 rounded-full px-2 py-0.5">
            <p className="text-foreground/60 text-xs tracking-widest text-center">
              Has Reserve
            </p>
          </div>
        )}
      </div>

      <Link
        className="relative flex w-full items-center justify-between text-sm text-foreground/60 hover:text-foreground border border-foreground/20 hover:border-foreground/40 transition-all duration-300 py-2.5 px-4 rounded-full group"
        to={isAuction ? "/auction/$carId" : "/showroom/$carId"}
        params={{ carId: id }}
      >
        {isAuction ? "Bid Now" : "View Car"}
        <ArrowRightIcon className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-1" />
      </Link>
    </CardAction>
  );
};

type CarHeaderProps = Pick<Car, "year" | "make" | "model">;

const CarHeader = ({ year, make, model }: CarHeaderProps) => {
  return (
    <div className="text-lg font-semibold leading-tight cursor-text select-text">
      {year} {make} {model}
    </div>
  );
};

type CountrySectionProps = Pick<Car, "countryCode" | "location">;
const CountrySection = ({ location, countryCode }: CountrySectionProps) => {
  return (
    <div className="text-sm flex items-center gap-1 leading-tight">
      <img
        src={`https://flagsapi.com/${countryCode}/flat/24.png`}
        className="w-4 h-4 object-cover"
        alt={countryCode}
      />
      <span></span>
      <span className="text-muted-foreground">
        {location}, {countryCodeMap[countryCode]}
      </span>
    </div>
  );
};

export default DisplayCard;
