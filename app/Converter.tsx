"use client";
import {
  Button,
  TopPanel,
  Charts,
  ConversionInputs,
  ConversionInput,
  InputUl,
  InputLi,
  CurrencyDropdown,
  CurrencyIcon,
  DropdownIcon,
  InputAmount,
} from "./homeStyles";
import Image from "next/image";
import ChartContainer from "./ChartContainer";
import TimeRangeButtons from "./TimeRangeButtons";
import ArrowDownWhite from "../src/icons/Arrow_Down_White.svg";
import VerticalSwitchBlue from "../src/icons/Vertical_Switch_Blue.svg";

const InputContainer = (props: {
  transaction: string;
  name: string;
  amount: number;
  conversion: string;
}) => {
  const { transaction, name, amount, conversion } = props;

  return (
    <ConversionInput>
      <InputUl>
        <InputLi className="transaction">You {transaction}</InputLi>
        <InputLi>
          <CurrencyDropdown>
            <Button className="dropdown">
              <CurrencyIcon src="null" alt=""></CurrencyIcon>
              {name}
              <DropdownIcon src={ArrowDownWhite.src} alt=""></DropdownIcon>
            </Button>
            <InputAmount>{amount}</InputAmount>
          </CurrencyDropdown>
        </InputLi>
        <InputLi className="conversion">{conversion}</InputLi>
      </InputUl>
    </ConversionInput>
  );
};

const Converter = () => {
  return (
    <>
      <TopPanel>
        <div>
          <h2>Online currency converter</h2>
          <p>09/29/2023 14:15</p>
        </div>
      </TopPanel>
      <ConversionInputs>
        <InputContainer
          transaction="Sell"
          name="Bitcoin (BTC)"
          amount={2}
          conversion="1 BTC = $26,250.15"
        ></InputContainer>
        <InputContainer
          transaction="Buy"
          name="Ethereum (ETH)"
          amount={2}
          conversion="1 BTC = $8,914.12"
        ></InputContainer>
        <Button className="convert">
          <Image src={VerticalSwitchBlue} alt=""></Image>
        </Button>
      </ConversionInputs>
      <Charts className="conversion-data">
        <ChartContainer>
          <h3>
            Bitcoin (BTC) <span>to</span> Ethereum (ETH)
          </h3>
        </ChartContainer>
      </Charts>
      <TimeRangeButtons></TimeRangeButtons>
    </>
  );
};
export default Converter;
