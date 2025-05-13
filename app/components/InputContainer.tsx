"use client";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
    <div className="bg-white dark:bg-[#191932] text-[--space-cadet] dark:text-white rounded-[16px] lg:2xl:rounded-[32px] p-[24px] lg:2xl:p-[48px] w-[50%] max-md:max-xl:w-full h-auto aspect-[16 / 5]">
      <ul>
        <li className="text-sm lg:2xl:text-2xl mb-[4vh]">
          You {sell ? "Sell" : "Buy"}
        </li>
        <li className="w-full flex justify-between items-start pb-[2vh] border-b">
          <Select onValueChange={handleChange} defaultValue={defaultValue}>
            <SelectTrigger className="flex items-center gap-[1vw] w-fit h-[24px] lg:2xl:h-[48px] rounded-[6px] p-0 border-none">
              <Avatar className="w-[24px] h-[24px] lg:2xl:w-[48px] lg:2xl:h-[48px]">
                <AvatarImage src={image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="border-none shadow-[4px 0px 10px 16px] shadow-[#7878fa26] bg-white dark:bg-[#191932] text-[--space-cadet] dark:text-white">
              {coinsData.map((element: any) => {
                return (
                  <SelectItem value={element.name} key={element.name}>
                    <span className="text-2xl lg:2xl:text-4xl">
                      {element.name} ({element.symbol.toUpperCase()})
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <input
            className="text-2xl lg:2xl:text-4xl bg-transparent outline-none w-full text-right"
            type="number"
            value={amount === 0 ? "" : parseFloat(amount.toString()).toFixed(2)}
            onChange={changeAmount}
            disabled={!sell}
          />
        </li>
        <li className="m-[8px] text-sm lg:2xl:text-2xl">
          1 {name} = {price.toLocaleString() || ""}
        </li>
      </ul>
    </div>
  );
};

export default InputContainer;
