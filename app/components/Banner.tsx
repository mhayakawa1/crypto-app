"use client";
import FlashCircle from "../src/icons/Flash_Circle.svg";
import Exchange from "../src/icons/Exchange.svg";
import ArrowUpGreen from "../src/icons/Arrow_Up_Green.svg";
import Image from "next/image";

const BannerItem = (props: { children: any }) => {
  const { children } = props;
  return <div className="flex items-center gap-[8px]">{children}</div>;
};

const Banner = () => {
  //#343046
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
      <BannerItem><span>$124.45B</span></BannerItem>
      <BannerItem><span>44%</span></BannerItem>
      <BannerItem><span>21%</span></BannerItem>
    </div>
  );
};
export default Banner;
