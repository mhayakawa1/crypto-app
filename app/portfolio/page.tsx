"use client";
import { useState } from "react";
import Image from "next/image";
import Exit from "../../src/icons/Close_Circle.svg";
import Edit from "../../src/icons/Edit_White.svg";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";

const Modal = (props: { toggleModal: any }) => {
  const { toggleModal } = props;

  return (
    <div className="absolute top-0 left-0 flex justify-center items-center w-[100vw] h-[100vh] backdrop-blur-sm">
      <div className="flex flex-col gap-[32px] rounded-[20px] p-[48px] bg-[#13121a]">
        <div className="flex justify-between  items-center">
          <h2>Select Coins</h2>
          <button
            onClick={toggleModal}
            className="w-[24px] h-[24px] flex items-center justify-center"
          >
            <Image src={Exit} alt=""></Image>
          </button>
        </div>
        <div className="flex gap-[32px]">
          <div className="flex flex-col justify-center items-center gap-[24px] aspect-[297/241] p-[24px] text-[28px] bg-[#191932] rounded-[8px]">
            <div className="w-[64px] h-[64px] rounded-[8px] bg-[--button-bg]"></div>
            <h3 className="font-bold text-[28px]">Bitcoin (BTC)</h3>
          </div>
          <div className="grow flex flex-col gap-[16px] p-0">
            <input
              className="w-full h-[44px] rounded-[4px] p-[8px] bg-[#191925]"
              placeholder="Select coins"
            />
            <input
              className="w-full h-[44px] rounded-[4px] p-[8px] bg-[#191925]"
              placeholder="Purchased amount"
            />
            <input
              className="w-full h-[44px] rounded-[4px] p-[8px] bg-[#191925]"
              placeholder="Purchased date"
            />
            <div className="flex justify-between gap-[16px] mt-[16px]">
              <button className="h-[45px] w-[224px] rounded-[6px] bg-[#232336]">
                Cancel
              </button>
              <button
                onClick={toggleModal}
                className="h-[45px] w-[244px] rounded-[6px] p-[1px] flex items-center justify-center bg-gradient-to-b from-[--button-border] to-[--button-bg] shadow-[4px_4px_15px_2px_#7878fa26]"
              >
                <span className="bg-[--button-bg] rounded-[6px] w-full h-full flex items-center justify-center">
                  Save & Continue
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioAsset = (props: { toggleModal: any }) => {
  const { toggleModal } = props;

  return (
    <div className="flex border-[#191932]">
      <div className="flex flex-col justify-center items-center gap-[24px] aspect-[129/146] bg-[#1e1932] p-[24px]">
        <div className="w-[64px] h-[64px] rounded-[8px] bg-[--button-bg]"></div>
        <h3 className="font-bold text-[28px]">Bitcoin (BTC)</h3>
      </div>
      <div className="grow flex flex-col gap-[24px] bg-[#191932] p-[32px]">
        <div className="grow">
          <div className="flex justify-between">
            <h4>Market price</h4>
            <button
              className="flex justify-center bg-[#3A3978] w-[40px] h-[40px] rounded-[4px]"
              onClick={toggleModal}
            >
              <Image src={Edit} alt="" />
            </button>
          </div>
          <ul className="flex justify-between items-start list-none pt-[14px]">
            <li className="flex flex-col justify-center items-center">
              <ul className="flex justify-center flex-col list-none gap-[16px]">
                <li className="flex justify-center">Current Price</li>
                <li className="text-[--rising] text-base/[16px]">
                  <span>$39,504</span>
                </li>
              </ul>
            </li>
            <li className="flex flex-col justify-center items-center">
              <ul className="flex flex-col justify-between text-center list-none gap-[16px]">
                <li className="flex justify-center">Price Change 24h</li>
                <li className="flex justify-center text-[--rising] h-[16px] gap-[4px]">
                  <span className="flex items-center justify-center w-[16px]">
                    <Image src={ArrowUpGreen} alt="" />
                  </span>{" "}
                  <span className="text-base/[14px]">$39,504</span>
                </li>
              </ul>
            </li>
            <li className="flex flex-col justify-center items-center">
              <ul className="flex flex-col justify-between text-center list-none gap-[16px]">
                <li className="flex justify-center">Market Cap vs. Volume</li>
                <li className="text-[--rising] text-base/[16px]">
                </li>
              </ul>
            </li>
            <li className="flex flex-col justify-center items-center">
              <ul className="flex flex-col justify-between text-center list-none gap-[16px]">
                <li className="flex justify-center">
                  Circ supply vs max supply
                </li>
                <li className="text-[--rising] text-base/[16px]">
                  <span>$39,504</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <span className="w-full h-[1px] bg-white"></span>
        <div className="grow">
          <div className="flex justify-between">
            <h4>Your coin</h4>
            <button
              className="flex justify-center bg-[#3A3978] w-[40px] h-[40px] rounded-[4px]"
              onClick={toggleModal}
            >
              <Image src={Edit} alt="" />
            </button>
          </div>
          <ul className="flex justify-between items-start list-none pt-[14px]">
            <li className="flex flex-col justify-center items-center">
              <ul className="flex flex-col justify-between text-center list-none gap-[16px]">
                <li className="flex justify-center">Count amount</li>
                <li className="text-[--rising] text-base/[16px]">
                  <span>$39,504</span>
                </li>
              </ul>
            </li>
            <li className="flex flex-col justify-center items-center">
              <ul className="flex flex-col justify-between text-center list-none gap-[16px]">
                <li className="flex justify-center">Amount value</li>
                <li className="flex justify-center text-[--rising] h-[16px] gap-[4px]">
                  <span className="flex items-center justify-center w-[16px]">
                    <Image src={ArrowUpGreen} alt="" />
                  </span>{" "}
                  <span className="text-base/[14px]">$39,504</span>
                </li>
              </ul>
            </li>
            <li className="flex flex-col justify-center items-center">
              <ul className="flex flex-col justify-between text-center list-none gap-[16px]">
                <li className="flex justify-center">Change since purchase</li>
                <li className="flex justify-center text-[--rising] h-[16px] gap-[4px]">
                  <span className="flex items-center justify-center w-[16px]">
                    <Image src={ArrowUpGreen} alt="" />
                  </span>{" "}
                  <span className="text-base/[14px]">10.24%</span>
                </li>
              </ul>
            </li>
            <li className="flex flex-col justify-center items-center">
              <ul className="flex flex-col justify-between text-center list-none gap-[16px]">
                <li className="flex justify-center">Purchase date</li>
                <li className="text-[--rising] text-base/[16px]">
                  <span>03.23.2021</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible((current) => !current);
  };

  return (
    <div className="flex flex-col gap-[2vh] py-[4vh]">
      <div className="flex justify-between items-center">
        <h2>Your statistics</h2>
        <button
          onClick={toggleModal}
          className="w-[244px] h-[45px] p-[1px] rounded-[6px] flex items-center justify-center bg-gradient-to-b from-[--button-border] to-[--button-bg] shadow-[4px_4px_15px_2px_#7878fa26]"
        >
          <span className="bg-[--button-bg] rounded-[6px] w-full h-full flex items-center justify-center">
            Add Asset
          </span>
        </button>
      </div>
      <PortfolioAsset toggleModal={toggleModal}></PortfolioAsset>
      {modalVisible && <Modal toggleModal={toggleModal}></Modal>}
    </div>
  );
}
