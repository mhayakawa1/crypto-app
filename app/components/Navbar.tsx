"use client";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { useState } from "react";
import LogoIcon from "../../src/icons/Logo.svg";
import HomeWhite from "../../src/icons/Home_White.svg";
import HomeGray from "../../src/icons/Home_Gray.svg";
import PortfolioWhite from "../../src/icons/Portfolio_White.svg";
import PortfolioGray from "../../src/icons/Portfolio_Gray.svg";
import SearchWhite from "../../src/icons/Search_White.svg";
import USDWhite from "../../src/icons/USD_White.svg";
import ChevronDownWhite from "../../src/icons/Chevron_Down_White.svg";
import Sun from "../../src/icons/Sun.svg";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0;
`;

const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  align-itmes: center;
  gap: 10px;
  font-family: Inter;
  font-size: 21px;
  font-weight: 700;
  color: white;
`;

const LogoImage = styled.img`
  width: 35px;
  height: 20px;
  margin: auto;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

const LinkItem = styled.button.attrs(() => ({ tabIndex: 0 }))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-family: Space Grotesk;
  font-size: 16px;
  font-weight: 500;
  &.home-active {
    color: white;
  }
  &.home-inactive {
    color: #353570;
    opacity: .5;
  }
`;

const RightPanel = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 48px;
  width: auto;
  margin: 0;
  padding: 0 16px;
  gap: 12px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: #191925;
`;

const Search = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0);
  font-family: Inter;
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
  color: white;
  &:focus {
    outline: none;
  }
`;

const Dropdown = styled.div`
  position: relative;
  width: 108px;
  height: 48px;
  margin: 0;
  padding: 0;
  background-color: rgb(0, 0, 0, 0);
`;

const Select = styled.ul`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: auto;
  width: 100%;
  border-radius: 12px;
  margin: 0;
  padding: 0;
  background-color: #191925;
  color: white;
  &:focus {
    outline: none;
  }
`;

const Option = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 108px;
  height: 48px;
  margin: 0;
  color: white;
  list-style-type: none;
`;

const SelectButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  width: 100%;
  height: 100%;
  padding: 0 0 0 16px;
  font-family: Space Grotesk;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  text-align: left;
`;

const CurrencyIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

const ThemeButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  background-color: #191925;
`;

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

  const LinkContainer = (props: { src: any; path: string; name: string }) => {
    const { src, path, name } = props;
    const boolean = path === "" ? homeActive : !homeActive;    
    return (
      <LinkItem onClick={() => setHomeActive((current) => !current)} className={boolean ? "home-active" : "home-inactive"}>
        <Image src={src} alt=""></Image>
        <Link href={`/${path}`}>{name}</Link>
      </LinkItem>
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
            <Option>
              <SelectButton
                type="button"
                onClick={() => setSelectVisible((current) => !current)}
              >
                <CurrencyIcon src={selectedOption.image.src} alt="" />
                {selectedOption.currency}
                <Image src={ChevronDownWhite} alt=""></Image>
              </SelectButton>
            </Option>
            {selectVisible &&
              options
                .filter((option) => option.currency !== selectedOption.currency)
                .map((option, index) => (
                  <Option key={index}>
                    <SelectButton
                      type="button"
                      onClick={() => {
                        setSelectVisible((current) => !current);
                        setSelectedOption(option);
                      }}
                    >
                      <CurrencyIcon src={option.image}></CurrencyIcon>
                      {option.currency}
                    </SelectButton>
                  </Option>
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
