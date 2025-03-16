"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import ChartContainer from "../ChartContainer";
import TimeRangeButtons from "./TimeRangeButtons";
import AreaChartComponent from "./AreaChartComponent";
import VerticalSwitchBlue from "../../src/icons/Vertical_Switch_Blue.svg";

const InputContainer = (props: {
  name: string;
  sell: boolean;
  priceData: any;
  coinsData: any;
  amount: number;
  updateData: any;
}) => {
  const { sell, priceData, coinsData, amount, updateData } = props;
  const { name, price, image } = priceData;

  const changeAmount = (event: any) => {
    const {
      target: { value },
    } = event;
    updateData(Number(value), null, null);
  };

  const handleChange = useCallback(
    (event: any) => {
      updateData(null, sell, event);
    },
    [sell, updateData]
  );

  return (
    <div className="bg-[#191932] rounded-[16px] p-[24px] w-[49%] h-auto aspect-[16 / 5]">
      <ul>
        <li className="text-sm/[24px] mb-[40px]">
          You {sell ? "Sell" : "Buy"}
        </li>
        <li>
          <div className="flex justify-between items-start pb-[24px] border-b">
            <Select onValueChange={handleChange} defaultValue={name}>
              <SelectTrigger className="flex items-center gap-[8px] w-fit h-[24px] rounded-[6px] p-0 border-none">
                {typeof image === "string" && (
                  <Image width={24} height={24} src={image} alt="" />
                )}
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-none shadow-[4px 0px 10px 16px] shadow-[#7878fa26] bg-[#191932] text-white">
                {coinsData.map((element: any) => {
                  return (
                    <SelectItem value={element.name} key={element.name}>
                      <span className="text-xl">
                        {element.name} ({element.symbol.toUpperCase()})
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <input
              className="text-2xl bg-transparent text-right outline-none"
              type="number"
              value={amount === 0 ? "" : Number(amount.toFixed(2))}
              onChange={changeAmount}
              disabled={!sell}
            />
          </div>
        </li>
        <li className="m-[8px] text-sm/[24px]">
          1 {name} = {price.toLocaleString()}
        </li>
      </ul>
    </div>
  );
};

const Converter = (props: { coinsData: any }) => {
  const { coinsData } = props;
  const [prices, setPrices] = useState([]);
  const [yRange, setYRange] = useState({ min: 0, max: 100 });
  const [amountCoinA, setAmountCoinA] = useState(1);
  const [amountCoinB, setAmountCoinB] = useState(1);
  const [coinA, setCoinA] = useState(coinsData[0]);
  const [coinB, setCoinB] = useState(coinsData[1]);
  const [days, setDays] = useState(1);

  const today = new Date();
  const formattedDate = `${today.toLocaleDateString(
    "en-US"
  )} ${today.toLocaleTimeString("en-US")}`;

  const convert = useCallback(
    (priceA: any, priceB: any) => {
      setAmountCoinB((priceA * amountCoinA) / priceB);
    },
    [amountCoinA]
  );

  const callAPI = (url: string) => {
    fetch(url)
      .then((res) => res.json())
      .then((result) => {
        const newChartData = result.prices.map((element: any, index: any) => ({
          name: index,
          uv: element[1],
        }));
        const sortedPrices = newChartData
          .map((element: any) => element.uv)
          .sort((x: any, y: any) => x - y);
        const lowest = sortedPrices[0];
        setYRange({
          min: lowest - 0.05 * lowest,
          max: sortedPrices[sortedPrices.length - 1],
        });
        setPrices(newChartData);
      })
      .catch((err) => console.log(err));
  };

  const updateChart = (range: any) => {
    const { days } = range;
    setDays(days);
    callAPI(
      `https://api.coingecko.com/api/v3/coins/${coinA.id}/market_chart?vs_currency=${coinB.symbol}&days=${days}`
    );
  };

  const updateData = (amount: any, isCoinA: any, coinName: any) => {
    if (amount) {
      setAmountCoinA(amount);
    }
    if (coinName) {
      const newCoinData = coinsData.filter(
        (element: any) => element.name === coinName
      )[0];
      let newCoinA = coinA.id;
      let newCoinB = coinB.symbol;
      if (isCoinA) {
        setCoinA(newCoinData);
        newCoinA = newCoinData.id;
      } else {
        setCoinB(newCoinData);
        newCoinB = newCoinData.symbol;
      }
      callAPI(
        `https://api.coingecko.com/api/v3/coins/${newCoinA}/market_chart?vs_currency=${newCoinB}&days=${days}`
      );
    }
  };

  useEffect(() => {
    convert(coinsData[0].price, coinsData[1].price);
    callAPI(
      "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=eth&days=1"
    );
  }, [convert, coinsData]);
  //console.log(prices);
  return (
    <div>
      <div className="flex flex-col justify-between items-start pb-[4vh]">
        <h2>Online currency converter</h2>
        <p className="text-[#9E9E9E]">{formattedDate}</p>
      </div>
      <div className="relative flex justify-between gap-[24px] mb-[72px]">
        <InputContainer
          name="Bitcoin"
          sell={true}
          priceData={coinA}
          coinsData={coinsData}
          amount={amountCoinA}
          updateData={updateData}
        ></InputContainer>
        <InputContainer
          name="Ethereum"
          sell={false}
          priceData={coinB}
          coinsData={coinsData}
          amount={amountCoinB}
          updateData={updateData}
        ></InputContainer>
        <button
          onClick={() => convert(coinA.price, coinB.price)}
          className="absolute flex justify-center items-center w-[48px] h-[48px] rounded-[50%] bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <Image src={VerticalSwitchBlue.src} alt="" width={24} height={24} />
        </button>
      </div>
      <div className="w-full flex justify-between gap-[32px] aspect-[1296/293]">
        <ChartContainer>
          <h3>
            {`${coinA.name} (${coinA.symbol.toUpperCase()}) to ${
              coinB.name
            } (${coinB.symbol.toUpperCase()})`}
          </h3>
          <AreaChartComponent
            xAxis={false}
            height={"h-full"}
            width={"w-full"}
            data={prices}
            yRange={yRange}
            color={"var(--soft-blue"}
            fill={"url(#area-blue)"}
          />
        </ChartContainer>
      </div>
      <TimeRangeButtons updateChart={updateChart} />
    </div>
  );
};
export default Converter;
