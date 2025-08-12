"use client";
import { useState, useCallback, useEffect } from "react";
import { formatAllCoins } from "@/lib/format/formatAllCoins";
import ConverterChart from "./ConverterChart";
import ConverterInputs from "./ConverterInputs";
import TimeRangeButtons from "./TimeRangeButtons";

const Converter = (props: { currency: any; coinsList: any }) => {
  const { currency, coinsList } = props;
  const [formattedData, setFormattedData]: any = useState([]);
  const [amountCoinA, setAmountCoinA] = useState(1);
  const [amountCoinB, setAmountCoinB] = useState(1);
  const [coinA, setCoinA] = useState({
    id: "bitcoin",
    name: "",
    price: 0,
    symbol: "",
  });
  const [coinB, setCoinB] = useState({
    id: "",
    name: "",
    price: 0,
    symbol: "",
  });
  const [days, setDays] = useState(1);
  const [intervalDaily, setIntervalDaily] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");
  const [shouldUpdateCoins, setShouldUpdateCoins] = useState(false);
  const [dataAdded, setDataAdded] = useState(false);

  const convert = useCallback(
    (priceA: any, priceB: any) => {
      setAmountCoinB((priceA * amountCoinA) / priceB);
    },
    [amountCoinA]
  );

  const updateCoins = useCallback(
    (amount: any, isCoinA: any, coinId: any) => {
      if (amount) {
        setAmountCoinA(amount);
      }
      if (coinId) {
        const newCoinData = formattedData.find(
          (element: any) => element.id === coinId
        );
        if (isCoinA) {
          setCoinA(newCoinData);
        } else {
          setCoinB(newCoinData);
        }
        setDataAdded(true);
      }
      setShouldUpdateCoins(false);
    },
    [formattedData]
  );

  const updateChart = (range: any) => {
    const { days, intervalDaily } = range;
    setDays(days);
    setIntervalDaily(intervalDaily);
  };

  useEffect(() => {
    if (coinsList && !formattedData.length) {
      const newFormattedData = formatAllCoins(coinsList);
      setFormattedData(newFormattedData);
      setShouldUpdateCoins(true);
    }
    if (shouldUpdateCoins && formattedData.length) {
      updateCoins(null, true, formattedData[0].id);
      updateCoins(null, false, formattedData[1].id);
    }
    if (!formattedDate.length) {
      const today = new Date();
      setFormattedDate(
        `${today.toLocaleDateString("en-US")} ${today.toLocaleTimeString(
          "en-US"
        )}`
      );
    }
  }, [
    coinsList,
    formattedData,
    formattedData.length,
    formattedDate,
    updateCoins,
    shouldUpdateCoins,
  ]);

  return (
    <div className="pb-[16vh] max-sm:pb-[100px]">
      <div className="flex flex-col justify-between items-start pb-[4vh]">
        <h2 className="text-[--dark-slate-blue] dark:text-white">
          Online currency converter
        </h2>
        <p className="text-[--dark-slate-blue] opacity-80 dark:opacity-100 dark:text-[#9E9E9E]">
          {formattedDate}
        </p>
      </div>
      {dataAdded && (
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
      <div className="w-full flex justify-between gap-[32px] mt-[4vh] aspect-[1296/293]">
        {dataAdded && (
          <ConverterChart
            coinA={coinA}
            coinB={coinB}
            days={days}
            intervalDaily={intervalDaily}
            currency={currency}
          />
        )}
      </div>
      <TimeRangeButtons updateChart={updateChart} />
    </div>
  );
};
export default Converter;
