"use client";
import { useEffect, useState } from "react";
import { Progress } from "../../components/ui/progress";
import { formatNumber } from "@/lib/format/formatNumber";
import { useGlobalQuery } from "@/lib/features/api/apiSlice";
import { useAppSelector } from "@/lib/hooks";
import FlashCircle from "../../src/icons/Flash_Circle.svg";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";
import Image from "next/image";

const BannerItem = (props: { children: any }) => {
  const { children } = props;
  return <div className="flex items-center gap-[8px]">{children}</div>;
};

const Banner = () => {
  const { currency: currency } = useAppSelector((state) => state.currency);
  const [errorMessage, setErrorMessage] = useState("");
  const [bannerData, setBannerData] = useState({
    coins: 0,
    marketCap: 0,
    totalVolume: 0,
    btc: 0,
    eth: 0,
  });

  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGlobalQuery();

  useEffect(() => {
    if (isSuccess) {
      const {
        data: {
          active_cryptocurrencies,
          total_market_cap,
          total_volume,
          market_cap_percentage,
        },
      } = data;
      setBannerData({
        coins: active_cryptocurrencies,
        marketCap: total_market_cap[currency],
        totalVolume: total_volume[currency],
        btc: market_cap_percentage.btc,
        eth: market_cap_percentage.eth,
      });
    }
    if (isError && "error" in error) {
      setErrorMessage(error.error);
    }
  }, [data, currency, error, isError, isSuccess]);

  return (
    <div className="flex justify-center text-xs bg-[--dark-slate-blue] dark:bg-[--haiti] w-full py-[16px] border-y border-[#343046]">
      {isLoading && <span>Loading...</span>}
      {isSuccess && (
        <div className="flex justify-center gap-[4vw]">
          <BannerItem>
            <Image src={FlashCircle} alt="" />
            <span className="text-[#D1D1D1]">Coins</span>
            <span>{bannerData.coins}</span>
          </BannerItem>
          <BannerItem>
            <Image src={ArrowUpGreen} alt="" />
            <span>{formatNumber(bannerData.marketCap, "")}</span>
          </BannerItem>
          <BannerItem>
            <span>{formatNumber(bannerData.totalVolume, "")}</span>
            <Progress
              className={"bg-[rgb(255,255,255,.4)] w-[53px] h-[6px]"}
              value={bannerData.totalVolume}
              color={"bg-[--background]"}
            ></Progress>
          </BannerItem>
          <BannerItem>
            <span>{Number(bannerData.btc.toFixed(2))}%</span>
            <Progress
              className={"bg-[rgb(255,255,255,.4)] w-[53px] h-[6px]"}
              value={bannerData.btc}
              color={"bg-[#F7931A]"}
            ></Progress>
          </BannerItem>
          <BannerItem>
            <span>{Number(bannerData.eth.toFixed(2))}%</span>
            <Progress
              className={"bg-[rgb(255,255,255,.4)] w-[53px] h-[6px]"}
              value={bannerData.eth}
              color={"bg-[#849DFF]"}
            ></Progress>
          </BannerItem>
        </div>
      )}
      {isError && <span>{errorMessage}</span>}
    </div>
  );
};
export default Banner;
