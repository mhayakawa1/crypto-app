"use client";
import Image from "next/image";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";
import ArrowDownRed from "../../src/icons/Arrow_Down_Red.svg";

const HighLow = (props: { price: string; time: string; high: boolean }) => {
  const { price, time, high } = props;
  return (
    <li className="flex justify-start gap-[16px] lg:2xl:gap-[24px] h-[44px] lg:2xl:h-[66px]">
      <Image
        width="0"
        height="0"
        className="w-[8px] max-sm:w-[6px] lg:2xl:w-[12px] h-auto my-auto"
        src={high ? ArrowUpGreen.src : ArrowDownRed.src}
        alt=""
      />
      <ul className="text-base max-sm:text-sm lg:2xl:text-2xl text-nowrap">
        <li>
          All time {high ? "high" : "low"}:{" "}
          <span className="text-xl max-sm:text-base lg:2xl:text-3xl">
            {price}
          </span>
        </li>
        <li className="date text-sm max-sm:text-xs lg:2xl:text-lg text-[#b9b9ba]">
          {time}
        </li>
      </ul>
    </li>
  );
};

export default HighLow;
