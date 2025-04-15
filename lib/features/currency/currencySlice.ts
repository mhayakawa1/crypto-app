import { createAction, createReducer } from "@reduxjs/toolkit";

export const switchCurrency = createAction<string>("currency/switch");

export const currencyReducer = createReducer([{currency: "usd"}], (builder) => {
  builder.addCase(switchCurrency, (state: any, action: any) => {
    const newCurrency = action.payload;
    const newState = state;
    newState.currency = newCurrency;
    return newState;
  });
});

export default currencyReducer;
