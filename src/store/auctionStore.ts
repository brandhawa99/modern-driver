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
  reserveByCarId: Record<string, number>;
  reserveMetByCarId: Record<string, boolean>;
  initAuction: (
    carId: string,
    startingBid: number,
    reservePrice: number,
  ) => void;
  addBid: (bid: Bid) => void;
  placeBid: (carId: string) => void;
}

export const useAuctionStore = create<AuctionStore>((set, get) => ({
  bids: {},
  bidsByCarId: {},
  reserveByCarId: {},
  reserveMetByCarId: {},

  initAuction: (carId, startingBid, reservePrice) =>
    set((state) => {
      // already initialized for this car — don't overwrite existing state
      if (state.bidsByCarId[carId] !== undefined) return {};

      return {
        bidsByCarId: {
          ...state.bidsByCarId,
          [carId]: startingBid,
        },
        reserveByCarId: {
          ...state.reserveByCarId,
          [carId]: reservePrice,
        },
        reserveMetByCarId: {
          ...state.reserveMetByCarId,
          [carId]: startingBid >= reservePrice,
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
      const reserve = state.reserveByCarId[bid.carId] ?? Infinity;

      return {
        bids: {
          ...state.bids,
          [bid.carId]: [bid, ...(state.bids[bid.carId] ?? [])],
        },
        bidsByCarId: {
          ...state.bidsByCarId,
          [bid.carId]: newAmount,
        },
        reserveMetByCarId: {
          ...state.reserveMetByCarId,
          [bid.carId]: newAmount >= reserve,
        },
      };
    }),

  placeBid: (carId) => {
    const { bidsByCarId, reserveMetByCarId, addBid } = get();
    if (reserveMetByCarId[carId]) return;
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
