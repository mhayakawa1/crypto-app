"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { useAllCoinsQuery } from "@/lib/features/api/apiSlice";
import { formatAllCoins } from "@/lib/format/formatAllCoins";
import ConverterChart from "./ConverterChart";
import ConverterInputs from "./ConverterInputs";
import TimeRangeButtons from "./TimeRangeButtons";

const Converter = (props: { currency: any }) => {
  const { currency } = props;
  const prevFirstPrice = useRef<any>(0);
  const [firstPrice, setFirstPrice] = useState(null);
  const [formattedData, setFormattedData] = useState([]);
  const [amountCoinA, setAmountCoinA] = useState(1);
  const [amountCoinB, setAmountCoinB] = useState(1);
  const [coinA, setCoinA] = useState({ name: "", price: 0, symbol: "" });
  const [coinB, setCoinB] = useState({ name: "", price: 0, symbol: "" });
  const [days, setDays] = useState(1);
  const [intervalDaily, setIntervalDaily] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
  } = useAllCoinsQuery({ currency: currency.currency, page: 1 });

  const updateChart = (range: any) => {
    const { days, intervalDaily } = range;
    setDays(days);
    setIntervalDaily(intervalDaily);
  };

  useEffect(() => {
    if (isError && "error" in error) {
      setErrorMessage(error.error);
    }
    if (isSuccess) {
      const newFormattedData = formatAllCoins(data);
      setFormattedData(newFormattedData);
      prevFirstPrice.current = firstPrice;
      setFirstPrice(data[0].current_price);
      if (firstPrice && firstPrice !== data[0].current_price) {
        updateCoins(newFormattedData, null, true, coinA.name);
        updateCoins(newFormattedData, null, false, coinB.name);
      }
    }
  }, [
    data,
    isSuccess,
    isError,
    error,
    firstPrice,
    coinA.name,
    coinB.name,
  ]);

  return (
    <div>
      <div className="flex flex-col justify-between items-start pb-[4vh]">
        <h2 className="text-[--dark-slate-blue] dark:text-white">
          Online currency converter
        </h2>
        <p className="text-[--dark-slate-blue] opacity-80 dark:opacity-100 dark:text-[#9E9E9E]">
          {formattedDate}
        </p>
      </div>
      {isLoading && (
        <h3 className="text-[--dark-slate-blue] dark:text-white">Loading...</h3>
      )}
      {isSuccess && formattedData.length && (
        <ConverterInputs
          data={formattedData}
          updateCoins={updateCoins}
          convert={convert}
          coinA={coinA}
          coinB={coinB}
          amountCoinA={amountCoinA}
          amountCoinB={amountCoinB}
          currency={currency}
        />
      )}
      {isError && (
        <h3 className="text-[--dark-slate-blue] dark:text-white">
          {errorMessage}
        </h3>
      )}
      <div className="w-full flex justify-between gap-[32px] mt-[4vh] aspect-[1296/293]">
        {isSuccess && coinA.price ? (
          <ConverterChart
            coinA={coinA}
            coinB={coinB}
            days={days}
            intervalDaily={intervalDaily}
            symbol={currency.symbol}
          />
        ) : null}
      </div>
      <TimeRangeButtons updateChart={updateChart} />
    </div>
  );
};
export default Converter;
