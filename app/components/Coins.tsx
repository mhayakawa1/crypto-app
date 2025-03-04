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
import { useState } from "react";
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
  const [compareData, setCompareData] = useState(false);

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
    <>
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
          </ChartContainer>
          <ChartContainer>
            <ChartUl>
              <ChartLi className="name">Volume 24h</ChartLi>
              <ChartLi className="value">{`$${807.243} bln`}</ChartLi>
              <ChartLi className="date">September 29, 2023</ChartLi>
            </ChartUl>
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
    </>
  );
};
export default Coins;
