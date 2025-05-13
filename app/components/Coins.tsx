"use client";
import { useState } from "react";
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

const Coins = (props: {currency: any}) => {
  const {currency} = props;
  const [compareData, setCompareData] = useState(false);
  const [days, setDays] = useState(1);
  const [intervalDaily, setIntervalDaily] = useState(false);

  let areaChartContent: React.ReactNode;
  let barChartContent: React.ReactNode;
  const loading = <p>Loading...</p>;

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
  if (isLoading) {
    areaChartContent = loading;
    barChartContent = loading;
  } else if (isSuccess) {
    const formattedData = formatCompareCoins(data, days, intervalDaily);
    const { pricesData, volumesData } = formattedData;
    areaChartContent = (
      <AreaChartComponent
        xAxis={true}
        height={"h-[165px]"}
        width={"w-full"}
        data={pricesData}
        color={"var(--soft-blue)"}
        fill={"url(#area-blue)"}
      />
    );
    barChartContent = (
      <BarChartComponent
        xAxis={true}
        height={"h-[165px]"}
        width={"w-full"}
        data={volumesData}
        color={"#B374F2"}
        fill={"url(#area-purple)"}
      />
    );
  } else if (isError) {
    const errorMessage = <p>{error.toString()}</p>;
    areaChartContent = errorMessage;
    areaChartContent = errorMessage;
  }

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

  return (
    <div>
      <div>
        <div className="flex justify-between items-end pb-[4vh]">
          <h2>Select the currency to view statistics</h2>
          <CompareButton />
        </div>
        <CarouselComponent />
        <div className="w-full h-auto flex justify-between gap-[1vw] pt-[120px]">
          <ChartContainer className="h-auto flex justify-between">
            <ul className="text-[#d1d1d1]">
              <li className="text-xl">Bitcoin (BTC)</li>
              <li className="text-[28px]/[24px] text-white pt-[24px] pb-[16px]">{`$${13.431} mln`}</li>
              <li className="text-base">September 29, 2023</li>
            </ul>
            {areaChartContent}
          </ChartContainer>
          <ChartContainer className="h-auto flex flex-col justify-between">
            <ul className="text-[#d1d1d1]">
              <li className="text-xl">Volume 24h</li>
              <li className="text-[28px]/[24px] text-white pt-[24px] pb-[16px]">{`$${807.243} bln`}</li>
              <li className="text-base">September 29, 2023</li>
            </ul>
            {barChartContent}
          </ChartContainer>
        </div>
        <TimeRangeButtons updateChart={updateCharts} />
      </div>
      <TableComponent currency={currency} />
    </div>
  );
};
export default Coins;
