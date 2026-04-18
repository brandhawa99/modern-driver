import type { Car } from "@/data/cars";
import { ArrowLeftIcon, PlusCircleIcon, TrashIcon } from "@phosphor-icons/react";
import { Link, useCanGoBack, useNavigate, useRouter } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useGarageStore } from "@/store/garageStore";
import { Badge } from "../ui/badge";
import { toast } from "sonner";
import { ImageSection } from "./ImageSection";
import { CarSpecs } from "./CarSpecs";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatPrice(price: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatMileage(n: number) {
  return new Intl.NumberFormat("en-GB").format(n);
}

const conditionLabel: Record<Car["condition"], string> = {
  "like-new": "Like New",
  used: "Used",
  restored: "Restored",
};

function Rule() {
  return <hr className="border-none border-t border-border h-px bg-border" />;
}

interface CarDetailPageProps {
  car: Car;
}

export function CarDetailPage({ car }: CarDetailPageProps) {
  const tags = [
    conditionLabel[car.condition],
    car.isAuction && "Auction",
    car.isFeatured && "Featured",
  ].filter(Boolean) as string[];

  const specs: [string, string][] = [
    ["Make", car.make],
    ["Model", car.model],
    ["Year", String(car.year)],
    ["Category", car.category],
    ["Condition", conditionLabel[car.condition]],
    ["Transmission", car.transmission === "manual" ? "Manual" : "Automatic"],
    ["Mileage", `${formatMileage(car.mileage)} mi`],
    ["Location", `${car.location} · ${car.countryCode}`],
  ];

  // const garageIds = useGarageStore((state) => state.garageIds);

  // const isInGarage = garageIds[carId]; 
  const garageIds = useGarageStore((state) => state.garageIds)
  const { addCar, removeCar } = useGarageStore();
  const isInGarage = garageIds[car?.id]
  const navigate = useNavigate()

  function AddToGarage(carID: string, carMake: string, carModel: string): void {
    addCar(carID)
    toast("Car Added To Your Garage!", {
      description: (<span className="text-foreground">{`${carMake} ${carModel}`}</span>),
      action: {
        label: "View",
        onClick: () => { navigate({ to: "/garage" }) }
      }
    })

  }

  function RemoveFromGarage(carID: string, carMake: string, carModel: string): void {
    removeCar(carID)
    toast("Car Remove From Garage :(", {
      description: (<span className="text-foreground">{`${carMake} ${carModel}`}</span>),
      action: {
        label: "Undo",
        onClick: () => { addCar(carID) }
      }
    })
  }

  const router = useRouter()
  const canGoBack = useCanGoBack()

  return (
    <article className="min-h-screen bg-background text-foreground">
      <ImageSection image={car.image} />
      <div className="max-w-3xl mx-auto px-6 md:px-0 pb-32">
        <header className="pt-14 pb-12">
          <div className="flex flex-wrap gap-2 mb-8 items-center justify-between">
            {canGoBack
              ? (
                <Button variant="link" className="group text-default"
                  onClick={() => router.history.back()}
                >
                  <div className="flex items-center gap-2 justify-center">
                    <ArrowLeftIcon size={32} className="group-hover:-translate-x-1 transition-transform duration-300 " />
                    Go Back
                  </div>
                </Button>
              )
              : (
                <Button variant="link" className="group text-default">
                  <Link to="/showroom" className="flex items-center gap-2 justify-center">
                    <ArrowLeftIcon size={32} className="group-hover:-translate-x-1 transition-transform duration-300 " />
                    Go Back
                  </Link>
                </Button>
              )}
            <div className="flex gap-2">
              {tags.map((t) => <Badge variant="outline" className="p-2" key={t}>{t}</Badge>)}
            </div>
          </div>

          {/* Make + model */}
          <h1 className="font-heading font-light text-4xl md:text-6xl leading-[1.05] tracking-tight text-foreground mb-2">
            {car.make}
          </h1>
          <h2 className="font-heading font-light text-4xl md:text-6xl leading-[1.05] tracking-tight text-muted-foreground">
            {car.model}
          </h2>

          {/* Year + location — set far apart, monospaced feel */}
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
        </header>

        <Rule />

        {/* ── Price + CTA ── */}
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
              variant={isInGarage ? `destructive` : "secondary"}
              className="w-full flex-1 py-3 px-8 uppercase text-sm cursor-pointer font-sans "
              onClick={
                isInGarage
                  ? () => RemoveFromGarage(car.id, car.make, car.model)
                  : () => AddToGarage(car.id, car.make, car.model)
              }
            >
              {isInGarage ? <TrashIcon size={32} /> : <PlusCircleIcon size={32} />}
              <span className="w-22.5">
                {isInGarage ? "Remove" : "Add"} Car
              </span>
            </Button>
          </div>
        </section>

        <Rule />
        <CarSpecs specs={specs} />
        <Rule />
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
