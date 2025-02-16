import styled from "styled-components";

export const PortfolioContainer = styled.div`
  padding: 4vh;
  display: flex;
  flex-direction: column;
  gap: 2vh;
`;

export const TopPanel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Button = styled.button`
  border: double 1px transparent;
  background-image: linear-gradient(#6161d6, #6161d6),
    linear-gradient(#7878fa, #6161d6);
  background-origin: border-box;
  background-clip: content-box, border-box;
  &.add-asset {
    width: 244px;
    height: 45px;
    border-radius: 6px;
  }
  &.edit {
    width: 40px;
    height: 40px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
  }
  &.exit {
    width: 24px;
    height: 24px;
    background-image: unset;
  }
  &.modal {
    height: 45px;
    border-radius: 6px;
    width: 223px;
  }
  &.cancel {
    background: #232336;
  }
`;

export const Asset = styled.li`
  display: flex;
  border: 1px solid #191932;
  width: 100%;
`;

export const LeftPanel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  aspect-ratio: 129 / 146;
  background-color: #1e1932;
  padding: 24px;
  &.modal {
    aspect-ratio: 297 / 241;
    font-weight: 700;
    font-size: 28px;
    line-height: 28px;
    background: #191932;
    border-radius: 8px;
  }
`;

export const IconContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background-color: #2c2c4a;
`;

export const CoinName = styled.h3`
  font-weight: 700;
  font-size: 28px;
`;

export const RightPanel = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: #191932;
  padding: 0 32px;
  &.modal {
    padding: 0;
    background-color: rgb(0, 0, 0, 0);
    gap: 16px;
  }
`;

export const CoinData = styled.div`
  flex-grow: 1;
  padding: 32px 0;
`;

export const DataTopPanel = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DataUl = styled.ul`
  display: flex;
  list-style-type: none;
  justify-content: space-between;
  align-items: start;
  padding: 16px 0 0 0;
`;

export const DataLi = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const DataItemUl = styled.ul`
  list-style-type: none;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;

export const DataItemLi = styled.li`
  line-height: 16px;
  display: flex;
  justify-content: center;
  &.rising {
    color: #01f1e3;
  }
  &.falling {
    color: #fe2264;
  }
`;

export const ArrowIcon = styled.img`
  margin: 8px;
`;

export const Line = styled.span`
  width: 100%;
  height: 1px;
  background-color: white;
`;

export const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  border-radius: 20px;
  padding: 48px;
  background-color: #13121a;
`;

export const ModalForm = styled.form`
  display: flex;
  gap: 32px;
`;

export const Input = styled.input`
  width: 100%;
  height: 44px;
  border-radius: 4px;
  padding: 8px;
  background-color: #191925;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin: 16px 0 0 0;
`;
