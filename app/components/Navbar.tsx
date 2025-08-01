"use client";
import Image from "next/image";
import LinkButton from "./LinkButton";
import { useState, useEffect, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toggleView } from "@/lib/features/view/viewSlice";
import { Input } from "@/components/ui/input";
import { switchCurrency } from "@/lib/features/currency/currencySlice";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import SearchItem from "./SearchItem";
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

const Navbar = (props: { initialCoinsList: any }) => {
  const { initialCoinsList } = props;
  const darkActive = useAppSelector((state) => state.theme)[0].darkActive;
  const view = useAppSelector((state) => state.view);
  const mobileView = view[0].mobileView;
  const dispatch = useAppDispatch();
  const { currency } = useAppSelector((state) => state.currency);
  const [changeCurrency, setChangeCurrency] = useState(true);
  const [homeActive, setHomeActive] = useState(true);
  const [homeIcon, setHomeIcon] = useState(HomeWhite);
  const [resultsVisible, setResultsVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [initialRender, setInitialRender] = useState(true);
  const selectItems = [
    { name: "usd", icon: USD },
    { name: "gbp", icon: GBP },
    { name: "eur", icon: EUR },
    { name: "btc", icon: BTC },
    { name: "eth", icon: ETH },
  ];

  const searchCoins = (value: any) => {
    setSearchValue(value);
    if (initialCoinsList.length) {
      setResultsVisible(Boolean(value.length));
    }
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
      setResultsVisible(false);
    }
  };

  const handleChange = useCallback(
    (value: string) => {
      localStorage.setItem("currency", value);
      dispatch(switchCurrency(value));
    },
    [dispatch]
  );

  useEffect(() => {
    if (searchValue) {
      setTimeout(() => {
        setDebouncedValue(searchValue);
      }, 500);
    }
    const storageItem = localStorage.getItem("currency");
    if (changeCurrency && storageItem) {
      dispatch(switchCurrency(storageItem));
      handleChange(storageItem);
    }
    setChangeCurrency(false);
    const handleResize = () => {
      if (window.innerWidth < 640) {
        localStorage.setItem("mobileView", "true");
        dispatch(toggleView(true));
      } else if (window.innerWidth >= 640) {
        localStorage.setItem("mobileView", "true");
        dispatch(toggleView(false));
      }
    };
    window.addEventListener("resize", handleResize);
    if (initialRender) {
      handleResize();
      setInitialRender(false);
    }
  }, [
    changeCurrency,
    dispatch,
    handleChange,
    initialRender,
    mobileView,
    searchValue,
  ]);

  return (
    <nav className="flex justify-between max-sm:justify-around items-center px-[5vw] max-lg:px-[2vw]">
      <div className="flex justify-between items-center gap-[1vw]">
        <Image
          src={LogoIcon.src}
          alt=""
          width={36}
          height={20}
          className="m-auto max-md:w-[28px] lg:2xl:w-[54px] max-md:h-[16px]"
        />
        <h1 className="text-[--dark-slate-blue] dark:text-white text-xl lg:2xl:text-3xl max-md:hidden font-bold">
          Logoipsm
        </h1>
      </div>
      {!mobileView && (
        <div className="flex justify-between gap-[2vw]">
          <LinkButton
            src={darkActive ? homeIcon : HomeBlue}
            path=""
            name="Home"
            homeActive={homeActive}
            toggleHomeActive={toggleHomeActive}
          />
          <LinkButton
            src={darkActive ? PortfolioWhite : PortfolioBlue}
            path="portfolio"
            name="Portfolio"
            homeActive={homeActive}
            toggleHomeActive={toggleHomeActive}
          />
        </div>
      )}
      <div className="flex justify-between items-center gap-[1vw]">
        <div
          onBlur={hideResults}
          className={`relative gap-[12px] lg:2xl:gap-[18px] m-0 w-auto h-auto ${
            resultsVisible
              ? "rounded-tl-[6px] lg:2xl:rounded-tl-[9px] rounded-tr-[6px] lg:2xl:rounded-tr-[12px] rounded-bl-none rounded-br-none"
              : "rounded-[6px] lg:2xl:rounded-[9px]"
          } h-fit w-fit bg-[--lavender] dark:bg-[--mirage]`}
        >
          <Image
            src={darkActive ? SearchWhite : SearchBlue}
            alt=""
            className={`absolute lg:2xl:w-[30px] lg:2xl:h-[30px] top-1/2 left-[12px] max-sm:left-[8px] lg:2xl:left-[18px] -translate-y-1/2`}
          />
          <Input
            onChange={(event) => searchCoins(event.target.value.toLowerCase())}
            value={searchValue}
            placeholder={mobileView ? "" : "Search..."}
            className={`rounded-tl-[6px] lg:2xl:rounded-tl-[9px] rounded-tr-[6px] lg:2xl:rounded-tr-[9px] ${
              resultsVisible
                ? "rounded-bl-none rounded-br-none"
                : "rounded-bl-[6px] lg:2xl:rounded-bl-[9px] rounded-br-[6px] lg:2xl:rounded-br-[9px]"
            } w-[200px] max-md:w-[40vw] lg:2xl:w-[300px] h-[48px] max-md:h-[36px] lg:2xl:h-[72px] pl-[44px] max-md:pl-[32px] lg:2xl:pl-[66px] flex justify-center items-center bg-transparent text-sm max-md:text-xs lg:2xl:text-xl outline-none text-[--dark-slate-blue] dark:text-white border-none dark:border dark:border-[--dark-gunmetal]`}
          />
          {resultsVisible ? (
            <ul className="absolute max-h-[80vh] overflow-y-scroll z-10 pb-[8px] lg:2xl:pb-[12px] rounded-bl-[6px] lg:2x:rounded-bl-[12px] rounded-br-[6px] lg:2xl:rounded-br-[9px] w-full max-md:text-xs text-[--dark-slate-blue] dark:text-white bg-[--lavender] dark:border dark:border-[--dark-gunmetal] dark:border-t-0 dark:bg-[--mirage]">
              {!initialCoinsList.find(
                (element: any) => element.name.toLowerCase() === debouncedValue
              ) ? (
                <SearchItem
                  id={debouncedValue}
                  name={debouncedValue}
                  searchCoins={searchCoins}
                />
              ) : null}
              {initialCoinsList
                .map((element: any) => {
                  return { id: element.id, name: element.name };
                })
                .filter((result: any) =>
                  result.name.toLowerCase().includes(debouncedValue)
                )
                .map((result: any) => (
                  <SearchItem
                    key={result.id}
                    id={result.id}
                    name={result.name}
                    searchCoins={searchCoins}
                  />
                ))}
            </ul>
          ) : null}
        </div>
        {!changeCurrency && (
          <Select defaultValue={currency} onValueChange={handleChange}>
            <SelectTrigger className="w-[108px] max-md:w-[84px] lg:2xl:w-[162px] h-[48px] max-md:h-[36px] lg:2xl:h-[72px] lg:2xl:rounded-[9px] px-3 max-md:px-[8px] max-sm:pl-2 max-sm:pr-1 bg-[--lavender] text-[--dark-slate-blue] dark:text-white border-none dark:border dark:border-[--dark-gunmetal] dark:bg-[--mirage]">
              <SelectValue className="flex justify-center items-center" />
            </SelectTrigger>
            <SelectContent className="w-[108px] max-md:w-[84px] lg:2xl:w-[162px] lg:2xl:rounded-[9px] bg-[--lavender] border-none dark:border dark:border-[--dark-gunmetal] dark:bg-[--mirage]">
              <SelectGroup className="w-full bg-none text-[--dark-slate-blue] dark:text-white">
                {selectItems.map((item: any) => (
                  <SelectItem
                    key={item.name}
                    value={item.name}
                    className="hover:bg-white dark:hover:bg-[--dark-gunmetal] max-sm:px-1 max-sm:py-1"
                  >
                    <span className="max-sm:w-full max-sm:m-0 flex justify-center max-sm:justify-between items-center gap-[8px] max-md:gap-[4px] lg:2xl:gap-[12px] max">
                      <span className="flex justify-center items-center w-[20px] lg:2xl:w-[30px] h-[20px] lg:2xl:h-[30px] border bg-[--dark-slate-blue] dark:bg-transparent dark:border-white rounded-full">
                        <Image
                          src={item.icon}
                          alt=""
                          className="w-auto h-[12px] max-sm:h-[8px] lg:2xl:h-[18px] aspect-square"
                        />
                      </span>
                      <span className="font-medium max-md:text-xs lg:2xl:text-2xl">
                        {item.name.toUpperCase()}
                      </span>
                    </span>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        <ThemeSwitchButton />
      </div>
    </nav>
  );
};
export default Navbar;
