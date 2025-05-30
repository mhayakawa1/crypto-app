"use client";
import { formatNumber } from "@/lib/format/formatNumber";
import { useState, useEffect } from "react";

const ChartContainer = (props: {
  children: any;
  className: string;
  dataLength: number;
  symbol: string;
  chartInfo: any;
  isLoading: any;
  isSuccess: any;
  errorMessage: string;
  activeCoins: any;
  compareData: boolean;
}) => {
  const {
    children,
    className,
    dataLength,
    symbol,
    chartInfo,
    errorMessage,
    isLoading,
    isSuccess,
    activeCoins,
    compareData,
  } = props;
  const [value, setValue] = useState(0);
  const today = new Date();
  const formattedDate = `${today.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })}`;

  useEffect(() => {
    if (activeCoins) {
      const newValue = chartInfo.isPrice
        ? activeCoins[0].price
        : activeCoins[0].volumeMarketCap.totalVolume;
      setValue(newValue);
    }
  }, [activeCoins, value, symbol, chartInfo]);

  return (
    <div
      className={`flex flex-col justify-between gap-[4vh] grow bg-white dark:bg-[--mirage] text-[--american-blue] dark:text-white px-[2vw] max-md:px-[4vw] py-[24px] lg:2xl:py-[48px] max-sm:pt-[16px] lg:2xl:pt-[32px] max-sm:pb-[4px] lg:2xl:pb-[8px] rounded-[16px] lg:2xl:rounded-[32px] ${className}`}
    >
      {typeof chartInfo === "string" ? (
        <h3 className="lg:2xl:text-2xl">{chartInfo}</h3>
      ) : compareData ? (
        <ul className="text-[--mirage] dark:text-[--light-gray]">
          <li className="text-2xl dark:text-white pt-[24px] lg:2xl:pt-[48px] pb-[16px] lg:2xl:pb-[32px] font-bold">
            {chartInfo.isPrice ? "Price 24h" : "Volume 24h"}
          </li>
          <li className="text-base">{formattedDate}</li>
        </ul>
      ) : (
        <ul className="text-[--mirage] dark:text-[--light-gray] max-sm:flex justify-between">
          <li className="text-xl lg:2xl:text-4xl max-sm:text-base">
            {isSuccess
              ? `${
                  activeCoins[0].name
                } (${activeCoins[0].symbol.toUpperCase()})`
              : ""}
          </li>
          <li className="flex flex-col gap-[16px] lg:2xl:gap-[32px] max-sm:gap-[8px] dark:text-white pt-[24px] lg:2xl:pt-[48px] max-sm:pt-0">
            <span className="text-2xl lg:2xl:text-5xl max-sm:text-xl font-bold">
            {formatNumber(value, symbol)}</span>
            <span className="text-base lg:2xl:text-3xl max-sm:text-xs">{formattedDate}</span>
          </li>
        </ul>
      )}

      {isLoading && <h3>Loading...</h3>}
      {isSuccess && dataLength ? children : errorMessage}
    </div>
  );
};

export default ChartContainer;
