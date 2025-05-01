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
import { useAllCoinsQuery } from "@/lib/features/api/apiSlice";
import { formatAllCoins } from "@/lib/format/formatAllCoins";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";
import ArrowDownRed from "../../src/icons/Arrow_Down_Red.svg";

const CarouselComponent = () => {
  const { currency } = useAppSelector((state) => state.currency);
  const [activeCoins, setActiveCoins]: any[] = useState([]);
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
        if (twoCoinsActive) {
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
      setActiveCoins(newActiveCoins);
      setTwoCoinsActive(newActiveCoins.length === 2);
    };

    return (
      <CarouselItem key={id} className="pl-2 overflow-visible">
        <Card
          className={`${
            active
              ? "p-px bg-gradient-to-b from-[--soft-blue] to-[--american-blue] shadow-[4px_4px_15px_2px_#7878fa26]"
              : "bg-[--dark-gunmetal]"
          } flex items-center justify-center w-[252px] h-[78px] rounded-[6px] border-none text-white`}
        >
          <CardContent
            className={`${
              active ? "bg-[--american-blue]" : "bg-none"
            }  flex items-center justify-center p-0 w-full h-full rounded-[6px]`}
          >
            <button
              className="w-full h-full flex items-center gap-[16px] px-[16px]"
              value={id}
              onClick={toggleActive}
            >
              <Avatar>
                <AvatarImage src={image} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <ul className="w-full text-left">
                <li className="font-medium">
                  {name} ({symbol.toUpperCase()})
                </li>
                <li className="flex justify-between grow w-full text-sm">
                  <span className="text-[#D1D1D1]">
                    {price.toLocaleString()} USD
                  </span>{" "}
                  <span
                    className={`flex ${
                      rising ? "text-[--rising]" : "text-[--falling]"
                    }`}
                  >
                    <Image
                      alt=""
                      src={rising ? ArrowUpGreen : ArrowDownRed}
                      width={8}
                      height={4}
                      className="m-[5px]"
                    />
                    {percents[0].value}
                  </span>
                </li>
              </ul>
            </button>
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
  } = useAllCoinsQuery({ currency: currency, page: 1 });

  let content: React.ReactNode;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const formattedData = formatAllCoins(data);
    content = formattedData.map((coin: any) => (
      <CoinButton key={coin.id} data={coin} />
    ));
    if (!activeCoins.length) {
      setActiveCoins(formattedData.slice(0, 1));
    }
  } else if (isError) {
    content = <p>{error.toString()}</p>;
  }

  return (
    <Carousel className="absolute w-[91vw]">
      <CarouselContent className="-ml-2 mt-3 mb-5">{content}</CarouselContent>
      <CarouselPrevious className="ml-[1vw] -mt-1" />
      <CarouselNext className="mr-[1vw] -mt-1" />
    </Carousel>
  );
};
export default CarouselComponent;
