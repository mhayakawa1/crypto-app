"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import AreaChartComponent from "./AreaChartComponent";
import BarChartComponent from "./BarChartComponent";
import CarouselComponent from "./CarouselComponent";
import ChartContainer from "./ChartContainer";
import TableComponent from "./TableComponent";
import TimeRangeButtons from "./TimeRangeButtons";
import CompareWhite from "../../src/icons/Compare_White.svg";
import ExitWhite from "../../src/icons/Exit_White.svg";

const Coins = (props: { coinsData: any }) => {
  const { coinsData } = props;
  const [priceData, setPriceData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [pricesYRange, setPricesYRange] = useState({ min: 0, max: 100 });
  const [volumeYRange, setVolumeYRange] = useState({ min: 0, max: 100 });
  const [compareData, setCompareData] = useState(false);

  const callAPI = (days: number, daily: boolean) => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${days}${
        daily && "&interval=daily"
      }`
    )
      .then((res) => res.json())
      .then((result) => {
        const { prices, total_volumes } = result;
        const formatData = (data: any) => {
          let newData = data.slice(1);
          if (!daily && days !== 365) {
            newData = newData.filter(
              (element: any, index: number) => index % 12 === 0
            );
          }

          return newData.map((element: any, index: number) => {
            return {
              name: index + 1,
              uv: element[1],
            };
          });
        };
        const priceDataFormatted = formatData(prices);
        const volumeDataFormatted = formatData(total_volumes);
        setPriceData(priceDataFormatted);
        setVolumeData(volumeDataFormatted);

        const minMax = (data: any) => {
          const sortedPrices = data
            .map((element: any) => element.uv)
            .sort((x: any, y: any) => x - y);
          const lowest = sortedPrices[0];
          return {
            min: lowest - 0.05 * lowest,
            max: sortedPrices[sortedPrices.length - 1],
          };
        };
        setPricesYRange(minMax(priceDataFormatted));
        setVolumeYRange(minMax(volumeDataFormatted));
      })
      .catch((err) => console.log(err));
  };

  const updateCharts = (element: any) => {
    const { days, interval } = element;
    callAPI(days, interval === "daily");
  };

  useEffect(() => {
    callAPI(1, false);
  }, []);

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
            {priceData.length && (
              <AreaChartComponent
                xAxis={true}
                height={"h-[165px]"}
                width={"w-full"}
                data={priceData}
                yRange={pricesYRange}
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
            {volumeData.length && (
              <BarChartComponent
                xAxis={true}
                height={"h-[165px]"}
                width={"w-full"}
                data={volumeData}
                yRange={volumeYRange}
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
