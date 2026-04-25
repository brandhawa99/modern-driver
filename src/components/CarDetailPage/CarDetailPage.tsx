import type { Car } from "@/data/cars";
import { PlusCircleIcon, TrashIcon } from "@phosphor-icons/react";
import { Button } from "../ui/button";
import { ImageSection } from "./ImageSection";
import { CarSpecs } from "./CarSpecs";
import BackButton from "./BackButton";
import AuctionData from "../AuctionPage/AuctionData";
import useGarageActions from "@/hooks/useGarageActions";
import { Badge } from "../ui/badge";
import { getCarSpecs, getCarTags } from "@/lib/carDetails";
import { formatPrice } from "@/lib/utils";
import { Separator } from "../ui/separator";
interface CarDetailPageProps {
  car: Car;
}

export function CarDetailPage({ car }: CarDetailPageProps) {
  const tags = getCarTags(car);
  const specs = getCarSpecs(car);

  const { isInGarage, remove, add } = useGarageActions()

  return (
    <article className="min-h-screen bg-background text-foreground">
      <ImageSection image={car.image} />
      <div className="max-w-3xl mx-auto px-6 md:px-0 pb-32">
        <div className="pt-14 pb-12">
          <div className="flex flex-wrap gap-2 mb-8 items-center justify-between">
            <BackButton />
            <div className="flex gap-2">
              {tags.map((t) => <Badge variant="outline" className="p-2" key={t}>{t}</Badge>)}
            </div>
          </div>
          {car.isAuction && <AuctionData car={car} />}
          <h1 className="font-heading font-light text-4xl md:text-6xl leading-[1.05] tracking-tight text-foreground mb-2">
            {car.make}
          </h1>
          <h2 className="font-heading font-light text-4xl md:text-6xl leading-[1.05] tracking-tight text-muted-foreground">
            {car.model}
          </h2>

          <div className="flex items-center justify-between mt-8">
            <span className="text-md tracking-widest uppercase text-muted-foreground font-sans">
              {car.year}
            </span>
            <span className="text-md tracking-widest uppercase text-muted-foreground font-sans flex flex-row-reverse gap-2 items-center">
              {car.location}
              <span className="text-2xl">·</span>
              <span>
                <img src={`https://flagsapi.com/${car.countryCode}/flat/24.png`} />
              </span>

            </span>
          </div>
        </div>

        <Separator />

        <section className="py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="text-sm tracking-widest uppercase text-muted-foreground font-sans mb-2">
              {car.isAuction ? "Starting Bid" : "Asking Price"}
            </p>
            <p className="font-heading font-light text-5xl md:text-6xl text-foreground">
              {formatPrice(car.price)}
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <Button
              className="w-full flex-1 py-3 px-8 uppercase text-sm cursor-pointer font-sans"
            >
              {car.isAuction ? "Place Bid" : "Enquire"}

            </Button>
            <Button
              variant={isInGarage(car.id) ? `destructive` : "secondary"}
              className="w-full flex-1 py-3 px-8 uppercase text-sm cursor-pointer font-sans "
              onClick={
                isInGarage(car.id)
                  ? () => remove(car)
                  : () => add(car)
              }
            >
              {isInGarage(car.id) ? <TrashIcon size={32} /> : <PlusCircleIcon size={32} />}
              <span className="w-22.5">
                {isInGarage(car.id) ? "Remove" : "Add"} Car
              </span>
            </Button>
          </div>
        </section>

        <Separator />
        <CarSpecs specs={specs} />
        <Separator />
        <div className="pt-10 flex items-center justify-between">
          <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-sans">
            Ref. {car.id.toString().padStart(6, "0")}
          </span>
          <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-sans">
            Modern Driver
          </span>
        </div>
      </div>
      <div>
      </div>
    </article >
  );
}
