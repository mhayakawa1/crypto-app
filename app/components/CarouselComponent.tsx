import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useRef, useEffect } from "react";
import { useAllCoinsQuery } from "@/lib/features/api/apiSlice";
import { formatAllCoins } from "@/lib/format/formatAllCoins";
import GradientBorderButton from "./GradientBorderButton";
import Image from "next/image";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";
import ArrowDownRed from "../../src/icons/Arrow_Down_Red.svg";

const CarouselComponent = (props: {
  updateActiveCoins: any;
  activeCoins: any;
  currency: any;
  compareData: any;
}) => {
  const { updateActiveCoins, activeCoins, currency, compareData } = props;
  const prevFirstPrice = useRef<any>(null);
  const [twoCoinsActive, setTwoCoinsActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialRender, setInitialRender] = useState(true);
  const [mobileView, setMobileView] = useState(false);

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
      } else if (active && twoCoinsActive) {
        newActiveCoins = newActiveCoins.filter(
          (element: any) => element.id !== id
        );
        setActive(false);
      }
      setTwoCoinsActive(newActiveCoins.length === 2);
      updateActiveCoins(newActiveCoins);
    };

    return (
      <CarouselItem key={id} className="pl-2 lg:2xl:pl-4 overflow-visible">
        <Card className="p-0">
          <CardContent className="p-0 w-[252px] lg:2xl:w-[504px] max-sm:w-[168px] h-[78px] lg:2xl:h-[165px] max-sm:h-[51px] rounded-[6px] lg:2xl:rounded-[12px]">
            <GradientBorderButton
              handleClick={toggleActive}
              argumentList={[]}
              background="bg-[white] dark:bg-[--mirage]"
              buttonClasses="w-full h-full flex items-center gap-[16px] lg:2xl:gap-[32px] m-0"
              spanClasses="px-[16px] lg:2xl:px-[32px] max-sm:px-[10px] gap-[8px] lg:2xl:gap-[16px]"
              text=""
              active={active}
            >
              <Avatar className="lg:2xl:w-[64px] max-sm:w-[24px] lg:2xl:h-[64px] max-sm:h-[24px]">
                <AvatarImage src={image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ul className="w-full text-left max-sm:flex items-center justify-between">
                <li className="lg:2xl:text-3xl font-medium">
                  {mobileView
                    ? symbol.toUpperCase()
                    : `
                  ${name} (${symbol.toUpperCase()})`}
                </li>
                <li className="flex justify-between max-sm:flex-col max-sm:items-end grow w-full text-sm lg:2xl:text-3xl max-sm:text-xs">
                  <span className="text-[--dark-slate-blue] dark:text-[--light-gray]">
                    {currency.symbol}
                    {currency.symbol.length > 1 ? " " : ""}
                    {price.toLocaleString()}
                  </span>
                  <span
                    className={`flex ${
                      rising ? "text-[--rising]" : "text-[--falling]"
                    }`}
                  >
                    <Image
                      alt=""
                      src={rising ? ArrowUpGreen : ArrowDownRed}
                      width={6.67}
                      height={3.33}
                      className="m-[5px] lg:2xl:m-[10px] h-auto"
                    />
                    <span></span>
                    {percents[0].value}%
                  </span>
                </li>
              </ul>
            </GradientBorderButton>
          </CardContent>
        </Card>
      </CarouselItem>
    );
  };

  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
    refetch,
  } = useAllCoinsQuery({ currency: currency.currency, page: 1 });

  useEffect(() => {
    if (isSuccess) {
      setInitialRender(false);
      const formattedData = formatAllCoins(data);
      if (!activeCoins[0].name.length) {
        updateActiveCoins(formattedData.slice(0, 1));
      }
      if (!initialRender && prevFirstPrice.current !== formattedData[0].price) {
        const newActiveCoins = activeCoins;
        newActiveCoins.map((coinData: any) => {
          const newData = formattedData.find(
            (element: any) => element.id === coinData.id
          );
          coinData.price = newData.price;
          coinData.volumeMarketCap.totalVolume =
            newData.volumeMarketCap.totalVolume;
          return coinData;
        });
        updateActiveCoins(newActiveCoins);
        prevFirstPrice.current = formattedData[0].price;
      }
    } else if (isError && "error" in error) {
      setTimeout(() => {
        refetch();
      }, 10000);
      setErrorMessage(`${error.error}. Refetching...`);
    }
    const handleResize = () => {
      if (window.innerWidth < 640 && !mobileView) {
        setMobileView(true);
      } else if (window.innerWidth >= 640 && mobileView) {
        setMobileView(false);
      }
    };
    window.addEventListener("resize", handleResize);

    if (initialRender) {
      handleResize();
      setInitialRender(false);
    }
  }, [
    isSuccess,
    activeCoins.length,
    data,
    error,
    isError,
    activeCoins,
    initialRender,
    refetch,
    updateActiveCoins,
    mobileView,
  ]);

  return (
    <Carousel className="absolute w-[90vw] max-sm:w-full left-1/2 max-sm:left-100 max-sm:pl-[4vw] -translate-x-1/2">
      <CarouselContent className="mt-3 mb-5">
        {isLoading && (
          <h4 className="text-[--dark-slate-blue] dark:text-white">
            Loading...
          </h4>
        )}
        {isSuccess &&
          formatAllCoins(data).map((coin: any) => (
            <CoinButton key={coin.id} data={coin} />
          ))}
        {isError && <h4>{errorMessage}</h4>}
      </CarouselContent>
      <CarouselPrevious className="lg:2xl:w-[80px] lg:2xl:h-[80px] ml-[20px] lg:2xl:ml-[40px] -mt-1 overflow max-sm:hidden" />
      <CarouselNext className="lg:2xl:w-[80px] lg:2xl:h-[80px] mr-[20px] lg:2xl:mr-[40px] -mt-1 max-sm:hidden" />
    </Carousel>
  );
};
export default CarouselComponent;
