"use client";
import StoreProvider from "./StoreProvider";
import { useState } from "react";
import Coins from "./components/Coins";
import Converter from "./components/Converter";
import MobileNavbar from "./components/MobileNavbar";
import ScrollToTopButton from "./components/ScrollToTopButton";
import GradientBorderButton from "./components/GradientBorderButton";
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
      {!mobileView && (
        <div className="w-fit p-[4px] lg:2xl:p-[8px] rounded-[9px] lg:2xl:rounded-[18px] flex gap-[4px] lg:2xl:gap-[8px] bg-white dark:bg-[--mirage]">
          <GradientBorderButton
            handleClick={toggleDisplay}
            argumentList={[]}
            background="bg-transparent"
            buttonClasses="w-[244px] lg:2xl:w-[488px] h-[45px] lg:2xl:h-[90px]"
            spanClasses={`${
              coinsVisible ? "text-white" : "text-[--dark-slate-blue]"
            } dark:text-white lg:2xl:text-3xl`}
            text="Coins"
            active={coinsVisible}
          >
            {null}
          </GradientBorderButton>
          <GradientBorderButton
            handleClick={toggleDisplay}
            argumentList={[]}
            background="bg-transparent"
            buttonClasses="w-[244px] lg:2xl:w-[488px] h-[45px] lg:2xl:h-[90px]"
            spanClasses={`${
              !coinsVisible
                ? "text-white"
                : "text-[--dark-slate-blue]"
            } dark:text-white lg:2xl:text-3xl`}
            text="Converter"
            active={!coinsVisible}
          >
            {null}
          </GradientBorderButton>
        </div>
      )}
      <div className="pt-[4vh] overflow-x-hidden">
        {coinsVisible ? (
          <Coins currency={currency} mobileView={mobileView} />
        ) : (
          <Converter currency={currency} />
        )}
      </div>
      {mobileView && <MobileNavbar />}
      <ScrollToTopButton />
    </StoreProvider>
  );
}
