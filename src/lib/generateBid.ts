import type { Bid } from "@/store/auctionStore";
import { faker } from "@faker-js/faker";

export function generateBid(currentBid: number, carId: string): Bid {
  const increment = Math.floor(Math.random() * 800 + 200);
  return {
    carId: carId,
    id: crypto.randomUUID(),
    bidder: faker.person.fullName(),
    amount: currentBid + increment,
    timestamp: new Date().toISOString(),
  };
}
