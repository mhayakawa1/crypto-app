"use client";
import {
  Button,
  Statistics,
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
        setPriceData(formatData(prices));
        setVolumeData(formatData(total_volumes));
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
      <Statistics>
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
            <AreaChartComponent
              xAxis={false}
              height={"h-[582px]"}
              width={"w-full"}
              data={priceData}
              color={"var(--soft-blue)"}
            />
          </ChartContainer>
          <ChartContainer>
            <ChartUl>
              <ChartLi className="name">Volume 24h</ChartLi>
              <ChartLi className="value">{`$${807.243} bln`}</ChartLi>
              <ChartLi className="date">September 29, 2023</ChartLi>
            </ChartUl>
            <AreaChartComponent
              xAxis={false}
              height={"h-[582px]"}
              width={"w-full"}
              data={volumeData}
              color={"#B374F2"}
            />
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
      </Statistics>
      <TableComponent />
    </div>
  );
};
export default Coins;
