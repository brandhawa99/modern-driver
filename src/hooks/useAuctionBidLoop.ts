import type { Car } from "@/data/cars";
import { generateBid } from "@/lib/generateBid";
import { useAuctionStore } from "@/store/auctionStore";
import { useEffect } from "react";

export const useAuctionBidLoop = (car: Car | undefined) => {
  useEffect(() => {
    if (!car) return;

    useAuctionStore.getState().initAuction(car.id, car.currentBid!);

    const scheduleBid = () => {
      const delay = Math.random() * 15500 + 6000;
      const timeout = setTimeout(() => {
        const { bidsByCarId, addBid } = useAuctionStore.getState();

        const currentBid = bidsByCarId[car.id] ?? 0;
        addBid(generateBid(currentBid, car.id));
        scheduleBid();
      }, delay);
      return timeout;
    };

    const timeout = scheduleBid();
    return () => clearTimeout(timeout);
  }, [car?.id]);
};
