"use client";
import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCoinQuery } from "@/lib/features/api/apiSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Plus from "./../../../src/icons/Plus.svg";
import PortfolioIcon from "./../../../src/icons/Portfolio_White.svg";
import ArrowUpGreen from "./../../../src/icons/Arrow_Up_Green.svg";
import ArrowDownRed from "./../../../src/icons/Arrow_Down_Red.svg";
import LinkWhite from "./../../../src/icons/Link_White.svg";
import CopyWhite from "./../../../src/icons/Copy_White.svg";
import Panel from "../../components/Panel";

type Params = Promise<{ coinId: string }>;

const LinkContainer = (props: { link: string; sliceIndex: number }) => {
  const { link, sliceIndex } = props;
  const shortenedLink = link.slice(sliceIndex);

  const copyText = () => {
    navigator.clipboard.writeText(link);
  };

  return (
    <Panel className="flex justify-center items-center gap[16px] font-medium text-base/[24px] h-[52px]">
      <a href={link} target="_blank">
        <Image src={LinkWhite} alt="" className="w-[20px] h-[20px]" />
      </a>
      <p className="mx-[16px]">{shortenedLink}</p>
      <button onClick={copyText}>
        <Image src={CopyWhite} alt="" className="w-[20px] h-[20px]" />
      </button>
    </Panel>
  );
};

const HighLow = (props: { src: any; price: string; time: string }) => {
  const { src, price, time } = props;
  return (
    <li className="high-low flex justify-start gap-[16px] h-[44px]">
      <Image
        width={16}
        height={16}
        className="w-[16px] h-[12px] mt-[8px]"
        src={src}
        alt=""
      />
      <ul className="text-base/[14px] text-nowrap">
        <li>
          All time high: <span className="text-xl">{price}</span>
        </li>
        <li className="date text-sm text-[#b9b9ba]">{time}</li>
      </ul>
    </li>
  );
};

