"use client";
import { useState } from "react";
import Image from "next/image";
import ChartContainer from "./ChartContainer";
import TimeRangeButtons from "./TimeRangeButtons";
import ArrowDownWhite from "../src/icons/Arrow_Down_White.svg";
import VerticalSwitchBlue from "../src/icons/Vertical_Switch_Blue.svg";

const InputContainer = (props: {
  name: string;
  sell: boolean;
  displayPrice: number;
  updateData: any;
}) => {
  const { name, sell, displayPrice, updateData } = props;
  const [amount, setAmount] = useState(1);

  const handleChange = (event: any) => {
    const { target } = event;
    const { value } = target;
    setAmount(value);
    updateData(value);
  };

  return (
    <div className="grow bg-[#191932] rounded-[16px] p-[24px] w-full  h-auto aspect-[16 / 5]">
      <ul>
        <li className="text-sm/[24px] mb-[40px]">
          You {sell ? "Sell" : "Buy"}
        </li>
        <li>
          <div className="flex justify-between items-start pb-[24px] border-b">
            <button className="flex items-center gap-[8px] w-[244px] h-[45px] rounded-[6px]">
              {name}
              <Image width={6} height={3} src={ArrowDownWhite.src} alt="" />
            </button>
            <input
              className="text-2xl bg-transparent text-right outline-none"
              type="number"
              value={amount}
              onChange={(event) => handleChange(event)}
              disabled={!sell}
            />
          </div>
        </li>
        <li className="m-[8px] text-sm/[24px]">
          {amount} {name} = {displayPrice}
        </li>
      </ul>
    </div>
  );
};

const Converter = () => {
  const [priceData, setPriceData] = useState({
    coinA: {
      price: 26250.15,
      displayPrice: 26250.15,
      amount: 1,
    },
    coinB: {
      price: 8914.12,
      displayPrice: 8914.12,
      amount: 1,
    },
  });

  const updateData = (amount: number) => {
    const newPriceData = priceData;
    newPriceData.coinA.displayPrice = newPriceData.coinA.price * amount;
    setPriceData(newPriceData);
  };

  return (
    <div>
      <div className="flex justify-between items-end pb-[4vh]">
        <h2>Online currency converter</h2>
        <p>09/29/2023 14:15</p>
      </div>
      <div className="relative flex justify-between gap-[24px] mb-[72px]">
        <InputContainer
          name="Bitcoin"
          sell={true}
          displayPrice={priceData.coinA.displayPrice}
          updateData={updateData}
        ></InputContainer>
        <InputContainer
          name="Ethereum"
          sell={false}
          displayPrice={priceData.coinB.displayPrice}
          updateData={updateData}
        ></InputContainer>
        <button className="absolute flex justify-center items-center w-[48px] h-[48px] rounded-[50%] bg-white top-[38%] left-[48%]">
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
