import type { Car } from "@/data/cars";
import { ArrowLeftIcon, PlusCircleIcon } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { useGarageStore } from "@/store/garageStore";

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

// ─── Sub-components ───────────────────────────────────────────────────────────

/** A single horizontal rule separating sections */
function Rule() {
  return <hr className="border-none border-t border-border h-px bg-border" />;
}

/** Key / value row in the spec table */
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-4 border-b border-border last:border-0">
      <span className="text-xs tracking-widest uppercase text-muted-foreground font-sans">
        {label}
      </span>
      <span className="font-heading text-base text-foreground">{value}</span>
    </div>
  );
}

/** Thin badge — condition / auction / featured */
function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center border border-border px-2.5 py-0.5 text-[10px] tracking-widest uppercase text-muted-foreground font-sans">
      {children}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
interface CarDetailPageProps {
  car?: Car;
}

export function CarDetailPage({ car }: CarDetailPageProps) {
  const garage = useGarageStore((state) => state.cars);
  const addCar = (id: string) => {

  }
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

  return (
    <article className="min-h-screen bg-background text-foreground">

      <section className="relative w-full h-[60vh] overflow-hidden mt-10 ">
        {/* Blurred background */}
        <img
          src={car.image}
          className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60 "
        />

        {/* Foreground */}
        <div className="relative z-10 mx-auto max-w-5xl h-full flex items-center">
          <img
            src={car.image}
            className="w-full h-auto max-h-full object-contain"
          />
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-6 md:px-0 pb-32">

        {/* ── Identity block ── */}
        <header className="pt-14 pb-12">

          {/* Tags row */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button variant="default" className="group">
              <Link to="/showroom" className="flex items-center gap-2 justify-center">
                <ArrowLeftIcon size={32} className="group-hover:-translate-x-1 transition-transform duration-300 " />
                Go Back
              </Link>
            </Button>
            {tags.map((t) => <Tag key={t}>{t}</Tag>)}
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
              className="w-full flex-1 py-3 px-8 uppercase text-sm cursor-pointer font-sans tracking-widest"
            >
              {car.isAuction ? "Place Bid" : "Enquire"}
            </Button>
            <Button
              variant="secondary"
              className="w-full flex-1 py-3 px-8 uppercase text-sm cursor-pointer font-sans tracking-widest"
            >
              <PlusCircleIcon size={32} />
              Save
            </Button>
          </div>
        </section>

        <Rule />

        {/* ── Spec table ── */}
        <section className="py-12">
          <h3 className=" tracking-widest uppercase text-muted-foreground font-sans mb-6">
            Specification
          </h3>
          <div>
            {specs.map(([label, value]) => (
              <SpecRow key={label} label={label} value={value} />
            ))}
          </div>
        </section>

        <Rule />

        {/* ── Fine print / reference ── */}
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
