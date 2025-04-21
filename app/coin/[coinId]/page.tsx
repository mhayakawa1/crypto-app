"use client";
import { use, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCoinQuery } from "@/lib/features/api/apiSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addLocalStorage } from "@/lib/features/portfolio/portfolioSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Plus from "./../../../src/icons/Plus.svg";
import PortfolioWhite from "./../../../src/icons/Portfolio_White.svg";
import PortfolioBlue from "./../../../src/icons/Portfolio_Blue.svg";
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
    <Panel className="flex justify-center items-center px-[20px] gap[16px] font-medium text-base/[24px] h-[52px]">
      <a
        href={link}
        target="_blank"
        className="flex items-center justify-center bg-[--perano] dark:bg-transparent aspect-square w-[24px] h-[24px] p-[2px] rounded-[4px]"
      >
        <Image src={LinkWhite} alt="" className="w-[20px] h-auto" />
      </a>
      <p className="mx-[16px] w-full text-center truncate">{shortenedLink}</p>
      <button
        onClick={copyText}
        className="flex items-center justify-center bg-[--perano] dark:bg-transparent aspect-square w-[24px] h-[24px] p-[4px] rounded-[4px]"
      >
        <Image src={CopyWhite} alt="" className="w-[20px] h-auto" />
      </button>
    </Panel>
  );
};

const HighLow = (props: { price: string; time: string; high: boolean }) => {
  const { price, time, high } = props;
  return (
    <li className="high-low flex justify-start gap-[16px] h-[44px]">
      <Image
        width={16}
        height={16}
        style={{ width: "auto", height: "auto" }}
        className="mt-[8px]"
        src={high ? ArrowUpGreen.src : ArrowDownRed.src}
        alt=""
      />
      <ul className="text-base/[14px] text-nowrap">
        <li>
          All time {high ? "high" : "low"}:{" "}
          <span className="text-xl">{price}</span>
        </li>
        <li className="date text-sm text-[#b9b9ba]">{time}</li>
      </ul>
    </li>
  );
};

