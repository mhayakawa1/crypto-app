import { createAction, createReducer } from "@reduxjs/toolkit";

export const updateCoinsList = createAction<any>("data/updateCoinsList");

// interface Percent {
//     value: number;
//     rising: boolean;
// }

// interface CoinData {
//   circulatingSupply: { circulating: number; totalSupply: number };
//   id: string;
//   image: string;
//   lastSevenDays: any;
//   name: string;
//   number: number;
//   percents: [Percent, Percent, Percent];
//   price: number;
//   symbol: string;
//   volumeMarketCap: {
//     marketCap: number;
//     volume: number;
//   }
//   totalVolume: number;
// }

const initialState: any[] = [];

export const coinsListReducer = createReducer(
  initialState,
  (builder) => {
    builder.addCase(updateCoinsList, (state: any, action: any) => {
      const newData = action.payload;
      state = newData;
      return state
    });
  }
);

export default coinsListReducer;
