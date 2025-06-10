"use client";
import StoreProvider from "./StoreProvider";
import { useState } from "react";
import Coins from "./components/Coins";
import Converter from "./components/Converter";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const [coinsVisible, setCoinsVisible] = useState(true);
  const currency = useAppSelector((state) => state.currency);
const view = useAppSelector((state) => state.view);
  const mobileView = view[0].mobileView;
  const toggleDisplay = () => {
    setCoinsVisible((current) => !current);
  };
  return (
    <StoreProvider>
      <div className="w-fit p-[4px] rounded-[6px] flex gap-[4px] bg-[#191925]">
        <button
          onClick={toggleDisplay}
          className={`${
            coinsVisible
              ? "p-[1px] bg-gradient-to-b from-[--soft-blue] to-[--american-blue] shadow-[4px_4px_15px_2px_#7878fa26]"
              : "bg-[--dark-gunmetal]"
          } w-[244px] h-[45px] rounded-[6px] flex`}
        >
          <span
            className={`${
              coinsVisible ? "bg-[--american-blue]" : "bg-none"
            } w-full h-full rounded-[5px] flex justify-center items-center`}
          >
            Coins
          </span>
        </button>
        <button
          onClick={toggleDisplay}
          className={`${
            coinsVisible
              ? "bg-[--dark-gunmetal]"
              : "p-[1px] bg-gradient-to-b from-[--soft-blue] to-[--american-blue] shadow-[4px_4px_15px_2px_#7878fa26]"
          } w-[244px] h-[45px] rounded-[6px] flex`}
        >
          <span
            className={`${
              coinsVisible ? "bg-none" : "bg-[--american-blue]"
            } w-full h-full rounded-[5px] flex justify-center items-center`}
          >
            Converter
          </span>
        </button>
      </div>
      <div className="pt-[4vh] overflow-x-hidden">
        {coinsVisible ? (
          <Coins currency={currency} mobileView={mobileView} />
        ) : (
          <Converter currency={currency} />
        )}
      </div>
    </StoreProvider>
  );
}
