"use client";
import { useState, useEffect } from "react";
import { Progress } from "../../components/ui/progress";
import { formatNumber } from "@/lib/format/formatNumber";
import FlashCircle from "../../src/icons/Flash_Circle.svg";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";
import Image from "next/image";

const BannerItem = (props: { children: any }) => {
  const { children } = props;
  return <div className="flex items-center gap-[8px]">{children}</div>;
};

const Banner = () => {
  const [apiData, setApiData] = useState({
    coins: 0,
    marketCap: 0,
    totalVolume: 0,
    btc: 0,
    eth: 0,
  });

  const callAPI = () => {
    fetch("https://api.coingecko.com/api/v3/global")
      .then((res) => res.json())
      .then((result) => {
        const {
          active_cryptocurrencies,
          total_market_cap,
          total_volume,
          market_cap_percentage,
        } = result.data;
        setApiData({
          coins: active_cryptocurrencies.toLocaleString(),
          marketCap: total_market_cap.usd,
          totalVolume: total_volume.usd,
          btc: market_cap_percentage.btc,
          eth: market_cap_percentage.eth,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div className="flex justify-center gap-[4vw] text-xs bg-[--dark-slate-blue] dark:bg-[--haiti] w-full py-[16px] border-y border-[#343046]">
      <BannerItem>
        <Image src={FlashCircle} alt="" />
        <span className="text-[#D1D1D1]">Coins</span>
        <span>{apiData.coins}</span>
      </BannerItem>
      <BannerItem>
        <Image src={ArrowUpGreen} alt="" />
        <span>{formatNumber(apiData.marketCap, false)}</span>
      </BannerItem>
      <BannerItem>
        <span>{formatNumber(apiData.totalVolume, true)}</span>
        <Progress
          className={"bg-[rgb(255,255,255,.4)] w-[53px] h-[6px]"}
          value={apiData.totalVolume}
          color={"bg-[--background]"}
        ></Progress>
      </BannerItem>
      <BannerItem>
        <span>{Number(apiData.btc.toFixed(2))}%</span>
        <Progress
          className={"bg-[rgb(255,255,255,.4)] w-[53px] h-[6px]"}
          value={apiData.btc}
          color={"bg-[#F7931A]"}
        ></Progress>
      </BannerItem>
      <BannerItem>
        <span>{Number(apiData.eth.toFixed(2))}%</span>
        <Progress
          className={"bg-[rgb(255,255,255,.4)] w-[53px] h-[6px]"}
          value={apiData.eth}
          color={"bg-[#849DFF]"}
        ></Progress>
      </BannerItem>
    </div>
  );
};
export default Banner;
