"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useAppSelector } from "@/lib/hooks";
import VerticalSwitchBlue from "../../src/icons/Vertical_Switch_Blue.svg";
import VerticalSwitchWhite from "../../src/icons/Vertical_Switch_White.svg";
import InputContainer from "./InputContainer";

const ConverterInputs = (props: {
  data: any;
  updateCoins: any;
  convert: any;
  coinA: any;
  coinB: any;
  amountCoinA: any;
  amountCoinB: any;
}) => {
  const { darkActive } = useAppSelector((state) => state.theme)[0];
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
    <div className="relative">
      {data.length ? (
        <div className="w-full flex max-md:max-xl:flex-col justify-center gap-[24px]">
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
            className="absolute flex justify-center items-center w-[48px] h-[48px] rounded-[50%] border-[4px] border-[--dark-slate-blue] dark:border-[#13121a] bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Image
              src={darkActive ? VerticalSwitchWhite : VerticalSwitchBlue}
              alt=""
              width={24}
              height={24}
            />
          </button>
        </div>
      ) : null}
    </div>
  );
};
export default ConverterInputs;
