"use client";
import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import Plus from "./../../../src/icons/Plus.svg";
import PortfolioIcon from "./../../../src/icons/Portfolio_White.svg";
import ArrowUpGreen from "./../../../src/icons/Arrow_Up_Green.svg";
import ArrowDownRed from "./../../../src/icons/Arrow_Down_Red.svg";
import LinkWhite from "./../../../src/icons/Link_White.svg";
import CopyWhite from "./../../../src/icons/Copy_White.svg";
import Panel from "../../components/Panel";
type Params = Promise<{ coinId: string }>;

const LinkContainer = (props: { link: string }) => {
  const { link } = props;
  return (
    <Panel className="flex justify-center items-center gap[16px] font-medium text-base/[24px] h-[52px]">
      <Image src={LinkWhite} alt="" className="w-[20px] h-[20px]" />
      <a className="mx-[16px]">{link}</a>
      <Image src={CopyWhite} alt="" className="w-[20px] h-[20px]" />
    </Panel>
  );
};

const HighLow = (props: { src: any; price: string; time: string }) => {
  const { src, price, time } = props;
  return (
    <li className="high-low flex justify-start gap-[16px]">
      <img className="w-[16px] h-[12px] mt-[8px]" src={src} alt="" />
      <ul className="text-base/[28px]">
        <li className="text-base/[20px]">
          All time high: <span className="text-xl">{price}</span>
        </li>
        <li className="date text-sm/[24px] text-[#b9b9ba]">{time}</li>
      </ul>
    </li>
  );
};

export default function CoinPage(props: { params: Params }) {
  const params = use(props.params);
  const coinId = params.coinId[0].toUpperCase() + params.coinId.slice(1);

  const statisticsInfo = [
    { name: "Market Cap", value: "$749,864,345,056" },
    { name: "Fully Diluted Valuation", value: "$840,523,040,085" },
    { name: "Volume 24h", value: "$47,714,337,481" },
    { name: "Volume/Market", value: "0.06363" },
    { name: "Total Volume", value: "1,192,352 BTC" },
    { name: "Circulating Supply", value: "18,734,943 BTC" },
    { name: "Max Supply", value: "21,000,000 BTC" },
  ];

  const overviewInfo = {
    price: "$40,017",
    rising: true,
    percent: "5.02%",
    profit: "$1,504",
    highLow: {
      high: {
        price: "$64,805",
        time: "Wed, 14 Sep 2023 11:54:46 GMT",
      },
      low: {
        price: "$32,805",
        time: "Wed, 10 Sep 2023 22:01:53 GMT",
      },
    },
  };

  return (
    <div>
      <div className="mt-[6vh] mb-[4vh]">
        <Link href="/portfolio">Portfolio / Your {coinId} summary</Link>
      </div>
      <div className="flex justify-between">
        <div className="w-[53%] flex flex-col gap-[16vh]">
          <div className="flex justify-between gap-[32px]">
            <div className="flex justify-between flex-col gap-[16px] w-[44%]">
              <Panel className="flex justify-center items-center flex-col grow gap-[24px]">
                <div className="p-[16px] rounded-xl w-[64px] h-[64px] bg-[#2C2C4A]">
                  <img
                    className="rounded-full w-[32px] h-[32px]"
                    src="null"
                    alt=""
                  />
                </div>
                <h2>{coinId}</h2>
              </Panel>
              <LinkContainer link="www.bitcoin.org" />
            </div>
            <Panel className="aspect-[355/333] flex px-[40px]">
              <ul className="flex flex-col items-center justify-center gap-[10px] h-full">
                <li className="flex items-center gap-[16px] h-[25px]">
                  <span className="text-4xl">{overviewInfo.price}</span>
                  <span
                    className={`${
                      overviewInfo.rising
                        ? "text-[--rising]"
                        : "text-[--falling]"
                    } text-xl flex`}
                  >
                    <img
                      src={
                        overviewInfo.rising
                          ? ArrowUpGreen.src
                          : ArrowDownRed.src
                      }
                      className="w-[9px] h-[5px] my-[10px] mx-[5px]"
                      alt=""
                    />
                    {overviewInfo.percent}
                  </span>
                </li>
                <li className="text-xl">
                  Profit:
                  <span
                    className={`${
                      overviewInfo.rising ? "text-[--rising]" : "text-[--falling]"
                    } text-2xl ml-[16px]`}
                  >
                    {overviewInfo.profit}
                  </span>
                </li>
                <li className="flex justify-center my-[4px]">
                  <Image src={PortfolioIcon} alt=""></Image>
                </li>
                <HighLow
                  src={ArrowUpGreen.src}
                  price="$64,805"
                  time="Wed, 14 Sep 2023 11:54:46 GMT"
                />
                <HighLow
                  src={ArrowDownRed.src}
                  price="$32,805"
                  time="Wed, 10 Sep 2023 22:01:53 GMT"
                />
              </ul>
            </Panel>
          </div>
          <div className="flex flex-col gap-[24px]">
            <h4 className="text-xl font-medium">Description</h4>
            <p className="text-sm/[24px]">
              Bitcoin is the first successful internet money based on
              peer-to-peer technology; whereby no central bank or authority is
              involved in the transaction and production of the Bitcoin
              currency. It was created by an anonymous individual/group under
              the name, Satoshi Nakamoto. The source code is available publicly
              as an open source project, anybody can look at it and be part of
              the developmental process. Bitcoin is changing the way we see
              money as we speak. The idea was to produce a means of exchange,
              independent of any central authority, that could be transferred
              electronically in a secure, verifiable and immutable way. It is a
              decentralized peer-to-peer internet currency making mobile payment
              easy, very low transaction fees, protects your identity, and it
              works anywhere all the time with no central authority and banks.
              Bitcoin is designed to have only 21 million BC ever
              <a href="#" className="text-[#6060ff]">
                {" "}
                ...read more
              </a>
            </p>
          </div>
        </div>
        <div className="w-[42%] flex flex-col gap-[16vh]">
          <Panel className="flex items-center justify-center aspect-[136/105]">
            <div className="flex flex-col gap-[32px]">
              <ul className="flex flex-col gap-[12px]">
                {statisticsInfo.map((element, index) => (
                  <li
                    key={index}
                    className={`flex justify-between gap-[24px] text-base/[20px] ${
                      index === 4 && "mt-[32px]"
                    }`}
                  >
                    <span className="flex flex-1 gap-[24px]">
                      <span className="w-[24px] h-[24px] rounded-full p-[1px] flex items-center justify-center bg-gradient-to-b from-[--button-border] to-[--button-bg] shadow-[4px_4px_15px_2px_#7878fa26]">
                        <span className="bg-[--button-bg] mt-[.25px] ml-[.25px] rounded-full w-full h-full flex items-center justify-center">
                          <Image src={Plus} alt=""></Image>
                        </span>
                      </span>
                      <span>{element.name}</span>
                    </span>
                    <span>{element.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
          <div className="flex flex-col gap-[24px]">
            <LinkContainer link="www.blockchain.com/bitcoin" />
            <LinkContainer link="www.btc.com" />
            <LinkContainer link="www.btc.tokenview.com" />
          </div>
        </div>
      </div>
    </div>
  );
}
