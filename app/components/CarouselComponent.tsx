import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import GradientBorderButton from "./GradientBorderButton";
import Image from "next/image";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";
import ArrowDownRed from "../../src/icons/Arrow_Down_Red.svg";
import { formatNumber } from "@/lib/format/formatNumber";

const CarouselComponent = (props: {
  updateActiveCoins: any;
  activeCoins: any;
  currency: any;
  compareData: any;
  isLoading: any;
  isSuccess: any;
  isError: any;
  errorMessage: string;
  coinList: any;
  mobileView: boolean;
}) => {
  const {
    updateActiveCoins,
    activeCoins,
    currency,
    compareData,
    isLoading,
    isError,
    errorMessage,
    isSuccess,
    coinList,
    mobileView,
  } = props;
  const [twoCoinsActive, setTwoCoinsActive] = useState(false);
  const CoinButton = (data: any) => {
    const {
      data: { id, image, name, symbol, price, percents },
    } = data;
    const [active, setActive] = useState(
      Boolean(activeCoins.filter((element: any) => element.id === id).length)
    );
    const rising = percents[0].rising;

    const toggleActive = () => {
      let newActiveCoins: any[] = activeCoins;
      if (!active) {
        if (twoCoinsActive || !compareData) {
          newActiveCoins = newActiveCoins.slice(1);
        }
        newActiveCoins.push(data.data);
        setActive(true);
      } else if (active && newActiveCoins.length > 1) {
        newActiveCoins = newActiveCoins.filter(
          (element: any) => element.id !== id
        );
        setActive(false);
      }
      
      setTwoCoinsActive(newActiveCoins.length === 3);
      updateActiveCoins(newActiveCoins);
    };

    return (
      <CarouselItem key={id} className="pl-2 lg:2xl:pl-3 overflow-visible">
        <Card className="p-0">
          <CardContent className="p-0 w-[252px] lg:2xl:w-[378px] max-sm:w-[200px] h-[78px] lg:2xl:h-[117px] max-sm:h-[51px] rounded-[6px] lg:2xl:rounded-[9px]">
            <GradientBorderButton
              handleClick={toggleActive}
              argumentList={[]}
              background="bg-[white] dark:bg-[--mirage]"
              buttonClasses="w-full h-full flex items-center gap-[16px] lg:2xl:gap-[24px] m-0"
              spanClasses="px-[16px] lg:2xl:px-[24px] max-sm:px-[8px] gap-[8px] max-sm:gap-[4px] lg:2xl:gap-[12px]"
              text=""
              active={active}
            >
              <Avatar className="lg:2xl:w-[48px] max-sm:w-[24px] lg:2xl:h-[48px] max-sm:h-[24px]">
                <AvatarImage src={image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ul className="w-full text-left max-sm:flex items-center justify-between">
                <li className="w-[150px] max-sm:w-[100px] lg:2xl:w-[150px] lg:2xl:text-2xl max-sm:text-xs font-medium truncate">
                  {`${name} (${symbol.toUpperCase()})`}
                </li>
                <li className="flex justify-between max-sm:flex-col max-sm:items-end text-sm lg:2xl:text-2xl max-sm:text-xs">
                  <span className="text-[--dark-slate-blue] dark:text-[--light-gray] text-nowrap">
                    {currency.symbol}
                    {currency.symbol.length > 1 ? " " : ""}
                    {mobileView
                      ? formatNumber(price, "")
                      : price.toLocaleString()}
                  </span>
                  <span
                    className={`flex ${
                      rising ? "text-[--rising]" : "text-[--falling]"
                    }`}
                  >
                    <Image
                      alt=""
                      src={rising ? ArrowUpGreen : ArrowDownRed}
                      width="0"
                      height="0"
                      className="w-[7px] lg:2xl:w-[10.5px] h-auto m-[4px] lg:2xl:m-[6px]"
                    />
                    <span>{percents[0].value}%</span>
                  </span>
                </li>
              </ul>
            </GradientBorderButton>
          </CardContent>
        </Card>
      </CarouselItem>
    );
  };

  return (
    <Carousel className="absolute flex justify-center items-center w-[90vw] max-sm:w-full h-[78px] lg:2xl:h-[117px] max-sm:h-[51px] left-1/2 max-sm:left-100 max-sm:pl-[4vw] -translate-x-1/2">
      <CarouselContent className="mt-3 mb-5">
        {isLoading && (
          <h4 className="lg:2xl:text-3xl text-[--dark-slate-blue] dark:text-white">
            Loading...
          </h4>
        )}
        {isSuccess &&
          coinList.length > 1 &&
          coinList.map((coin: any) => <CoinButton key={coin.id} data={coin} />)}
        {isError && (
          <h4 className="lg:2xl:text-2xl text-[--dark-slate-blue] dark:text-white">
            {errorMessage}
          </h4>
        )}
      </CarouselContent>
      <CarouselPrevious className="lg:2xl:w-[60px] lg:2xl:h-[60px] ml-[20px] lg:2xl:ml-[30px] -mt-1 overflow max-sm:hidden" />
      <CarouselNext className="lg:2xl:w-[60px] lg:2xl:h-[60px] mr-[20px] lg:2xl:mr-[30px] -mt-1 max-sm:hidden" />
    </Carousel>
  );
};
export default CarouselComponent;