export default function CoinPage(props: { params: Params }) {
  const { coinId } = use(props.params);
  const coinName = coinId[0].toUpperCase() + coinId.slice(1);
  const [textHidden, setTextHidden] = useState(true);

  const overviewInfo = {
    price: "$40,017",
    rising: true,
    percent: "5.02%",
    profit: "$1,504",
    highLow: {
      high: {
        price: "$64,805",
        time: "Wed, 14 Sep 2023 11:54:46 GMT",
      },
      low: {
        price: "$32,805",
        time: "Wed, 10 Sep 2023 22:01:53 GMT",
      },
    },
  };

  const toggleDescription = () => {
    setTextHidden((current) => !current);
  };

  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useCoinQuery({ coinId: coinId });

  let content: React.ReactNode;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    const { image, symbol, name, description, links, market_data } = data;

    let newMarketData = [
      {
        name: "Market Cap",
        key: "market_cap.usd",
        value: "",
        currency: { symbol: "$", start: true },
      },
      {
        name: "Fully Diluted Valuation",
        key: "fully_diluted_valuation.usd",
        value: "",
        currency: { symbol: "$", start: true },
      },
      {
        name: "Volume 24h",
        key: "total_volume.usd",
        value: "",
        currency: { symbol: "$", start: true },
      },
      {
        name: "Volume/Market",
        key: "",
        value: "",
        currency: { symbol: "", start: true },
      },
      {
        name: "Total Volume",
        key: "total_volume.btc",
        value: "",
        currency: { symbol: "symbol", start: false },
      },
      {
        name: "Circulating Supply",
        key: "circulating_supply",
        value: "",
        currency: { symbol: "symbol", start: false },
      },
      {
        name: "Max Supply",
        key: "max_supply",
        value: "",
        currency: { symbol: "symbol", start: false },
      },
    ];

    const getValue = (string: string) => {
      let value = market_data;
      const keys = string.split(".");
      keys.forEach((k) => {
        value = value[k];
      });
      return value;
    };

    newMarketData = newMarketData.map((element) => {
      if (element.key) {
        element.value = getValue(element.key);
      }
      if (element.currency.symbol === "symbol") {
        element.currency.symbol = symbol;
      }
      return element;
    });

    newMarketData[3].value = (
      Number(newMarketData[2].value) / Number(newMarketData[0].value)
    ).toFixed(5);

    newMarketData = newMarketData.map((element) => {
      if (Number(element.value) > 1) {
        const { value, currency } = element;
        element.value = `${
          currency.start ? currency.symbol : ""
        }${value.toLocaleString()} ${
          !currency.start ? currency.symbol.toUpperCase() : ""
        }`;
      }
      return element;
    });

    const newCoinData = {
      src: `${image.small}`,
      name: `${name}`,
      priceChange: `${market_data.price_change_percentage_24h.toFixed(2)}`,
      rising: market_data.price_change_percentage_24h > 0,
      homeLink: `${links.homepage[0]}`,
      description: description.en,
      blockchainLinks: [...links.blockchain_site.slice(2, 5)],
      marketData: [...newMarketData],
    };

    content = (
      <div className="flex justify-between">
        <div className="w-[53%] flex flex-col gap-[16vh]">
          <div className="flex justify-between gap-[32px]">
            <div className="flex justify-between flex-col gap-[16px] w-[44%]">
              <Panel className="flex justify-center items-center flex-col grow gap-[24px]">
                <div className="p-[16px] rounded-xl w-[64px] h-[64px] bg-[#2C2C4A]">
                  <Avatar className="rounded-full w-[32px] h-[32px]">
                    <AvatarImage src={newCoinData.src} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <h2>{coinName}</h2>
              </Panel>
              <LinkContainer link={newCoinData.homeLink} sliceIndex={8} />
            </div>
            <Panel className="aspect-[355/333] flex p-[40px]">
              <ul className="self-center flex flex-col justify-center gap-[20px] h-fit">
                <li className="flex items-end gap-[16px] h-[25px]">
                  <span className="text-4xl/[24px] font-bold">
                    {overviewInfo.price}
                  </span>
                  <span
                    className={`${
                      newCoinData.rising
                        ? "text-[--rising]"
                        : "text-[--falling]"
                    } h-[14px] flex items-end`}
                  >
                    <Image
                      src={
                        newCoinData.rising ? ArrowUpGreen.src : ArrowDownRed.src
                      }
                      width={9}
                      height={5}
                      className="self-start w-[9px] h-[5px] mx-[5px]"
                      alt=""
                    />
                    <span className="text-xl/[14px]">
                      {newCoinData.priceChange}%
                    </span>
                  </span>
                </li>
                <li className="text-xl/[16px] text-left">
                  Profit:
                  <span
                    className={`${
                      newCoinData.rising
                        ? "text-[--rising]"
                        : "text-[--falling]"
                    } text-2xl ml-[16px]`}
                  >
                    {overviewInfo.profit}
                  </span>
                </li>
                <li className="flex justify-center self-center mx-auto w-[24px] h-[24px]">
                  <Image src={PortfolioIcon} alt=""></Image>
                </li>
                <HighLow
                  src={ArrowUpGreen.src}
                  price="$64,805"
                  time="Wed, 14 Sep 2023 11:54:46 GMT"
                />
                <HighLow
                  src={ArrowDownRed.src}
                  price="$32,805"
                  time="Wed, 10 Sep 2023 22:01:53 GMT"
                />
              </ul>
            </Panel>
          </div>
          <div className="flex flex-col gap-[24px] w-100 ">
            <h4 className="text-xl font-medium ">Description</h4>
            <p
              className={`${
                textHidden
                  ? "overflow-hidden text-ellipsis h-[210px]"
                  : "flex flex-col h-auto"
              } relative text-sm/[21px] w-100`}
            >
              {newCoinData.description}
              <button
                onClick={toggleDescription}
                className={`${
                  textHidden ? "absolute bottom-0 right-0" : "self-end"
                } pl-[16px] text-[#6060ff] text-sm/[21px] h-[21px] bg-gradient-to-r from-transparent from-0% to-[#13121A] to-20%`}
              >
                {textHidden ? "...read more" : "read less"}
              </button>
            </p>
          </div>
        </div>
        <div className="w-[42%] flex flex-col gap-[16vh]">
          <Panel className="flex items-center justify-center aspect-[136/105]">
            <div className="flex flex-col gap-[32px]">
              <ul className="flex flex-col gap-[12px]">
                {newCoinData.marketData.map((element, index) => (
                  <li
                    key={index}
                    className={`flex justify-between gap-[24px] text-base/[20px] ${
                      index === 4 && "mt-[32px]"
                    }`}
                  >
                    <span className="flex flex-1 gap-[24px]">
                      <span className="w-[24px] h-[24px] rounded-full p-[1px] flex items-center justify-center bg-gradient-to-b from-[--soft-blue] to-[--american-blue] shadow-[4px_4px_15px_2px_#7878fa26]">
                        <span className="bg-[--american-blue] mt-[.25px] ml-[.25px] rounded-full w-full h-full flex items-center justify-center">
                          <Image src={Plus} alt=""></Image>
                        </span>
                      </span>
                      <span>{element.name}</span>
                    </span>
                    <span>{element.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
          <div className="flex flex-col gap-[24px]">
            {newCoinData.blockchainLinks.map((link: string, index: number) => (
              <LinkContainer key={index} link={link} sliceIndex={8} />
            ))}
          </div>
        </div>
      </div>
    );
  } else if (isError) {
    content = <p>{error.toString()}</p>;
  }

  return (
    <div>
      <div className="mt-[6vh] mb-[4vh]">
        <Link href="/portfolio">Portfolio / Your {coinName} summary</Link>
      </div>
      {content}
    </div>
  );
}
