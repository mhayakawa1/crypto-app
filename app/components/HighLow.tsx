"use client";
import Image from "next/image";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";
import ArrowDownRed from "../../src/icons/Arrow_Down_Red.svg";

const HighLow = (props: { price: string; time: string; high: boolean }) => {
  const { price, time, high } = props;
  return (
    <li className="high-low flex justify-start gap-[16px] h-[44px]">
      <Image
        width={16}
        height={16}
        style={{
          width: "auto",
          height: "auto",
          maxHeight: "8px",
          maxWidth: "16px",
        }}
        className="mt-[20px]"
        src={high ? ArrowUpGreen.src : ArrowDownRed.src}
        alt=""
      />
      <ul className="text-base/[14px] text-nowrap">
        <li>
          All time {high ? "high" : "low"}:{" "}
          <span className="text-xl">{price}</span>
        </li>
        <li className="date text-sm text-[#b9b9ba]">{time}</li>
      </ul>
    </li>
  );
};

export default HighLow;