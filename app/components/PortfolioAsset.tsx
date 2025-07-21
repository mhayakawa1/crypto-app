"use client";
import AssetList from "./AssetList";
import AssetButton from "./AssetButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Edit from "../../src/icons/Edit_White.svg";
import XWhite from "../../src/icons/X_White.svg";

const PortfolioAsset = (props: {
  toggleAddModal: any;
  toggleDeleteModal: any;
  assetData: any;
  apiData: any;
  index: number;
  currency: any;
}) => {
  const {
    toggleAddModal,
    toggleDeleteModal,
    assetData,
    apiData,
    index,
    currency,
  } = props;
  const currencySymbol = `${currency.symbol}${
    currency.symbol.length > 1 ? " " : ""
  }`;
  const { initialPrice, coinAmount, name, src, symbol, date } = assetData;
  const { circulating, marketCap, price, priceChange, totalVolume } = apiData;
  const initialPriceValue = initialPrice[currency.currency];
  const valueColors = [
    { bg: "--bg-falling", color: "--falling" },
    { bg: "--bg-rising", color: "--rising" },
  ];
  const changeSincePurchase = Number(
    (((price - initialPriceValue) / Math.abs(initialPriceValue)) * 100).toFixed(
      2
    )
  );
  const sincePurchaseColors = valueColors[Number(changeSincePurchase >= 0)];
  const defaultColors = priceChange ? valueColors[Number(priceChange >= 0)] : valueColors[0];
  const marketPriceData = [
    {
      name: "Current Price",
      value: price ? `${currencySymbol}${price.toLocaleString()}` : "--",
      arrow: false,
      colors: defaultColors,
    },
    {
      name: "Price Change 24h",
      value: priceChange ? `${Number(priceChange.toFixed(2))}%` : '--',
      arrow: true,
      colors: defaultColors,
    },
    {
      name: "Volume vs. Market Cap",
      value: marketCap && totalVolume ? (totalVolume / (totalVolume + marketCap)) * 100 : "--",
      arrow: false,
      colors: defaultColors,
    },
    {
      name: "Circulating Supply",
      value: circulating
        ? `${currencySymbol}${Math.round(circulating).toLocaleString()}`
        : "--",
      arrow: false,
      colors: defaultColors,
    },
  ];

  const yourCoinData = [
    { name: "Amount", value: coinAmount, arrow: false, colors: defaultColors },
    {
      name: "Amount Value",
      value: price
        ? `${currencySymbol}${(Number(coinAmount) * price).toLocaleString()}`
        : "--",
      arrow: true,
      colors: sincePurchaseColors,
    },
    {
      name: "Change Since Purchase",
      value: `${changeSincePurchase}%`,
      arrow: true,
      colors: sincePurchaseColors,
    },
    { name: "Purchase Date", value: date, arrow: false, colors: defaultColors },
  ];

  return (
    <div className="bg-white dark:bg-[--haiti] flex max-md:flex-col max-md:gap-[16px] lg:2xl:gap-[24px] border dark:border-[--mirage] rounded-[6px] max-md:p-[20px] lg:2xl:rounded-[9px]">
      <div className="grow flex flex-col max-md:flex-row-reverse justify-center max-md:justify-between items-center gap-[24px] lg:2xl:gap-[36px] text-[--dark-slate-blue] dark:text-white md:border-r">
        <div className="p-0 w-[64px] max-md:w-auto lg:2xl:w-[96px] aspect-square rounded-[8px] lg:2xl:rounded-[12px] flex justify-center items-center bg-[--lavender] dark:bg-[--space-cadet] max-md:bg-transparent max-md:dark:bg-transparent">
          <Avatar className="w-[32px] lg:2xl:w-[48px] h-[32px] lg:2xl:h-[48px] aspect-square">
            <AvatarImage src={src} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <h3 className="font-bold text-3xl max-md:text-xl lg:2xl:text-5xl text-center">
          {name} ({symbol.toUpperCase()})
        </h3>
      </div>
      <div className="flex flex-col gap-[24px] lg:2xl:gap-[36px] w-[90%] max-md:w-full text-[--dark-slate-blue] dark:text-white p-[32px] lg:2xl:p-[48px] max-md:p-0">
        <AssetList data={marketPriceData} heading="Market price">
          <div className="flex gap-[8px] lg:2xl:gap-[12px]">
            <AssetButton
              toggleAddModal={toggleAddModal}
              assetData={assetData}
              index={index}
              src={Edit}
            />
            <AssetButton
              toggleAddModal={toggleDeleteModal}
              assetData={assetData}
              index={index}
              src={XWhite}
            />
          </div>
        </AssetList>
        <span className="w-full h-[1px] bg-[--dark-slate-blue] dark:bg-white"></span>
        <AssetList data={yourCoinData} heading="Your coin">
          {null}
        </AssetList>
      </div>
    </div>
  );
};

export default PortfolioAsset;
