import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/",
  }),
  tagTypes: ["AllCoinsResult", "FETCH_ERROR", "UNKNOWN_ERROR"],
  endpoints: (builder) => ({
    global: builder.query<any, void>({
      query: () => "global",
    }),
    coin: builder.query({
      query: ({ coinId, date }: { coinId: string; date: string }) =>
        `coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false${date}`,
    }),
    allCoins: builder.query({
      query: ({
        currency,
        page,
      }: {
        currency: string;
        page: any;
      }) => {
        const url = `coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=200&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;
        return url;
      },
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
