"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ThemeSwitchButton } from "./ThemeSwitchButton";
import USD from "../../src/icons/USD.svg";
import GBP from "../../src/icons/GBP.svg";
import EUR from "../../src/icons/EUR.svg";
import BTC from "../../src/icons/BTC.svg";
import ETH from "../../src/icons/ETH.svg";
import LogoIcon from "../../src/icons/Logo.svg";
import HomeWhite from "../../src/icons/Home_White.svg";
import HomeWhiteOutline from "../../src/icons/Home_White_Outline.svg";
import PortfolioWhite from "../../src/icons/Portfolio_White.svg";
import SearchWhite from "../../src/icons/Search_White.svg";

const Navbar = () => {
  const [homeActive, setHomeActive] = useState(true);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchResults = ["Bitcoin", "Ethereum", "Tether"];
  const selectItems = [
    { name: "usd", icon: USD },
    { name: "gbp", icon: GBP },
    { name: "eur", icon: EUR },
    { name: "btc", icon: BTC },
    { name: "eth", icon: ETH },
  ];

  const handleChange = (event: any) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    setResultsVisible(Boolean(value.length));
  };

  const toggleHomeActive = () => {
    setHomeActive((current) => !current);
  };

  const LinkContainer = (props: { src: any; path: string; name: string }) => {
    const { src, path, name } = props;
    const isHomeActive = path === "" ? homeActive : !homeActive;

    return (
      <button
        onClick={!isHomeActive ? toggleHomeActive : undefined}
        className={`flex justify-between items-center gap-[8px] text-[--dark-slate-blue] dark:text-white ${
          !isHomeActive && "opacity-50"
        }`}
      >
        <Image src={src} alt="" />
        <Link href={`/${path}`}>{name}</Link>
      </button>
    );
  };

  return (
    <nav className="flex justify-between items-center px-[4vw]">
      <div className="flex justify-between items-center gap-[20px] text-xl font-bold">
        <Image
          src={LogoIcon.src}
          alt=""
          width={36}
          height={20}
          className="m-auto"
        />
        <h1 className="text-[--dark-slate-blue] dark:text-white">Logoipsm</h1>
      </div>
      <div className="flex justify-between gap-[24px]">
        <LinkContainer
          src={homeActive ? HomeWhite : HomeWhiteOutline}
          path=""
          name="Home"
        ></LinkContainer>
        <LinkContainer
          src={PortfolioWhite}
          path="portfolio"
          name="Portfolio"
        ></LinkContainer>
      </div>
      <div className="flex justify-between gap-[16px]">
        <div
          className={`relative gap-[12px] m-0 w-auto h-auto ${
            resultsVisible
              ? "rounded-tl-[6px] rounded-tr-[6px] rounded-bl-none rounded-br-none"
              : "rounded-[6px]"
          } bg-[--lavender] dark:bg-[#191925]`}
        >
          <Image
            src={SearchWhite}
            alt=""
            className="absolute top-[16px] left-[16px]"
          />
          <Input
            onChange={handleChange}
            placeholder="Search..."
            className={`rounded-tl-[6px] rounded-tr-[6px] ${
              resultsVisible
                ? "rounded-bl-none rounded-br-none"
                : "rounded-bl-[6px] rounded-br-[6px]"
            } h-[48px] pl-[44px] flex justify-center items-center bg-transparent text-sm outline-none text-[--dark-slate-blue] dark:twxt-white dark:border dark:border-[#242430]`}
          />
          {resultsVisible && (
            <ul className="absolute rounded-bl-[6px] rounded-br-[6px] w-full text-[--dark-slate-blue] bg-[--lavender] dark:border dark:border-[#242430] dark:border-t-0 dark:bg-[#191925]">
              {searchResults
                .filter((result: any) =>
                  result.toLowerCase().includes(searchValue)
                )
                .map((result: any) => (
                  <li key={result} className="pl-[16px] py-[6px]">
                    {result}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <Select defaultValue="usd">
          <SelectTrigger className="w-[108px] h-[48px] px-[16px] bg-[--lavender] text-[--dark-slate-blue] dark:text-white dark:border dark:border-[#242430] dark:bg-[#191925]">
            <SelectValue className="flex justify-center items-center" />
          </SelectTrigger>
          <SelectContent className="w-[108px] bg-[--lavender] dark:border dark:border-[#242430] dark:bg-[#191925]">
            <SelectGroup className="bg-none text-[--dark-slate-blue] dark:text-white">
              {selectItems.map((item: any) => (
                <SelectItem
                  key={item.name}
                  value={item.name}
                  className="hover:bg-white dark:hover:bg-[--dark-gunmetal]"
                >
                  <span className="flex justify-center items-center gap-[8px]">
                    <span className="flex justify-center items-center w-[20px] h-[20px] border bg-[--dark-slate-blue] dark:bg-transparent dark:border-white rounded-full">
                      <Image
                        src={item.icon}
                        alt=""
                        className="w-auto h-[12px]"
                      />
                    </span>
                    <span className="font-medium">
                      {item.name.toUpperCase()}
                    </span>
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <ThemeSwitchButton />
      </div>
    </nav>
  );
};
export default Navbar;
