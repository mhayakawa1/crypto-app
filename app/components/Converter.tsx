"use client";
import { useState, useCallback } from "react";
import { useAllCoinsQuery } from "@/lib/features/api/apiSlice";
import { formatAllCoins } from "@/lib/format/formatAllCoins";
import { useAppSelector } from "@/lib/hooks";
import ConverterChart from "./ConverterChart";
import ConverterInputs from "./ConverterInputs";
import TimeRangeButtons from "./TimeRangeButtons";

const Converter = () => {
  const { currency } = useAppSelector((state) => state.currency);
  const [amountCoinA, setAmountCoinA] = useState(1);
  const [amountCoinB, setAmountCoinB] = useState(1);
  const [coinA, setCoinA] = useState({ name: "", price: 0, symbol: "" });
  const [coinB, setCoinB] = useState({ name: "", price: 0, symbol: "" });
  const [days, setDays] = useState(1);
  const [intervalDaily, setIntervalDaily] = useState(false);

  const today = new Date();
  const formattedDate = `${today.toLocaleDateString(
    "en-US"
  )} ${today.toLocaleTimeString("en-US")}`;

  const convert = useCallback(
    (priceA: any, priceB: any) => {
      setAmountCoinB((priceA * amountCoinA) / priceB);
    },
    [amountCoinA]
  );

  const updateCoins = (data: any, amount: any, isCoinA: any, coinName: any) => {
    if (amount) {
      setAmountCoinA(amount);
    }
    if (coinName) {
      const newCoinData = data.find(
        (element: any) => element.name === coinName
      );
      if (isCoinA) {
        setCoinA(newCoinData);
      } else {
        setCoinB(newCoinData);
      }
    }
  };

  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useAllCoinsQuery({ currency: currency, page: 1 });

  const updateChart = (range: any) => {
    const { days, intervalDaily } = range;
    setDays(days);
    setIntervalDaily(intervalDaily);
  };

  return (
    <div>
      <div className="flex flex-col justify-between items-start pb-[4vh]">
        <h2 className="text-[--dark-slate-blue] dark:text-white">
          Online currency converter
        </h2>
        <p className="text-[--dark-slate-blue] opacity-80 dark:opacity-100 dark:text-[#9E9E9E]">{formattedDate}</p>
      </div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && (
        <ConverterInputs
          data={formatAllCoins(data)}
          updateCoins={updateCoins}
          convert={convert}
          coinA={coinA}
          coinB={coinB}
          amountCoinA={amountCoinA}
          amountCoinB={amountCoinB}
        />
      )}
      {isError && <p>{error.toString()}</p>}
      <div className="w-full flex justify-between gap-[32px] aspect-[1296/293]">
        {coinA.price ? (
          <ConverterChart
            coinA={coinA}
            coinB={coinB}
            days={days}
            intervalDaily={intervalDaily}
          />
        ) : null}
      </div>
      <TimeRangeButtons updateChart={updateChart} />
    </div>
  );
};
export default Converter;
