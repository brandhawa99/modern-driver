import { create } from "zustand";

export interface Bid {
  id: string;
  bidder: string;
  amount: number;
  timestamp: string;
  carId: string;
}

interface AuctionStore {
  bids: Bid[];
  currentBid: number;
  carId: string | null;
  reservePrice: number;
  isReserveMet: boolean;
  bidsByCarId: Record<string, number>; // add this
  initAuction: (
    carId: string,
    startingBid: number,
    reservePrice: number,
  ) => void;
  addBid: (bid: Bid) => void;
}

export const useAuctionStore = create<AuctionStore>((set, get) => ({
  bids: [],
  currentBid: 0,
  carId: null,
  reservePrice: 0,
  isReserveMet: false,
  bidsByCarId: {},

  initAuction: (carId, startingBid, reservePrice) =>
    set((state) => {
      if (state.carId == carId) return {};
      return {
        carId,
        currentBid: startingBid,
        reservePrice,
        isReserveMet: startingBid >= reservePrice,
        bids: [],
        bidsByCarId: {
          ...state.bidsByCarId,
          [carId]: startingBid,
        },
      };
    }),

  addBid: (bid) =>
    set((state) => ({
      bids: [bid, ...state.bids],
      currentBid: bid.amount,
      isReserveMet: bid.amount >= state.reservePrice,
      bidsByCarId: {
        ...state.bidsByCarId,
        [bid.carId]: bid.amount, // update the map on every bid
      },
    })),
}));
