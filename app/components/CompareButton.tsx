"use client";
import Image from "next/image";
import CompareWhite from "../../src/icons/Compare_White.svg";
import XWhite from "../../src/icons/X_White.svg";

const CompareButton = (props: { compareData: any; toggleCompare: any }) => {
  const { compareData, toggleCompare } = props;
  const buttonInfo = [
    { src: CompareWhite, text: "Compare" },
    { src: XWhite, text: "Exit Comparison" },
  ];
  const index = compareData ? 1 : 0;
  return (
    <button
      onClick={toggleCompare}
      className="flex items-center gap-[10px] max-md:gap-[5px] lg:2xl:gap-[20px] px-[24px] lg:2xl:px-[48px] py-[12px] lg:2xl:py-[24px] max-sm:p-[10px] lg:2xl:p-[20px] max-sm:text-xs lg:2xl:text-3xl rounded-[6px] lg:2xl:rounded-[12px] w-fit bg-[--perano] dark:bg-[--dark-gunmetal]"
    >
      <Image
        src={buttonInfo[index].src.src}
        alt=""
        width={20}
        height={20}
        className="max-sm:w-[10px] lg:2xl:w-[36px] max-sm:h-[10px] lg:2xl:h-[36px]"
      />
      <span>{buttonInfo[index].text}</span>
    </button>
  );
};

export default CompareButton;
