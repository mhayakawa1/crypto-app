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
      className="flex items-center gap-[10px] px-[24px] py-[12px] max-sm:p-[10px] max-sm:text-sm rounded-[6px] w-fit bg-[--perano] dark:bg-[--dark-gunmetal]"
    >
      <Image
        src={buttonInfo[index].src.src}
        alt=""
        width={20.01}
        height={20}
        className="w-[10.005px] h-[10px]"
      />
      {buttonInfo[index].text}
    </button>
  );
};

export default CompareButton;
