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
  currency: any;
}) => {
  const {
    sell,
    priceData,
    coinsData,
    amount,
    updateCoins,
    defaultValue,
    currency,
  } = props;
  const { name, price, image } = priceData;
  const isCoinA = defaultValue === "bitcoin";

  const changeAmount = (event: any) => {
    updateCoins(event.target.value, isCoinA, null);
  };

  const handleChange = useCallback(
    (event: any) => {
      updateCoins(null, isCoinA, event);
    },
    [isCoinA, updateCoins]
  );

  return (
    <div className="bg-white dark:bg-[#191932] text-[--space-cadet] dark:text-white rounded-[16px] lg:2xl:rounded-[24px] p-[24px] lg:2xl:p-[36px] w-[50%] max-md:max-xl:w-full h-auto aspect-[16 / 5]">
      <ul>
        <li className="text-sm lg:2xl:text-xl mb-[4vh]">
          You {sell ? "Sell" : "Buy"}
        </li>
        <li className="flex justify-between items-start border-b min-w-0">
          <Select onValueChange={handleChange} defaultValue={defaultValue}>
            <span className="w-fit">
              <SelectTrigger className="relative flex justify-start pr-[12px] lg:2xl:pr-[12px] text-left w-[220px] max-sm:w-[180px] lg:2xl:w-[330px] h-full lg:2xl:h-[36px] rounded-[6px] overflow-visible">
                <Avatar className="w-[24px] h-[24px] lg:2xl:w-[36px] lg:2xl:h-[36px] mr-[8px] lg:2xl:mr-[12px]">
                  <AvatarImage src={image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <SelectValue />
              </SelectTrigger>
            </span>
            <SelectContent className="shadow-[4px 0px 10px 16px] shadow-[#7878fa26] bg-white dark:bg-[#191932] text-[--space-cadet] dark:text-white">
              {coinsData.map((element: any) => {
                return (
                  <SelectItem value={element.id} key={element.id}>
                    <span className="text-2xl max-lg:max-xl:text-xl lg:2xl:text-3xl m-0">
                      {element.name} ({element.symbol.toUpperCase()})
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <div className="w-full flex">
            {isCoinA ? (
              <input
                className="w-full text-2xl max-lg:max-xl:text-xl lg:2xl:text-3xl text-right self-end outline-none bg-transparent"
                type="number"
                value={amount}
                onChange={changeAmount}
                disabled={!sell}
                min="1"
              />
            ) : (
              <span className="pr-[15px] w-full text-2xl max-lg:max-xl:text-xl lg:2xl:text-3xl text-right self-end">
                {Number(amount.toFixed(2)).toLocaleString()}
              </span>
            )}
          </div>
        </li>
        <li className="w-full m-[8px] text-sm lg:2xl:text-xl">
          1 {name} ={" "}
          {` ${currency.symbol}${price ? price.toLocaleString() : ""}` || ""}
        </li>
      </ul>
    </div>
  );
};

export default InputContainer;
