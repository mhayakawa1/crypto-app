"use client";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//import { Area, AreaChart, XAxis, YAxis, Line } from "@/components/ui/chart";
import Image from "next/image";
import ChartContainer from "../ChartContainer";
import TimeRangeButtons from "../TimeRangeButtons";
import ArrowDownWhite from "../../src/icons/Arrow_Down_White.svg";
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

  const handleChange = (event: any) => {
    const { target } = event;
    const { value } = target;
    updateData(Number(value));
  };

  return (
    <div className="bg-[#191932] rounded-[16px] p-[24px] w-[49%] h-auto aspect-[16 / 5]">
      <ul>
        <li className="text-sm/[24px] mb-[40px]">
          You {sell ? "Sell" : "Buy"}
        </li>
        <li>
          <div className="flex justify-between items-start pb-[24px] border-b">
            <Select defaultValue={name}>
              <SelectTrigger className="flex items-center gap-[8px] w-fit h-[24px] rounded-[6px] p-0 border-none">
                {typeof image === "string" && (
                  <Image width={24} height={24} src={image} alt="" />
                )}
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {coinsData.map((element: any) => {
                  return (
                    <SelectItem value={element.name} key={Math.random()}>
                      <span className="text-xl">{element.name} ({element.symbol.toUpperCase()})</span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <input
              className="text-2xl bg-transparent text-right outline-none"
              type="number"
              value={amount === 0 ? "" : Number(amount.toFixed(2))}
              onChange={(event) => handleChange(event)}
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
  const [amountCoinA, setAmountCoinA] = useState(1);
  const [amountCoinB, setAmountCoinB] = useState(1);
  const [coinA, setCoinA] = useState({
    name: "Bitcoin",
    price: 1,
    image: null,
  });
  const [coinB, setCoinB] = useState({
    name: "Ethereum",
    price: 1,
    image: null,
  });

  const updateData = (amount: number) => {
    setAmountCoinA(amount);
  };

  const convert = (priceA: any, priceB: any) => {
    setAmountCoinB((priceA * amountCoinA) / priceB);
  };

  useEffect(() => {
    setCoinA(coinsData[0]);
    setCoinB(coinsData[1]);
    convert(coinsData[0].price, coinsData[1].price);
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-between items-start pb-[4vh]">
        <h2>Online currency converter</h2>
        <p className="text-[#9E9E9E]">09/29/2023 14:15</p>
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
            Bitcoin (BTC) <span>to</span> Ethereum (ETH)
          </h3>
        </ChartContainer>
      </div>
      <TimeRangeButtons></TimeRangeButtons>
    </div>
  );
};
export default Converter;
