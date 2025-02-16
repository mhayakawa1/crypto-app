"use client";
import { useState } from "react";
import {
  PortfolioContainer,
  TopPanel,
  Button,
  Asset,
  LeftPanel,
  RightPanel,
  CoinName,
  IconContainer,
  CoinData,
  DataTopPanel,
  DataUl,
  DataLi,
  DataItemUl,
  DataItemLi,
  ArrowIcon,
  Line,
  ModalBackground,
  ModalContainer,
  ModalForm,
  Input,
  Buttons,
} from "./styles";
import Image from "next/image";
import Exit from "../../src/icons/Close_Circle.svg";
import Edit from "../../src/icons/Edit_White.svg";
import ArrowUpGreen from "../../src/icons/Arrow_Up_Green.svg";

const Modal = (props: { toggleModal: any }) => {
  const { toggleModal } = props;

  return (
    <ModalBackground>
      <ModalContainer>
        <TopPanel>
          <h2>Select Coins</h2>
          <Button className="exit" onClick={toggleModal}>
            <Image src={Exit} alt=""></Image>
          </Button>
        </TopPanel>
        <ModalForm>
          <LeftPanel className="modal">
            <IconContainer></IconContainer>
            <CoinName>Bitcoin (BTC)</CoinName>
          </LeftPanel>
          <RightPanel className="modal">
            <Input placeholder="Select coins" />
            <Input placeholder="Purchased amount" />
            <Input placeholder="Purchased date" />
            <Buttons>
              <Button className="cancel modal">Cancel</Button>
              <Button className="save modal">Save & Continue</Button>
            </Buttons>
          </RightPanel>
        </ModalForm>
      </ModalContainer>
    </ModalBackground>
  );
};

const PortfolioAsset = (props: { toggleModal: any }) => {
  const { toggleModal } = props;

  return (
    <Asset>
      <LeftPanel>
        <IconContainer></IconContainer>
        <CoinName>Bitcoin (BTC)</CoinName>
      </LeftPanel>
      <RightPanel>
        <CoinData>
          <DataTopPanel>
            <h4>Market price</h4>
            <Button className="edit" onClick={toggleModal}>
              <Image src={Edit} alt="" />
            </Button>
          </DataTopPanel>
          <DataUl>
            <DataLi>
              <DataItemUl>
                <DataItemLi>Current Price</DataItemLi>
                <DataItemLi className="rising">
                  <span>$39,504</span>
                </DataItemLi>
              </DataItemUl>
            </DataLi>
            <DataLi>
              <DataItemUl>
                <DataItemLi>Price Change 24h</DataItemLi>
                <DataItemLi className="rising">
                  <ArrowIcon src={ArrowUpGreen.src} /> <span>$39,504</span>
                </DataItemLi>
              </DataItemUl>
            </DataLi>
            <DataLi>
              <DataItemUl>
                <DataItemLi>Market Cap vs. Volume</DataItemLi>
                <DataItemLi className="rising"></DataItemLi>
              </DataItemUl>
            </DataLi>
            <DataLi>
              <DataItemUl>
                <DataItemLi>Current Price</DataItemLi>
                <DataItemLi className="rising">$39,504</DataItemLi>
              </DataItemUl>
            </DataLi>
          </DataUl>
        </CoinData>
        <Line />
        <CoinData>
          <DataTopPanel>
            <h4>Your Coin</h4>
            <Button className="edit">
              <Image src={Edit} alt="" />
            </Button>
          </DataTopPanel>
          <DataUl>
            <DataLi>
              <DataItemUl>
                <DataItemLi>Coin amount</DataItemLi>
                <DataItemLi className="rising">
                  <span>$39,504</span>
                </DataItemLi>
              </DataItemUl>
            </DataLi>
            <DataLi>
              <DataItemUl>
                <DataItemLi>Amount value</DataItemLi>
                <DataItemLi className="rising">
                  <ArrowIcon src={ArrowUpGreen.src} /> <span>$39,504</span>
                </DataItemLi>
              </DataItemUl>
            </DataLi>
            <DataLi>
              <DataItemUl>
                <DataItemLi>Change since purchase</DataItemLi>
                <DataItemLi className="rising">
                  <ArrowIcon src={ArrowUpGreen.src} />
                  <span>10.24%</span>
                </DataItemLi>
              </DataItemUl>
            </DataLi>
            <DataLi>
              <DataItemUl>
                <DataItemLi>Purchase date</DataItemLi>
                <DataItemLi className="rising">03.23.2021</DataItemLi>
              </DataItemUl>
            </DataLi>
          </DataUl>
        </CoinData>
      </RightPanel>
    </Asset>
  );
};

export default function Portfolio() {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible((current) => !current);
  };

  return (
    <PortfolioContainer>
      <TopPanel>
        <h2>Your statistics</h2>
        <Button className="add-asset" onClick={toggleModal}>
          Add Asset
        </Button>
      </TopPanel>
      <PortfolioAsset toggleModal={toggleModal}></PortfolioAsset>
      {modalVisible && <Modal toggleModal={toggleModal}></Modal>}
    </PortfolioContainer>
  );
}
