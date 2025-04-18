"use client";
import { useEffect, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import VerticalSwitchBlue from "../../src/icons/Vertical_Switch_Blue.svg";

const InputContainer = (props: {
  name: string;
  sell: boolean;
  priceData: any;
  coinsData: any;
  amount: number;
  updateCoins: any;
  defaultValue: string;
}) => {
  const { sell, priceData, coinsData, amount, updateCoins, defaultValue } =
    props;
  const { name, price, image } = priceData;

  const changeAmount = (event: any) => {
    const {
      target: { value },
    } = event;
    updateCoins(Number(value), null, null);
  };

  const handleChange = useCallback(
    (event: any) => {
      updateCoins(coinsData, null, sell, event);
    },
    [sell, updateCoins, coinsData]
  );

  return (
    <div className="bg-[#191932] rounded-[16px] p-[24px] w-[49%] h-auto aspect-[16 / 5]">
      <ul>
        <li className="text-sm/[24px] mb-[40px]">
          You {sell ? "Sell" : "Buy"}
        </li>
        <li>
          <div className="flex justify-between items-start pb-[24px] border-b">
            <Select onValueChange={handleChange} defaultValue={defaultValue}>
              <SelectTrigger className="flex items-center gap-[8px] w-fit h-[24px] rounded-[6px] p-0 border-none">
                <Avatar className="w-[24px] h-[24px]">
                  <AvatarImage src={image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
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
              value={
                amount === 0 ? "" : parseFloat(amount.toString()).toFixed(2)
              }
              onChange={changeAmount}
              disabled={!sell}
            />
          </div>
        </li>
        <li className="m-[8px] text-sm/[24px]">
          1 {name} = {price.toLocaleString() || ""}
        </li>
      </ul>
    </div>
  );
};

const ConverterInputs = (props: {
  data: any;
  updateCoins: any;
  convert: any;
  coinA: any;
  coinB: any;
  amountCoinA: any;
  amountCoinB: any;
}) => {
  const { data, updateCoins, convert, coinA, coinB, amountCoinA, amountCoinB } =
    props;

  useEffect(() => {
    if (!coinA.name) {
      updateCoins(data, null, true, data[0].name);
      updateCoins(data, null, false, data[1].name);
      convert(data[0].price, data[1].price);
    }
  }, [convert, data, updateCoins, coinA.name]);

  return (
    <div className="flex justify-center gap-[24px] relative mb-[72px]">
      {data.length ? (
        <>
          <InputContainer
            name="Bitcoin"
            sell={true}
            priceData={coinA}
            coinsData={data}
            amount={amountCoinA}
            updateCoins={updateCoins}
            defaultValue={"Bitcoin"}
          />
          <InputContainer
            name="Bitcoin"
            sell={true}
            priceData={coinB}
            coinsData={data}
            amount={amountCoinB}
            updateCoins={updateCoins}
            defaultValue={"Ethereum"}
          />
          <button
            onClick={() => convert(coinA.price, coinB.price)}
            className="absolute flex justify-center items-center w-[48px] h-[48px] rounded-[50%] bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Image src={VerticalSwitchBlue.src} alt="" width={24} height={24} />
          </button>
        </>
      ) : null}
    </div>
  );
};
export default ConverterInputs;
