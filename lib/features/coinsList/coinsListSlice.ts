import { createAction, createReducer } from "@reduxjs/toolkit";

export const addToCoinsList = createAction<any>("data/addToCoinsList");
export const resetCoinsList = createAction<any>("data/resetCoinsList");

const initialState: any[] = [];

export const coinsListReducer = createReducer(
  initialState,
  (builder) => {
    builder
      .addCase(addToCoinsList, (state: any, action: any) => {
        const data = action.payload;
        return [...state, ...data];
      })
      .addCase(resetCoinsList, (state: any, action: any) => {
        const data = action.payload;
        return [...data];
      })
  }
);

export default coinsListReducer;
