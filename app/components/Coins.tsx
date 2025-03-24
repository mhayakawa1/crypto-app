"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { getCoinsChartData } from "@/lib/features/data/compareCoinsData";
import AreaChartComponent from "./AreaChartComponent";
import BarChartComponent from "./BarChartComponent";
import CarouselComponent from "./CarouselComponent";
import ChartContainer from "./ChartContainer";
import TableComponent from "./TableComponent";
import TimeRangeButtons from "./TimeRangeButtons";
import CompareWhite from "../../src/icons/Compare_White.svg";
import ExitWhite from "../../src/icons/Exit_White.svg";

const Coins = () => {
  const [coinsData, setCoinsData] = useState([]);
  const allCoinsData = useAppSelector((state) => state.allCoinsData);
  const compareCoinsData = useAppSelector((state) => state.compareCoinsData);
  const dispatch = useAppDispatch();
  const [pricesData, setPricesData] = useState([]);
  const [volumesData, setVolumesData] = useState([]);
  const [compareData, setCompareData] = useState(false);

  const updateCharts = (element: any) => {
    const { days, intervalDaily } = element;
    dispatch(
      getCoinsChartData({
        includesVolumes: true,
        coin: "bitcoin",
        vsCurrency: "usd",
        days: days,
        intervalDaily: intervalDaily,
      })
    );
  };

  useEffect(() => {
    dispatch(
      getCoinsChartData({
        includesVolumes: true,
        coin: "bitcoin",
        vsCurrency: "usd",
        days: 2,
        intervalDaily: false,
      })
    );
    if (compareCoinsData.length) {
      const { pricesData, volumesData } = compareCoinsData[0] || {
        pricesData: [],
        volumesData: [],
      };
      setPricesData(pricesData);
      setVolumesData(volumesData);
      setCoinsData(allCoinsData);
    }
  }, [compareCoinsData, allCoinsData, dispatch]);

  const toggleCompare = () => {
    setCompareData((current) => !current);
  };

  const CompareButton = () => {
    const buttonInfo = [
      { src: CompareWhite, text: "Compare" },
      { src: ExitWhite, text: "Exit Comparison" },
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
        {coinsData.length ? <CarouselComponent coinsData={coinsData} /> : null}
        <div className="w-full h-auto flex justify-between gap-[1vw] pt-[120px]">
          <ChartContainer className="h-auto flex justify-between">
            <ul className="text-[#d1d1d1]">
              <li className="text-xl">Bitcoin (BTC)</li>
              <li className="text-[28px]/[24px] text-white pt-[24px] pb-[16px]">{`$${13.431} mln`}</li>
              <li className="text-base">September 29, 2023</li>
            </ul>
            {pricesData.length && (
              <AreaChartComponent
                xAxis={true}
                height={"h-[165px]"}
                width={"w-full"}
                data={pricesData}
                color={"var(--soft-blue)"}
                fill={"url(#area-blue)"}
              />
            )}
          </ChartContainer>
          <ChartContainer className="h-auto flex flex-col justify-between">
            <ul className="text-[#d1d1d1]">
              <li className="text-xl">Volume 24h</li>
              <li className="text-[28px]/[24px] text-white pt-[24px] pb-[16px]">{`$${807.243} bln`}</li>
              <li className="text-base">September 29, 2023</li>
            </ul>
            {volumesData.length && (
              <BarChartComponent
                xAxis={true}
                height={"h-[165px]"}
                width={"w-full"}
                data={volumesData}
                color={"#B374F2"}
                fill={"url(#area-purple)"}
              />
            )}
          </ChartContainer>
        </div>
        <TimeRangeButtons updateChart={updateCharts} />
      </div>
      <TableComponent />
    </div>
  );
};
export default Coins;
