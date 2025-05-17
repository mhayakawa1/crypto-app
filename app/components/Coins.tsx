"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useCompareCoinsQuery } from "@/lib/features/api/apiSlice";
import { formatCompareCoins } from "@/lib/format/formatCompareCoins";
import AreaChartComponent from "./AreaChartComponent";
import BarChartComponent from "./BarChartComponent";
import CarouselComponent from "./CarouselComponent";
import ChartContainer from "./ChartContainer";
import TableComponent from "./TableComponent";
import TimeRangeButtons from "./TimeRangeButtons";
import CompareWhite from "../../src/icons/Compare_White.svg";
import XWhite from "../../src/icons/X_White.svg";

const Coins = (props: { currency: any }) => {
  const { currency } = props;
  const [compareData, setCompareData] = useState(false);
  const [days, setDays] = useState(1);
  const [intervalDaily, setIntervalDaily] = useState(false);
  const [pricesData, setPricesData]: any[] = useState([]);
  const [volumesData, setVolumesData]: any[] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const loading = (
    <h4 className="text-[--dark-slate-blue] dark:text-white">Loading...</h4>
  );

  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useCompareCoinsQuery({
    coin: "bitcoin",
    vsCurrency: "usd",
    days: days,
    intervalDaily: intervalDaily,
  });

  useEffect(() => {
    if (isSuccess) {
      const formattedData = formatCompareCoins(data, days, intervalDaily);
      const { pricesData, volumesData } = formattedData;
      setPricesData(pricesData);
      setVolumesData(volumesData);
    } else if (isError && "error" in error) {
      setErrorMessage(error.error);
    }
  }, [isError, data, days, error, intervalDaily, isSuccess]);

  const updateCharts = (element: any) => {
    const { days, intervalDaily } = element;
    setDays(days);
    setIntervalDaily(intervalDaily);
  };

  const toggleCompare = () => {
    setCompareData((current) => !current);
  };

  const CompareButton = () => {
    const buttonInfo = [
      { src: CompareWhite, text: "Compare" },
      { src: XWhite, text: "Exit Comparison" },
    ];
    const index = compareData ? 1 : 0;
    return (
      <button
        onClick={toggleCompare}
        className="flex gap-[10px] px-[24px] py-[12px] rounded-[6px] w-fit bg-[--dark-gunmetal]"
      >
        <Image src={buttonInfo[index].src.src} alt="" width={20} height={20} />
        {buttonInfo[index].text}
      </button>
    );
  };

  const updateActiveCoins = (newCoins: any) => {
    console.log(newCoins);
  };

  return (
    <div>
      <div>
        <div className="flex justify-between items-end pb-[4vh]">
          <h2 className="text-[--dark-slate-blue] dark:text-white">
            Select the currency to view statistics
          </h2>
          <CompareButton />
        </div>
        <CarouselComponent updateActiveCoins={updateActiveCoins} />
        <div className="w-full h-auto flex justify-between gap-[1vw] pt-[120px]">
          <ChartContainer className="h-auto flex justify-between">
            <ul className="text-[--mirage] dark:text-[--light-gray]">
              <li className="text-xl">Bitcoin (BTC)</li>
              <li className="text-[28px]/[24px] dark:text-white pt-[24px] pb-[16px] font-bold">{`$${13.431} mln`}</li>
              <li className="text-base">September 29, 2023</li>
            </ul>
            {isLoading && loading}
            {isSuccess && pricesData.length && (
              <AreaChartComponent
                xAxis={true}
                height={"h-[165px]"}
                width={"w-full"}
                data={pricesData}
                color={"var(--soft-blue)"}
                fill={"url(#area-blue)"}
              />
            )}
            {isError && errorMessage}
          </ChartContainer>
          <ChartContainer className="h-auto flex flex-col justify-between">
            <ul className="text-[--mirage] dark:text-[--light-gray]">
              <li className="text-xl">Volume 24h</li>
              <li className="text-[28px]/[24px] dark:text-white pt-[24px] pb-[16px] font-bold">{`$${807.243} bln`}</li>
              <li className="text-base">September 29, 2023</li>
            </ul>
            {isLoading && loading}
            {isSuccess && volumesData.length && (
              <BarChartComponent
                xAxis={true}
                height={"h-[165px]"}
                width={"w-full"}
                data={volumesData}
                color={"#B374F2"}
                fill={"url(#area-purple)"}
              />
            )}
            {isError && errorMessage}
          </ChartContainer>
        </div>
        <TimeRangeButtons updateChart={updateCharts} />
      </div>
      <TableComponent currency={currency} />
    </div>
  );
};
export default Coins;
