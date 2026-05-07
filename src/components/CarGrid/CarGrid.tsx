// components/CarGrid/CarGrid.tsx
import { useState, useMemo } from "react";
import DisplayCard from "@/components/DisplayCard/DisplayCard";
import type { Car } from "@/data/cars";

const priceRanges = [
  { label: "Any Price", min: 0, max: Infinity },
  { label: "Up to $100k", min: 0, max: 100_000 },
  { label: "$100k – $250k", min: 100_000, max: 250_000 },
  { label: "$250k – $500k", min: 250_000, max: 500_000 },
  { label: "$500k – $1m", min: 500_000, max: 1_000_000 },
  { label: "$1m – $2m", min: 1_000_000, max: 2_000_000 },
  { label: "$2m+", min: 2_000_000, max: Infinity },
];

const selectClass =
  "bg-background border border-border rounded px-3 py-2 text-sm text-foreground w-full";

function FilterSelect({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground uppercase tracking-wider">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={selectClass}
      >
        {children}
      </select>
    </div>
  );
}

interface CarGridProps {
  cars: Car[];
  title: (count: number) => string;
}

export function CarGrid({ cars, title }: CarGridProps) {
  const [make, setMake] = useState("All");
  const [category, setCategory] = useState("All");
  const [condition, setCondition] = useState("All");
  const [priceRange, setPriceRange] = useState(0);

  const makes = useMemo(
    () => ["All", ...Array.from(new Set(cars.map((c) => c.make))).sort()],
    [cars],
  );
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(cars.map((c) => c.category))).sort()],
    [cars],
  );

  const filtered = useMemo(() => {
    const { min, max } = priceRanges[priceRange];
    return cars.filter((car) => {
      if (make !== "All" && car.make !== make) return false;
      if (category !== "All" && car.category !== category) return false;
      if (condition !== "All" && car.condition !== condition) return false;
      if (car.price < min || car.price > max) return false;
      return true;
    });
  }, [cars, make, category, condition, priceRange]);

  const isFiltered =
    make !== "All" ||
    category !== "All" ||
    condition !== "All" ||
    priceRange !== 0;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-8xl px-8 md:px-15 lg:px-20 xl:px-40">
        <div className="flex flex-wrap items-end gap-4 py-8">
          <FilterSelect label="Make" value={make} onChange={setMake}>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Category"
            value={category}
            onChange={setCategory}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Condition"
            value={condition}
            onChange={setCondition}
          >
            {["All", "used", "restored", "like-new"].map((c) => (
              <option key={c} value={c}>
                {c === "All"
                  ? "All"
                  : c === "like-new"
                    ? "Like New"
                    : c.charAt(0).toUpperCase() + c.slice(1)}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            label="Price"
            value={String(priceRange)}
            onChange={(v) => setPriceRange(Number(v))}
          >
            {priceRanges.map((r, i) => (
              <option key={i} value={i}>
                {r.label}
              </option>
            ))}
          </FilterSelect>

          {isFiltered && (
            <button
              onClick={() => {
                setMake("All");
                setCategory("All");
                setCondition("All");
                setPriceRange(0);
              }}
              className="pb-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        <h2 className="text-2xl pb-12">{title(filtered.length)}</h2>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground py-20 text-center min-h-[calc(100vh-400px)]">
            No cars match your filters.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {filtered.map((car) => (
              <DisplayCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
