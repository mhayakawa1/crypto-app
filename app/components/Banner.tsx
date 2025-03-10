"use client";
import { Progress } from "../../components/ui/progress";
import FlashCircle from "../../src/icons/Flash_Circle.svg";
import Exchange from "../../src/icons/Exchange.svg";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";
import Image from "next/image";

const BannerItem = (props: { children: any }) => {
  const { children } = props;
  return <div className="flex items-center gap-[8px]">{children}</div>;
};

const Banner = () => {
  const data = {
    coins: 7884,
    exchange: 622,
    t: 1.69,
    price: 21,
    btc: 44,
    eth: 21,
  };
  
  return (
    <div className="flex justify-center gap-[4vw] text-xs bg-[rgb(30,25,50)] w-[100%] py-[16px] border-y border-[#343046]">
      <BannerItem>
        <Image src={FlashCircle} alt="" />
        <span className="text-[#D1D1D1]">Coins</span>
        <span>7884</span>
      </BannerItem>
      <BannerItem>
        <Image src={Exchange} alt="" />
        <span className="text-[#D1D1D1]">Exchange</span>
        <span>622</span>
      </BannerItem>
      <BannerItem>
        <Image src={ArrowUpGreen} alt="" />
        <span>1.69 T</span>
      </BannerItem>
      <BannerItem>
        <span>$124.45B</span>
        <Progress
          className={"bg-[rgb(255,255,255,.4)] w-[53px] h-[6px]"}
          value={data.price}
          color={"bg-[--background]"}
        ></Progress>
      </BannerItem>
      <BannerItem>
        <span>44%</span>
        <Progress
          className={"bg-[rgb(255,255,255,.4)] w-[53px] h-[6px]"}
          value={data.btc}
          color={"bg-[#F7931A]"}
        ></Progress>
      </BannerItem>
      <BannerItem>
        <span>21%</span>
        <Progress
          className={"bg-[rgb(255,255,255,.4)] w-[53px] h-[6px]"}
          value={data.eth}
          color={"bg-[#849DFF]"}
        ></Progress>
      </BannerItem>
    </div>
  );
};
export default Banner;
