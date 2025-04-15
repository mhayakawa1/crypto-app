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
import { useAllCoinsQuery } from "@/lib/features/api/apiSlice";
import { useAppSelector } from "@/lib/hooks";
import { ThemeSwitchButton } from "./ThemeSwitchButton";
import USD from "../../src/icons/USD.svg";
import GBP from "../../src/icons/GBP.svg";
import EUR from "../../src/icons/EUR.svg";
import BTC from "../../src/icons/BTC.svg";
import ETH from "../../src/icons/ETH.svg";
import LogoIcon from "../../src/icons/Logo.svg";
import HomeBlue from "../../src/icons/Home_Blue.svg";
import HomeWhite from "../../src/icons/Home_White.svg";
import HomeWhiteOutline from "../../src/icons/Home_White_Outline.svg";
import PortfolioBlue from "../../src/icons/Portfolio_Blue.svg";
import PortfolioWhite from "../../src/icons/Portfolio_White.svg";
import SearchBlue from "../../src/icons/Search_Blue.svg";
import SearchWhite from "../../src/icons/Search_White.svg";

const Navbar = () => {
  const darkActive = useAppSelector((state) => state.theme)[0].darkActive;
  const [homeActive, setHomeActive] = useState(true);
  const [homeIcon, setHomeIcon] = useState(HomeWhite);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const selectItems = [
    { name: "usd", icon: USD },
    { name: "gbp", icon: GBP },
    { name: "eur", icon: EUR },
    { name: "btc", icon: BTC },
    { name: "eth", icon: ETH },
  ];

  const {
    data: data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useAllCoinsQuery();

  let content: React.ReactNode;

  if (isLoading) {
    content = <span>Loading...</span>;
  } else if (isSuccess) {
    const searchResults = data.map((element: any) => {
      return { id: element.id, name: element.name };
    });
    content = (
      <ul className="absolute z-10 pb-[8px] rounded-bl-[6px] rounded-br-[6px] w-full text-[--dark-slate-blue] dark:text-white bg-[--lavender] dark:border dark:border-[#242430] dark:border-t-0 dark:bg-[#191925]">
        {searchResults
          .filter((result: any) =>
            result.name.toLowerCase().includes(searchValue)
          )
          .map((result: any) => (
            <li key={result.id} className="px-[8px] py-[6px] hover:bg-white">
              <Link
                className="flex items-center gap-[16px]"
                href={`/coin/${result.id}`}
                onClick={() => {
                  setSearchValue("");
                  setResultsVisible(false);
                }}
              >
                {result.name}
              </Link>
            </li>
          ))}
      </ul>
    );
  } else if (isError) {
    <span>{error.toString()}</span>;
  }

  const handleChange = (event: any) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
    setResultsVisible(Boolean(value.length));
  };

  const toggleHomeActive = () => {
    setHomeActive((current) => !current);
    if (!homeActive) {
      setHomeIcon(HomeWhite);
    } else {
      setHomeIcon(HomeWhiteOutline);
    }
  };

  const hideResults = (event: any) => {
    if (!event.relatedTarget) {
      setResultsVisible(false)
    }
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
          src={darkActive ? homeIcon : HomeBlue}
          path=""
          name="Home"
        ></LinkContainer>
        <LinkContainer
          src={darkActive ? PortfolioWhite : PortfolioBlue}
          path="portfolio"
          name="Portfolio"
        ></LinkContainer>
      </div>
      <div className="flex justify-between gap-[16px]">
        <div
          onBlur={hideResults}
          className={`relative gap-[12px] m-0 w-auto h-auto ${
            resultsVisible
              ? "rounded-tl-[6px] rounded-tr-[6px] rounded-bl-none rounded-br-none"
              : "rounded-[6px]"
          } bg-[--lavender] dark:bg-[#191925]`}
        >
          <Image
            src={darkActive ? SearchWhite : SearchBlue}
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
            } h-[48px] pl-[44px] flex justify-center items-center bg-transparent text-sm outline-none text-[--dark-slate-blue] dark:text-white dark:border dark:border-[#242430]`}
          />
          {resultsVisible ? content : null}
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
