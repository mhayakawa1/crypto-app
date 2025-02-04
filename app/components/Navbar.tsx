"use client";
import Link from "next/link";
import styled from "styled-components";
import { useState } from "react";

const NavbarContainer = styled.nav`
  border: 1px solid red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  padding: 0;
`;

const Logo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
`;

const LinkItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  padding: 0;
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
    { currency: "USD", image: "null" },
    { currency: "EUR", image: "null" },
    { currency: "GBP", image: "null" },
    { currency: "ETH", image: "null" },
    { currency: "BTC", image: "null" },
  ];
  const [selectVisible, setSelectVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  return (
    <NavbarContainer>
      <Logo>
        <img src="null" />
        <h1>Logoipsm</h1>
      </Logo>
      <Links>
        <LinkItem>
          <img src="null" />
          <Link href="/">Home</Link>
        </LinkItem>
        <LinkItem>
          <img src="null" />
          <Link href="/portfolio">Portfolio</Link>
        </LinkItem>
      </Links>
      <RightPanel>
        <Form>
          <img src="null" />
          <Search placeholder="Search..."></Search>
        </Form>
        <Form>
          <Dropdown>
            <Select>
              <Option>
                <SelectButton
                  type="button"
                  onClick={() => setSelectVisible((current) => !current)}
                >
                  <CurrencyIcon src="null"></CurrencyIcon>
                  {selectedOption.currency}
                  <img src="null" />
                </SelectButton>
              </Option>
              {selectVisible &&
                options
                  .filter(
                    (option) => option.currency !== selectedOption.currency
                  )
                  .map((option, index) => (
                    <Option key={index}>
                      <SelectButton
                        type="button"
                        onClick={() => {
                          setSelectVisible((current) => !current);
                          setSelectedOption(option);
                        }}
                      >
                        <CurrencyIcon src="null"></CurrencyIcon>
                        {option.currency}
                      </SelectButton>
                    </Option>
                  ))}
            </Select>
          </Dropdown>
        </Form>
        <ThemeButton>
          <img src="null" />
        </ThemeButton>
      </RightPanel>
    </NavbarContainer>
  );
};
export default Navbar;
