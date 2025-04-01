import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/coins/",
  }),
  endpoints: (builder) => ({
    coin: builder.query({
      query: ({ coinId }: { coinId: string }) =>
        `${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`,
    }),
    allCoins: builder.query<[], void>({
      query: () =>
        "markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d",
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
        `${coin}/market_chart?vs_currency=${vsCurrency}&days=${days}${
          intervalDaily && "&interval=daily"
        }`,
    }),
  }),
});

export const { useCoinQuery, useAllCoinsQuery, useCompareCoinsQuery } = apiSlice;
