"use client";
import Image from "next/image";
import { Progress } from "../../components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Edit from "../../src/icons/Edit_White.svg";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";
import ArrowDownRed from "../../src/icons/Arrow_Down_Red.svg";
import XWhite from "../../src/icons/X_White.svg";

const PortfolioAsset = (props: {
  toggleAddModal: any;
  toggleDeleteModal: any;
  assetData: any;
  apiData: any;
  index: number;
}) => {
  const { toggleAddModal, toggleDeleteModal, assetData, apiData, index } = props;
  const {
    initialPrice,
    coinAmount,
    date,
  } = assetData;
  const {
      circulating,
      src,
      marketCap,
      name,
      price,
      priceChange,
      symbol,
      totalVolume,    
  } = apiData;
  const valueColors = [
    { bg: "--bg-falling", color: "--falling" },
    { bg: "--bg-rising", color: "--rising" },
  ];
  const changeSincePurchase = Number(
    (((price - initialPrice) / Math.abs(initialPrice)) * 100).toFixed(2)
  );
  const sincePurchaseColors = valueColors[Number(changeSincePurchase >= 0)];
  const defaultColors = valueColors[Number(priceChange >= 0)];

  const marketPriceData = [
    {
      name: "Current Price",
      value: `$${price.toLocaleString()}`,
      arrow: false,
      colors: defaultColors,
    },
    {
      name: "Price Change 24h",
      value: Number(priceChange.toFixed(2)),
      arrow: true,
      colors: defaultColors,
    },
    {
      name: "Volume vs. Market Cap",
      value: (totalVolume / (totalVolume + marketCap)) * 100,
      arrow: false,
      colors: defaultColors,
    },
    {
      name: "Circulating Supply",
      value: `$${circulating.toLocaleString()}`,
      arrow: false,
      colors: defaultColors,
    },
  ];

  const yourCoinData = [
    { name: "Amount", value: coinAmount, arrow: false, colors: defaultColors },
    {
      name: "Amount Value",
      value: `$${(Number(coinAmount) * price).toLocaleString()}`,
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

  const ListItem = (listItem: any) => {
    const { name, value, arrow, colors } = listItem.listItem;
    return (
      <li className="flex flex-col justify-center items-center">
        <ul className="flex flex-col justify-between text-center list-none gap-[16px]">
          <li className="flex justify-center">{name}</li>
          <li
            className={`flex justify-center text-[${colors.color}] text-base/[16px]`}
          >
            {arrow && (
              <span className="flex items-center justify-center w-[16px]">
                <Image
                  src={
                    colors.color === "--rising" ? ArrowUpGreen : ArrowDownRed
                  }
                  alt=""
                />
              </span>
            )}
            {name === "Volume vs. Market Cap" ? (
              <Progress
                className={`bg-[${colors.bg}]`}
                value={value}
                color={`bg-[${colors.color}]`}
              ></Progress>
            ) : (
              <span>{value}</span>
            )}
          </li>
        </ul>
      </li>
    );
  };

  const List = (props: { data: any; heading: string; children: any }) => {
    const { data, heading, children } = props;
    return (
      <div className="grow">
        <div className="flex justify-between">
          <h4>{heading}</h4>
          {children}
        </div>
        <ul className="flex justify-between items-start list-none pt-[14px]">
          {data.map((listItem: any) => (
            <ListItem key={listItem.name} listItem={listItem} />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex border dark:border-[#191932] rounded-[6px] bg-white">
      <div className="grow flex flex-col justify-center items-center gap-[24px]  text-[--dark-slate-blue] dark:text-white dark:bg-[#1e1932] p-[24px]">
        <div className="w-[64px] h-[64px] rounded-[8px] flex justify-center items-center bg-[--lavender] dark:bg-[--space-cadet]">
          <Avatar>
            <AvatarImage src={src} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <h3 className="font-bold text-[28px] text-center">
          {name} ({symbol.toUpperCase()})
        </h3>
      </div>
      <div className="flex flex-col gap-[24px] w-[80%] text-[--dark-slate-blue] dark:text-white dark:bg-[#191932] p-[32px]">
        <List data={marketPriceData} heading="Market price">
          <div className="flex gap-[8px]">
            <button
              className="flex justify-center bg-[--perano] dark:bg-[#3A3978] w-[40px] h-[40px] rounded-[4px]"
              onClick={() => toggleAddModal(assetData, index)}
            >
              <Image src={Edit} alt="" />
            </button>
            <button
              className="flex justify-center bg-[--perano] dark:bg-[#3A3978] w-[40px] h-[40px] rounded-[4px]"
              onClick={() => toggleDeleteModal(assetData, index)}
            >
              <Image src={XWhite} alt="" />
            </button>
          </div>
        </List>
        <span className="w-full h-[1px] bg-[--dark-slate-blue] dark:bg-white"></span>
        <List data={yourCoinData} heading="Your coin">
          {null}
        </List>
      </div>
    </div>
  );
};

export default PortfolioAsset;
