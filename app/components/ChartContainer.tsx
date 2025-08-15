"use client";
import { formatNumber } from "@/lib/format/formatNumber";
import { useState, useEffect, useRef, useMemo } from "react";

const ChartContainer = (props: {
  children: any;
  className: string;
  dataLength: number;
  days: number;
  symbol: string;
  chartInfo: any;
  isLoading: any;
  isSuccess: any;
  activeCoins: any;
  compareData: boolean;
  xAxis: boolean;
}) => {
  const {
    children,
    className,
    dataLength,
    days,
    symbol,
    chartInfo,
    isLoading,
    isSuccess,
    activeCoins,
    compareData,
    xAxis,
  } = props;
  const [value, setValue] = useState(0);
  const [xAxisValues, setXAxisValues]: any = useState([]);
  const [formattedDate, setFormattedDate] = useState("");
  const prevDays = useRef<any>(0);
  const prevDataLength = useRef<any>(0);
  const incrementValues = useMemo(
    () => ({
      1: { incrementBy: 1, maxValue: 24 },
      7: { incrementBy: 1, maxValue: 7 },
      14: { incrementBy: 1, maxValue: 14 },
      30: { incrementBy: 2, maxValue: 15 },
      365: { incrementBy: 30, maxValue: 12 },
    }),
    []
  );

  useEffect(() => {
    if (!formattedDate.length) {
      const today = new Date();
      setFormattedDate(
        `${today.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`
      );
    }
    if (activeCoins) {
      const newValue = chartInfo.isPrice
        ? activeCoins[0].price
        : activeCoins[0].volumeMarketCap.totalVolume;
      setValue(newValue);
    }
    if (prevDays.current !== days && prevDataLength.current !== dataLength) {
      const newXAxisValues: any = [];
      if (days === 365) {
        setXAxisValues(Array.from({ length: 12 }, (_, i) => i + 1));
      } else {
        const incrementValue: any = incrementValues[days as keyof object];
        for (let i = 1; i <= dataLength; i += incrementValue.incrementBy) {
          if (newXAxisValues.length < incrementValue.maxValue) {
            newXAxisValues.push(i);
          }
        }
        setXAxisValues(newXAxisValues);
      }
      prevDays.current = days;
      prevDataLength.current = dataLength;
    }
  }, [
    activeCoins,
    chartInfo,
    dataLength,
    days,
    formattedDate.length,
    incrementValues,
    symbol,
    value,
    xAxisValues.length,
  ]);
  return (
    <div
      className={`flex flex-col justify-between bg-white dark:bg-[--mirage] text-[--american-blue] dark:text-white px-[2vw] max-md:px-[4vw] py-[2vh] max-sm:pt-[16px] rounded-[16px] lg:2xl:rounded-[24px] ${className}`}
    >
      {typeof chartInfo === "string" ? (
        <h3 className="lg:2xl:text-xl">{chartInfo}</h3>
      ) : null}
      {compareData ? (
        <ul className="text-[--mirage] dark:text-[--light-gray]">
          <li className="text-2xl lg:2xl:text-4xl dark:text-white lg:2xl:pt-[36px] pb-[16px] lg:2xl:pb-[24px] font-bold">
            {chartInfo.isPrice ? "Price 24h" : "Volume 24h"}
          </li>
          <li className="text-base lg:2xl:text-2xl">{formattedDate}</li>
        </ul>
      ) : (
        <ul className="text-[--mirage] dark:text-[--light-gray] max-sm:flex justify-between">
          {activeCoins ? (
            <li className="text-xl lg:2xl:text-3xl max-sm:text-base">
              {isSuccess
                ? `${
                    activeCoins[0].name
                  } (${activeCoins[0].symbol.toUpperCase()})`
                : "--"}
            </li>
          ) : null}
          <li className="flex flex-col gap-[16px] lg:2xl:gap-[24px] max-sm:gap-[8px] dark:text-white pt-[24px] lg:2xl:pt-[36px] max-sm:pt-0">
            {activeCoins ? (
              <span className="text-2xl lg:2xl:text-4xl max-sm:text-xl font-bold">
                {formatNumber(value, symbol)}
              </span>
            ) : null}
            <span className="bordertext-base lg:2xl:text-2xl max-sm:text-xs">
              {formattedDate.length ? formattedDate : "--"}
            </span>
          </li>
        </ul>
      )}
      {isLoading && (
        <div className="absolute bottom-[2vh] h-[164px] w-[90%] flex justify-center items-center">
          <h3 className="lg:2xl:text-xl text-[--dark-slate-blue] dark:text-white text-center">
            Loading...
          </h3>
        </div>
      )}
      {isSuccess && dataLength ? (
        children
      ) : !isLoading ? (
        <div className="absolute bottom-[2vh] h-[164px] w-[90%] flex items-center justify-center">
          <h3 className="lg:2xl:text-xl text-[--dark-slate-blue] dark:text-white text-center">
            No data.
          </h3>
        </div>
      ) : null}
      {xAxis && xAxisValues.length ? (
        <ul
          className={`${
            activeCoins
              ? "w-[91%] px-[10px]"
              : "w-[95.5%] max-md:w-[91%] max-sm:w-[90%] px-[5px] max-sm:px-[4px]"
          } mx-auto absolute bottom-[2vh] mt-auto mb-0 flex justify-between text-xs lg:2xl:text-lg opacity-75`}
        >
          {xAxisValues.map((value: number) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default ChartContainer;
