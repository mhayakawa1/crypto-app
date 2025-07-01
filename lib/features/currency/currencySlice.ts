import { createAction, createReducer } from "@reduxjs/toolkit";

export const switchCurrency = createAction<any>("currency/switch");

const currenciesData = [
  { currency: "usd", symbol: "$" },
  { currency: "gbp", symbol: "£" },
  { currency: "eur", symbol: "€" },
  { currency: "btc", symbol: "BTC" },
  { currency: "eth", symbol: "ETH" },
];

export const currencyReducer = createReducer({currency: "usd", symbol: '$'}, (builder) => {
  builder.addCase(switchCurrency, (state: any, action: any) => {
    const newCurrency = action.payload;
    const currencyData = currenciesData.find((data:any) => data.currency === newCurrency)
    return currencyData;
  });
});

export default currencyReducer;
