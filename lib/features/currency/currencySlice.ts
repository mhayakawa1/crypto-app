import { createAction, createReducer } from "@reduxjs/toolkit";

export const switchCurrency = createAction<string>("currency/switch");

export const currencyReducer = createReducer("usd", (builder) => {
  builder.addCase(switchCurrency, (state: any, action: any) => {
    const newCurrency = action.payload;
    return newCurrency;
  });
});

export default currencyReducer;
