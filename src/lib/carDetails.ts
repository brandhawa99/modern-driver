import type { Car } from "@/data/cars";
import { formatPrice } from "./utils";

const conditionLabel: Record<Car["condition"], string> = {
  "like-new": "Like New",
  used: "Used",
  restored: "Restored",
};

function formatMileage(n: number) {
  return new Intl.NumberFormat("en-GB").format(n);
}

export function getCarTags(car: Car): string[] {
  return [
    conditionLabel[car.condition],
    car.isAuction && "Auction",
    car.isFeatured && "Featured",
  ].filter(Boolean) as string[];
}

export function getCarSpecs(car: Car): [string, string][] {
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

  if (car.isAuction) {
    specs.push(["Reserve Price", formatPrice(car.reservePrice!)]);
  }

  return specs;
}
