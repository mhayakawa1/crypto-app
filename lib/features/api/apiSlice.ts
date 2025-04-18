import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const currency = localStorage.getItem("currency") || "usd";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/",
  }),
  endpoints: (builder) => ({
    global: builder.query<any, void>({
      query: () => "global",
    }),
    coin: builder.query({
      query: ({ coinId, date }: { coinId: string; date: string }) =>
        `coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false${date}`,
    }),
    allCoins: builder.query<[], void>({
      query: () =>
        `coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`,
    }),
    compareCoins: builder.query({
      query: ({
        coin,
        vsCurrency,
        days,
        intervalDaily,
      }: {
        coin: string;
        vsCurrency: string;
        days: number;
        intervalDaily: boolean;
      }) =>
        `coins/${coin}/market_chart?vs_currency=${vsCurrency}&days=${days}${
          intervalDaily && "&interval=daily"
        }`,
    }),
  }),
});

export const {
  useGlobalQuery,
  useCoinQuery,
  useAllCoinsQuery,
  useCompareCoinsQuery,
} = apiSlice;
