"use client";
import { use, useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCoinQuery } from "@/lib/features/api/apiSlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import { addLocalStorage } from "@/lib/features/portfolio/portfolioSlice";
import { formatNumber } from "@/lib/format/formatNumber";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Plus from "./../../../src/icons/Plus.svg";
import PortfolioWhite from "./../../../src/icons/Portfolio_White.svg";
import PortfolioBlue from "./../../../src/icons/Portfolio_Blue.svg";
import ArrowUpGreen from "./../../../src/icons/Arrow_Up_Green.svg";
import ArrowDownRed from "./../../../src/icons/Arrow_Down_Red.svg";
import Panel from "../../components/Panel";
import HighLow from "../../components/HighLow";
import LinkContainer from "../../components/LinkContainer";

type Params = Promise<{ coinId: string }>;

export default function CoinPage(props: { params: Params }) {
  const { coinId } = use(props.params);
  const coinName = coinId[0].toUpperCase() + coinId.slice(1);
  const portfolio = useAppSelector((state) => state.portfolio);
  const { currency, symbol } = useAppSelector((state) => state.currency);
  const prevCurrency = useRef<any>(null);
  const view = useAppSelector((state) => state.view);
  const mobileView = view[0].mobileView;
  const dispatch = useAppDispatch();
  const darkActive = useAppSelector((state) => state.theme)[0].darkActive;
  const [textHidden, setTextHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [initialRender, setInitialRender] = useState(true);
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
        key: "market_cap",
        value: "",
        mobileValue: "",
        currency: { symbol: symbol, start: true },
      },
      {
        name: "Fully Diluted Valuation",
        key: "fully_diluted_valuation",
        value: "",
        mobileValue: "",
        currency: { symbol: symbol, start: true },
      },
      {
        name: "Volume 24h",
        key: "total_volume",
        value: "",
        mobileValue: "",
        currency: { symbol: symbol, start: true },
      },
      {
        name: "Volume/Market",
        key: "",
        value: "",
        mobileValue: "",
        currency: { symbol: "", start: true },
      },
      {
        name: "Total Volume",
        key: "total_volume",
        value: "",
        mobileValue: "",
        currency: { symbol: "symbol", start: false },
      },
      {
        name: "Circulating Supply",
        key: "circulating_supply",
        value: "",
        mobileValue: "",
        currency: { symbol: "symbol", start: false },
      },
      {
        name: "Max Supply",
        key: "max_supply",
        value: "",
        mobileValue: "",
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
    refetch,
  } = useCoinQuery({ coinId: coinId, date: "" });

  const getCoinData = useCallback(() => {
    const {
      image,
      symbol: coinSymbol,
      name,
      description,
      links,
      market_data,
    } = data;
    const {
      current_price,
      price_change_percentage_24h,
      ath_date,
      atl_date,
      high_24h,
      low_24h,
    } = market_data;
    let newListData = coinData.listData;
    const space = symbol.length > 1 ? " " : "";
    const getValue = (string: string) => {
      let value = market_data;
      const keys = string.split(".");
      keys.forEach((k) => {
        value = typeof value[k] === "object" ? value[k][currency] : value[k];
      });
      return value;
    };

    newListData = newListData.map((element) => {
      if (element.key) {
        element.value = getValue(element.key);
      }
      if (element.currency.symbol === "symbol") {
        element.currency.symbol = coinSymbol;
      }
      return element;
    });

    newListData[3].value = (
      Number(newListData[2].value) / Number(newListData[0].value)
    ).toFixed(5);

    newListData = newListData.map((element) => {
      const { value, currency } = element;
      element.mobileValue = formatNumber(Number(value), symbol.toUpperCase());
      if (Number(element.value) > 1) {
        element.value = `${
          currency.start ? symbol+space : ""
        }${value.toLocaleString()} ${
          !currency.start ? coinSymbol.toUpperCase() : ""
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
        profit = profit.slice(0, 1) + symbol + profit.slice(1);
      } else {
        profit = symbol + profit;
      }
    }

    const newCoinData = {
      src: `${image.small}`,
      name: `${name}`,
      price: `${symbol}${space}${current_price[currency].toLocaleString()}`,
      priceChange: `${price_change_percentage_24h.toFixed(2)}`,
      profit: profit,
      high: `${symbol}${space}${high_24h[currency].toLocaleString()}`,
      low: `${symbol}${space}${low_24h[currency].toLocaleString()}`,
      highDate: new Date(ath_date[currency]).toString().slice(0, 28),
      lowDate: new Date(atl_date[currency]).toString().slice(0, 28),
      rising: price_change_percentage_24h > 0,
      homeLink: `${links.homepage[0]}`,
      description: description.en,
      blockchainLinks: [...links.blockchain_site.slice(2, 5)],
      listData: [...newListData],
    };
    setCoinData(newCoinData);
  }, [coinData.listData, data, portfolio, currency, symbol]);

  useEffect(() => {
    if (
      (isSuccess && !coinData.name) ||
      (!initialRender && currency !== prevCurrency.current)
    ) {
      getCoinData();
    } else if (isError && "error" in error) {
      setErrorMessage(error.error);
      setTimeout(() => {
        refetch();
      }, 10000);
    }
    const storageItem = localStorage.getItem("portfolio");
    if (storageItem && !portfolio.length) {
      dispatch(addLocalStorage(JSON.parse(storageItem)));
    }
    if (initialRender && prevCurrency.current) {
      setInitialRender(false);
    }
    if (currency) {
      prevCurrency.current = currency;
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
    currency,
    initialRender,
    refetch,
  ]);

  return (
    <div className="pb-[4vh] max-sm:pb-[100px]">
      <div className="mt-[6vh] max-sm:mt-[1vh] mb-[4vh]">
        <Link
          href="/portfolio"
          className="text-[--dark-slate-blue] dark:text-white max-sm:text-sm lg:2xl:text-2xl"
        >
          Portfolio / Your {coinName} summary
        </Link>
      </div>
      {isLoading && (
        <h2 className="lg:2xl:text-4xl text-[--dark-slate-blue] dark:text-white">
          Loading...
        </h2>
      )}
      {isSuccess && (
        <div className="flex flex-col gap-[8vh] w-full max-md:gap-[4vh] justify-between">
          <div className="w-full flex flex-col justify-between gap-[4vw] md:max-xl:gap-[4vh]">
            <div className="flex justify-between max-sm:flex-col gap-[4vw]">
              <div className="flex justify-between flex-col gap-[16px] lg:2xl:gap-[32px] w-[44%] max-sm:w-full">
                <Panel className="flex justify-center max-sm:justify-start items-center flex-col max-sm:flex-row grow gap-[24px] max-sm:gap-[2vw] lg:2xl:gap-[48px] max-sm:py-[2vh] max-sm:px-[2vw]">
                  <div className="p-[16px] max-sm:p-0 lg:2xl:p-[32px] rounded-xl w-[64px] max-sm:w-auto lg:2xl:w-[128px] aspect-square h-auto bg-[--lavender] max-sm:bg-transparent dark:bg-[--space-cadet]">
                    <Avatar className="rounded-full w-[32px] lg:2xl:w-[64px] h-[32px] lg:2xl:h-[64px]">
                      <AvatarImage src={coinData.src} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </div>
                  <h2 className="text-2xl max-sm:text-lg lg:2xl:text-5xl">{coinName}</h2>
                </Panel>
                <LinkContainer
                  link={coinData.homeLink}
                  sliceIndex={coinData.homeLink.indexOf("www.") + 4}
                />
              </div>
              <Panel className="flex justify-center items-center grow p-[40px] lg:2xl:p-[80px] max-sm:px-[2vw]">
                <ul className="self-center flex flex-col justify-center gap-[20px] lg:2xl:gap-[40px] h-fit">
                  <li className="flex items-center gap-[16px] lg:2xl:gap-[32px] h-[25px] lg:2xl:h-[50px]">
                    <span className="text-4xl max-sm:text-3xl lg:2xl:text-7xl font-bold">
                      {coinData.price}
                    </span>
                    <span
                      className={`${
                        coinData.rising ? "text-[--rising]" : "text-[--falling]"
                      } h-[14px] lg:2xl:h-[28px] flex items-center`}
                    >
                      <Image
                        src={
                          coinData.rising ? ArrowUpGreen.src : ArrowDownRed.src
                        }
                        width="0"
                        height="0"
                        className="self-start w-[9px] max-sm:w-[6px] lg:2xl:w-[18px] h-auto mx-[5px] lg:2xl:mx-[10px] my-auto"
                        alt=""
                      />
                      <span className="text-xl max-sm:text-base lg:2xl:text-4xl">
                        {coinData.priceChange}%
                      </span>
                    </span>
                  </li>
                  <li className="text-xl max-sm:text-base lg:2xl:text-4xl text-left">
                    Profit:
                    <span
                      className={`${
                        coinData.profit === "--"
                          ? "text-[---dark-slate-blue]"
                          : coinData.rising
                          ? "text-[--rising]"
                          : "text-[--falling]"
                      } text-2xl max-sm:text-xl lg:2xl:text-5xl ml-[16px] lg:2xl:ml-[32px]`}
                    >
                      {coinData.profit}
                    </span>
                  </li>
                  <li className="flex justify-center self-center mx-auto w-[24px] lg:2xl:w-[48px] aspect-auto">
                    <Image
                      width="0"
                      height="0"
                      src={darkActive ? PortfolioWhite : PortfolioBlue}
                      alt=""
                      className="w-[24px] lg:2xl:w-[48px] h-auto"
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
            <Panel className="grow flex items-center justify-center px-[2vw] py-[4vh] max-sm:px-[2vw] md:max-xl:aspect-auto">
              <ul className="w-full flex flex-col xl:flex-row xl:justify-between xl:flex-wrap gap-[12px] xl:gap-[4vh]">
                {coinData.listData.map((element, index) => (
                  <li
                    key={index}
                    className={`xl:h-[24px] xl:w-[48%] flex xl:flex-wrap justify-between gap-[24px] lg:2xl:gap-[48px] text-base max-sm:text-sm lg:2xl:text-3xl ${
                      index === 4 && "mt-[32px] xl:mt-0"
                    }`}
                  >
                    <span className="flex flex-1 gap-[24px] max-sm:gap-[2vw]">
                      <span className="w-[24px] max-sm:w-[18px] h-[24px] max-sm:h-[18px] rounded-full p-[1px] flex items-center justify-center bg-gradient-to-b from-[--soft-blue] to-[--perano] dark:to-[--american-blue] shadow-[4px_4px_15px_2px_#7878fa26]">
                        <span className="bg-[--perano] dark:bg-[--american-blue] mt-[.25px] ml-[.25px] rounded-full w-full h-full flex items-center justify-center">
                          <Image
                            src={Plus}
                            alt=""
                            width="0"
                            height="0"
                            className="max-sm:w-[12px] max-sm:h-[12px]"
                          ></Image>
                        </span>
                      </span>
                      <span>{element.name}</span>
                    </span>
                    <span>
                      {mobileView ? element.mobileValue : element.value}
                    </span>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
          <div className="w-full flex justify-between max-md:flex-col-reverse max-md:gap-[4vh]">
            <div className="flex flex-col gap-[2vh] w-[50%] max-md:w-full">
              <h4 className="text-xl lg:2xl:text-4xl font-medium text-[--dark-slate-blue] dark:text-white">
                Description
              </h4>
              <p
                className={`${
                  textHidden
                    ? "overflow-hidden text-ellipsis h-[210px]"
                    : "flex flex-col h-auto"
                } relative text-sm/[21px] lg:2xl:text-2xl/[42px] w-full text-[--dark-slate-blue] dark:text-white`}
              >
                {coinData.description}
                <button
                  onClick={toggleDescription}
                  className={`${
                    textHidden ? "absolute bottom-0 right-0" : "self-end"
                  } pl-[16px] lg:2xl:pl-[32px] text-[#6060ff] text-sm lg:2xl:text-2xl h-[21px] lg:2xl:h-[42px] bg-gradient-to-r from-transparent from-0% to-[--light-gray] dark:to-[--black-russian] to-20%`}
                >
                  {textHidden ? "...read more" : "read less"}
                </button>
              </p>
            </div>
            <div className="flex flex-col gap-[24px] lg:2xl:gap-[48px] w-[40%] max-md:w-full">
              {coinData.blockchainLinks.map((link: string, index: number) => (
                <LinkContainer key={index} link={link} sliceIndex={8} />
              ))}
            </div>
          </div>
        </div>
      )}
      {isError && (
        <h2 className="lg:2xl:text-5xl text-[--dark-slate-blue] dark:text-white">
          {errorMessage}
        </h2>
      )}
    </div>
  );
}
