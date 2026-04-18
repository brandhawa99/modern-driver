import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

export interface GeneratedValues {
  isNeg: boolean;
  percentageChange: string;
}
export const generateRandomChange = (): GeneratedValues => {
  let isNeg = false;
  const dec = Math.random();
  if (dec > 0.5) {
    isNeg = true;
  }

  const percentageChange = (Math.random() * (5 - 1 + 1) + 1).toFixed(2);

  return {
    isNeg,
    percentageChange,
  };
};
