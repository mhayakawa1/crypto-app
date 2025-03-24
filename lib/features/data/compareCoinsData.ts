import { createAction, createReducer } from "@reduxjs/toolkit";

interface CompareData {
  includesVolumes: boolean;
  coin: string;
  vsCurrency: string;
  days: number;
  intervalDaily: boolean;
}

export const getCoinsChartData = createAction<CompareData>(
  "data/getCoinsChartData"
);
export const getConverterData = createAction("data/getConverterData");

function getCompareCoinsData(
  includesVolumes: boolean,
  coin: string,
  vsCurrency: string,
  days: number,
  intervalDaily: boolean
) {
  const response = fetch(
    `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${vsCurrency}&days=${days}${
      intervalDaily && "&interval=daily"
    }}`
  )
    .then((res) => res.json())
    .then((result) => {
      const { prices, total_volumes } = result;
      function formatData(data: any) {
        let newData = data.slice(1);
        if (!intervalDaily && days !== 365) {
          newData = newData.filter(
            (element: any, index: number) => index % 12 === 0
          );
        }
        return newData.map((element: any, index: any) => ({
          name: index,
          uv: element[1],
        }));
      }
      const pricesData = formatData(prices);
      const volumesData = formatData(total_volumes);
      if (includesVolumes) {
        return {
          pricesData: pricesData,
          volumesData: volumesData,
        };
      } else {
        return pricesData;
      }
    })
    .catch((err) => console.log(err));
  return response;
}

const coinsChartData = await getCompareCoinsData(
  true,
  "bitcoin",
  "usd",
  1,
  false
);
export const compareCoinsReducer = createReducer(
  [coinsChartData],
  (builder) => {
    builder
      .addCase(getCoinsChartData, () => {
        return coinsChartData;
      })
      .addCase(getConverterData, () => {
        
      });
  }
);

export default compareCoinsReducer;
