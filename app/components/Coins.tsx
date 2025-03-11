"use client";
import {
  Button,
  CompareIcon,
  TopPanel,
  Slider,
  Charts,
  ChartUl,
  ChartLi,
  TimeRanges,
} from "../homeStyles";
import { useState, useEffect } from "react";
import AreaChartComponent from "./AreaChartComponent";
import BarChartComponent from "./BarChartComponent";
import ChartContainer from "../ChartContainer";
import TableComponent from "./TableComponent";
import CompareWhite from "../../src/icons/Compare_White.svg";
import ExitWhite from "../../src/icons/Exit_White.svg";

const Coins = () => {
  const [timeRanges, setTimeRanges] = useState([
    { time: "1D", active: true },
    { time: "7D", active: false },
    { time: "14D", active: false },
    { time: "1M", active: false },
    { time: "1Y", active: false },
    { time: "5Y", active: false },
  ]);
  const [priceData, setPriceData] = useState([]);
  const [volumeData, setVolumeData] = useState([]);
  const [pricesYRange, setPricesYRange] = useState({ min: 0, max: 100 });
  const [volumeYRange, setVolumeYRange] = useState({ min: 0, max: 100 });
  const [compareData, setCompareData] = useState(false);

  const callAPI = () => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1`
    )
      .then((res) => res.json())
      .then((result) => {
        const { prices, total_volumes } = result;
        const formatData = (data: any) => {
          return data
            .map((element: any, index: number) => {
              return {
                name: index + 3,
                uv: element[1],
              };
            })
            .filter((element: any) => element.name % 12 === 0);
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

  useEffect(() => {
    callAPI();
  }, []);

  const toggleTimeButton = (time: string) => {
    const newTimeRanges = [...timeRanges];
    newTimeRanges.map((element) => {
      if (element.time === time) {
        element.active = true;
      } else {
        element.active = false;
      }
      return element;
    });
    setTimeRanges(newTimeRanges);
  };

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
      <Button onClick={toggleCompare} className="inactive compare">
        <CompareIcon src={buttonInfo[index].src.src} alt=""></CompareIcon>
        {buttonInfo[index].text}
      </Button>
    );
  };

  return (
    <div>
      <div>
        <TopPanel>
          <h2>Select the currency to view statistics</h2>
          <CompareButton />
        </TopPanel>
        <Slider>
          <Button className="active slider-button">Bitcoin</Button>
          <Button className="inactive slider-button">Ethereum</Button>
          <Button className="inactive slider-button">Tether</Button>
          <Button className="inactive slider-button">Doge Coin</Button>
          <Button className="inactive slider-button">Binance Coin</Button>
        </Slider>
        <Charts>
          <ChartContainer>
            <ChartUl>
              <ChartLi className="name">Bitcoin (BTC)</ChartLi>
              <ChartLi className="value">{`$${13.431} mln`}</ChartLi>
              <ChartLi className="date">September 29, 2023</ChartLi>
            </ChartUl>
            {priceData.length && (
              <AreaChartComponent
                xAxis={false}
                height={"h-[193px]"}
                width={"w-full"}
                data={priceData}
                yRange={pricesYRange}
                color={"var(--soft-blue)"}
                fill={"url(#area-blue)"}
              />
            )}
          </ChartContainer>
          <ChartContainer>
            <ChartUl>
              <ChartLi className="name">Volume 24h</ChartLi>
              <ChartLi className="value">{`$${807.243} bln`}</ChartLi>
              <ChartLi className="date">September 29, 2023</ChartLi>
            </ChartUl>
            {volumeData.length && (
              <BarChartComponent
                xAxis={false}
                height={"h-[193px]"}
                width={"w-full"}
                data={volumeData}
                yRange={volumeYRange}
                color={"#B374F2"}
                fill={"url(#area-purple)"}
              />
            )}
          </ChartContainer>
        </Charts>
        <TimeRanges>
          {timeRanges.map((element, index) => (
            <Button
              key={index}
              onClick={() => toggleTimeButton(element.time)}
              className={`${
                element.active ? "active" : "inactive"
              } time-range-button`}
            >
              {element.time}
            </Button>
          ))}
        </TimeRanges>
      </div>
      <TableComponent />
    </div>
  );
};
export default Coins;
