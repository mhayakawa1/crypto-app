"use client";
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
  const currency = useAppSelector((state) => state.currency);

  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGlobalQuery();

  const BannerItems = () => {
    const {
      data: {
        active_cryptocurrencies,
        total_market_cap,
        total_volume,
        market_cap_percentage,
      },
    } = data;
    return (
      <div className="flex justify-center gap-[4vw]">
        <BannerItem>
          <Image src={FlashCircle} alt="" />
          <span className="text-[#D1D1D1]">Coins</span>
          <span>{active_cryptocurrencies.toLocaleString()}</span>
        </BannerItem>
        <BannerItem>
          <Image src={ArrowUpGreen} alt="" />
          <span>{formatNumber(total_market_cap[currency], false)}</span>
        </BannerItem>
        <BannerItem>
          <span>{formatNumber(total_volume[currency], true)}</span>
          <Progress
            className={"bg-[rgb(255,255,255,.4)] w-[53px] h-[6px]"}
            value={total_volume[currency]}
            color={"bg-[--background]"}
          ></Progress>
        </BannerItem>
        <BannerItem>
          <span>{Number(market_cap_percentage.btc.toFixed(2))}%</span>
          <Progress
            className={"bg-[rgb(255,255,255,.4)] w-[53px] h-[6px]"}
            value={market_cap_percentage.btc}
            color={"bg-[#F7931A]"}
          ></Progress>
        </BannerItem>
        <BannerItem>
          <span>{Number(market_cap_percentage.eth.toFixed(2))}%</span>
          <Progress
            className={"bg-[rgb(255,255,255,.4)] w-[53px] h-[6px]"}
            value={market_cap_percentage.eth}
            color={"bg-[#849DFF]"}
          ></Progress>
        </BannerItem>
      </div>
    );
  };

  return (
    <div className="flex justify-center text-xs bg-[--dark-slate-blue] dark:bg-[--haiti] w-full py-[16px] border-y border-[#343046]">
      {isLoading && <span>Loading...</span>}
      {isSuccess && <BannerItems />}
      {isError && <span>Error: {error.toString()}</span>}
    </div>
  );
};
export default Banner;
