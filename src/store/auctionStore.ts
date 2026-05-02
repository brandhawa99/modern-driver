import { create } from "zustand";

export interface Bid {
  id: string;
  bidder: string;
  amount: number;
  timestamp: string;
  carId: string;
}

interface AuctionStore {
  bids: Record<string, Bid[]>;
  bidsByCarId: Record<string, number>;
  initAuction: (carId: string, startingBid: number) => void;
  addBid: (bid: Bid) => void;
  placeBid: (carId: string) => void;
}

export const useAuctionStore = create<AuctionStore>((set, get) => ({
  bids: {},
  bidsByCarId: {},

  initAuction: (carId, startingBid) =>
    set((state) => {
      // already initialized for this car — don't overwrite existing state
      if (state.bidsByCarId[carId] !== undefined) return {};

      return {
        bidsByCarId: {
          ...state.bidsByCarId,
          [carId]: startingBid,
        },
        bids: {
          ...state.bids,
          [carId]: [],
        },
      };
    }),

  addBid: (bid) =>
    set((state) => {
      const newAmount = bid.amount;

      return {
        bids: {
          ...state.bids,
          [bid.carId]: [bid, ...(state.bids[bid.carId] ?? [])],
        },
        bidsByCarId: {
          ...state.bidsByCarId,
          [bid.carId]: newAmount,
        },
      };
    }),

  placeBid: (carId) => {
    const { bidsByCarId, addBid } = get();
    const currentBid = bidsByCarId[carId] ?? 0;
    addBid({
      id: crypto.randomUUID(),
      bidder: "You",
      amount: currentBid + 500,
      timestamp: new Date().toISOString(),
      carId,
    });
  },
}));
