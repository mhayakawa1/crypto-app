"use client";
import Image from "next/image";
import { Progress } from "../../components/ui/progress";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";
import ArrowDownRed from "../../src/icons/Arrow_Down_Red.svg";

const AssetListItem = (props: { listItem: any }) => {
  const {
    listItem: { name, value, arrow, colors },
  } = props;
  return (
    <li className="max-md:border max-md:border-[--lavender] max-md:dark:border-[--american-blue] max-md:w-[48%] h-[86px] lg:2xl:h-[168px] rounded-[6px] lg:2xl:rounded-[12px] flex flex-col justify-center items-center md:px-[.5vw] max-md:py-[4px]">
      <ul className="h-full flex flex-col justify-between max-md:justify-around max-md:px-[8px] lg:2xl:px-[16px] text-base max-md:text-sm lg:2xl:text-3xl">
        <li className="text-center">{name}</li>
        <li className={`flex justify-center text-[${colors.color}]`}>
          {arrow && (
            <span className="flex items-center justify-center w-[16px] lg:2xl:w-[32px]">
              <Image
                src={colors.color === "--rising" ? ArrowUpGreen : ArrowDownRed}
                alt=""
                className="lg:2xl:w-[16px] h-auto"
              />
            </span>
          )}
          {name === "Volume vs. Market Cap" ? (
            <Progress
              className={`bg-[${colors.bg}] mx-[1vw] max-md:mx-[4vw]`}
              value={value}
              color={`bg-[${colors.color}]`}
            ></Progress>
          ) : (
            <span>{value}</span>
          )}
        </li>
      </ul>
    </li>
  );
};

export default AssetListItem;
