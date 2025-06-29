"use client";
import { Progress } from "../../components/ui/progress";
import { formatNumber } from "@/lib/format/formatNumber";
import { useAppSelector } from "@/lib/hooks";
import BannerItem from "./BannerItem";
import FlashCircle from "../../src/icons/Flash_Circle.svg";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";
import BTC from "../../src/icons/BTC.svg";
import ETH from "../../src/icons/ETH.svg";
import Image from "next/image";

const BannerItems: any = (props: { bannerData: any }) => {
  const { bannerData } = props;
  const view = useAppSelector((state) => state.view);
  const mobileView = view[0].mobileView;
  const { currency: currency, symbol } = useAppSelector(
    (state) => state.currency
  );

  return (
    <div className="w-full flex justify-center max-sm:justify-evenly sm:gap-[4vw]">
      {!mobileView && (
        <BannerItem>
          <Image
            src={FlashCircle}
            alt=""
            className="lg:2xl:h-[24px] lg:2xl:w-[24px]"
          />
          <span className="text-[#D1D1D1] lg:2xl:text-2xl">Coins</span>
          <span className="lg:2xl:text-2xl">
            {formatNumber(bannerData.coins, "")}
          </span>
        </BannerItem>
      )}
      {!mobileView && (
        <BannerItem>
          <Image src={ArrowUpGreen} alt="" className="lg:2xl:h-[8px] w-auto" />
          <span className="lg:2xl:text-2xl">
            {formatNumber(bannerData.marketCap[currency], "")}
          </span>
        </BannerItem>
      )}
      <BannerItem>
        <span className="lg:2xl:text-2xl">
          {formatNumber(bannerData.totalVolume[currency], symbol)}
        </span>
        <Progress
          className="bg-[rgb(255,255,255,.4)] w-[53px] max-sm:w-[42px] lg:2xl:w-[106px] h-[6px] lg:2xl:h-[12px]"
          value={bannerData.totalVolume}
          color={"bg-[--background]"}
        />
      </BannerItem>
      <BannerItem>
        <span className="flex items-center gap-[2px] lg:2xl:text-2xl">
          <Image
            src={BTC}
            alt=""
            className="w-auto h-[12px] lg:2xl:h-[24px] aspect-square"
          />
          {Math.round(Number(bannerData.btc))}%
        </span>
        <Progress
          className={
            "bg-[rgb(255,255,255,.4)] w-[53px] max-sm:w-[42px] lg:2xl:w-[106px] h-[6px] lg:2xl:h-[12px] max-sm:text-xs"
          }
          value={bannerData.btc}
          color={"bg-[#F7931A]"}
        />
      </BannerItem>
      <BannerItem>
        <span className="flex items-center gap-[2px] lg:2xl:gap-[4px] lg:2xl:text-2xl">
          <Image
            src={ETH}
            alt=""
            className="w-auto h-[12px] lg:2xl:h-[24px] aspect-square"
          />
          {Math.round(Number(bannerData.eth))}%
        </span>
        <Progress
          className={
            "bg-[rgb(255,255,255,.4)] w-[53px] max-sm:w-[42px] lg:2xl:w-[106px] h-[6px] lg:2xl:h-[12px] max-sm:text-xs"
          }
          value={bannerData.eth}
          color={"bg-[#849DFF]"}
        />
      </BannerItem>
    </div>
  );
};
export default BannerItems;
