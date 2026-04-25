import type { Car } from "@/data/cars";
import { generateBid } from "@/lib/generateBid";
import { useAuctionStore } from "@/store/auctionStore";
import { useEffect } from "react";

export const useAuctionBidLoop = (car: Car | undefined) => {
  const initAuction = useAuctionStore((state) => state.initAuction);

  useEffect(() => {
    if (!car) return;

    initAuction(car.id, car.currentBid!, car.reservePrice!);

    const scheduleBid = () => {
      const delay = Math.random() * 15500 + 6000;
      const timeout = setTimeout(() => {
        const { isReserveMet, currentBid, addBid } = useAuctionStore.getState();
        if (isReserveMet) return;
        addBid(generateBid(currentBid, car.id));
        scheduleBid();
      }, delay);
      return timeout;
    };
    const timeout = scheduleBid();
    return () => clearTimeout(timeout);
  }, [car?.id]);
};
