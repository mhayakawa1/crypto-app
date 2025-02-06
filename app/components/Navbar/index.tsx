"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  NavbarContainer,
  Logo,
  LogoImage,
  Links,
  LinkItem,
  RightPanel,
  Form,
  Search,
  Dropdown,
  Select,
  Option,
  SelectButton,
  CurrencyIcon,
  ThemeButton,
} from "./styles";
import LogoIcon from "../../../src/icons/Logo.svg";
import HomeWhite from "../../../src/icons/Home_White.svg";
import HomeGray from "../../../src/icons/Home_Gray.svg";
import PortfolioWhite from "../../../src/icons/Portfolio_White.svg";
import PortfolioGray from "../../../src/icons/Portfolio_Gray.svg";
import SearchWhite from "../../../src/icons/Search_White.svg";
import USDWhite from "../../../src/icons/USD_White.svg";
import ChevronDownWhite from "../../../src/icons/Chevron_Down_White.svg";
import Sun from "../../../src/icons/Sun.svg";

const Navbar = () => {
  const options = [
    { currency: "USD", image: USDWhite },
    { currency: "EUR", image: "null" },
    { currency: "GBP", image: "null" },
    { currency: "ETH", image: "null" },
    { currency: "BTC", image: "null" },
  ];
  const [selectVisible, setSelectVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [homeActive, setHomeActive] = useState(true);

  const toggleHomeActive = () => {
    setHomeActive((current) => !current);
  };

  const toggleDropdown = (option: any) => {
    setSelectVisible((current) => !current);
    if (option) {
      setSelectedOption(option);
    }
  };

  const LinkContainer = (props: { src: any; path: string; name: string }) => {
    const { src, path, name } = props;
    const boolean = path === "" ? homeActive : !homeActive;
    return (
      <LinkItem
        onClick={!boolean ? toggleHomeActive : undefined}
        className={boolean ? "home-active" : "home-inactive"}
      >
        <Image src={src} alt=""></Image>
        <Link href={`/${path}`}>{name}</Link>
      </LinkItem>
    );
  };

  const OptionContainer = (props: {
    key: any;
    children: any;
    option: any;
    src: any;
    currency: any;
  }) => {
    const { children, option, src, currency } = props;
    return (
      <Option>
        <SelectButton type="button" onClick={() => toggleDropdown(option)}>
          <CurrencyIcon src={src}></CurrencyIcon>
          {currency}
          {children}
        </SelectButton>
      </Option>
    );
  };

  return (
    <NavbarContainer>
      <Logo>
        <LogoImage src={LogoIcon.src} alt="" />
        <h1>Logoipsm</h1>
      </Logo>
      <Links>
        <LinkContainer
          src={homeActive ? HomeWhite : HomeGray}
          path=""
          name="Home"
        ></LinkContainer>
        <LinkContainer
          src={homeActive ? PortfolioGray : PortfolioWhite}
          path="portfolio"
          name="Portfolio"
        ></LinkContainer>
      </Links>
      <RightPanel>
        <Form>
          <Image src={SearchWhite} alt=""></Image>
          <Search placeholder="Search..."></Search>
        </Form>
        <Dropdown>
          <Select>
            <OptionContainer
              key={undefined}
              option={undefined}
              src={selectedOption.image.src}
              currency={selectedOption.currency}
            >
              <Image src={ChevronDownWhite} alt=""></Image>
            </OptionContainer>
            {selectVisible &&
              options
                .filter((option) => option.currency !== selectedOption.currency)
                .map((option, index) => (
                  <OptionContainer
                    key={index}
                    option={option}
                    src={option.image}
                    currency={option.currency}
                  >
                    {undefined}
                  </OptionContainer>
                ))}
          </Select>
        </Dropdown>
        <ThemeButton>
          <Image src={Sun} alt=""></Image>
        </ThemeButton>
      </RightPanel>
    </NavbarContainer>
  );
};
export default Navbar;
