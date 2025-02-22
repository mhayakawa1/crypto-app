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
  Table,
  TableRow,
  TableBody,
  TableHeader,
  TableCell,
  CellContainer,
  ArrowIcon,
  CoinIcon,
} from "./homeStyles";
import { useState } from "react";
import ChartContainer from "./ChartContainer";
import CompareWhite from "../src/icons/Compare_White.svg";
import ArrowDownRed from "../src/icons/Arrow_Down_Red.svg";
import ArrowUpGreen from "../src/icons/Arrow_Up_Green.svg";
import ExitWhite from "../src/icons/Exit_White.svg";

const CoinTableRow = (props: {
  rising: boolean;
  number: number;
  name: string;
  price: number;
  oneHour: number;
  oneDay: number;
  sevenDay: number;
}) => {
  const { rising, number, name, price, oneHour, oneDay, sevenDay } = props;
  const className = rising ? "rising" : "falling";
  const src = rising ? ArrowUpGreen.src : ArrowDownRed.src;

  const PercentCell = (props: { percent: any }) => {
    const { percent } = props;
    return (
      <TableCell>
        <CellContainer className={className}>
          <ArrowIcon src={src} alt="" />
          <span>{percent}%</span>
        </CellContainer>
      </TableCell>
    );
  };

  return (
    <TableRow className="coin">
      <TableCell className="number">{number}</TableCell>
      <TableCell>
        <CellContainer>
          <CoinIcon src="null" alt="" />
          {name}
        </CellContainer>
      </TableCell>
      <TableCell>${price.toLocaleString()}</TableCell>
      <PercentCell percent={oneHour}></PercentCell>
      <PercentCell percent={oneDay}></PercentCell>
      <PercentCell percent={sevenDay}></PercentCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
};

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
      <Table>
        <TableBody>
          <TableRow className="column-names">
            <TableHeader>#</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Price</TableHeader>
            <TableHeader>1h%</TableHeader>
            <TableHeader>24h%</TableHeader>
            <TableHeader>7d%</TableHeader>
            <TableHeader>24h volume / Market Cap</TableHeader>
            <TableHeader>Circulating / Total supply</TableHeader>
            <TableHeader>Last 7d</TableHeader>
          </TableRow>
          <CoinTableRow
            rising={true}
            number={1}
            name="Bitcoin (BTC)"
            price={29850}
            oneHour={2.35}
            oneDay={11.04}
            sevenDay={8.41}
          ></CoinTableRow>
          <CoinTableRow
            rising={false}
            number={2}
            name="Ethereum (ETH)"
            price={10561}
            oneHour={0.24}
            oneDay={10.24}
            sevenDay={5.16}
          ></CoinTableRow>
        </TableBody>
      </Table>
    </>
  );
};
export default Coins;