export default function CoinPage(props: { params: Params }) {
  const { coinId } = use(props.params);
  const coinName = coinId[0].toUpperCase() + coinId.slice(1);
  const portfolio = useAppSelector((state) => state.portfolio);
  const dispatch = useAppDispatch();
  const darkActive = useAppSelector((state) => state.theme)[0].darkActive;
  const [textHidden, setTextHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [coinData, setCoinData] = useState({
    src: "",
    name: "",
    price: "",
    priceChange: "",
    profit: "--",
    high: "",
    highDate: "",
    lowDate: "",
    low: "",
    rising: true,
    homeLink: "",
    description: "",
    blockchainLinks: ["", "", ""],
    listData: [
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
    ],
  });

  const toggleDescription = () => {
    setTextHidden((current) => !current);
  };

  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useCoinQuery({ coinId: coinId, date: "" });

  const getCoinData = useCallback(() => {
    const { image, symbol, name, description, links, market_data } = data;
    const {
      current_price,
      price_change_percentage_24h,
      ath_date,
      atl_date,
      high_24h,
      low_24h,
    } = market_data;
    let newListData = coinData.listData;

    const getValue = (string: string) => {
      let value = market_data;
      const keys = string.split(".");
      keys.forEach((k) => {
        value = value[k];
      });
      return value;
    };

    newListData = newListData.map((element) => {
      if (element.key) {
        element.value = getValue(element.key);
      }
      if (element.currency.symbol === "symbol") {
        element.currency.symbol = symbol;
      }
      return element;
    });

    newListData[3].value = (
      Number(newListData[2].value) / Number(newListData[0].value)
    ).toFixed(5);

    newListData = newListData.map((element) => {
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

    const asset = portfolio.find((asset: any) => asset.name === name);
    let profit = "--";
    if (asset) {
      const profitNumber =
        (current_price.usd - asset.initialPrice) * asset.coinAmount;
      const loss = profitNumber < 0;
      profit = profitNumber.toLocaleString();
      if (loss) {
        profit = profit.slice(0, 1) + "$" + profit.slice(1);
      } else {
        profit = "$" + profit;
      }
    }

    const newCoinData = {
      src: `${image.small}`,
      name: `${name}`,
      price: `$${current_price.usd.toLocaleString()}`,
      priceChange: `${price_change_percentage_24h.toFixed(2)}`,
      profit: profit,
      high: `$${high_24h.usd.toLocaleString()}`,
      low: `$${low_24h.usd.toLocaleString()}`,
      highDate: new Date(ath_date.usd).toString().slice(0, 28),
      lowDate: new Date(atl_date.usd).toString().slice(0, 28),
      rising: price_change_percentage_24h > 0,
      homeLink: `${links.homepage[0]}`,
      description: description.en,
      blockchainLinks: [...links.blockchain_site.slice(2, 5)],
      listData: [...newListData],
    };
    setCoinData(newCoinData);
  }, [coinData.listData, data, portfolio]);

  useEffect(() => {
    if (isSuccess && !coinData.name) {
      getCoinData();
    } else if (isError && "error" in error) {
      setErrorMessage(error.error);
    }
    const storageItem = localStorage.getItem("portfolio");
    if (storageItem && !portfolio.length) {
      dispatch(addLocalStorage(JSON.parse(storageItem)));
    }
  }, [
    data,
    isSuccess,
    error,
    isError,
    coinData.name,
    getCoinData,
    portfolio.length,
    dispatch,
  ]);

  return (
    <div>
      <div className="mt-[6vh] mb-[4vh]">
        <Link href="/portfolio">Portfolio / Your {coinName} summary</Link>
      </div>
      {isLoading && <h2>Loading...</h2>}
      {isSuccess && (
        <div className="flex flex-col gap-[8vh] w-full justify-between">
          <div className="w-full flex md:max-xl:flex-col justify-between gap-[4vw] md:max-xl:gap-[4vh]">
            <div className="flex justify-between gap-[4vw]">
              <div className="flex justify-between flex-col gap-[16px] w-[44%]">
                <Panel className="flex justify-center items-center flex-col grow gap-[24px]">
                  <div className="p-[16px] rounded-xl w-[64px] h-[64px] bg-[--lavender] dark:bg-[--space-cadet]">
                    <Avatar className="rounded-full w-[32px] h-[32px]">
                      <AvatarImage src={coinData.src} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <h2>{coinName}</h2>
                </Panel>
                <LinkContainer link={coinData.homeLink} sliceIndex={7} />
              </div>
              <Panel className="flex justify-center items-center grow p-[40px]">
                <ul className="self-center flex flex-col justify-center gap-[20px] h-fit">
                  <li className="flex items-end gap-[16px] h-[25px]">
                    <span className="text-4xl/[24px] font-bold">
                      {coinData.price}
                    </span>
                    <span
                      className={`${
                        coinData.rising ? "text-[--rising]" : "text-[--falling]"
                      } h-[14px] flex items-end`}
                    >
                      <Image
                        src={
                          coinData.rising ? ArrowUpGreen.src : ArrowDownRed.src
                        }
                        width={9}
                        height={5}
                        className="self-start w-[9px] h-[5px] mx-[5px]"
                        alt=""
                      />
                      <span className="text-xl/[14px]">
                        {coinData.priceChange}%
                      </span>
                    </span>
                  </li>
                  <li className="text-xl/[16px] text-left">
                    Profit:
                    <span
                      className={`${
                        coinData.rising ? "text-[--rising]" : "text-[--falling]"
                      } text-2xl ml-[16px]`}
                    >
                      {coinData.profit}
                    </span>
                  </li>
                  <li className="flex justify-center self-center mx-auto w-[24px] h-[24px]">
                    <Image
                      width={24}
                      height={24}
                      src={darkActive ? PortfolioWhite : PortfolioBlue}
                      alt=""
                    />
                  </li>
                  <HighLow
                    price={coinData.high}
                    time={coinData.highDate}
                    high={true}
                  />
                  <HighLow
                    price={coinData.low}
                    time={coinData.lowDate}
                    high={false}
                  />
                </ul>
              </Panel>
            </div>
            <Panel className="grow flex items-center justify-center p-[24px] md:max-xl:aspect-auto">
              <ul className="flex flex-col gap-[12px]">
                {coinData.listData.map((element, index) => (
                  <li
                    key={index}
                    className={`flex justify-between gap-[24px] text-base/[20px] ${
                      index === 4 && "mt-[32px]"
                    }`}
                  >
                    <span className="flex flex-1 gap-[24px]">
                      <span className="w-[24px] h-[24px] rounded-full p-[1px] flex items-center justify-center bg-gradient-to-b from-[--soft-blue] to-[--perano] dark:to-[--american-blue] shadow-[4px_4px_15px_2px_#7878fa26]">
                        <span className="bg-[--perano] dark:bg-[--american-blue]  mt-[.25px] ml-[.25px] rounded-full w-full h-full flex items-center justify-center">
                          <Image src={Plus} alt=""></Image>
                        </span>
                      </span>
                      <span>{element.name}</span>
                    </span>
                    <span>{element.value}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
          <div className="w-full flex justify-between">
            <div className="flex flex-col gap-[24px] w-[50%]">
              <h4 className="text-xl font-medium">Description</h4>
              <p
                className={`${
                  textHidden
                    ? "overflow-hidden text-ellipsis h-[210px]"
                    : "flex flex-col h-auto"
                } relative text-sm/[21px] w-100`}
              >
                {coinData.description}
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
            <div className="flex flex-col gap-[24px] w-[40%]">
              {coinData.blockchainLinks.map((link: string, index: number) => (
                <LinkContainer key={index} link={link} sliceIndex={8} />
              ))}
            </div>
          </div>
        </div>
      )}
      {isError && <h2>{errorMessage}</h2>}
    </div>
  );
}
